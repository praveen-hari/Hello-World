import { PRIORITY_CONFIG, STATUS_CONFIG } from "../constants";

export default function StatsBar({ bugs }) {
  const total = bugs.length;
  const open = bugs.filter((b) => b.status === "Open").length;
  const inProgress = bugs.filter((b) => b.status === "In Progress").length;
  const fixed = bugs.filter((b) => b.status === "Fixed").length;
  const critical = bugs.filter((b) => b.priority === "Critical").length;

  const stats = [
    { label: "Total", value: total, color: "text-slate-700" },
    { label: "Open", value: open, color: "text-slate-500" },
    { label: "In Progress", value: inProgress, color: "text-indigo-600" },
    { label: "Fixed", value: fixed, color: "text-emerald-600" },
    { label: "Critical", value: critical, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex flex-col gap-1"
        >
          <span className="text-xs text-slate-400 font-medium">{s.label}</span>
          <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}
