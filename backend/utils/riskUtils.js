export const calculateRiskMetrics = (zones) => {
  const avgIntensity =
    zones.reduce((sum, z) => sum + z.intensity, 0) / zones.length;

  const riskScore = Math.floor(avgIntensity * 100);

  const forestLoss = (Math.random() * 15 + 5).toFixed(2);
  const predictedLoss = (Math.random() * 5 + 2).toFixed(2);
  const confidence = Math.floor(Math.random() * 10) + 90;

  let classification = "LOW";
  if (riskScore > 85) classification = "CRITICAL";
  else if (riskScore > 70) classification = "HIGH";
  else if (riskScore > 50) classification = "MODERATE";

  return {
    riskScore,
    forestLoss,
    predictedLoss,
    confidence,
    classification
  };
};
