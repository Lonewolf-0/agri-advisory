import axios from "axios";

export async function fetchWeather(lat, lon) {
  const apiKey = process.env.WEATHER_API_KEY;

  //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);
  const data = response.data.list[0];
//   console.log(data);

  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    weather: data.weather[0].description,
    rainProbability: data.pop*100,
  };
}
