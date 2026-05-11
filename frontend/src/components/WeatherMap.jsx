import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-velocity";

function MapClickHandler({ setLat, setLon }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLon(e.latlng.lng);
    },
  });

  return null;
}

function WindLayer({ enabled }) {
  const map = useMap();
  const velocityLayerRef = useRef(null);

  useEffect(() => {
    async function loadWindParticles() {
      if (velocityLayerRef.current) {
        map.removeLayer(velocityLayerRef.current);
        velocityLayerRef.current = null;
      }

      if (!enabled) {
        return;
      }

      const response = await fetch(
        "https://raw.githubusercontent.com/danwild/leaflet-velocity/master/demo/wind-global.json",
      );
      if (!response.ok) {
        throw new Error(`Wind data request failed: ${response.status}`);
      }
      const velocityData = await response.json();

      velocityLayerRef.current = L.velocityLayer({
        data: velocityData,
        displayValues: true,
        maxVelocity: 25,
        velocityScale: 0.06,
        particleMultiplier: 1 / 250,
        displayOptions: {
          velocityType: "Wind",
          position: "bottomleft",
          emptyString: "No wind data",
        },
      });

      velocityLayerRef.current.addTo(map);
    }

    loadWindParticles().catch((error) => {
      console.error("Unable to load wind particles:", error);
    });

    return () => {
      if (velocityLayerRef.current) {
        map.removeLayer(velocityLayerRef.current);
        velocityLayerRef.current = null;
      }
    };
  }, [enabled, map]);

  return null;
}

function WeatherMap({ lat, lon, setLat, setLon }) {
  const [layer, setLayer] = useState("none");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const weatherLayers = {
    rain: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    clouds: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
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
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {layer !== "none" && layer !== "wind" && (
          <TileLayer url={weatherLayers[layer]} />
        )}

        {layer === "wind" && (
          <TileLayer
            url={weatherLayers.clouds}
            opacity={0.45}
            attribution="OpenWeather"
          />
        )}

        <WindLayer enabled={layer === "wind"} />

        <MapClickHandler setLat={setLat} setLon={setLon} />

        {lat && lon && <Marker position={[lat, lon]} />}
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
