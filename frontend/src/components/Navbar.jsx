import { useState, useEffect } from "react";
import { FaShieldAlt, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Set initial dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "var(--glass-strong)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ 
            width: 34, height: 34, borderRadius: 10, 
            background: "linear-gradient(135deg,#6366F1,#0EA5E9)", 
            display: "flex", alignItems: "center", justifyContent: "center" 
          }}>
            <FaShieldAlt style={{ color: "white", fontSize: 16 }} />
          </div>
          <span style={{ 
            fontFamily: "Space Grotesk, sans-serif", 
            fontWeight: 700, fontSize: 18, 
            color: "var(--text-primary)", letterSpacing: "-0.5px" 
          }}>
            CONSENT<span style={{ color: "#6366F1" }}>LENS</span>
          </span>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              padding: "8px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              transition: "all 0.2s"
            }}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          
          <div style={{ 
            padding: "6px 14px", borderRadius: 8, 
            background: "rgba(99,102,241,0.05)", border: "1px solid var(--border)", 
            fontSize: 10, color: "#6366F1", fontFamily: "JetBrains Mono", 
            fontWeight: 700, letterSpacing: "1px" 
          }}>
            ARMORIQ PROTOCOL
          </div>
        </div>
      </div>
    </nav>
  );
}