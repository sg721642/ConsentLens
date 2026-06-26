const STATS = [
  { value: "70+", label: "Apps Profiled" },
  { value: "5", label: "Critical Risk Apps" },
  { value: "22", label: "Apps Request Location" },
  { value: "14", label: "Microphone Access" },
  { value: "18", label: "Contact Harvesters" },
  { value: "8", label: "SMS Readers" },
  { value: "Signal", label: "Safest Messaging App" },
  { value: "Grindr", label: "Highest Risk App" },
  { value: "100%", label: "Privacy First" },
  { value: "1s", label: "Scan Speed" },
];

const ITEMS = [...STATS, ...STATS, ...STATS];

export default function StatsTicker() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        height: 46,
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(7,10,25,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 90,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, var(--bg) 0%, rgba(7,10,25,0.7) 35%, transparent 100%)",
        }}
      />

      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 90,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(-90deg, var(--bg) 0%, rgba(7,10,25,0.7) 35%, transparent 100%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          whiteSpace: "nowrap",
          animation: "statsTickerMove 34s linear infinite",
        }}
      >
        {ITEMS.map((item, index) => (
          <div
            key={`${item.value}-${item.label}-${index}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 46,
              padding: "0 28px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#6366F1",
                boxShadow: "0 0 10px rgba(99,102,241,0.9)",
                flexShrink: 0,
              }}
            />

            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 14,
                fontWeight: 800,
                color: "var(--text-1)",
                lineHeight: 1,
              }}
            >
              {item.value}
            </span>

            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--text-3)",
                letterSpacing: "0.3px",
                lineHeight: 1,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes statsTickerMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @media (max-width: 640px) {
          @keyframes statsTickerMove {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        }
      `}</style>
    </div>
  );
}