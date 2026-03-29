import LeafletMap from "./LeafletMap";
import LayerControls from "./LayerControls";
import MapLegend from "./MapLegend";
import RestorationSlider from "./RestorationSlider";

const CATEGORY_COLORS = {
  overview: "#4a90f5",
  change: "#f5a623",
  health: "#22d68a",
  risk: "#f04e5e",
  restoration: "#22c55e",
  urban: "#a366f5",
};

function FigureViewer({ figure, theme, onClose }) {
  const catColor = CATEGORY_COLORS[figure.category] || theme.accent;

  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: theme.bg,
      animation: "fadeUp 0.25s ease-out",
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        background: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: theme.surfaceAlt,
              color: theme.text,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            ← Back to Map
          </button>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{figure.title}</div>
            <div style={{ fontSize: 11, color: theme.textDim, marginTop: 1 }}>PDF page {figure.pdfPage}</div>
          </div>
        </div>

        <div style={{
          background: catColor + "22",
          border: `1px solid ${catColor}55`,
          color: catColor,
          fontSize: 11,
          fontWeight: 700,
          padding: "5px 14px",
          borderRadius: 20,
          textTransform: "capitalize",
        }}>
          {figure.category}
        </div>
      </div>

      {/* Image */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        overflow: "auto",
      }}>
        <img
          src={`/images/${figure.filename}`}
          alt={figure.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: 12,
            boxShadow: "0 16px 64px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* Description bar */}
      <div style={{
        padding: "12px 24px",
        background: theme.surface,
        borderTop: `1px solid ${theme.border}`,
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.6, maxWidth: 800 }}>
          {figure.description}
        </div>
      </div>
    </div>
  );
}

export default function MapArea({
  theme,
  scenario,
  scenarioData,
  activeLayer,
  zones,
  onLayerChange,
  onScenarioChange,
  onZoneClick,
  activeFigure,
  onCloseFigure,
}) {
  if (activeFigure) {
    return (
      <FigureViewer
        figure={activeFigure}
        theme={theme}
        onClose={onCloseFigure}
      />
    );
  }

  return (
    <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
      {/* Top controls */}
      <div style={{
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        pointerEvents: "none",
      }}>
        <div style={{ pointerEvents: "all" }}>
          <LayerControls theme={theme} activeLayer={activeLayer} onLayerChange={onLayerChange} />
        </div>
        <div style={{ pointerEvents: "all" }}>
          <MapLegend theme={theme} activeLayer={activeLayer} />
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <LeafletMap
          theme={theme}
          scenario={scenario}
          activeLayer={activeLayer}
          zones={zones}
          onZoneClick={onZoneClick}
        />
      </div>

      {/* Bottom slider */}
      <RestorationSlider
        theme={theme}
        scenario={scenario}
        scenarioData={scenarioData}
        onScenarioChange={onScenarioChange}
      />
    </div>
  );
}
