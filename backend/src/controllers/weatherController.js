import { fetchWeather } from "../services/weatherService.js";

export async function getWeather(req, res) {
  try {
    const { lat, lon } = req.query;
    const weather = await fetchWeather(lat, lon);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
