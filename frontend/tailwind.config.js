/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg:       "#030712",
        surface:  "#0a0f1e",
        card:     "#0d1526",
        elevated: "#111827",
        indigo:   "#6366F1",
        teal:     "#0EA5E9",
        emerald:  "#10B981",
        amber:    "#F59E0B",
        rose:     "#EF4444",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        "glow-indigo": "0 0 40px rgba(99,102,241,0.2)",
        "glow-teal":   "0 0 30px rgba(14,165,233,0.2)",
        "glow-red":    "0 0 30px rgba(239,68,68,0.2)",
        "card":        "0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};