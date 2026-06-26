import { useState } from "react";
import { FEATURED_APPS, LEVEL_CONFIG } from "../data/appDatabase";
import AppIcon from "./AppIcon";

export default function FeaturedApps({ onSelect }) {
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 999,
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          fontSize: 11, color: "#EF4444", fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700, letterSpacing: "1px", marginBottom: 16,
        }}>
          🔴 HIGH RISK SPOTLIGHT
        </div>
        <h2 style={{
          fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.5rem,4vw,2.2rem)",
          fontWeight: 800, color: "var(--text-1)", marginBottom: 12, letterSpacing: "-0.03em",
        }}>
          Apps You Use Every Day
        </h2>
        <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
          Click any app to run a full permission audit. You might be surprised.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 16,
      }}>
        {FEATURED_APPS.map((app) => {
          const cfg = LEVEL_CONFIG[app.level];
          const isHovered = hoveredKey === app.key;

          return (
            <button
              key={app.key}
              onClick={() => onSelect(app.key)}
              onMouseEnter={() => setHoveredKey(app.key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="app-feat-card glass"
              style={{
                padding: "20px 16px",
                borderRadius: 20,
                border: isHovered ? `1px solid ${cfg.borderAlpha}` : "1px solid var(--border)",
                background: isHovered ? cfg.bg : "var(--card)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                textAlign: "center",
                boxShadow: isHovered
                  ? `0 8px 32px ${cfg.borderAlpha}`
                  : "0 2px 8px rgba(0,0,0,0.15)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isHovered ? "translateY(-6px) scale(1.02)" : "none",
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", padding: 6, flexShrink: 0,
                boxShadow: isHovered ? `0 4px 16px ${cfg.borderAlpha}` : "none",
                transition: "box-shadow 0.3s ease",
              }}>
                <AppIcon src={app.icon} name={app.name} fallbackColor={app.fallbackColor} size={44} />
              </div>

              <div>
                <div style={{
                  fontFamily: "Space Grotesk, sans-serif", fontSize: 14,
                  fontWeight: 700, color: "var(--text-1)", marginBottom: 2,
                }}>
                  {app.name}
                </div>
                <div style={{
                  fontSize: 10, color: "var(--text-3)",
                  fontFamily: "JetBrains Mono, monospace",
                }}>
                  {app.category}
                </div>
              </div>

              <div style={{
                padding: "4px 10px", borderRadius: 8,
                background: cfg.bg, border: `1px solid ${cfg.borderAlpha}`,
                fontSize: 10, color: cfg.text,
                fontFamily: "JetBrains Mono, monospace", fontWeight: 700,
                letterSpacing: "0.5px",
              }}>
                {cfg.label}
              </div>

              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>RISK SCORE</span>
                  <span style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", color: cfg.text, fontWeight: 700 }}>{app.score}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${app.score}%`,
                    background: `linear-gradient(90deg, ${cfg.border}, ${cfg.text})`,
                    borderRadius: 2,
                    transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
                  }} />
                </div>
              </div>

              {isHovered && (
                <div style={{
                  fontSize: 11, color: cfg.text,
                  fontFamily: "JetBrains Mono, monospace", fontWeight: 700,
                  animation: "fadeIn 0.2s ease",
                }}>
                  Click to audit →
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <p style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>
          Database covers 70+ apps · Type any app name in the search bar above
        </p>
      </div>
    </section>
  );
}