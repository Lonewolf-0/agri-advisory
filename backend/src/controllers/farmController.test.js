import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../models/cropModel.js", () => ({
  getAllCrops: vi.fn(),
}));

vi.mock("../models/locationModel.js", () => ({
  saveLocation: vi.fn(),
  getUserLocations: vi.fn(),
}));

vi.mock("../models/userCropModel.js", () => ({
  selectCrop: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const { getAllCrops } = await import("../models/cropModel.js");
const { saveLocation, getUserLocations } =
  await import("../models/locationModel.js");
const { selectCrop } = await import("../models/userCropModel.js");
const { default: axios } = await import("axios");
const { addLocation, chooseCrop, getCrops, getLocations } =
  await import("./farmController.js");

function createResponse() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("farmController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns crops from the model", async () => {
    const res = createResponse();
    getAllCrops.mockResolvedValue([{ id: 1, name: "Rice" }]);

    await getCrops({}, res);

    expect(getAllCrops).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Rice" }]);
  });

  it("persists the selected crop for the authenticated user", async () => {
    const res = createResponse();
    selectCrop.mockResolvedValue({ id: 9, user_id: 11, crop_id: 3 });

    await chooseCrop({ user: { id: 11 }, body: { cropId: 3 } }, res);

    expect(selectCrop).toHaveBeenCalledWith(11, 3);
    expect(res.json).toHaveBeenCalledWith({
      message: "Crop selected",
      crop: { id: 9, user_id: 11, crop_id: 3 },
    });
  });

  it("returns saved locations for the authenticated user", async () => {
    const res = createResponse();
    getUserLocations.mockResolvedValue([{ id: 4, district: "Wardha" }]);

    await getLocations({ user: { id: 22 } }, res);

    expect(getUserLocations).toHaveBeenCalledWith(22);
    expect(res.json).toHaveBeenCalledWith([{ id: 4, district: "Wardha" }]);
  });

  it("validates location coordinates before calling geocoding", async () => {
    const res = createResponse();

    await addLocation({ user: { id: 1 }, body: {} }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "latitude and longitude are required",
    });
    expect(axios.get).not.toHaveBeenCalled();
  });

  it("reverse-geocodes and saves a farm location", async () => {
    const res = createResponse();
    axios.get.mockResolvedValue({
      data: {
        address: {
          county: "Pune",
          state: "Maharashtra",
        },
      },
    });
    saveLocation.mockResolvedValue({ id: 5, district: "Pune" });

    await addLocation(
      {
        user: { id: 8 },
        body: { latitude: "18.5204", longitude: "73.8567" },
      },
      res,
    );

    expect(axios.get).toHaveBeenCalledOnce();
    expect(saveLocation).toHaveBeenCalledWith(
      8,
      18.5204,
      73.8567,
      "Pune",
      "Maharashtra",
    );
    expect(res.json).toHaveBeenCalledWith({ id: 5, district: "Pune" });
  });
});
