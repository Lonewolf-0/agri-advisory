import { useEffect, useState } from "react";
import api from "../services/api";

function CropSelector() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");

  useEffect(() => {
    async function fetchCrops() {
      const res = await api.get("/farm/crops");

      setCrops(res.data);
    }

    fetchCrops();
  }, []);

  return (
    <div>
      <h3>Select Crop</h3>

      <select
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
      >
        <option value="">Select crop</option>

        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CropSelector;
