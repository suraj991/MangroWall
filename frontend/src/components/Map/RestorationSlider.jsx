import { SLIDER_LABELS } from "../../data/constants";
import { formatPop } from "../../utils/riskUtils";

export default function RestorationSlider({ theme, scenario, scenarioData, onScenarioChange }) {
  if (!scenarioData) return null;
  const sc = scenarioData[scenario];

  return (
    <div style={{
      position: "absolute",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      background: theme.surface + "ee",
      backdropFilter: "blur(12px)",
      borderRadius: 16,
      padding: "18px 28px",
      border: `1px solid ${theme.border}`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      minWidth: 420,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>
          🌱 Restoration Scenario
        </div>
        <div style={{
          fontSize: 12,
          fontWeight: 700,
          color: theme.accent,
          background: theme.accent + "18",
          padding: "4px 12px",
          borderRadius: 20,
        }}>
          {sc.label}
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="2"
        step="1"
        value={scenario}
        onChange={e => onScenarioChange(parseInt(e.target.value))}
        style={{
          width: "100%",
          marginBottom: 8,
          background: `linear-gradient(to right, ${theme.accent} ${scenario * 50}%, ${theme.border} ${scenario * 50}%)`,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        {SLIDER_LABELS.map((label, i) => (
          <span
            key={i}
            onClick={() => onScenarioChange(i)}
            style={{
              fontSize: 10,
              color: scenario === i ? theme.accent : theme.textDim,
              fontWeight: scenario === i ? 700 : 500,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Quick impact strip */}
      <div style={{ display: "flex", gap: 16, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
        {[
          { label: "Protected", val: `${sc.protected}%`, color: theme.accent },
          { label: "Critical Pop", val: `${sc.popRisk.Critical}K`, color: theme.critical },
          { label: "Est. Damage", val: `$${sc.economicLoss}B`, color: theme.danger },
        ].map((d, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1 }}>
            <div style={{
              fontSize: 18,
              fontWeight: 800,
              color: d.color,
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.3s",
            }}>
              {d.val}
            </div>
            <div style={{ fontSize: 10, color: theme.textDim }}>{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
