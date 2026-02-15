import express from "express";

const router = express.Router();


const advisoryKnowledge = {
  fire: `
Forest Fire Risk Advisory:

1. Deploy rapid-response fire control teams.
2. Establish firebreaks in high-risk dry vegetation zones.
3. Use satellite thermal anomaly monitoring.
4. Coordinate with local communities for early smoke detection.
5. Restrict tourist and human activity in vulnerable sectors.
  `,

  illegal: `
Illegal Logging Intervention Strategy:

1. Increase patrol frequency in hotspot zones.
2. Install remote camera surveillance systems.
3. Engage local enforcement agencies for coordinated raids.
4. Strengthen supply chain traceability.
5. Introduce community-based forest guardianship programs.
  `,

  climate: `
Climate Adaptation Advisory:

1. Implement mangrove buffer restoration.
2. Monitor sea-level rise impact zones.
3. Strengthen biodiversity corridors.
4. Promote native species replantation programs.
5. Introduce long-term ecosystem resilience planning.
  `,

  default: `
General Forest Conservation Advisory:

1. Enhance satellite monitoring coverage.
2. Conduct quarterly environmental audits.
3. Strengthen local ranger training programs.
4. Deploy AI-based anomaly detection tools.
5. Increase collaboration with environmental NGOs.
  `
};

/* ---------- FAST RESPONSE ROUTE ---------- */

router.post("/chat", (req, res) => {
  const { message } = req.body;

  const lowerMessage = message.toLowerCase();

  let reply = advisoryKnowledge.default;

  if (lowerMessage.includes("fire")) reply = advisoryKnowledge.fire;
  else if (lowerMessage.includes("illegal")) reply = advisoryKnowledge.illegal;
  else if (lowerMessage.includes("climate")) reply = advisoryKnowledge.climate;

  res.json({ reply });
});

export default router;
