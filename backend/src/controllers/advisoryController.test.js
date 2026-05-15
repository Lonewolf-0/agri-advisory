import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../services/weatherService.js", () => ({
  fetchWeather: vi.fn(),
}));

vi.mock("../services/advisoryEngine.js", () => ({
  generateAdvisory: vi.fn(),
}));

vi.mock("../models/userCropModel.js", () => ({
  getUserCrop: vi.fn(),
}));

vi.mock("../models/logModel.js", () => ({
  saveAdvisoryLog: vi.fn(),
}));

vi.mock("../services/soilService.js", () => ({
  fetchSoilData: vi.fn(),
}));

const { fetchWeather } = await import("../services/weatherService.js");
const { generateAdvisory } = await import("../services/advisoryEngine.js");
const { getUserCrop } = await import("../models/userCropModel.js");
const { fetchSoilData } = await import("../services/soilService.js");
const { getAdvisory } = await import("./advisoryController.js");

function createResponse() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("advisoryController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds a crop-aware forecast advisory response", async () => {
    const res = createResponse();

    getUserCrop.mockResolvedValue({ name: "Rice" });
    fetchWeather.mockResolvedValue([
      { date: "2026-05-13", temperature: 36 },
      { date: "2026-05-14", temperature: 29 },
    ]);
    fetchSoilData.mockResolvedValue({
      ph: 7.4,
      nitrogen: 1.2,
      organicCarbon: 8,
    });
    generateAdvisory.mockImplementation((day, soil, crop) => [
      `${crop}:${day.date}`,
    ]);

    await getAdvisory(
      { user: { id: 7 }, query: { lat: "18", lon: "73" } },
      res,
    );

    expect(getUserCrop).toHaveBeenCalledWith(7);
    expect(fetchWeather).toHaveBeenCalledWith("18", "73");
    expect(generateAdvisory).toHaveBeenCalledTimes(2);
    expect(res.json).toHaveBeenCalledWith({
      crop: "Rice",
      forecast: [
        {
          date: "2026-05-13",
          weather: { date: "2026-05-13", temperature: 36 },
          soil: { ph: 7.4, nitrogen: 1.2, organicCarbon: 8 },
          advisory: ["Rice:2026-05-13"],
        },
        {
          date: "2026-05-14",
          weather: { date: "2026-05-14", temperature: 29 },
          soil: { ph: 7.4, nitrogen: 1.2, organicCarbon: 8 },
          advisory: ["Rice:2026-05-14"],
        },
      ],
    });
  });
});
