import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as transaciton from "./transaction";

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
  typeDefs: [typeDefs, transaciton.typeDefs],
  resolvers: merge(resolvers, transaciton.resolver),
});

export default schema;
