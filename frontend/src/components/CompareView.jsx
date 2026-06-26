import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  LEVEL_CONFIG,
} from "../data/appDatabase";

export default function CompareView({
  appA,
  appB,
  onClear,
}) {
  const allPerms =
    new Set([
      ...Object.keys(
        appA.permissions
      ),
      ...Object.keys(
        appB.permissions
      ),
    ]);

  const barData =
    [...allPerms].map(
      (p) => ({
        name:
          p.length > 14
            ? p.slice(
                0,
                12
              ) + "…"
            : p,

        [appA.name]:
          appA
            .permissions[
            p
          ]?.pts || 0,

        [appB.name]:
          appB
            .permissions[
            p
          ]?.pts || 0,
      })
    );

  const cfgA =
    LEVEL_CONFIG[
      appA.level
    ];

  const cfgB =
    LEVEL_CONFIG[
      appB.level
    ];

  return (
    <div
      style={{
        background:
          "#0f172a",
        border:
          "1px solid #334155",
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            color:
              "#f1f5f9",
            margin: 0,
          }}
        >
          ⚖️ Side-by-Side
          Comparison
        </h3>

        <button
          onClick={
            onClear
          }
        >
          Clear
        </button>
      </div>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <BarChart
          data={barData}
          layout="vertical"
        >
          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="name"
          />

          <Tooltip />

          <Legend />

          <Bar
            dataKey={
              appA.name
            }
            fill={
              cfgA.border
            }
          />

          <Bar
            dataKey={
              appB.name
            }
            fill={
              cfgB.border
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}