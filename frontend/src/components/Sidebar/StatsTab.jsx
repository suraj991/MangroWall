import { formatPop } from "../../utils/riskUtils";
import { RISK_COLORS } from "../../data/constants";

export default function StatsTab({ theme, scenario, scenarioData }) {
  if (!scenarioData) return null;
  const sc = scenarioData[scenario];

  const kpis = [
    { icon: "🌿", val: "1,894", unit: "km²", label: "Mangrove 2024", color: theme.accent },
    { icon: "📉", val: "232", unit: "km²", label: "Area Lost", color: theme.danger },
    { icon: "📈", val: "766", unit: "km²", label: "Area Gained", color: "#22c55e" },
    { icon: "🛡️", val: `${sc.protected}%`, unit: "", label: "Coast Protected", color: theme.blue },
  ];

  const urbanItems = [
    { label: "Urban 2015", val: 243, max: 500, color: theme.warning + "77" },
    { label: "Urban 2024", val: 496, max: 500, color: theme.danger },
  ];

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {kpis.map((s, i) => (
          <div key={i} style={{
            background: theme.surfaceAlt,
            borderRadius: 12,
            padding: "14px 12px",
            border: `1px solid ${theme.border}`,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color }} />
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div style={{
              fontSize: 22,
              fontWeight: 800,
              color: s.color,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "-1px",
            }}>
              {s.val}<span style={{ fontSize: 12, fontWeight: 600 }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 11, color: theme.textDim, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Population by risk */}
      <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
          👥 Population by Risk Zone
          <span style={{ fontSize: 10, color: theme.textDim, fontWeight: 500 }}>({sc.label})</span>
        </div>
        {Object.entries(sc.popRisk).map(([level, val]) => (
          <div key={level} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: theme.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: RISK_COLORS[level], display: "inline-block" }} />
                {level}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>
                {formatPop(val)}
              </span>
            </div>
            <div style={{ height: 6, background: theme.bg, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                width: `${(val / 1100) * 100}%`,
                height: "100%",
                background: RISK_COLORS[level],
                borderRadius: 3,
                transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Economic impact */}
      <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>💰 Est. Annual Flood Damage</div>
        <div style={{
          fontSize: 32,
          fontWeight: 800,
          color: theme.danger,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "-1px",
        }}>
          ${sc.economicLoss}B
        </div>
        <div style={{ fontSize: 11, color: theme.textDim, marginTop: 2 }}>
          USD estimated (property × exposure × frequency)
        </div>
        {scenario > 0 && (
          <div style={{
            marginTop: 10,
            padding: "8px 12px",
            borderRadius: 8,
            background: theme.accent + "15",
            border: `1px solid ${theme.accent}33`,
            fontSize: 12,
            color: theme.accent,
            fontWeight: 600,
          }}>
            ✅ Savings vs current: ${(2.8 - sc.economicLoss).toFixed(1)}B/year
          </div>
        )}
      </div>

      {/* Urban growth */}
      <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>🏙️ Urban Expansion</div>
        {urbanItems.map((d, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: theme.textMuted }}>{d.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{d.val} km²</span>
            </div>
            <div style={{ height: 5, background: theme.bg, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${(d.val / d.max) * 100}%`, height: "100%", background: d.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {[
            { val: "115 km²", label: "New urban in flood zones", color: theme.danger },
            { val: "8.9 km²", label: "Mangrove → Urban", color: theme.warning },
          ].map((d, i) => (
            <div key={i} style={{
              flex: "1 1 120px",
              background: theme.bg,
              borderRadius: 8,
              padding: "8px 10px",
              border: `1px solid ${theme.border}`,
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: d.color, fontFamily: "'JetBrains Mono', monospace" }}>{d.val}</div>
              <div style={{ fontSize: 10, color: theme.textDim }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
