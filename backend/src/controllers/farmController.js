import { getAllCrops } from "../models/cropModel.js";
import { saveLocation, getUserLocations } from "../models/locationModel.js";
import { selectCrop } from "../models/userCropModel.js";
import axios from "axios";
import https from "https";

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
    const userId = req.user.id;
    const { cropId } = req.body;

    const crop = await selectCrop(userId, cropId);

    res.json({ message: "Crop selected", crop });
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

    if (latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .json({ error: "latitude and longitude are required" });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({ error: "invalid latitude or longitude" });
    }
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(
      lat,
    )}&lon=${encodeURIComponent(lon)}&format=json`;
    console.log("before api call");
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    const geo = await axios.get(geoUrl, {
      headers: {
        "User-Agent": "aryan-app",
      },
      httpsAgent,
    });
    console.log("after api call");

    const address = geo?.data?.address || {};

    const district =
      address.county || address.city_district || address.city || "";
    const state = address.state || "";

    const location = await saveLocation(userId, lat, lon, district, state);

    res.json(location);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
}
