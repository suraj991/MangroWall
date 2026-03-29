const express = require("express");
const router = express.Router();
const scenarios = require("../data/scenarios.json");

router.get("/", (_req, res) => {
  res.json(scenarios);
});

router.get("/:id", (req, res) => {
  const scenario = scenarios[req.params.id];
  if (!scenario) return res.status(404).json({ error: "Scenario not found" });
  res.json(scenario);
});

module.exports = router;
