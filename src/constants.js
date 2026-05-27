export const PRIORITY_CONFIG = {
  Critical: {
    label: "Critical",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700 ring-red-200",
  },
  High: {
    label: "High",
    dot: "bg-orange-500",
    badge: "bg-orange-100 text-orange-700 ring-orange-200",
  },
  Medium: {
    label: "Medium",
    dot: "bg-yellow-400",
    badge: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  },
  Low: {
    label: "Low",
    dot: "bg-blue-400",
    badge: "bg-blue-100 text-blue-700 ring-blue-200",
  },
};

export const STATUS_CONFIG = {
  Open: {
    label: "Open",
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  },
  "In Progress": {
    label: "In Progress",
    badge: "bg-indigo-100 text-indigo-700 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  Fixed: {
    label: "Fixed",
    badge: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
};

export const PRIORITIES = ["Critical", "High", "Medium", "Low"];
export const STATUSES = ["Open", "In Progress", "Fixed"];
