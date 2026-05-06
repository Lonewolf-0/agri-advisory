import { useState } from "react";

import Navbar from "../components/Navbar";
import CropSelector from "../components/CropSelector";
import LocationList from "../components/LocationList";
import WeatherMap from "../components/WeatherMap";
import AdvisoryPage from "./AdvisoryPage";
import api from "../services/api";

function Dashboard() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const handleLocationSelect = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

  const saveLocation = async () => {
    if (!lat || !lon) {
      alert("Please select a location on the map");
      return;
    }

    try {
      await api.post("/farm/location", {
        latitude: lat,
        longitude: lon,
      });

      alert("Farm location saved");
    } catch (err) {
      console.error(err.message);
      alert("Failed to save location");
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Farmer Dashboard</h2>

      <CropSelector />

      <h3>Select Farm Location</h3>

      <WeatherMap setLat={setLat} setLon={setLon} />

      <p>Selected Location:</p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lon}</p>

      <button onClick={saveLocation}>Save Farm Location</button>

      <LocationList onSelectLocation={handleLocationSelect} />

      <AdvisoryPage lat={lat} lon={lon} />
    </div>
  );
}

export default Dashboard;
