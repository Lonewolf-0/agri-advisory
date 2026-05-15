import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const { default: axios } = await import("axios");
const { fetchSoilData } = await import("./soilService.js");

describe("fetchSoilData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests soil data with an HTTPS agent and maps soil layers", async () => {
    axios.get.mockResolvedValue({
      data: {
        properties: {
          layers: [
            {
              name: "phh2o",
              unit_measure: { d_factor: 10 },
              depths: [{ values: { mean: 73 } }, { values: { mean: 74 } }],
            },
            {
              name: "nitrogen",
              unit_measure: { d_factor: 100 },
              depths: [{ values: { mean: 126 } }, { values: { mean: 100 } }],
            },
            {
              name: "soc",
              unit_measure: { d_factor: 10 },
              depths: [{ values: { mean: 84 } }, { values: { mean: 75 } }],
            },
          ],
        },
      },
    });

    const soil = await fetchSoilData(28.61, 77.23);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("lat=28.61&lon=77.23"),
      expect.objectContaining({ httpsAgent: expect.anything() }),
    );
    expect(soil).toEqual({
      ph: 7.35,
      nitrogen: 1.13,
      organicCarbon: 7.95,
    });
  });
});
