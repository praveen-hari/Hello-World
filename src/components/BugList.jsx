export default function BugList({ bugs, onStatusChange, onDelete }) {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-400'
      case 'in-progress':
        return 'bg-purple-500/20 text-purple-400'
      case 'fixed':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-slate-500/20 text-slate-400'
    }
  }

  const getStatusOptions = (currentStatus) => {
    const allStatuses = [
      { value: 'open', label: 'Open' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'fixed', label: 'Fixed' }
    ]
    return allStatuses.filter(s => s.value !== currentStatus)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          All Bugs
          <span className="ml-2 text-sm font-normal text-slate-400">({bugs.length})</span>
        </h2>
      </div>

      {bugs.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No bugs reported</h3>
          <p className="text-slate-400">Click "Report Bug" to add your first issue</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-white font-medium">{bug.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityStyles(bug.priority)}`}>
                      {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusStyles(bug.status)}`}>
                      {bug.status === 'in-progress' ? 'In Progress' : bug.status.charAt(0).toUpperCase() + bug.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{bug.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Reported: {bug.createdAt}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative group">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-48 bg-slate-700 rounded-lg shadow-xl border border-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <div className="py-1">
                        <p className="px-3 py-2 text-xs text-slate-400 border-b border-slate-600">Change status:</p>
                        {getStatusOptions(bug.status).map((option) => (
                          <button
                            key={option.value}
                            onClick={() => onStatusChange(bug.id, option.value)}
                            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-600 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                        <div className="border-t border-slate-600 mt-1 pt-1">
                          <button
                            onClick={() => onDelete(bug.id)}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-600 transition-colors"
                          >
                            Delete bug
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}