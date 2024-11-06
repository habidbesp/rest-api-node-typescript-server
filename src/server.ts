import express from "express";
import colors from "colors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

import router from "./router";
import db from "./config/db";

// conect Data Base
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
  } catch (error) {
    console.log(colors.red("There was an error connecting to the database!"));
  }
}

connectDB();

const server = express();

// Read form data
server.use(express.json());

server.use("/api/products", router);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
