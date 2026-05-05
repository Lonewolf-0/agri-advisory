import { fetchWeather } from "../services/weatherService.js";
import { generateAdvisory } from "../rules/advisoryRules.js";

export async function getAdvisory(req, res) {
  try {
    const { lat, lon } = req.query;

    const weather = await fetchWeather(lat, lon);

    const advisory = generateAdvisory(weather);

    res.json({
      weather,
      advisory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
