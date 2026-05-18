import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSeedling } from "react-icons/fa6";
import api from "../services/api";

function CropSelector() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function fetchCrops() {
      try {
        const res = await api.get("/farm/crops");
        if (mounted) setCrops(res.data || []);
      } catch (e) {
        console.error(e);
      }
    }

    fetchCrops();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSelect = async (crop) => {
    if (!crop) return;

    setSelectedCrop(crop.id);
    setOpen(false);

    try {
      setSaving(true);
      await api.post("/farm/select-crop", { cropId: crop.id });
    } catch (error) {
      console.error(error);
      alert("Failed to save crop selection");
    } finally {
      setSaving(false);
    }
  };

  const label = crops.find((c) => c.id === selectedCrop)?.name || "Select crop";

  return (
    <div className="crop-selector" style={{ width: "100%" }}>
      <h3>Select Crop</h3>

      <button
        type="button"
        ref={triggerRef}
        className="apple-liquid-glass crop-selector__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        disabled={saving}
      >
        <FaSeedling className="icon" aria-hidden />
        <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
        <FaChevronDown className="icon" aria-hidden />
      </button>

      {open && (
        <ul
          ref={menuRef}
          role="listbox"
          className="apple-liquid-glass crop-selector__menu"
          style={{ marginTop: 8 }}
        >
          {crops.map((crop) => (
            <li
              key={crop.id}
              role="option"
              aria-selected={selectedCrop === crop.id}
              tabIndex={0}
              className={`crop-selector__item ${selectedCrop === crop.id ? "is-selected" : ""}`}
              onClick={() => handleSelect(crop)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(crop);
              }}
            >
              {crop.name}
            </li>
          ))}
        </ul>
      )}

      {saving && <p>Saving crop selection...</p>}
    </div>
  );
}

export default CropSelector;
