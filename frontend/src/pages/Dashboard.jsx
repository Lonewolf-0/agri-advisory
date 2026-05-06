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
  const [reloadLocations, setReloadLocations] = useState(false);

  const handleLocationSelect = (location) => {
    setLat(location.latitude);
    setLon(location.longitude);
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

      // trigger list refresh
      setReloadLocations(!reloadLocations);
    } catch (err) {
      console.error(err);
      alert("Failed to save location");
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Farmer Dashboard</h2>

      <CropSelector />

      <h3>Select Farm Location</h3>

      <WeatherMap lat={lat} lon={lon} setLat={setLat} setLon={setLon} />

      <p>Latitude: {lat}</p>
      <p>Longitude: {lon}</p>

      <button onClick={saveLocation}>Save Farm Location</button>

      <LocationList
        onSelectLocation={handleLocationSelect}
        reloadTrigger={reloadLocations}
      />

      <AdvisoryPage lat={lat} lon={lon} />
    </div>
  );
}

export default Dashboard;
