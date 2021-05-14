import { ApolloServer, gql } from 'apollo-server-micro'
import knex from "knex";

const db = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING
});

const typeDefs = gql`
  type Query {
    albums(first: Int = 25, skip: Int = 0): [Album!]!
  }

  type Artist {
    id: ID!
    name: String!
    url: String!
    albums(first: Int = 25, skip: Int = 0): [Album!]!
  }

  type Album {
    id: ID!
    name: String!
    year: String!
    artist: Artist!
  }
`;

const resolvers = {
  Query: {
    albums: (_parent, args, _context) => {
      return db
        .select("*")
        .from("albums")
        .orderBy("year", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    }
  },

  Album: {
    id: (album, _args, _context) => album.id,
    artist: (album, _args, _context) => {
      return db
        .select("*")
        .from("artists")
        .where({ id: album.artist_id })
        .first();
    }
  },

  Artist: {
    id: (artist, _args, _context) => artist.id,
    albums: (artist, args, _context) => {
      return db
        .select("*")
        .from("albums")
        .where({ artist_id: artist.id })
        .orderBy("year", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
      bodyParser: false,
    },
  }

export default apolloServer.createHandler({ path: '/api/graphql' })