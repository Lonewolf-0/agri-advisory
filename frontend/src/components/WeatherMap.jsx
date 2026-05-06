import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function MapClickHandler({ setLat, setLon }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setLat(lat);
      setLon(lng);
    },
  });

  return null;
}

function WeatherMap({ lat, lon, setLat, setLon }) {
  const position = lat && lon ? [lat, lon] : [20.5937, 78.9629];

  return (
    <MapContainer
      center={position}
      zoom={lat ? 10 : 5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler setLat={setLat} setLon={setLon} />

      {lat && lon && <Marker position={[lat, lon]} />}
    </MapContainer>
  );
}

export default WeatherMap;
