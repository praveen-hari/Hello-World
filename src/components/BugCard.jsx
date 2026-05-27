import { useState } from "react";
import { PRIORITY_CONFIG, STATUS_CONFIG, STATUSES } from "../constants";

export default function BugCard({ bug, onStatusChange, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const priorityCfg = PRIORITY_CONFIG[bug.priority];
  const statusCfg = STATUS_CONFIG[bug.status];

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3 relative">
      {/* Top row: priority badge + actions */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ring-1 ${priorityCfg.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priorityCfg.dot}`} />
          {bug.priority}
        </span>

        {/* Kebab menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Actions"
            className="text-slate-400 hover:text-slate-600 p-1 rounded transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>

          {menuOpen && (
            <>
              {/* Click-away overlay */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg z-20 py-1 overflow-hidden">
                <p className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Move to
                </p>
                {STATUSES.filter((s) => s !== bug.status).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(bug.id, s);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition flex items-center gap-2"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].dot}`}
                    />
                    {s}
                  </button>
                ))}
                <hr className="my-1 border-slate-100" />
                <button
                  onClick={() => {
                    onDelete(bug.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  Delete bug
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800 leading-snug">
        {bug.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
        {bug.description}
      </p>

      {/* Footer: status + date */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ring-1 ${statusCfg.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
          {bug.status}
        </span>
        <span className="text-xs text-slate-400">{bug.createdAt}</span>
      </div>
    </article>
  );
}
