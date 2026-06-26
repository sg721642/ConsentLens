export default function Footer() {
  return (
    <footer style={{ 
      borderTop: "1px solid rgba(99,102,241,0.15)", padding: "40px 24px", 
      textAlign: "center", marginTop: 40, background: "rgba(3,7,18,0.8)" 
    }}>
      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#6366F1", fontWeight: 700, marginBottom: 8 }}>
        ConsentLens
      </div>
      <div style={{ fontSize: 12, color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>
        Powered by ArmorIQ · Privacy First · NeuroX Hackathon 2026
      </div>
      <div style={{ fontSize: 11, color: "#334155", marginTop: 8, fontFamily: "JetBrains Mono, monospace" }}>
        © 2026 ConsentLens. All Rights Reserved.
      </div>
    </footer>
  );
}