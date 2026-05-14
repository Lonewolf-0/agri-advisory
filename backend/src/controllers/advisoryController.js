import { fetchWeather } from "../services/weatherService.js";
import { generateAdvisory } from "../services/advisoryEngine.js";
import { getUserCrop } from "../models/userCropModel.js";
import { saveAdvisoryLog } from "../models/logModel.js";

export async function getAdvisory(req, res, next) {
  try {
    const { lat, lon } = req.query;

    const userId = req.user.id;

    const cropData = await getUserCrop(userId);

    const crop = cropData?.name;

    const forecast = await fetchWeather(lat, lon);

    const advisoryForecast = forecast.map((day) => {
      const advisory = generateAdvisory(day, crop);

      return {
        date: day.date,
        weather: day,
        advisory,
      };
    });

    await saveAdvisoryLog({
      userId,
      crop,
      latitude: lat,
      longitude: lon,
      advisory: advisoryForecast,
      weather: forecast
    });

    res.json({
      crop,
      forecast: advisoryForecast,
    });
  } catch (err) {
    // res.status(500).json({ error: err.message });
    next(err);
  }
}
