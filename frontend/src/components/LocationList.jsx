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
              <svg
                className="icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9" r="1.5" fill="currentColor" />
              </svg>
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
