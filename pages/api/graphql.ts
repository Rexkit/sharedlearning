import { ApolloServer, gql, UserInputError, AuthenticationError } from 'apollo-server-micro'
import knex from "knex";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import bcrypt from "bcrypt";

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
  type Query {
    me: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User,
    signin(email: String!, password: String!): User
  }

  type User {
    id: ID!,
    username: String!,
    email: String!
  }
`;

const resolvers = {
    Query: {
        async me(_parent, _args, context) {
            if (context.user?.id) {
                let [user] = await db('users').where('id', context.user.id);
                return user;
            } else {
                return null;
            }
        },
    },

    Mutation: {
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

export default apolloServer.createHandler({ path: '/api/graphql' })