import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ setLat, setLon }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      setLat(lat);
      setLon(lng);
    }
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

function WeatherMap({ setLat, setLon }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // center of India
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker setLat={setLat} setLon={setLon} />

    </MapContainer>
  );
}

export default WeatherMap;