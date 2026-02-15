import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import advisoryRoutes from "./routes/advisoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/advisory", advisoryRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
