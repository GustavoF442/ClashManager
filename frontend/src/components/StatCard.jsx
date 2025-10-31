import React from 'react'

export default function StatCard({ title, value, hint }) {
  return (
    <div className="stat-box bg-gradient-to-br from-white to-amber-50 border-l-4 border-l-amber-600">
      <div className="text-xs text-amber-600 font-bold uppercase tracking-widest">{title}</div>
      <div className="text-4xl font-black mt-3 text-amber-900">{value}</div>
      {hint && <div className="text-xs text-amber-700 font-semibold mt-2">{hint}</div>}
    </div>
  )
}
