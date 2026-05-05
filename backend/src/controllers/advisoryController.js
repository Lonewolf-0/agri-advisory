import { fetchWeather } from "../services/weatherService.js";
import { generateAdvisory } from "../rules/advisoryRules.js";
import { getUserCrop } from "../models/userCropModel.js";

export async function getAdvisory(req, res) {
  try {

    const { lat, lon, userId } = req.query;

    const weather = await fetchWeather(lat, lon);

    const cropData = await getUserCrop(userId);

    const cropName = cropData ? cropData.name : null;

    const advisory = generateAdvisory(weather, cropName);

    res.json({
      crop: cropName,
      weather,
      advisory
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}