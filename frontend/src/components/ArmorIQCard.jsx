export default function ArmorIQCard() {
  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 100px" }}>
      <div className="glass-strong" style={{ borderRadius: 28, padding: "40px 36px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-40%", right: "-10%", width: 400, height: 400,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: "linear-gradient(135deg, #6366F1, #0EA5E9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.5C17.25 22.15 21 17.25 21 12V7L12 2z" />
                <circle cx="12" cy="12" r="3" fill="white" stroke="none" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-1)" }}>ArmorIQ Scoring</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>How we calculate risk scores</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
            {[
              { range: "0 – 25", label: "LOW RISK", color: "#10B981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.2)", desc: "Minimal data exposure" },
              { range: "26 – 50", label: "MEDIUM", color: "#F59E0B", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)", desc: "Moderate privacy concerns" },
              { range: "51 – 75", label: "HIGH RISK", color: "#F97316", bg: "rgba(249,115,22,0.06)", border: "rgba(249,115,22,0.2)", desc: "Significant data harvesting" },
              { range: "76 – 100", label: "CRITICAL", color: "#EF4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.2)", desc: "Severe privacy violation" },
            ].map((item) => (
              <div key={item.label} style={{ padding: "16px 18px", borderRadius: 16, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: item.color, fontFamily: "JetBrains Mono, monospace", fontWeight: 700, letterSpacing: "0.5px" }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: item.color, fontFamily: "Space Grotesk, sans-serif", fontWeight: 800 }}>{item.range}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "18px 20px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px", marginBottom: 10 }}>METHODOLOGY</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { icon: "📍", text: "Location permissions weighted highest (up to 10 pts)" },
                { icon: "👥", text: "Contact harvesting scored for data sharing risk" },
                { icon: "🎙️", text: "Camera/mic access evaluated for background use" },
                { icon: "📋", text: "Clipboard & SMS access flagged for financial risk" },
                { icon: "🇮🇳", text: "DPDP Act 2023 compliance checked for Indian users" },
                { icon: "🛡️", text: "Safer alternatives suggested where applicable" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}