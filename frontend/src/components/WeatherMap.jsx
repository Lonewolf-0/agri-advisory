import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-velocity";
import api from "../services/api";

function MapClickHandler({ setLat, setLon, setPopupData }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setLat(lat);
      setLon(lng);

      try {
        const res = await api.get(`/weather?lat=${lat}&lon=${lng}`);
        // console.log(res.data);
        setPopupData({
          position: [lat, lng],
          weather: res.data[0],
        });
      } catch (err) {
        console.error("Weather fetch failed", err);
      }
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

function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon]);
    }
  }, [lat, lon, map]);

  return null;
}

// detectLocation moved into WeatherMap to access setLat/setLon

function WeatherMap({ lat, lon, setLat, setLon, onSaveFarm }) {
  const [layer, setLayer] = useState("none");
  const [popupData, setPopupData] = useState(null);
  const [locating, setLocating] = useState(false);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);

    const getPosition = () =>
      new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }),
      );

    try {
      const position = await getPosition();
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      setLat(userLat);
      setLon(userLon);
    } catch (err) {
      console.warn("Geolocation failed:", err);

      if (err && err.code === 1) {
        alert(
          "Location access denied. Please allow location access in your browser.",
        );
      } else {
        // Fallback: try IP-based lookup
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            const data = await res.json();
            const userLat = Number(data.latitude);
            const userLon = Number(data.longitude);
            if (!Number.isNaN(userLat) && !Number.isNaN(userLon)) {
              setLat(userLat);
              setLon(userLon);
              setLocating(false);
              return;
            }
          }
        } catch (e) {
          console.warn("IP fallback failed:", e);
        }

        alert("Unable to determine your location.");
      }
    } finally {
      setLocating(false);
    }
  };

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const weatherLayers = {
    rain: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    clouds: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  };

  const position = lat && lon ? [lat, lon] : [20.5937, 78.9629];

  return (
    <div className="weather-map-shell" style={{ position: "relative" }}>
      <div className="map-controls bottom-left apple-liquid-glass">
        <div className="map-controls-row">
          <button
            className={`apple-liquid-glass ${layer === "none" ? "is-active" : ""}`}
            onClick={() => setLayer("none")}
            aria-pressed={layer === "none"}
          >
            <svg
              className="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
            Normal
          </button>
          <button
            className={`apple-liquid-glass ${layer === "rain" ? "is-active" : ""}`}
            onClick={() => setLayer("rain")}
            aria-pressed={layer === "rain"}
          >
            <svg
              className="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M16 13a4 4 0 0 0-8 0"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M8 17l.01 0M12 17l.01 0M16 17l.01 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Rain
          </button>
          <button
            className={`apple-liquid-glass ${layer === "temp" ? "is-active" : ""}`}
            onClick={() => setLayer("temp")}
            aria-pressed={layer === "temp"}
          >
            <svg
              className="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 2v12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle
                cx="12"
                cy="18"
                r="3"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
            Temperature
          </button>
          <button
            className={`apple-liquid-glass ${layer === "wind" ? "is-active" : ""}`}
            onClick={() => setLayer("wind")}
            aria-pressed={layer === "wind"}
          >
            <svg
              className="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M3 12h12a3 3 0 0 0 0-6 3 3 0 0 0-3 3"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M3 18h8a2 2 0 0 0 0-4 2 2 0 0 0-2 2"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            Wind
          </button>
        </div>

        <div style={{ marginTop: 8 }}>
          <button
            className="apple-liquid-glass"
            onClick={detectLocation}
            disabled={locating}
          >
            <svg
              className="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 2v2M12 20v2M4.93 4.93L6.34 6.34M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {locating ? "Locating..." : "Use Current Location"}
          </button>
        </div>
      </div>

      <MapContainer
        center={position}
        zoom={lat ? 10 : 5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <RecenterMap lat={lat} lon={lon} />

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

        <MapClickHandler
          setLat={setLat}
          setLon={setLon}
          setPopupData={setPopupData}
        />

        {lat && lon && <Marker position={[lat, lon]} />}

        {popupData && (
          <Popup
            position={popupData.position}
            onClose={() => setPopupData(null)}
          >
            <div>
              <strong>Weather Details</strong>
              <p>
                <b>Latitude: </b>
                {Number.isFinite(popupData.position[0])
                  ? popupData.position[0].toFixed(4)
                  : popupData.position[0]}
              </p>
              <p>
                <b>Longitude: </b>
                {Number.isFinite(popupData.position[1])
                  ? popupData.position[1].toFixed(4)
                  : popupData.position[1]}
              </p>

              <p>Temperature: {popupData.weather.temperature} °C</p>
              <p>Humidity: {popupData.weather.humidity} %</p>
              <p>Wind Speed: {popupData.weather.windSpeed} m/s</p>
              <p>Rain Probability: {popupData.weather.rainProbability} %</p>

              {onSaveFarm && (
                <button
                  type="button"
                  className="apple-liquid-glass save-btn save-btn--contrast"
                  onClick={() =>
                    onSaveFarm(popupData.position[0], popupData.position[1])
                  }
                >
                  <svg
                    className="icon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M5 4h14v16H5z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9h6v6H9z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Save Farm
                </button>
              )}
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
