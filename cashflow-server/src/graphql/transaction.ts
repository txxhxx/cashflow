import { ApolloError, gql } from "apollo-server-express";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/Transaction";

export const typeDefs = gql`
  type Transaction {
    id: String!
    title: String!
    amount: Float
    date: Date
  }

  input TransactionInput {
    title: String
    amount: Float
    date: Date
  }

  extend type Query {
    transactions: [Transaction]
  }

  extend type Mutation {
    addTransaction(title: String!, amount: Float, date: Date): Transaction
    updateTransaction(id: String!, input: TransactionInput): Transaction
    deleteTransaction(id: String!): Boolean
  }
`;

export const resolver = {
  Query: {
    transactions: async () => {
      const repo = AppDataSource.getRepository(Transaction);
      return await repo.find();
    },
  },
  Mutation: {
    addTransaction: async (parent: any, args, ctx) => {
      const repo = AppDataSource.getRepository(Transaction);

      const transaction = new Transaction();

      transaction.title = args.title;
      transaction.amount = args.amount;
      transaction.date = args.date;

      return await repo.save(transaction);
    },
    updateTransaction: async (parent: any, args, ctx) => {
      const repo = AppDataSource.getRepository(Transaction);
      const transaction = await repo.findOne({ where: { id: args.id } });

      if (!transaction) {
        throw new ApolloError("Transaction not found", "NOT_FOUND");
      }

      await repo.update({ id: args.id }, args.input);

      return await repo.findOne({ where: { id: args.id } });
    },
    deleteTransaction: async (parent: any, args, ctx) => {
      const repo = AppDataSource.getRepository(Transaction);
      const transaction = await repo.findOne({ where: { id: args.id } });

      if (!transaction) {
        throw new ApolloError("Transaction not found", "NOT_FOUND");
      }
      try {
        await repo.remove(transaction);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
