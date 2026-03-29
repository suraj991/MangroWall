export default function InsightsTab({ theme }) {
  const insights = [
    { num: "01", title: "Ecosystem Instability", text: "Mangrove coverage declined sharply after 2015, reaching a low around 2017, followed by partial recovery — indicating instability under environmental and human pressures.", color: theme.warning, icon: "⚡" },
    { num: "02", title: "Urban–Flood Collision", text: "Urban area doubled to 496 km² while 115 km² of new development sits in flood-prone zones, amplifying exposure.", color: theme.danger, icon: "🏙️" },
    { num: "03", title: "Protection Gap", text: "45% of the coastline lacks mangrove protection, exposing communities to tidal and river flooding without natural buffer.", color: theme.blue, icon: "🛡️" },
    { num: "04", title: "Restoration Impact", text: "Restoring to 2015 extent reduces critical-risk population by 22% — moving ~88K people to lower risk categories.", color: theme.accent, icon: "🌱" },
    { num: "05", title: "Population at Risk", text: "Over 4.1 million people live in a region highly exposed to coastal and riverine flooding along the Guayas delta.", color: theme.critical, icon: "👥" },
  ];

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {insights.map((d) => (
        <div key={d.num} style={{
          background: theme.surfaceAlt,
          borderRadius: 12,
          padding: "14px 16px",
          border: `1px solid ${theme.border}`,
          borderLeft: `3px solid ${d.color}`,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}>
          <div style={{ fontSize: 22, flexShrink: 0 }}>{d.icon}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{d.title}</div>
            <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.6 }}>{d.text}</div>
          </div>
        </div>
      ))}

      {/* Key takeaway */}
      <div style={{
        marginTop: 8,
        background: `linear-gradient(135deg, ${theme.accent}15, ${theme.surfaceAlt})`,
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${theme.accent}44`,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 10,
          color: theme.accent,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 10,
        }}>
          Key Takeaway
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.6, color: theme.text }}>
          "A rapidly urbanizing, low-lying coastal region with unstable mangrove ecosystems creates increasing flood risk for millions of people."
        </div>
      </div>
    </div>
  );
}
