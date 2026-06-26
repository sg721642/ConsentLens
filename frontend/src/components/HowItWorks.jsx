export default function HowItWorks() {
  const steps = [
    { num: "01", icon: "🔍", title: "Enter App Names", desc: "Type one or more app names separated by commas — like Instagram, TikTok, WhatsApp." },
    { num: "02", icon: "⚡", title: "Instant Analysis", desc: "Our ArmorIQ engine cross-references real permission data against known risk patterns in under a second." },
    { num: "03", icon: "🛡️", title: "Get Your Report", desc: "See a detailed risk score, permission breakdown, DPDP compliance status, and safer alternatives." },
  ];

  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 999,
          background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
          fontSize: 11, color: "#0EA5E9", fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700, letterSpacing: "1px", marginBottom: 16,
        }}>
          HOW IT WORKS
        </div>
        <h2 style={{
          fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.5rem,4vw,2.2rem)",
          fontWeight: 800, color: "var(--text-1)", marginBottom: 12, letterSpacing: "-0.03em",
        }}>
          Three Steps to Digital Clarity
        </h2>
        <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
          No sign-ups. No data stored. Just honest permission analysis.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {steps.map((step) => (
          <div key={step.num} className="glass card-hover" style={{
            padding: "28px 24px", borderRadius: 22,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -10, right: -5,
              fontFamily: "Space Grotesk, sans-serif", fontSize: 90,
              fontWeight: 900, color: "var(--text-4)", opacity: 0.3,
              lineHeight: 1, pointerEvents: "none",
            }}>
              {step.num}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 18,
              }}>
                {step.icon}
              </div>
              <h3 style={{
                fontFamily: "Space Grotesk, sans-serif", fontSize: 17,
                fontWeight: 800, color: "var(--text-1)", marginBottom: 8,
              }}>
                {step.title}
              </h3>
              <p style={{ color: "var(--text-2)", fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}