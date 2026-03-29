import { RISK_COLORS } from "../data/constants";

export function getMarkerRadius(zone, activeLayer, scenario) {
  const currentRisk = scenario > 0 ? zone.restored : zone.risk;
  switch (activeLayer) {
    case "population":
      return Math.max(Math.sqrt(zone.pop) / 12, 6);
    case "risk":
      return currentRisk === "Critical" ? 18
        : currentRisk === "High" ? 14
        : currentRisk === "Moderate" ? 10
        : 7;
    case "mangrove2015":
      return Math.max(Math.sqrt(zone.mangrove2015) * 1.8, 6);
    case "mangrove2024":
      return Math.max(Math.sqrt(zone.mangrove2024) * 1.8, 6);
    case "change":
      return Math.max(Math.abs(zone.mangrove2024 - zone.mangrove2015) * 1.2, 6);
    default:
      return 10;
  }
}

export function getMarkerColor(zone, activeLayer, scenario) {
  const currentRisk = scenario > 0 ? zone.restored : zone.risk;
  if (activeLayer === "mangrove2015" || activeLayer === "mangrove2024") {
    return "#22d68a";
  }
  if (activeLayer === "change") {
    return zone.mangrove2024 >= zone.mangrove2015 ? "#22d68a" : "#f04e5e";
  }
  return RISK_COLORS[currentRisk];
}

export function buildPopupHtml(zone, scenario) {
  const currentRisk = scenario > 0 ? zone.restored : zone.risk;
  const change = zone.mangrove2024 - zone.mangrove2015;
  const changeColor = change >= 0 ? "#0fa968" : "#dc3545";
  return `
    <div style="font-family:'DM Sans',sans-serif;min-width:210px;padding:14px 16px">
      <div style="font-weight:800;font-size:15px;margin-bottom:10px;color:#1a2340">${zone.name}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 14px;font-size:12px">
        <span style="color:#666">Risk Level</span>
        <span style="font-weight:700;color:${RISK_COLORS[currentRisk]}">${currentRisk}</span>
        <span style="color:#666">Population</span>
        <span style="font-weight:700">${(zone.pop / 1000).toFixed(0)}K</span>
        <span style="color:#666">NDVI Health</span>
        <span style="font-weight:700;color:${zone.ndvi > 0.5 ? "#0fa968" : zone.ndvi > 0.3 ? "#e09200" : "#dc3545"}">${zone.ndvi.toFixed(2)}</span>
        <span style="color:#666">Area</span>
        <span style="font-weight:700">${zone.area} km²</span>
        <span style="color:#666">Mangrove 2015</span>
        <span style="font-weight:700">${zone.mangrove2015} km²</span>
        <span style="color:#666">Mangrove 2024</span>
        <span style="font-weight:700">${zone.mangrove2024} km²</span>
        <span style="color:#666">Change</span>
        <span style="font-weight:700;color:${changeColor}">${change >= 0 ? "+" : ""}${change} km²</span>
      </div>
    </div>
  `;
}

export function formatPop(val) {
  return val >= 1000 ? `${(val / 1000).toFixed(1)}M` : `~${val}K`;
}
