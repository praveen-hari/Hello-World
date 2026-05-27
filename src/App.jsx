import { useState } from "react";
import { sampleBugs } from "./data/sampleBugs";
import BugBoard from "./components/BugBoard";
import AddBugModal from "./components/AddBugModal";
import StatsBar from "./components/StatsBar";
import { PRIORITIES, STATUSES } from "./constants";

export default function App() {
  const [bugs, setBugs] = useState(sampleBugs);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  function handleAdd(bug) {
    setBugs((prev) => [bug, ...prev]);
  }

  function handleStatusChange(id, newStatus) {
    setBugs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  }

  function handleDelete(id) {
    setBugs((prev) => prev.filter((b) => b.id !== id));
  }

  const filtered = bugs.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    const matchPriority =
      filterPriority === "All" || b.priority === filterPriority;
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    return matchSearch && matchPriority && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold text-slate-800 text-sm tracking-tight">
              BugTrack
            </span>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search bugs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Report button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-3.5 py-1.5 rounded-lg transition shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Report Bug
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Stats */}
        <StatsBar bugs={bugs} />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Mobile search */}
          <div className="relative w-full sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search bugs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-500">Filter:</span>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="All">All priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="All">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {(filterPriority !== "All" || filterStatus !== "All" || search) && (
              <button
                onClick={() => {
                  setFilterPriority("All");
                  setFilterStatus("All");
                  setSearch("");
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <span className="ml-auto text-xs text-slate-400">
            {filtered.length} bug{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Board */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-slate-400">No bugs match your filters.</p>
            <button
              onClick={() => {
                setFilterPriority("All");
                setFilterStatus("All");
                setSearch("");
              }}
              className="text-sm text-indigo-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <BugBoard
            bugs={filtered}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-8 py-4">
        <p className="text-center text-xs text-slate-400">
          BugTrack — built with React &amp; Tailwind CSS
        </p>
      </footer>

      {/* Modal */}
      {showModal && (
        <AddBugModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
