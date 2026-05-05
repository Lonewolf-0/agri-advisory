export function generateAdvisory(weather, crop) {

  const advice = [];

  const { temperature, humidity, windSpeed, rainProbability } = weather;

  // General rules
  if (rainProbability > 60) {
    advice.push("High chance of rain. Skip irrigation today.");
  }

  if (windSpeed > 12) {
    advice.push("Wind speed is high. Avoid pesticide spraying.");
  }

  // Crop specific rules
  if (crop === "Rice") {

    if (humidity > 85) {
      advice.push("High humidity may increase risk of rice blast disease.");
    }

    if (temperature > 35) {
      advice.push("High temperature stress for rice. Ensure adequate water.");
    }

  }

  if (crop === "Wheat") {

    if (temperature < 10) {
      advice.push("Low temperature may cause frost damage in wheat.");
    }

    if (humidity > 80) {
      advice.push("High humidity increases wheat rust disease risk.");
    }

  }

  if (crop === "Maize") {

    if (temperature > 34) {
      advice.push("High temperature stress for maize. Consider irrigation.");
    }

  }

  if (advice.length === 0) {
    advice.push("Weather conditions look normal for this crop.");
  }

  return advice;
}