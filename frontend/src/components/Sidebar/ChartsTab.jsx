import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";

export default function ChartsTab({ theme, scenario, scenarioData }) {
  if (!scenarioData) return null;
  const sc = scenarioData[scenario];
  const current = scenarioData[0];

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Bar chart */}
      <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>📊 Mangrove Area by Year</div>
        <div style={{ height: 200, position: "relative" }}>
          <BarChart theme={theme} scenario={scenario} scenarioData={scenarioData} />
        </div>
      </div>

      {/* Doughnut */}
      <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>🍩 Population by Risk Category</div>
        <div style={{ height: 220, position: "relative" }}>
          <DoughnutChart theme={theme} scenario={scenario} scenarioData={scenarioData} />
        </div>
      </div>

      {/* Before / after */}
      <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>🔄 Before / After Restoration</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            {
              label: "Current",
              color: theme.textDim,
              items: [
                { k: "Protected", v: `${current.protected}%`, c: theme.warning },
                { k: "High+Critical", v: `${current.popRisk.High + current.popRisk.Critical}K`, c: theme.danger },
                { k: "Est. Damage", v: `$${current.economicLoss}B`, c: theme.danger },
              ],
            },
            {
              label: sc.label,
              color: theme.accent,
              items: [
                { k: "Protected", v: `${sc.protected}%`, c: theme.accent },
                { k: "High+Critical", v: `${sc.popRisk.High + sc.popRisk.Critical}K`, c: theme.accent },
                { k: "Est. Damage", v: `$${sc.economicLoss}B`, c: theme.accent },
              ],
            },
          ].map((col, ci) => (
            <div key={ci} style={{ background: theme.bg, borderRadius: 10, padding: 12 }}>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: col.color,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                {col.label}
              </div>
              {col.items.map((item, ii) => (
                <div key={ii} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: theme.textDim }}>{item.k}</div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: item.c,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
