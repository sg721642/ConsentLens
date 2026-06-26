import { LEVEL_CONFIG } from "../data/appDatabase";
import AppIcon from "./AppIcon";

export default function AuditLog({ apps }) {
  if (!apps || apps.length === 0) return null;

  const avgScore = Math.round(apps.reduce((s, a) => s + a.score, 0) / apps.length);
  const avgCfg = avgScore <= 25 ? LEVEL_CONFIG.LOW : avgScore <= 50 ? LEVEL_CONFIG.MEDIUM : avgScore <= 70 ? LEVEL_CONFIG.HIGH : LEVEL_CONFIG.CRITICAL;
  const criticalCount = apps.filter((a) => a.level === "CRITICAL").length;
  const highCount = apps.filter((a) => a.level === "HIGH").length;

  return (
    <div className="glass" style={{ borderRadius: 20, padding: "20px 24px", marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
          }}>📋</div>
          <div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-1)" }}>Audit Summary</div>
            <div style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>{apps.length} app{apps.length !== 1 ? "s" : ""} scanned</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 800, color: avgCfg.text, lineHeight: 1 }}>{avgScore}</div>
            <div style={{ fontSize: 9, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.5px" }}>AVG RISK</div>
          </div>
          {(criticalCount > 0 || highCount > 0) && (
            <div style={{ display: "flex", gap: 8 }}>
              {criticalCount > 0 && (
                <div style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", fontSize: 10, color: "#EF4444", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{criticalCount} CRITICAL</div>
              )}
              {highCount > 0 && (
                <div style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)", fontSize: 10, color: "#F97316", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{highCount} HIGH</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "thin" }}>
        {apps.map((app) => {
          const cfg = LEVEL_CONFIG[app.level];
          return (
            <div key={app.name} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 14px", borderRadius: 12,
              background: cfg.bg, border: `1px solid ${cfg.borderAlpha}`,
              minWidth: "fit-content", flexShrink: 0,
            }}>
              <AppIcon src={app.icon} name={app.name} fallbackColor={app.fallbackColor} size={28} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", fontFamily: "Space Grotesk, sans-serif" }}>{app.name}</div>
                <div style={{ fontSize: 10, color: cfg.text, fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{app.score} · {cfg.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}