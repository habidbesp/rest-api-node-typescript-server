import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde API");

    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe("desde api");
  });
});

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("There was an error connecting to the database!")
      );
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("There was an error connecting to the database!")
    );
  });
});
