import { getAllCrops } from "../models/cropModel.js";
import { saveLocation } from "../models/locationModel.js";
import { selectCrop } from "../models/userCropModel.js";

export async function getCrops(req, res) {
  try {
    const crops = await getAllCrops();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addLocation(req, res) {
  try {
    const userId = req.user.id;
    const { latitude, longitude, district, state } = req.body;

    const location = await saveLocation(
      userId,
      latitude,
      longitude,
      district,
      state,
    );

    res.json({
      message: "Location saved",
      location,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function chooseCrop(req, res) {
  try {
    const userId = req.body.id;
    const { cropId } = req.body;

    const crop = await selectCrop(userId, cropId);

    res.json({
      message: "Crop selected",
      crop,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
