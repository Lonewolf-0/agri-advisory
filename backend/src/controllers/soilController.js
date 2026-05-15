import { fetchSoilData } from "../services/soilService.js";

export async function getSoilData(req, res, next) {
  try {
    const { lat, lon } = req.query;

    const soil = await fetchSoilData(lat, lon);

    res.json(soil);
  } catch (err) {
    next(err);
  }
}
