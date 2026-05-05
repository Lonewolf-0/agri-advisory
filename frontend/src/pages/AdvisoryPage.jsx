import { useState } from "react";
import api from "../services/api";
import WeatherMap from "../components/WeatherMap";

function AdvisoryPage() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [advisory, setAdvisory] = useState([]);
  const [weather, setWeather] = useState(null);

  const getAdvisory = async () => {
    const res = await api.get(`/advisory?lat=${lat}&lon=${lon}`);

    setAdvisory(res.data.advisory);
    setWeather(res.data.weather);
  };

  return (
    <div>
      <h2>Select Farm Location</h2>

      <WeatherMap setLat={setLat} setLon={setLon} />

      <p>Latitude: {lat}</p>
      <p>Longitude: {lon}</p>

      <button onClick={getAdvisory}>Get Advisory</button>

      {weather && (
        <div>
          <h3>Weather</h3>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind: {weather.windSpeed} km/h</p>
        </div>
      )}

      <h3>Advisory</h3>

      <ul>
        {advisory.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdvisoryPage;
