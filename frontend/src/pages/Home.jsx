import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-white">

      {/* HERO + FEATURES WRAPPER WITH SAME BG */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/Foresterbg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-10">

          {/* HERO SECTION */}
          <div className="h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Proactive Forest Intelligence Platform
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Leveraging Multi Modal Satellite Intelligence and AI driven
              Predictive Modeling to Detect and Prevent Deforestation
              Before Irreversible Ecological Damage Occurs.
            </p>

            <button
              onClick={() => navigate("/analyze")}
              className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-lg transition"
            >
              Start Monitoring
            </button>
          </div>

          {/* FEATURES SECTION */}
          <section className="py-24 px-10">
            <h2 className="text-4xl font-bold text-center mb-16">
              Platform Capabilities
            </h2>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

              <Feature
                title="365-Day Monitoring"
                desc="SAR (Sentinel-1) radar integration ensures monitoring even during monsoon cloud cover."
              />

              <Feature
                title="Multi-Modal Fusion"
                desc="Combines SAR + Optical (Sentinel-2) for structural forest change detection."
              />

              <Feature
                title="Spatio-Temporal Prediction"
                desc="ConvLSTM-based modeling predicts 30–60 day deforestation risk zones."
              />

              <Feature
                title="AI Mission Briefs"
                desc="LLaMA-powered reports convert geospatial data into actionable field intelligence."
              />

              <Feature
                title="Low Bandwidth Deployment"
                desc="Socket-based communication allows use in remote forest zones with limited connectivity."
              />

              <Feature
                title="Micro-Region Risk Mapping"
                desc="Heatmap visualization highlights high-risk micro zones for rapid intervention."
              />

            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

const Feature = ({ title, desc }) => (
  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition shadow-xl border border-white/20">
    <h3 className="text-xl font-semibold text-green-400 mb-3">
      {title}
    </h3>
    <p className="text-gray-200 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

export default Home;
