import { useState } from "react";
import api from "../services/api";

function AdvisoryPage({ lat, lon }) {
  const [forecast, setForecast] = useState([]);

  const getAdvisory = async () => {
    if (!lat || !lon) {
      alert("Please select a farm location");
      return;
    }

    try {
      const res = await api.get(`/advisory?lat=${lat}&lon=${lon}`);

      setForecast(res.data.forecast);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch advisory");
    }
  };

  return (
    <div>
      <h3>5 Day Farm Advisory</h3>

      <button onClick={getAdvisory}>Generate Advisory</button>

      <div style={{ marginTop: "20px" }}>
        {forecast.map((day, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <h4>{new Date(day.date).toDateString()}</h4>

            <p>Temperature: {day.weather.temperature} °C</p>
            <p>Humidity: {day.weather.humidity} %</p>
            <p>Wind Speed: {day.weather.windSpeed} m/s</p>
            <p>Rain Probability: {day.weather.rainProbability}%</p>

            <strong>Advisory:</strong>

            <ul>
              {day.advisory.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvisoryPage;
