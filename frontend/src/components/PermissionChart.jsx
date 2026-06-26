import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "../data/appDatabase";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-strong)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontFamily: "JetBrains Mono, monospace", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
      <div style={{ color: payload[0].payload.color, fontWeight: 700 }}>{payload[0].name}</div>
      <div style={{ color: "var(--text-primary)" }}>{payload[0].value} risk pts</div>
    </div>
  );
};

export default function PermissionChart({ permissions }) {
  const catMap = {};
  Object.entries(permissions).forEach(([, { pts, category }]) => {
    catMap[category] = (catMap[category] || 0) + pts;
  });

  const data = Object.entries(catMap).map(([cat, pts]) => ({
    name: CATEGORY_LABELS[cat] || cat, value: pts, color: CATEGORY_COLORS[cat] || "#94A3B8",
  }));

  return (
    <div>
      <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 16, fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>
        RISK POINTS DISTRIBUTION
      </p>

      <div style={{ display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie data={data} cx={75} cy={75} innerRadius={45} outerRadius={72} dataKey="value" paddingAngle={4} strokeWidth={0}>
              {data.map((d, i) => (<Cell key={i} fill={d.color} />))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {data.map((d) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
              <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 500, flex: 1 }}>{d.name}</span>
              <span style={{ color: d.color, fontSize: 13, fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{d.value} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}