/* eslint-disable no-unused-vars */
export const advisoryRules = [
  // -------- General Weather Rules --------

  {
    crop: "ALL",
    condition: (weather, soil) => weather.rainProbability > 70,
    message: "Heavy rain likely. Avoid irrigation and fertilizer application.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) =>
      weather.rainProbability > 40 && weather.rainProbability <= 70,
    message: "Moderate rain expected. Monitor soil moisture before irrigation.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) => weather.windSpeed > 15,
    message: "Strong winds detected. Avoid pesticide spraying.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) =>
      weather.windSpeed > 8 && weather.windSpeed <= 15,
    message: "Moderate winds. Spray carefully to avoid drift.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) => weather.temperature > 38,
    message: "Extreme heat conditions. Ensure proper irrigation.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) => weather.humidity > 90,
    message: "Very high humidity may increase fungal disease risk.",
  },

  // -------- Rice Rules --------

  {
    crop: "Rice",
    condition: (weather, soil) =>
      weather.humidity > 85 && weather.temperature > 28,
    message: "Conditions favor rice blast disease. Inspect leaves.",
  },

  {
    crop: "Rice",
    condition: (weather, soil) => weather.temperature > 35,
    message: "High temperature stress for rice. Maintain field water levels.",
  },

  {
    crop: "Rice",
    condition: (weather, soil) => weather.rainProbability > 60,
    message: "Rain expected. Delay irrigation in paddy fields.",
  },

  // -------- Wheat Rules --------

  {
    crop: "Wheat",
    condition: (weather, soil) => weather.temperature < 8,
    message: "Frost risk for wheat. Consider protective irrigation.",
  },

  {
    crop: "Wheat",
    condition: (weather, soil) =>
      weather.humidity > 80 && weather.temperature > 15,
    message: "Conditions favor wheat rust disease.",
  },

  {
    crop: "Wheat",
    condition: (weather, soil) => weather.temperature > 32,
    message: "High temperature may affect wheat grain filling.",
  },

  // -------- Maize Rules --------

  {
    crop: "Maize",
    condition: (weather, soil) => weather.temperature > 34,
    message: "Heat stress for maize. Ensure adequate irrigation.",
  },

  {
    crop: "Maize",
    condition: (weather, soil) => weather.humidity > 85,
    message: "High humidity may promote maize fungal diseases.",
  },

  {
    crop: "Maize",
    condition: (weather, soil) => weather.rainProbability > 65,
    message: "Heavy rainfall possible. Check drainage to prevent waterlogging.",
  },

  // -------- Soil-based Rules --------

  {
    crop: "ALL",
    condition: (weather, soil) =>
      soil?.nitrogen !== undefined && soil.nitrogen < 0.8,
    message:
      "Soil nitrogen is low — consider nitrogen fertilization after checking crop stage.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) =>
      soil?.organicCarbon !== undefined && soil.organicCarbon < 5,
    message:
      "Low soil organic carbon detected — add compost or organic amendments to improve soil health.",
  },

  {
    crop: "ALL",
    condition: (weather, soil) =>
      soil?.ph !== undefined && (soil.ph < 5.5 || soil.ph > 7.5),
    message:
      "Soil pH outside optimal range — consider liming or acidifying amendments based on soil test.",
  },

  // -------- Crop-specific Soil Rules --------

  {
    crop: "Rice",
    condition: (weather, soil) =>
      soil?.nitrogen !== undefined && soil.nitrogen < 0.9,
    message:
      "Rice: Soil nitrogen is low for paddy — consider top-dressing with urea at appropriate growth stage.",
  },

  {
    crop: "Rice",
    condition: (weather, soil) =>
      soil?.ph !== undefined && (soil.ph < 5.8 || soil.ph > 7.2),
    message:
      "Rice: Soil pH suboptimal for paddy — evaluate liming or pH adjustments for better nutrient availability.",
  },

  {
    crop: "Wheat",
    condition: (weather, soil) =>
      soil?.nitrogen !== undefined && soil.nitrogen < 1.0,
    message:
      "Wheat: Nitrogen deficiency risk — apply N fertilizer following split application guidelines.",
  },

  {
    crop: "Wheat",
    condition: (weather, soil) =>
      soil?.ph !== undefined && (soil.ph < 6.0 || soil.ph > 8.0),
    message:
      "Wheat: pH outside ideal range — consider soil amendments to optimize nutrient uptake.",
  },

  {
    crop: "Maize",
    condition: (weather, soil) =>
      soil?.nitrogen !== undefined && soil.nitrogen < 1.2,
    message:
      "Maize: High nitrogen demand — consider timely nitrogen application to support vegetative growth.",
  },

  {
    crop: "Maize",
    condition: (weather, soil) =>
      soil?.organicCarbon !== undefined && soil.organicCarbon < 6,
    message:
      "Maize: Low organic carbon — incorporate organic amendments to improve soil structure and nutrient retention.",
  },
];
