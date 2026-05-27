# Bug Tracker

A simple, modern bug tracking web app built with React and Tailwind CSS.

## Features

- View all bugs with title, description, priority, and status
- Add new bugs with the "Report Bug" button
- Change bug status (Open, In Progress, Fixed)
- Delete bugs
- Responsive dark theme UI

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Tech Stack

- React 18
- Tailwind CSS 3
- Vite 5

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.jsx      # App header with add button
│   │   ├── BugList.jsx     # Bug list display
│   │   └── BugForm.jsx     # New bug form
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```