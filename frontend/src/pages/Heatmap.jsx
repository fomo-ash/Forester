import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* -------- GLOBAL DATA -------- */

const GLOBAL_FOREST_DATA = [
  {
    name: "Amazon Basin",
    position: [-3.5, -62],
    risk: 82,
    loss: 18.4,
    pastLoss: 14.2,
    prediction: 12.2,
    description:
      "Largest tropical rainforest on Earth. Facing accelerated deforestation due to cattle ranching, mining, and infrastructure expansion.",
    drivers: "Illegal logging, agricultural expansion, mining",
  },
  {
    name: "Congo Rainforest",
    position: [-1.5, 23.6],
    risk: 64,
    loss: 10.1,
    pastLoss: 8.4,
    prediction: 6.3,
    description:
      "Second-largest rainforest globally. Critical carbon sink under increasing threat from logging and fuelwood extraction.",
    drivers: "Timber extraction, charcoal production",
  },
  {
    name: "Western Ghats",
    position: [15.5, 74.0],
    risk: 52,
    loss: 7.1,
    pastLoss: 5.9,
    prediction: 6.5,
    description:
      "Biodiversity hotspot in India. Experiencing gradual forest fragmentation due to urban encroachment.",
    drivers: "Urbanization, road construction",
  },
  {
    name: "Sundarbans",
    position: [21.95, 88.75],
    risk: 48,
    loss: 13.1,
    pastLoss: 11.3,
    prediction: 4.9,
    description:
      "World’s largest mangrove forest. Vulnerable to sea-level rise and cyclonic activity.",
    drivers: "Climate change, coastal erosion",
  },
  {
    name: "Borneo Forest",
    position: [0.5, 114],
    risk: 71,
    loss: 14.8,
    pastLoss: 12.2,
    prediction: 9.2,
    description:
      "Critical habitat for endangered species. Rapid palm oil expansion is driving canopy loss.",
    drivers: "Palm oil plantations, illegal logging",
  },
  {
    name: "New Guinea Rainforest",
    position: [-6, 145],
    risk: 59,
    loss: 9.7,
    pastLoss: 7.8,
    prediction: 5.4,
    description:
      "Highly biodiverse rainforest facing early-stage industrial logging pressures.",
    drivers: "Timber concessions, mining",
  },
  {
    name: "Taiga (Siberia)",
    position: [60, 105],
    risk: 55,
    loss: 6.4,
    pastLoss: 5.1,
    prediction: 4.2,
    description:
      "Largest boreal forest ecosystem. Increasing wildfire frequency due to rising temperatures.",
    drivers: "Wildfires, permafrost thaw",
  },
  {
    name: "Madagascar Forest",
    position: [-19, 47],
    risk: 69,
    loss: 15.2,
    pastLoss: 13.4,
    prediction: 7.8,
    description:
      "Unique endemic biodiversity under severe agricultural and charcoal production pressure.",
    drivers: "Slash-and-burn farming",
  },
];

/* -------- COLOR LOGIC -------- */

const getColor = (risk) => {
  if (risk >= 75) return "#ff1a1a";
  if (risk >= 50) return "#ff9900";
  return "#00cc66";
};

function GlobalMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="min-h-screen text-white pt-24 px-10 pb-20 bg-[#1c1c1c]">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          Global Forest Risk Intelligence Map
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* MAP */}
          <div className="md:col-span-2 h-[600px] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <MapContainer
              center={[15, 10]}
              zoom={2}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />

              {GLOBAL_FOREST_DATA.map((region, index) => (
                <CircleMarker
                  key={index}
                  center={region.position}
                  radius={region.risk / 6}
                  pathOptions={{
                    color: getColor(region.risk),
                    fillColor: getColor(region.risk),
                    fillOpacity: 0.8,
                  }}
                  eventHandlers={{
                    click: () => setSelectedRegion(region),
                  }}
                />
              ))}
            </MapContainer>
          </div>

          {/* INTELLIGENCE PANEL */}
          <div className="bg-[#222] rounded-xl shadow-xl p-6">

            {!selectedRegion ? (
              <p className="text-gray-400">
                Select a forest ecosystem to view AI-driven comparative analysis.
              </p>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-3">
                  {selectedRegion.name}
                </h3>

                {/* Risk Badge */}
                <div
                  className="text-lg font-bold mb-4"
                  style={{ color: getColor(selectedRegion.risk) }}
                >
                  {selectedRegion.risk >= 75
                    ? "CRITICAL RISK"
                    : selectedRegion.risk >= 50
                    ? "MODERATE RISK"
                    : "LOW RISK"}{" "}
                  ({selectedRegion.risk}%)
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <b>Current Forest Loss:</b> {selectedRegion.loss}%
                  </p>
                  <p>
                    <b>Forest Loss (2 Years Ago):</b> {selectedRegion.pastLoss}%
                  </p>
                  <p>
                    <b>30-Day Forecast:</b> {selectedRegion.prediction}%
                  </p>
                  <p>
                    <b>Primary Drivers:</b> {selectedRegion.drivers}
                  </p>
                </div>

                {/* AI Summary */}
                <div className="mt-6 p-4 bg-[#2b2b2b] rounded-lg text-sm text-gray-300">
                  <b>AI Comparative Analysis:</b>
                  <p className="mt-2">
                    Forest degradation has{" "}
                    {selectedRegion.loss > selectedRegion.pastLoss
                      ? "increased compared to two years ago, indicating escalating anthropogenic and climatic pressure."
                      : "stabilized compared to historical levels, reflecting improved mitigation efforts."}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  {selectedRegion.description}
                </div>
              </>
            )}
          </div>

        </div>

        {/* LEGEND */}
        <div className="mt-8 flex gap-8 text-sm">
          <Legend color="#ff1a1a" label="Critical Risk" />
          <Legend color="#ff9900" label="Moderate Risk" />
          <Legend color="#00cc66" label="Low Risk" />
        </div>

      </div>
    </div>
  );
}

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-4 h-4 rounded-full"
      style={{ backgroundColor: color }}
    ></div>
    <span>{label}</span>
  </div>
);

export default GlobalMap;
