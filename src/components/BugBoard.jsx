import BugCard from "./BugCard";
import { STATUS_CONFIG } from "../constants";

const COLUMNS = ["Open", "In Progress", "Fixed"];

export default function BugBoard({ bugs, onStatusChange, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {COLUMNS.map((col) => {
        const colBugs = bugs.filter((b) => b.status === col);
        const cfg = STATUS_CONFIG[col];
        return (
          <section key={col} className="flex flex-col gap-3">
            {/* Column header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  {col}
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                {colBugs.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {colBugs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 py-8 flex items-center justify-center">
                  <p className="text-xs text-slate-400">No bugs here</p>
                </div>
              ) : (
                colBugs.map((bug) => (
                  <BugCard
                    key={bug.id}
                    bug={bug}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
