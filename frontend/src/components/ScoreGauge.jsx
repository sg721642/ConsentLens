import { useEffect, useRef } from "react";
import { LEVEL_CONFIG } from "../data/appDatabase";

export default function ScoreGauge({ score, level, size = 120 }) {
  const progressRef = useRef(null);
  const cfg = LEVEL_CONFIG[level];

  const r = (size / 2) - 12;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  // We use a 270° arc (start top-left, end top-right)
  const arcLen = circumference * 0.75;
  const offset = arcLen * (1 - score / 100);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.strokeDashoffset = arcLen;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)";
        el.style.strokeDashoffset = offset;
      });
    });
  }, [score, arcLen, offset]);

  // 270° arc starting at bottom-left going clockwise to bottom-right
  const startAngle = 135 * (Math.PI / 180);
  const endAngle = 45 * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle + 2 * Math.PI);
  const y2 = cy + r * Math.sin(endAngle + 2 * Math.PI);

  const arcPath = `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(0deg)" }}
        >
          {/* Track */}
          <path
            d={arcPath}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
            strokeLinecap="round"
          />
          {/* Progress */}
          <path
            ref={progressRef}
            d={arcPath}
            fill="none"
            stroke={cfg.border}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={arcLen}
            strokeDashoffset={arcLen}
            filter={`drop-shadow(0 0 6px ${cfg.border})`}
          />
        </svg>

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: size * 0.08,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: size * 0.28,
              fontWeight: 700,
              color: cfg.text,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: size * 0.1,
              color: "#475569",
              fontFamily: "JetBrains Mono, monospace",
              marginTop: 2,
            }}
          >
            /100
          </span>
        </div>
      </div>

      {/* Risk badge */}
      <div
        style={{
          padding: "4px 12px",
          borderRadius: 999,
          background: cfg.bg,
          border: `1px solid ${cfg.borderAlpha}`,
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "JetBrains Mono, monospace",
          color: cfg.text,
          letterSpacing: "0.1em",
        }}
      >
        {cfg.label}
      </div>
    </div>
  );
}