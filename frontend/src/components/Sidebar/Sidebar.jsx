import { useState } from "react";
import StatsTab from "./StatsTab";
import ChartsTab from "./ChartsTab";
import InsightsTab from "./InsightsTab";
import FiguresTab from "./FiguresTab";

const TABS = [
  { id: "stats", label: "📊 Stats" },
  { id: "charts", label: "📈 Charts" },
  { id: "insights", label: "💡 Insights" },
  { id: "figures", label: "🗺️ Figures" },
];

export default function Sidebar({ theme, isDark, onToggleTheme, scenario, scenarioData, onFigureSelect }) {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <aside style={{
      width: 380,
      minWidth: 380,
      height: "100vh",
      overflowY: "auto",
      background: theme.surface,
      borderRight: `1px solid ${theme.border}`,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.blue})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}>
              🌿
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>
                Mangro<span style={{ color: theme.accent }}>Wall</span>
              </div>
              <div style={{ fontSize: 10, color: theme.textDim, marginTop: -2 }}>SpaceHack ASU 2026</div>
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              background: theme.surfaceAlt,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.text,
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex",
          gap: 4,
          background: theme.bg,
          borderRadius: 10,
          padding: 3,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 8,
                border: "none",
                fontSize: 11,
                fontWeight: 700,
                background: activeTab === tab.id ? theme.accent : "transparent",
                color: activeTab === tab.id ? "#fff" : theme.textMuted,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {activeTab === "stats" && (
          <StatsTab theme={theme} scenario={scenario} scenarioData={scenarioData} />
        )}
        {activeTab === "charts" && (
          <ChartsTab theme={theme} scenario={scenario} scenarioData={scenarioData} />
        )}
        {activeTab === "insights" && (
          <InsightsTab theme={theme} />
        )}
        {activeTab === "figures" && (
          <FiguresTab theme={theme} onFigureSelect={onFigureSelect} />
        )}
      </div>
    </aside>
  );
}
