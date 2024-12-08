import express from "express";
import colors from "colors";

import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

import router from "./router";
import cors, { CorsOptions } from "cors";
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

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN_PROD,
  process.env.API_ORIGIN_URL, // Same server for Swagger y API
];

// CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No access for this origin"));
    }
  },
};

server.use(cors(corsOptions));

// Docs - swagger
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

// Read form data
server.use(express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

export default server;
