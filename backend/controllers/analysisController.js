import { generateHeatmapZones } from "../services/heatmapService.js";
import { calculateRiskMetrics } from "../utils/riskUtils.js";
import { generateMissionBrief } from "../services/aiService.js";

export const runAnalysis = async (req, res) => {
  try {
    const { region } = req.body;

    const zones = generateHeatmapZones();

    const riskData = calculateRiskMetrics(zones);

    const report = await generateMissionBrief(region, riskData);

    res.json({
      region,
      zones,
      ...riskData,
      report,
      timestamp: new Date().toLocaleString()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed" });
  }
};
