import { useState } from "react";
import api from "../services/api";

function AdvisoryPage({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [advisory, setAdvisory] = useState([]);

  const getAdvisory = async () => {
    if (!lat || !lon) {
      alert("Please select a farm location");
      return;
    }

    const res = await api.get(`/advisory?lat=${lat}&lon=${lon}`);

    setWeather(res.data.weather);
    setAdvisory(res.data.advisory);
  };

  return (
    <div>
      <h3>Farm Advisory</h3>

      <button onClick={getAdvisory}>Generate Advisory</button>

      {weather && (
        <div>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind Speed: {weather.windSpeed}</p>
        </div>
      )}

      <ul>
        {advisory.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdvisoryPage;
