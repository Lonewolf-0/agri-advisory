import { useEffect, useState } from "react";
import api from "../services/api";

function LocationList({ onSelectLocation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const res = await api.get("/farm/locations");

      setLocations(res.data);
    }

    fetchLocations();
  }, []);

  return (
    <div>
      <h3>Your Saved Farm Locations</h3>

      <ul>
        {locations.map((loc) => (
          <li
            key={loc.id}
            style={{ cursor: "pointer", marginBottom: "10px" }}
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
