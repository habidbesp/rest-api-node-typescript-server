import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: { require: false } },
  models: [__dirname + "/../models/**/*"],
  logging: false,
});

export default db;
