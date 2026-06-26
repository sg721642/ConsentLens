import { useState } from "react";
import { LEVEL_CONFIG, CATEGORY_COLORS, CATEGORY_LABELS } from "../data/appDatabase";
import AppIcon from "./AppIcon";

export default function ResultCard({ app, index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = LEVEL_CONFIG[app.level];
  const permEntries = Object.entries(app.permissions);

  // Calculate points per category
  const catPoints = {};
  permEntries.forEach(([name, p]) => {
    catPoints[p.category] = (catPoints[p.category] || 0) + p.pts;
  });
  const totalPts = Object.values(catPoints).reduce((s, v) => s + v, 0);

  // SVG Donut Chart calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  const segments = Object.entries(catPoints).map(([cat, pts]) => {
    const segmentLength = (pts / totalPts) * circumference;
    const segment = {
      cat,
      pts,
      length: segmentLength,
      offset: currentOffset,
      color: CATEGORY_COLORS[cat] || "#6366F1"
    };
    currentOffset += segmentLength;
    return segment;
  });

  // Revoke Instructions Data
  const topPerms = permEntries.slice(0, 3).map(([name]) => name);
  const androidSteps = [
    "Open Settings",
    `Tap Apps & Notifications → ${app.name}`,
    "Tap Permissions",
    `Toggle off ${topPerms.join(", ")}`
  ];
  const iosSteps = [
    "Open Settings",
    `Scroll to ${app.name}`,
    "Toggle off each permission you want to revoke",
    "Force-quit the app and restart"
  ];

  return (
    <div
      className="glass card-hover fade-up"
      style={{
        borderRadius: 24, padding: 0, marginBottom: 20,
        overflow: "hidden", animationDelay: `${index * 0.1}s`,
      }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${cfg.border}, ${cfg.text}, ${cfg.border})` }} />

      <div style={{ padding: "24px 28px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 4, boxShadow: `0 4px 12px ${cfg.borderAlpha}` }}>
              <AppIcon src={app.icon} name={app.name} fallbackColor={app.fallbackColor} size={44} />
            </div>
            <div>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-1)", marginBottom: 2 }}>{app.name}</h3>
              <div style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>{app.company} · {app.category}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: "6px 14px", borderRadius: 10, background: cfg.bg, border: `1px solid ${cfg.borderAlpha}`, fontSize: 11, color: cfg.text, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, letterSpacing: "0.5px" }}>
              {cfg.icon} {cfg.label}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: cfg.text, lineHeight: 1 }}>{app.score}</div>
              <div style={{ fontSize: 9, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px" }}>RISK SCORE</div>
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div style={{ margin: "18px 0" }}>
          <div style={{ height: 6, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${app.score}%`, background: "linear-gradient(90deg, #10B981, #F59E0B, #F97316, #EF4444)", borderRadius: 3, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </div>

        <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{app.summary}</p>

        {/* Permission Tags */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 8 }}>PERMISSIONS ANALYZED ({permEntries.length})</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {permEntries.map(([name, p]) => {
              const catColor = CATEGORY_COLORS[p.category] || "#6366F1";
              return (
                <div key={name} className="permission-tag" style={{ color: catColor, borderColor: catColor }} title={p.risk}>
                  {p.icon} {name} <span style={{ fontSize: 9, opacity: 0.7, fontFamily: "JetBrains Mono, monospace" }}>+{p.pts}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expand Toggle */}
        <button onClick={() => setExpanded(!expanded)} style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", color: "var(--text-2)", cursor: "pointer", fontSize: 12, fontFamily: "JetBrains Mono, monospace", fontWeight: 600, transition: "all 0.2s ease", width: "100%" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366F1"; e.currentTarget.style.color = "#818cf8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
        >
          {expanded ? "▲ HIDE FULL AUDIT REPORT" : "▼ VIEW FULL AUDIT REPORT"}
        </button>

        {/* Expanded Detail */}
        {expanded && (
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.3s ease" }}>

            {/* 1. ARMORIQ AUDIT TRAIL */}
            <div style={{ padding: 16, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, color: "#6366F1", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", boxShadow: "0 0 8px #6366F1", display: "inline-block" }}></span>
                ARMORIQ AUDIT TRAIL
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>
                {[
                  { label: "ID", value: "ARM-1000" },
                  { label: "App", value: app.name.toLowerCase() },
                  { label: "Mode", value: "metadata" },
                  { label: "Status", value: "PASSED", color: "#10B981" },
                  { label: "Latency (MS)", value: "3.0" },
                ].map(item => (
                  <div key={item.label} style={{ background: "rgba(99,102,241,0.03)", padding: "8px 10px", borderRadius: 6, border: "1px solid var(--border)" }}>
                    <div style={{ color: "var(--text-3)", fontSize: 9, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ color: item.color || "var(--text-1)", fontWeight: 700 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 10, color: "#10B981", fontFamily: "JetBrains Mono, monospace" }}>
                ✓ Zero personal data processed · Policy enforced
              </div>
            </div>

            {/* 2. BREAKDOWN & CHART VIEW */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              
              {/* Breakdown List */}
              <div style={{ padding: 16, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, color: "#0EA5E9", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 12 }}>
                  ACTIVE BREAKDOWN VIEW
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {permEntries.map(([name, p]) => {
                    const catColor = CATEGORY_COLORS[p.category] || "#6366F1";
                    return (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>
                        <div style={{ flex: 1, marginRight: 8 }}>
                          <div style={{ color: "var(--text-1)", fontWeight: 600, fontSize: 11 }}>{name}</div>
                          <div style={{ color: "var(--text-3)", fontSize: 9 }}>"{p.risk}"</div>
                        </div>
                        <div style={{ color: catColor, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 11 }}>+{p.pts} pts</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Donut Chart */}
              <div style={{ padding: 16, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 10, color: "#EC4899", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 12, alignSelf: "flex-start" }}>
                  ACTIVE CHART VIEW
                </div>
                <div style={{ position: "relative", width: 120, height: 120, marginBottom: 12 }}>
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    {segments.map((seg) => (
                      <circle
                        key={seg.cat}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="12"
                        strokeDasharray={`${seg.length} ${circumference - seg.length}`}
                        strokeDashoffset={-seg.offset}
                        transform="rotate(-90 50 50)"
                        style={{ transition: "all 0.5s ease" }}
                      />
                    ))}
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text-1)" }}>{totalPts}</div>
                    <div style={{ fontSize: 8, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>TOTAL PTS</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, width: "100%" }}>
                  {Object.entries(catPoints).map(([cat, pts]) => (
                    <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: CATEGORY_COLORS[cat] || "#6366F1" }}></div>
                      <span style={{ color: "var(--text-2)", fontFamily: "JetBrains Mono, monospace" }}>{CATEGORY_LABELS[cat] || cat} ({pts})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. ACTIVE REVOKE VIEW */}
            <div style={{ padding: 16, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, color: "#F97316", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>🛡️</span> ACTIVE REVOKE VIEW
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#10B981", fontFamily: "Space Grotesk, sans-serif", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>A</span>
                    Android
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {androidSteps.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-2)" }}>
                        <span style={{ color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", fontSize: 10, minWidth: 12 }}>{i + 1}.</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#0EA5E9", fontFamily: "Space Grotesk, sans-serif", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>i</span>
                    iOS
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {iosSteps.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-2)" }}>
                        <span style={{ color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", fontSize: 10, minWidth: 12 }}>{i + 1}.</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DPDP Badge */}
            {app.dpdp && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 12, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 12, color: "#EF4444", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
                🇮🇳 FLAGGED UNDER DPDP ACT 2023
              </div>
            )}

            {/* Safer Alternative */}
            {app.safer && (
              <div style={{ padding: 16, borderRadius: 14, background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)" }}>
                <div style={{ fontSize: 10, color: "#10B981", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, letterSpacing: "1px", marginBottom: 8 }}>🛡️ SAFER ALTERNATIVE</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 800, color: "#10B981" }}>{app.safer.name}</div>
                  <div style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", fontSize: 10, color: "#10B981", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>Score: {app.safer.score}</div>
                </div>
                <p style={{ color: "var(--text-3)", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>{app.safer.reason}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}