import { useState } from "react";
import { useFigures } from "../../hooks/useFigures";
import { FIGURE_CATEGORIES } from "../../data/constants";

const CATEGORY_COLORS = {
  overview: "#4a90f5",
  change: "#f5a623",
  health: "#22d68a",
  risk: "#f04e5e",
  restoration: "#22c55e",
  urban: "#a366f5",
};

function FigureCard({ figure, theme, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLORS[figure.category] || theme.textDim;

  return (
    <div
      onClick={() => onSelect(figure)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.surfaceAlt,
        borderRadius: 12,
        border: `1px solid ${hovered ? catColor + "88" : theme.border}`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 24px rgba(0,0,0,0.2)` : "none",
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 120,
        background: theme.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {!imgError ? (
          <>
            {!loaded && (
              <div style={{ fontSize: 11, color: theme.textDim }}>Loading…</div>
            )}
            <img
              src={`/images/${figure.filename}`}
              alt={figure.title}
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: loaded ? "block" : "none",
                transition: "transform 0.3s",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "0 12px" }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>🗺️</div>
            <div style={{ fontSize: 10, color: theme.textDim }}>
              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9 }}>
                {figure.filename}
              </code>
            </div>
          </div>
        )}

        {/* Hover hint overlay */}
        {hovered && loaded && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            gap: 6,
          }}>
            🔍 View full screen
          </div>
        )}

        {/* Category badge */}
        <div style={{
          position: "absolute",
          top: 7,
          right: 7,
          background: catColor + "22",
          border: `1px solid ${catColor}66`,
          color: catColor,
          fontSize: 9,
          fontWeight: 700,
          padding: "3px 7px",
          borderRadius: 20,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          backdropFilter: "blur(4px)",
        }}>
          {figure.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3, color: theme.text }}>{figure.title}</div>
        <div style={{ fontSize: 10, color: theme.textDim, lineHeight: 1.5 }}>{figure.description}</div>
        <div style={{ fontSize: 9, color: theme.textDim, marginTop: 5 }}>PDF p.{figure.pdfPage}</div>
      </div>
    </div>
  );
}

export default function FiguresTab({ theme, onFigureSelect }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { figures, loading } = useFigures(activeCategory);

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Category filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {FIGURE_CATEGORIES.map(cat => {
          const color = CATEGORY_COLORS[cat.id] || theme.accent;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: `1px solid ${active ? color : theme.border}`,
                background: active ? color + "22" : "transparent",
                color: active ? color : theme.textMuted,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tip */}
      <div style={{
        background: theme.accent + "11",
        border: `1px solid ${theme.accent}33`,
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 11,
        color: theme.accent,
      }}>
        Click any figure to view it full screen →
      </div>

      {/* Cards */}
      {loading ? (
        <div style={{ fontSize: 12, color: theme.textDim, textAlign: "center", padding: 20 }}>
          Loading figures…
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {figures.map(fig => (
            <FigureCard
              key={fig.id}
              figure={fig}
              theme={theme}
              onSelect={onFigureSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
