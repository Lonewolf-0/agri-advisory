export const advisoryRules = [
  // -------- General Weather Rules --------

  {
    crop: "ALL",
    condition: (weather) => weather.rainProbability > 70,
    message: "Heavy rain likely. Avoid irrigation and fertilizer application.",
  },

  {
    crop: "ALL",
    condition: (weather) =>
      weather.rainProbability > 40 && weather.rainProbability <= 70,
    message: "Moderate rain expected. Monitor soil moisture before irrigation.",
  },

  {
    crop: "ALL",
    condition: (weather) => weather.windSpeed > 15,
    message: "Strong winds detected. Avoid pesticide spraying.",
  },

  {
    crop: "ALL",
    condition: (weather) => weather.windSpeed > 8 && weather.windSpeed <= 15,
    message: "Moderate winds. Spray carefully to avoid drift.",
  },

  {
    crop: "ALL",
    condition: (weather) => weather.temperature > 38,
    message: "Extreme heat conditions. Ensure proper irrigation.",
  },

  {
    crop: "ALL",
    condition: (weather) => weather.humidity > 90,
    message: "Very high humidity may increase fungal disease risk.",
  },

  // -------- Rice Rules --------

  {
    crop: "Rice",
    condition: (weather) => weather.humidity > 85 && weather.temperature > 28,
    message: "Conditions favor rice blast disease. Inspect leaves.",
  },

  {
    crop: "Rice",
    condition: (weather) => weather.temperature > 35,
    message: "High temperature stress for rice. Maintain field water levels.",
  },

  {
    crop: "Rice",
    condition: (weather) => weather.rainProbability > 60,
    message: "Rain expected. Delay irrigation in paddy fields.",
  },

  // -------- Wheat Rules --------

  {
    crop: "Wheat",
    condition: (weather) => weather.temperature < 8,
    message: "Frost risk for wheat. Consider protective irrigation.",
  },

  {
    crop: "Wheat",
    condition: (weather) => weather.humidity > 80 && weather.temperature > 15,
    message: "Conditions favor wheat rust disease.",
  },

  {
    crop: "Wheat",
    condition: (weather) => weather.temperature > 32,
    message: "High temperature may affect wheat grain filling.",
  },

  // -------- Maize Rules --------

  {
    crop: "Maize",
    condition: (weather) => weather.temperature > 34,
    message: "Heat stress for maize. Ensure adequate irrigation.",
  },

  {
    crop: "Maize",
    condition: (weather) => weather.humidity > 85,
    message: "High humidity may promote maize fungal diseases.",
  },

  {
    crop: "Maize",
    condition: (weather) => weather.rainProbability > 65,
    message: "Heavy rainfall possible. Check drainage to prevent waterlogging.",
  },
];
