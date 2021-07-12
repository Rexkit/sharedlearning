import { ApolloServer, gql, UserInputError, AuthenticationError } from 'apollo-server-micro';
import knex from "knex";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import bcrypt from "bcrypt";
import GraphQLJSON from 'graphql-type-json';

require('dotenv').config()

const db = knex({
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING
});

const verifyToken = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch {
        return null;
    }
};

const typeDefs = gql `
    scalar JSON

    type Query {
        me: User,
        pages: [Page],
        page(page_id: String!): Page,
        files(page_id: String!): [File],
        pageTextContent(page_id: String!): [TextContent]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User,
        signin(email: String!, password: String!): User,
        logout: Boolean,
        createPage(name: String!, description: String!): Boolean,
        setPageTextContent(page_id: String!, content: JSON!): Boolean,
        deletePage(page_id: String!): Boolean
    }

    type User {
        id: ID!,
        username: String!,
        email: String!
    }

    type Page {
        id: ID!,
        name: String!,
        description: String!,
        user_id: ID!
    }

    type File {
        id: ID!,
        filename: String!,
        type: String!,
        user_id: ID!,
        page_id: ID!
    }

    type TextContent {
        data: JSON
    }
`;

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        async me(_parent, _args, context) {
            if (context.user?.id) {
                let [user] = await db('users').where('id', context.user.id);
                return user;
            } else {
                return null;
            }
        },
        async pages(_parent, _args, context) {
            if (context.user?.id) {
                const pages = await db('pages').where('user_id', context.user.id);
                return pages;
            } else {
                return null;
            }
        },
        async page(_parent, { page_id }, context) {
            const [page] = await db('pages').where('id', page_id);
            return page;
        },
        async files(_parent, { page_id }, context) {
            const files = await db('media').where({
                'page_id': page_id
            });
            return files;
        },
        async pageTextContent(_parent, { page_id }, context) {
            const textContent = await db('textcontent').where({
                'page_id': page_id
            });
            return textContent;
        }
    },

    Mutation: {
        async setPageTextContent(_parent, { page_id, content }, context) {
            if (context.user?.id) {
                try {
                    await db('textcontent').insert({
                        page_id,
                        data: JSON.stringify(content)
                    }).onConflict("page_id").merge();
                } catch (error) {
                    console.log(error.message);
                }
                
                return true;
            } else {
                return false;
            }
        },
        async signup(_parent, { username, email, password }, context) {
            let hash = await bcrypt.hash(password, 10);

            try {
                await db('users').insert({ username, email, password: hash });
                let [user] = await db('users').where('email', email);

                let token = jwt.sign({ id: user.id }, process.env.SECRET!);
                context.cookies.set("auth-token", token, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 7200000,
                    secure: process.env.NODE_ENV === "production",
                });
                return user;
            } catch (err) {
                if (err.code === '23505') {
                    throw new UserInputError(err.detail);
                }
            }
        },

        async signin(_parent, { email, password }, context) {
            let [user] = await db('users').where('email', email);

            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);

                if (validPassword) {
                    let token = jwt.sign({ id: user.id }, process.env.SECRET!);

                    context.cookies.set("auth-token", token, {
                        httpOnly: true,
                        sameSite: "lax",
                        maxAge: 7200000,
                        secure: process.env.NODE_ENV === "production",
                    });
                } else {
                    throw new AuthenticationError("Invalid password");
                }
            } else {
                throw new AuthenticationError("Invalid email");
            }

            return user;
        },

        async logout(_parent, _args, context) {
            context.cookies.set("auth-token", "", { maxAge: -1 });
        },

        async createPage(_parent, { name, description }, context) {
            if (context.user?.id) {
                const user_id = context.user.id;
                await db('pages').insert({ name, description, user_id})
                return true;
            } else {
                return false;
            }
        },

        async deletePage(_parent, { page_id }, context) {
            if (context.user?.id) {
                const user_id = context.user.id;
                await db('pages').where({ id: page_id, user_id: user_id }).del();
                return true;
            } else {
                return false;
            }
        }
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const cookies = new Cookies(req, res);
        const token = cookies.get("auth-token");
        const user = verifyToken(token);
        return {
            cookies,
            user,
        };
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' });