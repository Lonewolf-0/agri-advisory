import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function MapClickHandler({ setLat, setLon }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLon(e.latlng.lng);
    },
  });

  return null;
}

function WeatherMap({ lat, lon, setLat, setLon }) {
  const [layer, setLayer] = useState("none");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const weatherLayers = {
    rain: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  };

  const position = lat && lon ? [lat, lon] : [20.5937, 78.9629];

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setLayer("none")}>Normal</button>
        <button onClick={() => setLayer("rain")}>Rain</button>
        <button onClick={() => setLayer("temp")}>Temperature</button>
        <button onClick={() => setLayer("wind")}>Wind</button>
      </div>

      <MapContainer
        center={position}
        zoom={lat ? 10 : 5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {layer !== "none" && <TileLayer url={weatherLayers[layer]} />}

        <MapClickHandler setLat={setLat} setLon={setLon} />

        {lat && lon && <Marker position={[lat, lon]} />}
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
