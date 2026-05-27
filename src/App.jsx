import { useState } from 'react'
import BugList from './components/BugList'
import BugForm from './components/BugForm'
import Header from './components/Header'

const initialBugs = [
  {
    id: 1,
    title: 'Login page crashes on mobile',
    description: 'Users report that the login page throws an error when accessing from iOS Safari. The error occurs after entering credentials and clicking the login button.',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Dark mode toggle not persisting',
    description: 'The dark mode preference should be saved to localStorage, but it resets on page reload. Need to add localStorage sync on mount.',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'API timeout handling missing',
    description: 'Network requests that take longer than 30 seconds fail silently. Need to add proper timeout handling and user notification.',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    title: 'Form validation error messages unclear',
    description: 'The validation messages for the contact form are too technical. Should display user-friendly messages instead of field names.',
    priority: 'low',
    status: 'fixed',
    createdAt: '2024-01-10'
  },
  {
    id: 5,
    title: 'Dashboard charts not loading',
    description: 'The analytics charts on the dashboard display a blank space instead of rendering. Console shows "Canvas context not available" error.',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Export to CSV feature needed',
    description: 'Users want to export their data to CSV format. Currently only PDF export is available.',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-01-11'
  }
]

function App() {
  const [bugs, setBugs] = useState(initialBugs)
  const [showForm, setShowForm] = useState(false)

  const addBug = (newBug) => {
    const bug = {
      ...newBug,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    setBugs([bug, ...bugs])
    setShowForm(false)
  }

  const updateBugStatus = (id, newStatus) => {
    setBugs(bugs.map(bug => 
      bug.id === id ? { ...bug, status: newStatus } : bug
    ))
  }

  const deleteBug = (id) => {
    setBugs(bugs.filter(bug => bug.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onAddClick={() => setShowForm(true)} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {showForm && (
          <BugForm 
            onSubmit={addBug} 
            onCancel={() => setShowForm(false)} 
          />
        )}
        <BugList 
          bugs={bugs} 
          onStatusChange={updateBugStatus}
          onDelete={deleteBug}
        />
      </main>
    </div>
  )
}

export default App