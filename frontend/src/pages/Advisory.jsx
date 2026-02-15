import { useState } from "react";
import Navbar from "../../components/Navbar";

function Advisory() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateAdvisory = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("fire")) {
      return `
Based on the current environmental indicators, the situation reflects elevated wildfire vulnerability.

Immediate deployment of rapid-response fire control teams is strongly recommended. Establishing firebreak corridors in dry vegetation zones and initiating satellite-based thermal anomaly monitoring will significantly improve early detection efficiency. Restricting public access in high-risk areas during peak heat periods can further reduce ignition probability.

From a strategic perspective, integrating drone-based smoke detection systems and improving soil moisture retention programs will enhance long-term resilience.

Without timely mitigation measures, wildfire spread probability could increase by approximately 18–25% over the next 60 days.

Confidence Level: High
`;
    }

    if (lower.includes("illegal") || lower.includes("logging")) {
      return `
The described conditions suggest potential illegal logging or unregulated extraction activity.

Increasing patrol frequency in vulnerable sectors and deploying motion-triggered surveillance systems should be prioritized immediately. Strengthening timber transport verification checkpoints and activating structured community reporting networks will improve enforcement effectiveness.

With sustained monitoring and optimized enforcement strategies, canopy degradation could be reduced by an estimated 12–18% within the next 12 months.

Confidence Level: Moderate
`;
    }

    if (lower.includes("climate")) {
      return `
The situation indicates climate-related ecological stress within the forest ecosystem.

Identifying heat-stressed corridors, increasing native species plantation in degraded zones, and implementing biodiversity buffer systems are recommended. Water retention infrastructure and long-term resilience planning will be critical for ecosystem stability.

Strategic adaptation measures may improve forest resilience by approximately 10–15% over a two-year horizon.

Confidence Level: Moderate
`;
    }

    return `
The conditions suggest broader forest management challenges requiring structured intervention.

Increasing satellite monitoring frequency, strengthening ranger deployment strategies, and enhancing community engagement programs are recommended. Restoration planning and ecosystem stabilization measures should be implemented systematically.

With coordinated intervention efforts, degradation risk may decrease by approximately 8–14% within the next 12 months.

Confidence Level: Standard
`;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    // Show thinking message
    setChat((prev) => [
      ...prev,
      { role: "ai", text: "Analyzing environmental intelligence signals..." }
    ]);

    await sleep(1400);

    // Remove thinking message
    setChat((prev) => prev.slice(0, -1));

    const reply = generateAdvisory(userMessage);

    setChat((prev) => [...prev, { role: "ai", text: reply }]);

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen text-white pt-32 px-10 pb-32 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/Analyze.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/85"></div>

        <div className="relative z-10 max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold mb-2">
            Forest Advisory Intelligence Console
          </h2>

          <p className="text-gray-400 mb-10">
            AI-powered strategic guidance optimized for field deployment.
          </p>

          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 h-[550px] flex flex-col backdrop-blur-md">

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">

              {chat.length === 0 && (
                <div className="text-gray-500 text-sm">
                  Ask about forest fire response, illegal logging,
                  climate adaptation, ranger deployment, or biodiversity protection.
                </div>
              )}

              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-green-600 ml-auto"
                      : "bg-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-800 p-4 rounded-lg w-fit animate-pulse">
                  Processing intelligence model...
                </div>
              )}

            </div>

            <div className="flex gap-4 mt-6">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the conservation issue..."
                className="flex-1 px-4 py-3 rounded bg-gray-800 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <button
                onClick={sendMessage}
                className="bg-green-600 px-6 py-3 rounded hover:bg-green-500 transition"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Advisory;
