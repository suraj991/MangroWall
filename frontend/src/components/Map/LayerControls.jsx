import { LAYERS } from "../../data/constants";

export default function LayerControls({ theme, activeLayer, onLayerChange }) {
  return (
    <div style={{
      display: "flex",
      gap: 6,
      background: theme.surface + "ee",
      backdropFilter: "blur(12px)",
      borderRadius: 12,
      padding: 5,
      border: `1px solid ${theme.border}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    }}>
      {LAYERS.map(layer => (
        <button
          key={layer.id}
          onClick={() => onLayerChange(layer.id)}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            background: activeLayer === layer.id ? theme.accent : "transparent",
            color: activeLayer === layer.id ? "#fff" : theme.textMuted,
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "inherit",
          }}
        >
          <span style={{ fontSize: 14 }}>{layer.icon}</span>
          {layer.label}
        </button>
      ))}
    </div>
  );
}
