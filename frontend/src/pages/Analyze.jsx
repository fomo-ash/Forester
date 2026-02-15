import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import jsPDF from "jspdf";

/* ---------- REGION CONFIG ---------- */

const REGION_CONFIG = {
  "Western Ghats": { center: [15.5, 74.0], zoom: 7 },
  "Sundarbans": { center: [21.95, 88.75], zoom: 9 },
  "Arunachal Pradesh": { center: [28.2, 94.7], zoom: 7 },
  "Assam Forest Belt": { center: [26.3, 92.9], zoom: 8 }
};

function Analyze() {
  const [region, setRegion] = useState("Western Ghats");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const heatLayerRef = useRef(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/analysis/run",
        { region }
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  /* ---------- HEATMAP EFFECT ---------- */

  useEffect(() => {
    if (data && mapRef.current) {
      mapRef.current.setView(
        REGION_CONFIG[region].center,
        REGION_CONFIG[region].zoom
      );

      if (heatLayerRef.current) {
        mapRef.current.removeLayer(heatLayerRef.current);
      }

      const heatPoints = data.zones.map((z) => [
        z.lat,
        z.lng,
        Math.min(z.intensity * 120, 1)
      ]);

      heatLayerRef.current = L.heatLayer(heatPoints, {
        radius: 35,
        blur: 25,
        minOpacity: 0.4,
        gradient: {
          0.2: "#00ff88",
          0.5: "#ffcc00",
          0.8: "#ff3300"
        }
      });

      heatLayerRef.current.addTo(mapRef.current);
    }
  }, [data, region]);

  /* ---------- CLEAN & PROFESSIONAL PDF ---------- */

  const downloadPDF = () => {
    if (!data) return;

    const doc = new jsPDF();

    const cleanReport = data.report
      ?.replace(/\*\*/g, "")
      ?.replace(/\*/g, "")
      ?.replace(/#/g, "");

    const currentForestCover = 100 - data.forestLoss;
    const projectedForestCover = (
      currentForestCover - data.predictedLoss
    ).toFixed(2);

    doc.setFontSize(18);
    doc.text("Forest Intelligence Mission Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Region: ${data.region}`, 20, 35);
    doc.text(`Generated On: ${data.timestamp}`, 20, 43);

    doc.text(`Risk Score: ${data.riskScore}%`, 20, 55);
    doc.text(`Classification: ${data.classification}`, 20, 63);
    doc.text(`Current Forest Loss: ${data.forestLoss}%`, 20, 71);
    doc.text(`30-Day Predicted Loss: ${data.predictedLoss}%`, 20, 79);
    doc.text(`Confidence Level: ${data.confidence}%`, 20, 87);

    doc.setFontSize(14);
    doc.text("Projected Forest Cover (30-Day Estimate):", 20, 100);

    doc.setFontSize(12);
    doc.text(
      `If current trends persist, forest cover is expected to decline from ${currentForestCover.toFixed(
        2
      )}% to approximately ${projectedForestCover}% within the next 30 days.`,
      20,
      110,
      { maxWidth: 170 }
    );

    doc.setFontSize(14);
    doc.text("Environmental Intelligence Assessment:", 20, 130);

    doc.setFontSize(11);
    doc.text(cleanReport, 20, 140, { maxWidth: 170 });

    doc.save(`${data.region}_Forest_Intelligence_Report.pdf`);
  };

  return (
    <div
      className="min-h-screen text-white pt-28 px-10 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/Analyze.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/90"></div>

      <div className="relative z-10 pb-20">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">
            Regional Intelligence Dashboard
          </h2>

          <div className="flex gap-4">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-gray-800 px-4 py-2 rounded"
            >
              <option>Western Ghats</option>
              <option>Sundarbans</option>
              <option>Arunachal Pradesh</option>
              <option>Assam Forest Belt</option>
            </select>

            <button
              onClick={runAnalysis}
              className="bg-green-600 px-6 py-2 rounded hover:bg-green-500 transition"
            >
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        {data && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <Card title="Risk Score" value={`${data.riskScore}%`} />
              <Card title="Forest Loss" value={`${data.forestLoss}%`} />
              <Card title="30-Day Prediction" value={`${data.predictedLoss}%`} />
              <Card title="Confidence" value={`${data.confidence}%`} />
            </div>

            {/* Download Section */}
            <div className="bg-gray-900/80 p-6 rounded-xl shadow-xl mb-10 backdrop-blur-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  Intelligence Report Ready
                </h3>
                <p className="text-sm text-gray-400">
                  Detailed environmental assessment and projected forest trends available.
                </p>
              </div>

              <button
                onClick={downloadPDF}
                className="bg-green-600 px-6 py-3 rounded hover:bg-green-500 transition font-medium"
              >
                Download Intelligence PDF
              </button>
            </div>
          </>
        )}

        {/* Heatmap */}
        {data && (
          <div className="h-[450px] rounded-xl overflow-hidden shadow-2xl bg-gray-900">
            <MapContainer
              center={REGION_CONFIG[region].center}
              zoom={REGION_CONFIG[region].zoom}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
          </div>
        )}

      </div>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-gray-900/80 p-6 rounded-xl shadow-lg backdrop-blur-md">
    <h4 className="text-gray-400 text-sm mb-2">{title}</h4>
    <h2 className="text-2xl font-bold text-green-400">{value}</h2>
  </div>
);

export default Analyze;
