import { useEffect, useState } from "react";
import api from "../services/api";

function LocationList({ onSelectLocation, reloadTrigger }) {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const res = await api.get("/farm/locations");

    setLocations(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLocations();
  }, [reloadTrigger]);

  return (
    <div className="location-list">
      <h3>Your Saved Farm Locations</h3>

      <ul>
        {locations.map((loc) => (
          <li
            key={loc.id}
            className="apple-liquid-glass location-list__item"
            onClick={() => onSelectLocation(loc)}
          >
            {loc.district}, {loc.state}
            <br />
            Lat: {loc.latitude} | Lon: {loc.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
