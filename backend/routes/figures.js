const express = require("express");
const router = express.Router();
const figures = require("../data/figures.json");

router.get("/", (req, res) => {
  const { category } = req.query;
  const result = category
    ? figures.filter(f => f.category === category)
    : figures;
  res.json(result);
});

router.get("/categories", (_req, res) => {
  const cats = [...new Set(figures.map(f => f.category))];
  res.json(cats);
});

router.get("/:id", (req, res) => {
  const figure = figures.find(f => f.id === req.params.id);
  if (!figure) return res.status(404).json({ error: "Figure not found" });
  res.json(figure);
});

module.exports = router;
