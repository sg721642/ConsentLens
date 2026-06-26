const colors = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-orange-500",
  CRITICAL: "bg-red-500",
};

export default function RiskBadge({ level }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-bold ${colors[level]}`}
    >
      {level}
    </span>
  );
}