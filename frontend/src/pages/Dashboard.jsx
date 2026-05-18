import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CropSelector from "../components/CropSelector";
import LocationList from "../components/LocationList";
import WeatherMap from "../components/WeatherMap";
import AdvisoryPage from "./AdvisoryPage";
import api from "../services/api";
import { hideLoader } from "../utils/loader";
import { showLoader } from "../utils/loader";

function Dashboard() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [reloadLocations, setReloadLocations] = useState(false);

  const handleLocationSelect = (location) => {
    setLat(location.latitude);
    setLon(location.longitude);
  };

  const saveLocation = async (latitude = lat, longitude = lon) => {
    if (!latitude || !longitude) {
      alert("Please select a location on the map");
      return;
    }

    showLoader();
    try {
      await api.post("/farm/location", {
        latitude,
        longitude,
      });

      alert("Farm location saved");

      // trigger list refresh
      setReloadLocations(!reloadLocations);
    } catch (err) {
      console.error(err);
      alert("Failed to save location");
    } finally {
      hideLoader();
    }
  };

  // hide loader when dashboard mounts (useful after navigation)
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <div className="dashboard-shell">
      <div className="map-panel">
        <WeatherMap
          lat={lat}
          lon={lon}
          setLat={setLat}
          setLon={setLon}
          onSaveFarm={saveLocation}
        />
      </div>

      <div className="top-nav-overlay">
        <Navbar />
      </div>

      <div className="panel left-panel apple-liquid-glass">
        <div className="panel-inner">
          <h2>Farmer Dashboard</h2>

          <CropSelector />

          <LocationList
            onSelectLocation={handleLocationSelect}
            reloadTrigger={reloadLocations}
          />
        </div>
      </div>

      <div className="panel right-panel apple-liquid-glass">
        <div className="panel-inner">
          <AdvisoryPage lat={lat} lon={lon} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
