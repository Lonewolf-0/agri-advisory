import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app.js";

vi.mock("../services/weatherService.js", () => ({
  fetchWeather: vi.fn(),
}));

const { fetchWeather } = await import("../services/weatherService.js");

describe("weatherController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns weather JSON from /api/weather", async () => {
    fetchWeather.mockResolvedValue([{ date: "2026-05-14", temperature: 25 }]);

    const res = await request(app)
      .get("/api/weather")
      .query({ lat: "10", lon: "20" });

    expect(res.status).toBe(200);
    expect(fetchWeather).toHaveBeenCalledWith("10", "20");
    expect(res.body).toEqual([{ date: "2026-05-14", temperature: 25 }]);
  });

  it("handles weather service errors with 500", async () => {
    fetchWeather.mockRejectedValue(new Error("API down"));

    const res = await request(app)
      .get("/api/weather")
      .query({ lat: "0", lon: "0" });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });
});
