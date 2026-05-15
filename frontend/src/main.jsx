import "leaflet/dist/leaflet.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App.jsx";
import { hideLoader } from "./utils/loader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Hide initial global loader once app mounts
setTimeout(() => {
  try {
    hideLoader();
  } catch (e) {
    // ignore
  }
}, 0);
