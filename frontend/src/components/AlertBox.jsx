import React from 'react'

export default function AlertBox({ type = 'info', title, message, action }) {
  const colors = {
    info: 'bg-blue-50 border-blue-300 text-blue-900',
    warning: 'bg-orange-50 border-orange-300 text-orange-900',
    success: 'bg-green-50 border-green-300 text-green-900',
    error: 'bg-red-50 border-red-300 text-red-900',
  }

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  }

  return (
    <div className={`card border-l-4 border-current ${colors[type]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{icons[type]}</span>
          <div>
            {title && <p className="font-bold text-sm">{title}</p>}
            {message && <p className="text-sm">{message}</p>}
          </div>
        </div>
        {action && (
          <button className="px-3 py-1 rounded bg-white/50 hover:bg-white text-sm font-semibold">
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}
