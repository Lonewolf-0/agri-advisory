import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./app.js";

describe("app", () => {
  it("returns a health message from the root route", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Agri Advisory API is running",
    });
  });

  it("protects the auth me route when no token is provided", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Token missing" });
  });
});