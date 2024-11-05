import express from "express";
import router from "./router";
import db from "./config/db";

import colors from "colors";

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

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

export default server;
