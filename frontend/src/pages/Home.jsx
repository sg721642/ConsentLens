import { useState, useEffect, useRef } from "react";
import ResultCard from "../components/ResultCard";
import AuditLog from "../components/AuditLog";
import ArmorIQCard from "../components/ArmorIQCard";
import FeaturedApps from "../components/FeaturedApps";
import StatsTicker from "../components/StatsTicker";
import HowItWorks from "../components/HowItWorks";
import { APP_DB } from "../data/appDatabase";
import exportPDF from "../utils/exportReport";

const QUICK_SEARCHES = [
  "Instagram, TikTok",
  "WhatsApp, Signal",
  "Truecaller, Paytm",
  "Uber, Ola",
  "Facebook, Snapchat",
];

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const placeholders = [
    "Try: Instagram, TikTok...",
    "Try: WhatsApp, Signal...",
    "Try: Truecaller, Uber...",
    "Try: Facebook, Snapchat...",
  ];
  const [plIdx, setPlIdx] = useState(0);
  const [plText, setPlText] = useState("");
  const [plDeleting, setPlDeleting] = useState(false);

  useEffect(() => {
    if (input) return;
    const target = placeholders[plIdx];
    let timeout;
    if (!plDeleting) {
      if (plText.length < target.length) {
        timeout = setTimeout(() => setPlText(target.slice(0, plText.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPlDeleting(true), 2000);
      }
    } else {
      if (plText.length > 0) {
        timeout = setTimeout(() => setPlText(plText.slice(0, -1)), 30);
      } else {
        setPlDeleting(false);
        setPlIdx((i) => (i + 1) % placeholders.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [plText, plDeleting, plIdx, input]);

  const handleAnalyze = async (customInput) => {
    const query = customInput ?? input;
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setResults([]);

    await new Promise((r) => setTimeout(r, 1400));

    const names = query.split(",").map((s) => s.trim().toLowerCase());
    const found = [];
    names.forEach((name) => {
      const direct = APP_DB[name];
      if (direct) { found.push({ ...direct, key: name }); return; }
      const compact = name.replace(/\s+/g, "");
      if (APP_DB[compact]) { found.push({ ...APP_DB[compact], key: compact }); return; }
    });

    setResults(found);
    setLoading(false);

    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAnalyze();
  };

  const handleQuick = (q) => {
    setInput(q);
    handleAnalyze(q);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="radar-container" aria-hidden="true">
        <div className="radar-bg-glow" />
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-sweep" />
      </div>
      <div className="scan-line" aria-hidden="true" />

      <section style={{
        position: "relative", minHeight: "88vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px", zIndex: 10,
      }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "15%", left: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", animation: "float 12s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "25%", right: "6%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)", animation: "float-reverse 15s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "20%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", animation: "float 18s ease-in-out infinite", animationDelay: "-6s" }} />
        </div>

        <div className="fade-up" style={{ marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 999, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.3)", fontSize: 11, color: "#818cf8", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, letterSpacing: "1.5px", backdropFilter: "blur(8px)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", boxShadow: "0 0 10px #6366F1", display: "inline-block", animation: "pulse-dot 2s infinite" }} />
            AI PERMISSION REALITY CHECKER · ARMORIQ v2.0
          </div>
        </div>

        <h1 className="fade-up" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.8rem, 8.5vw, 5.5rem)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em", textAlign: "center", maxWidth: 900, marginBottom: 24, animationDelay: "0.1s" }}>
          <span style={{ color: "var(--text-1)" }}>Scan Your Apps.</span><br />
          <span className="gradient-text">Expose The Truth.</span>
        </h1>

        <p className="fade-up" style={{ color: "var(--text-2)", fontSize: "clamp(15px, 3vw, 18px)", maxWidth: 580, textAlign: "center", lineHeight: 1.7, marginBottom: 40, animationDelay: "0.2s" }}>
          Stop blindly tapping "Allow". Understand the real-world privacy exposure of every app on your phone — in seconds.
        </p>

        <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 48, animationDelay: "0.3s" }}>
          {[{ icon: "💎", label: "Zero Data Stored" }, { icon: "⚡", label: "Instant Analysis" }, { icon: "🔓", label: "No Login Required" }, { icon: "🇮🇳", label: "DPDP Compliant" }].map((usp) => (
            <div key={usp.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 16px", borderRadius: 10, background: "var(--card)", border: "1px solid var(--border)", fontSize: 12, fontFamily: "JetBrains Mono, monospace", color: "var(--text-1)", fontWeight: 600, backdropFilter: "blur(12px)", transition: "all 0.25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span>{usp.icon}</span> {usp.label}
            </div>
          ))}
        </div>

        <div className="fade-up" style={{ width: "100%", maxWidth: 700, animationDelay: "0.4s" }}>
          <div className="glass-strong" style={{ padding: 6, borderRadius: 20, display: "flex", gap: 8, boxShadow: "0 20px 60px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.3)" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.5, pointerEvents: "none" }}>🔍</span>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={plText}
                style={{ width: "100%", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "17px 18px 17px 46px", color: "var(--text-1)", fontSize: 15, fontFamily: "JetBrains Mono, monospace", outline: "none", transition: "border-color 0.2s ease" }}
                onFocus={(e) => { e.target.style.borderColor = "#6366F1"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
              />
            </div>
            <button onClick={() => handleAnalyze()} disabled={loading}
              style={{ background: loading ? "var(--card)" : "linear-gradient(135deg, #6366F1 0%, #0EA5E9 100%)", border: "none", borderRadius: 14, padding: "0 32px", color: loading ? "var(--text-3)" : "white", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap", boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.45)", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 8 }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? (<><span style={{ width: 14, height: 14, border: "2px solid var(--text-3)", borderTopColor: "#6366F1", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />Scanning…</>) : (<>Analyze →</>)}
            </button>
          </div>

          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", display: "flex", alignItems: "center" }}>TRY:</span>
            {QUICK_SEARCHES.map((q) => (
              <button key={q} onClick={() => handleQuick(q)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 8, background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-2)", cursor: "pointer", fontFamily: "JetBrains Mono, monospace", fontWeight: 600, transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366F1"; e.currentTarget.style.color = "#818cf8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
              >{q}</button>
            ))}
          </div>
        </div>

        <div className="fade-up" style={{ marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animationDelay: "0.6s" }}>
          <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1px" }}>EXPLORE BELOW</span>
          <div style={{ width: 24, height: 40, border: "1.5px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 5 }}>
            <div style={{ width: 4, height: 8, borderRadius: 2, background: "#6366F1", animation: "scroll-dot 1.8s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      <StatsTicker />

      <div id="results-section" style={{ position: "relative", zIndex: 10 }}>
        {loading && (
          <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px" }}>
            <LoadingSkeleton />
          </div>
        )}

        {!loading && results.length > 0 && (
          <div style={{ maxWidth: 820, margin: "60px auto 0", padding: "0 24px 60px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, color: "var(--text-1)", fontWeight: 700, marginBottom: 4 }}>
                  Audit Results <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "var(--text-3)", fontWeight: 500 }}>({results.length} app{results.length !== 1 ? "s" : ""})</span>
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "JetBrains Mono, monospace" }}>Real-world permission analysis · ArmorIQ enforced</p>
              </div>
              <button onClick={() => exportPDF(results)} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 18px", color: "var(--text-1)", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366F1"; e.currentTarget.style.color = "#818cf8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-1)"; }}
              >📄 Export Report</button>
            </div>

            <AuditLog apps={results} />
            {results.map((app, i) => (
              <ResultCard key={app.name} app={app} index={i} />
            ))}
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: "center", margin: "80px auto", padding: "0 24px", maxWidth: 500 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔎</div>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, color: "var(--text-1)", fontWeight: 700, marginBottom: 8 }}>App Not Found</h3>
            <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              We couldn't find that app. Try <strong style={{ color: "var(--text-1)" }}>Instagram</strong>, <strong style={{ color: "var(--text-1)" }}>WhatsApp</strong>, or <strong style={{ color: "var(--text-1)" }}>Uber</strong>.
            </p>
            <button onClick={() => { setInput(""); setSearched(false); inputRef.current?.focus(); }}
              style={{ background: "linear-gradient(135deg, #6366F1, #0EA5E9)", border: "none", borderRadius: 12, padding: "12px 24px", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Space Grotesk, sans-serif" }}
            >Try Again</button>
          </div>
        )}
      </div>

      {!loading && results.length === 0 && (
        <div style={{ position: "relative", zIndex: 10 }}>
          <FeaturedApps onSelect={(name) => handleQuick(name)} />
          <HowItWorks />
          <ArmorIQCard />
        </div>
      )}

      <style>{`
        @keyframes scroll-dot { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(12px); opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div className="shimmer" style={{ width: 120, height: 14, borderRadius: 6 }} />
      </div>
      {[300, 280, 260].map((h, i) => (
        <div key={i} className="shimmer" style={{ height: h, borderRadius: 24 }} />
      ))}
    </div>
  );
}