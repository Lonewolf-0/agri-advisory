import { getAllCrops } from "../models/cropModel.js";
import { saveLocation, getUserLocations } from "../models/locationModel.js";
import { selectCrop } from "../models/userCropModel.js";
import axios from "axios";

export async function getCrops(req, res) {
  try {
    const crops = await getAllCrops();
    res.json(crops);
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

export async function getLocations(req, res) {
  try {
    const userId = req.user.id;

    const locations = await getUserLocations(userId);

    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addLocation(req, res) {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    console.log(1);
    const geo = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    );
    console.log(geo);
    const address = geo.data.address;

    const district =
      address.county || address.city_district || address.city || "";

    const state = address.state || "";

    const location = await saveLocation(
      userId,
      latitude,
      longitude,
      district,
      state,
    );

    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
