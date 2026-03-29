import { RISK_COLORS } from "../../data/constants";

export default function DoughnutChart({ theme, scenario, scenarioData }) {
  if (!scenarioData) return null;
  const sc = scenarioData[scenario];

  const segments = [
    { label: "Low",      value: sc.popRisk.Low,      color: RISK_COLORS.Low },
    { label: "Moderate", value: sc.popRisk.Moderate,  color: RISK_COLORS.Moderate },
    { label: "High",     value: sc.popRisk.High,      color: RISK_COLORS.High },
    { label: "Critical", value: sc.popRisk.Critical,  color: RISK_COLORS.Critical },
  ];

  const total = segments.reduce((s, d) => s + d.value, 0);

  // Build SVG arc paths
  const cx = 80, cy = 80, r = 60, innerR = 38;
  let currentAngle = -Math.PI / 2;

  function polarToCart(angle, radius) {
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  }

  function buildArc(startAngle, endAngle, outerR, innerR) {
    const [x1, y1] = polarToCart(startAngle, outerR);
    const [x2, y2] = polarToCart(endAngle, outerR);
    const [x3, y3] = polarToCart(endAngle, innerR);
    const [x4, y4] = polarToCart(startAngle, innerR);
    const large = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`;
  }

  const arcs = segments.map(seg => {
    const sweep = (seg.value / total) * 2 * Math.PI;
    const start = currentAngle;
    const end = currentAngle + sweep;
    currentAngle = end;
    return { ...seg, path: buildArc(start, end, r, innerR) };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, height: "100%" }}>
      {/* SVG donut */}
      <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
        {arcs.map((arc, i) => (
          <path key={i} d={arc.path} fill={arc.color} opacity={0.9} />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill={theme.text} fontSize="13" fontWeight="800" fontFamily="'JetBrains Mono', monospace">
          {(total / 1000).toFixed(1)}M
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill={theme.textDim} fontSize="8">
          total
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {arcs.map((seg, i) => {
          const pct = ((seg.value / total) * 100).toFixed(1);
          return (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: theme.textMuted }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: seg.color, display: "inline-block", flexShrink: 0 }} />
                  {seg.label}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>
                  {seg.value >= 1000 ? `${(seg.value / 1000).toFixed(1)}M` : `${seg.value}K`}
                </span>
              </div>
              <div style={{ height: 4, background: theme.bg, borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: seg.color,
                  borderRadius: 2,
                  transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
