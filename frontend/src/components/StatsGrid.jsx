import React from 'react'

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="card border-l-4 border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-700 font-semibold">{stat.label}</p>
              <p className="text-3xl font-bold text-amber-900 mt-2">{stat.value}</p>
              {stat.subtitle && <p className="text-xs text-amber-600 mt-1">{stat.subtitle}</p>}
            </div>
            {stat.icon && <div className="text-4xl opacity-30">{stat.icon}</div>}
          </div>
          {stat.progress && (
            <div className="mt-3 w-full bg-amber-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(stat.progress, 100)}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
