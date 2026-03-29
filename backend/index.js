const express = require("express");
const cors = require("cors");
const path = require("path");

const zonesRouter = require("./routes/zones");
const scenariosRouter = require("./routes/scenarios");
const figuresRouter = require("./routes/figures");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, "http://localhost:5173"]
  : ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Static image assets (extracted PDF figures)
app.use("/images", express.static(path.join(__dirname, "public/images")));

// API routes
app.use("/api/zones", zonesRouter);
app.use("/api/scenarios", scenariosRouter);
app.use("/api/figures", figuresRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "MangroWall API" }));

app.listen(PORT, () => {
  console.log(`MangroWall backend running on http://localhost:${PORT}`);
});
