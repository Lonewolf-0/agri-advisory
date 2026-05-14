import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("../models/userModel.js", () => ({
  createUser: vi.fn(),
  findUserByEmail: vi.fn(),
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(() => Promise.resolve("hashedpw")),
    compare: vi.fn(() => Promise.resolve(true)),
  },
}));

process.env.JWT_SECRET = "test-secret";

const { createUser, findUserByEmail } = await import("../models/userModel.js");

import app from "../app.js";

describe("authController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a new user via POST /api/auth/register", async () => {
    createUser.mockResolvedValue({ id: 42, name: "Alice", email: "a@b.com" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Alice", email: "a@b.com", password: "pw" });
    if (res.status !== 200)
      console.log("REGISTER RES BODY:", JSON.stringify(res.body));
    expect(res.status).toBe(200);
    expect(createUser).toHaveBeenCalled();
    expect(res.body).toHaveProperty("message", "User Registered");
    expect(res.body.user).toHaveProperty("email", "a@b.com");
  });

  it("logs in existing user via POST /api/auth/login", async () => {
    findUserByEmail.mockResolvedValue({
      id: 7,
      email: "test@x.com",
      password: "hashedpw",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@x.com", password: "pw" });
    if (res.status !== 200)
      console.log("LOGIN RES BODY:", JSON.stringify(res.body));
    expect(res.status).toBe(200);
    expect(findUserByEmail).toHaveBeenCalledWith("test@x.com");
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("message", "Login Successful");
  });

  it("returns 400 when login user not found", async () => {
    findUserByEmail.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "noone@x.com", password: "pw" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User not found");
  });
});
