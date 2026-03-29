export const RISK_COLORS = {
  Low: "#22d68a",
  Moderate: "#f5a623",
  High: "#f04e5e",
  Critical: "#a366f5",
};

export const LAYERS = [
  { id: "risk", label: "Risk Zones", icon: "⚠️" },
  { id: "mangrove2015", label: "Mangrove 2015", icon: "🌿" },
  { id: "mangrove2024", label: "Mangrove 2024", icon: "🌱" },
  { id: "change", label: "Change", icon: "📊" },
  { id: "population", label: "Population", icon: "👥" },
];

export const SLIDER_LABELS = ["Current", "Restore 2015", "Expand 20%"];

export const FIGURE_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "overview", label: "Overview" },
  { id: "change", label: "Change" },
  { id: "health", label: "Health" },
  { id: "risk", label: "Risk" },
  { id: "restoration", label: "Restoration" },
  { id: "urban", label: "Urban" },
];

// Image filenames → PDF page mapping (for user reference)
// To populate: extract each PDF page as PNG and save to backend/public/images/
export const FIGURE_PDF_MAP = {
  "study-area.png": "PDF page 1",
  "mangrove-overview.png": "PDF page 2",
  "change-detection.png": "PDF page 3",
  "mangrove-2015.png": "PDF page 4",
  "mangrove-2024.png": "PDF page 5",
  "loss-hotspots.png": "PDF page 6",
  "health-2024.png": "PDF page 7",
  "flood-risk.png": "PDF page 9",
  "protection-gap.png": "PDF page 10",
  "population-exposure.png": "PDF page 11",
  "mangrove-loss-vulnerability.png": "PDF page 14",
  "post-restoration-risk.png": "PDF page 15",
  "expansion-strategy.png": "PDF page 16",
  "risk-reduction.png": "PDF page 17",
  "urban-expansion.png": "PDF page 21",
  "mangrove-to-urban.png": "PDF page 22",
  "urban-flood-overlap.png": "PDF page 23",
  "urban-risk-zones.png": "PDF page 24",
  "timeseries-charts.png": "PDF page 28",
};
