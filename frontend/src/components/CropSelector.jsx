import { useEffect, useState } from "react";
import api from "../services/api";

function CropSelector() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCrops() {
      const res = await api.get("/farm/crops");

      setCrops(res.data);
    }

    fetchCrops();
  }, []);

  const handleCropChange = async (event) => {
    const cropId = event.target.value;

    setSelectedCrop(cropId);

    if (!cropId) {
      return;
    }

    try {
      setSaving(true);
      await api.post("/farm/select-crop", { cropId });
    } catch (error) {
      console.error(error);
      alert("Failed to save crop selection");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3>Select Crop</h3>

      <select
        value={selectedCrop}
        onChange={handleCropChange}
        disabled={saving}
      >
        <option value="">Select crop</option>

        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>

      {saving && <p>Saving crop selection...</p>}
    </div>
  );
}

export default CropSelector;
