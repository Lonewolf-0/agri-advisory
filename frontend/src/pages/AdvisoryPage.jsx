import { useState } from "react";
import { FaFileCsv, FaFilePdf, FaWandMagicSparkles } from "react-icons/fa6";
import api from "../services/api";
import { showLoader, hideLoader } from "../utils/loader";
import Papa from "papaparse";
import jsPDF from "jspdf";
import { useToast } from "../components/ToastProvider";

function AdvisoryPage({ lat, lon }) {
  const [forecast, setForecast] = useState([]);
  const { toast } = useToast();

  const getAdvisory = async () => {
    if (!lat || !lon) {
      toast("Please select a farm location", { type: "error" });
      return;
    }

    showLoader();
    try {
      const res = await api.get(`/advisory?lat=${lat}&lon=${lon}`);

      setForecast(res.data.forecast);
    } catch (err) {
      console.error(err);
      toast("Failed to fetch advisory", { type: "error" });
    } finally {
      hideLoader();
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Farm Weather & Advisory Report", 10, 10);

    let y = 20;

    forecast.forEach((day) => {
      doc.text(`Date: ${new Date(day.date).toDateString()}`, 10, y);
      y += 6;

      doc.text(`Temperature: ${day.weather.temperature} °C`, 10, y);
      y += 6;

      doc.text(`Humidity: ${day.weather.humidity}%`, 10, y);
      y += 6;

      doc.text(`Wind Speed: ${day.weather.windSpeed}`, 10, y);
      y += 6;

      doc.text(`Rain Probability: ${day.weather.rainProbability}%`, 10, y);
      y += 6;

      doc.text("Advisory:", 10, y);
      y += 6;

      day.advisory.forEach((a) => {
        doc.text(`- ${a}`, 10, y);
        y += 6;
      });

      y += 6;
    });

    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, y + 10);

    doc.save("farm-advisory-report.pdf");
  };

  const exportCSV = () => {
    const rows = [];

    forecast.forEach((day) => {
      day.advisory.forEach((advice) => {
        rows.push({
          date: new Date(day.date).toDateString(),
          temperature: day.weather.temperature,
          humidity: day.weather.humidity,
          windSpeed: day.weather.windSpeed,
          rainProbability: day.weather.rainProbability,
          advisory: advice,
          generatedAt: new Date().toLocaleString(),
        });
      });
    });

    const csv = Papa.unparse(rows);

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "farm-advisory-report.csv";
    a.click();
  };

  return (
    <div className="advisory-stack">
      <h3>5 Day Farm Advisory</h3>

      <button
        className="apple-liquid-glass advisory__button advisory__button--primary"
        onClick={getAdvisory}
      >
        <FaWandMagicSparkles className="icon" aria-hidden />
        Generate Advisory
      </button>
      {forecast.length > 0 && (
        <>
          <button
            className="apple-liquid-glass advisory__button"
            onClick={exportPDF}
          >
            <FaFilePdf className="icon" aria-hidden />
            Export PDF
          </button>
          <button
            className="apple-liquid-glass advisory__button"
            onClick={exportCSV}
          >
            <FaFileCsv className="icon" aria-hidden />
            Export CSV
          </button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        {forecast.map((day, index) => (
          <div key={index} className="apple-liquid-glass advisory-card">
            <h4>{new Date(day.date).toDateString()}</h4>

            <p>Temperature: {day.weather.temperature} °C</p>
            <p>Humidity: {day.weather.humidity} %</p>
            <p>Wind Speed: {day.weather.windSpeed} m/s</p>
            <p>Rain Probability: {day.weather.rainProbability}%</p>

            <strong>Advisory:</strong>

            <ul>
              {day.advisory.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvisoryPage;
