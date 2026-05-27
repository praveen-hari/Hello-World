export const sampleBugs = [
  {
    id: 1,
    title: "Login page crashes on empty password submission",
    description:
      "When a user clicks 'Sign In' with an empty password field, the app throws an unhandled TypeError and the page goes blank. Reproducible on Chrome 124 and Firefox 125.",
    priority: "Critical",
    status: "Open",
    createdAt: "2024-05-01",
  },
  {
    id: 2,
    title: "Dashboard charts not rendering in Safari",
    description:
      "All Chart.js-based graphs on the main dashboard fail to render in Safari 17. The canvas elements exist in the DOM but remain blank. Works fine in Chrome and Edge.",
    priority: "High",
    status: "In Progress",
    createdAt: "2024-05-03",
  },
  {
    id: 3,
    title: "User avatar upload silently fails for PNG files",
    description:
      "Uploading a PNG avatar completes the progress indicator without error, but the new image is never saved. JPEG uploads work correctly. Backend returns 200 regardless.",
    priority: "High",
    status: "Open",
    createdAt: "2024-05-04",
  },
  {
    id: 4,
    title: "Pagination resets to page 1 after applying a filter",
    description:
      "When a user is on page 3 of the results table and applies any filter, the results update correctly but the page indicator stays on 3 while showing page-1 data.",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2024-05-05",
  },
  {
    id: 5,
    title: "Email notifications sent twice on password reset",
    description:
      "Users consistently receive two identical password-reset emails. The duplicate appears approximately 30 seconds after the first. No duplicate DB records observed.",
    priority: "High",
    status: "Open",
    createdAt: "2024-05-06",
  },
  {
    id: 6,
    title: "Tooltip overflow clipped inside overflow-hidden container",
    description:
      "Tooltips attached to table row actions are clipped by the parent container's overflow:hidden rule. Needs a portal-based rendering approach.",
    priority: "Low",
    status: "Open",
    createdAt: "2024-05-07",
  },
  {
    id: 7,
    title: "Dark mode toggle state not persisted on refresh",
    description:
      "Switching to dark mode works for the session, but after a page refresh the app reverts to light mode. The preference should be stored in localStorage.",
    priority: "Medium",
    status: "Fixed",
    createdAt: "2024-05-02",
  },
  {
    id: 8,
    title: "Search input loses focus after each keystroke on mobile",
    description:
      "On iOS Safari, typing in the global search bar causes the input to blur after every character, making search unusable on iPhone. Likely a re-render issue.",
    priority: "Critical",
    status: "In Progress",
    createdAt: "2024-05-08",
  },
  {
    id: 9,
    title: "CSV export includes hidden columns",
    description:
      "Exporting the user table to CSV includes columns that the user has hidden via the column visibility toggle. Only visible columns should appear in the export.",
    priority: "Medium",
    status: "Fixed",
    createdAt: "2024-04-28",
  },
  {
    id: 10,
    title: "Sidebar collapses unexpectedly on 1280 px viewport",
    description:
      "At exactly 1280 px wide, the sidebar collapses into the mobile drawer even though the breakpoint is set to lg (1024 px). Off-by-one in the media query.",
    priority: "Low",
    status: "Fixed",
    createdAt: "2024-04-30",
  },
];
