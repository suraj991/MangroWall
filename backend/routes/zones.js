const express = require("express");
const router = express.Router();
const zones = require("../data/zones.json");

router.get("/", (_req, res) => {
  res.json(zones);
});

router.get("/:id", (req, res) => {
  const zone = zones.find(z => z.id === parseInt(req.params.id));
  if (!zone) return res.status(404).json({ error: "Zone not found" });
  res.json(zone);
});

module.exports = router;
