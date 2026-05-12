import axios from "axios";

export async function fetchWeather(lat, lon) {
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);

  const list = response.data.list;

  const dailyForecast = [];

  // OpenWeather returns 3‑hour intervals
  // We take one reading every 8 intervals (~24h)

  for (let i = 0; i < list.length; i += 8) {
    const item = list[i];

    dailyForecast.push({
      date: item.dt_txt,
      temperature: item.main.temp,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      rainProbability: item.pop * 100,
    });
  }

  return dailyForecast.slice(0, 5); // 5 day forecast
}
