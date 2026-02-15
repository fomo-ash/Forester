import axios from "axios";

export const generateMissionBrief = async (region, riskData) => {
  const prompt = `
You are an environmental intelligence analyst.

Region: ${region}
Risk Score: ${riskData.riskScore}%
Forest Loss: ${riskData.forestLoss}%
Predicted 30-Day Loss: ${riskData.predictedLoss}%
Classification: ${riskData.classification}

Generate a professional mission brief.
Include:
- Executive Summary
- Risk Interpretation
- Recommended Immediate Action
- Field Deployment Suggestions
`;

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3",
      prompt,
      stream: false
    }
  );

  return response.data.response;
};
