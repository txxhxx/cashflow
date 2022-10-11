import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

const typeDefs = gql`
  scalar Date

  type Query {
    _version: String
  }

  type Mutation {
    _version: String
  }
`;

const resolvers = {
  Query: {
    _version: () => "1.0",
  },
  Mutation: {
    _version: () => "1.0",
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: merge(resolvers),
});

export default schema;
