import { RISK_COLORS } from "../../data/constants";

export default function MapLegend({ theme, activeLayer }) {
  return (
    <div style={{
      background: theme.surface + "ee",
      backdropFilter: "blur(12px)",
      borderRadius: 12,
      padding: "10px 14px",
      border: `1px solid ${theme.border}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    }}>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: theme.textDim,
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 1,
      }}>
        Legend
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {activeLayer === "risk" ? (
          Object.entries(RISK_COLORS).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: theme.textMuted }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: v, flexShrink: 0 }} />
              {k}
            </div>
          ))
        ) : activeLayer === "change" ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: theme.textMuted }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "#22d68a" }} /> Gain
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: theme.textMuted }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "#f04e5e" }} /> Loss
            </div>
          </>
        ) : (
          <div style={{ fontSize: 11, color: theme.textMuted }}>
            Size = {activeLayer === "population" ? "population" : "mangrove area"}
          </div>
        )}
      </div>
    </div>
  );
}
