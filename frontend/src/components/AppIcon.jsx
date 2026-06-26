import { useState } from "react";

export default function AppIcon({ src, name, fallbackColor = "6366F1", size = 44, style = {} }) {
  const [errored, setErrored] = useState(false);

  const initials = (name || "?")
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

  const fallbackBg = `#${fallbackColor}`;

  const hex = fallbackColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const textColor = luminance > 0.65 ? "#111827" : "#ffffff";

  if (errored || !src) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          background: fallbackBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: textColor,
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: size * 0.32,
          flexShrink: 0,
          letterSpacing: "-0.03em",
          ...style,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}