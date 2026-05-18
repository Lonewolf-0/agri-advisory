import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
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
        {locations.map((loc) => {
          const lat = Number(loc.latitude);
          const lon = Number(loc.longitude);
          const displayLat = Number.isFinite(lat)
            ? lat.toFixed(4)
            : loc.latitude;
          const displayLon = Number.isFinite(lon)
            ? lon.toFixed(4)
            : loc.longitude;

          const handleClick = (e) => {
            const el = e.currentTarget;
            el.classList.add("is-clicked");
            setTimeout(() => el.classList.remove("is-clicked"), 300);
            onSelectLocation(loc);
          };

          const handleKey = (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(e);
            }
          };

          return (
            <li
              key={loc.id}
              className="apple-liquid-glass location-list__item"
              onClick={handleClick}
              onKeyDown={handleKey}
              role="button"
              tabIndex={0}
            >
              <FaLocationDot className="icon" aria-hidden />
              {loc.district}, {loc.state}
              <br />
              Lat: {displayLat} | Lon: {displayLon}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LocationList;
