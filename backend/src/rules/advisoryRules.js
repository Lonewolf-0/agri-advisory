export function generateAdvisory(weather) {
  const advice = [];

  const { temperature, humidity, windSpeed, rainProbability } = weather;

  // irrigation rule
  if (rainProbability && rainProbability > 60) {
    advice.push("High probability of rain. Skip irrigation today.");
  }

  // disease risk
  if (humidity > 80 && temperature > 30) {
    advice.push(
      "High humidity and temperature may increase crop disease risk.",
    );
  }

  // pesticide spraying
  if (windSpeed > 12) {
    advice.push("Wind speed is high. Avoid pesticide spraying.");
  }

  if (advice.length === 0) {
    advice.push("Weather conditions look normal for farming activities.");
  }

  return advice;
}
