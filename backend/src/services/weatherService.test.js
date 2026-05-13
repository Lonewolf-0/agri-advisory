import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const { default: axios } = await import("axios");
const { fetchWeather } = await import("./weatherService.js");

describe("fetchWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.WEATHER_API_KEY = "test-weather-key";
  });

  it("maps OpenWeather interval data into daily forecast objects", async () => {
    axios.get.mockResolvedValue({
      data: {
        list: Array.from({ length: 16 }, (_, index) => ({
          dt_txt: `2026-05-${String(index + 1).padStart(2, "0")}`,
          main: { temp: index, humidity: 50 + index },
          wind: { speed: 2 + index },
          pop: 0.1 * index,
        })),
      },
    });

    const forecast = await fetchWeather(18.5, 73.8);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "lat=18.5&lon=73.8&appid=test-weather-key&units=metric",
      ),
    );
    expect(forecast).toEqual([
      {
        date: "2026-05-01",
        temperature: 0,
        humidity: 50,
        windSpeed: 2,
        rainProbability: 0,
      },
      {
        date: "2026-05-09",
        temperature: 8,
        humidity: 58,
        windSpeed: 10,
        rainProbability: 80,
      },
    ]);
  });
});
