export default function BarChart({ theme, scenario, scenarioData }) {
  if (!scenarioData) return null;
  const sc = scenarioData[scenario];

  const bars = [
    { label: "2015", value: 1358 },
    { label: "2018", value: 1180 },
    { label: "2020", value: 1250 },
    { label: "2022", value: 1520 },
    { label: "2024", value: 1894 },
    { label: sc.label, value: sc.mangroveArea, highlight: true },
  ];

  const max = Math.max(...bars.map(b => b.value));
  const min = 900;
  const range = max - min;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: "100%", paddingTop: 8 }}>
      {bars.map((bar, i) => {
        const pct = ((bar.value - min) / range) * 100;
        const color = bar.highlight ? theme.blue : theme.accent;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
            <div style={{ fontSize: 9, color: theme.textDim, fontFamily: "'JetBrains Mono', monospace" }}>
              {bar.value.toLocaleString()}
            </div>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${pct}%`,
                background: bar.highlight
                  ? `linear-gradient(to top, ${theme.blue}, ${theme.blue}99)`
                  : `linear-gradient(to top, ${theme.accent}, ${theme.accent}88)`,
                borderRadius: "4px 4px 0 0",
                transition: "height 0.6s cubic-bezier(.4,0,.2,1)",
                minHeight: 4,
              }} />
            </div>
            <div style={{ fontSize: 9, color: bar.highlight ? theme.accent : theme.textDim, fontWeight: bar.highlight ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>
              {bar.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
