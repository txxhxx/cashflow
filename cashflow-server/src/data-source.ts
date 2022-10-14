import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction } from "./entities/Transaction";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "flow",
  synchronize: true,
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
