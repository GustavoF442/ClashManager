import React from 'react'
import { Sword, Users, Castle, LineChart, BarChart3, TrendingUp, FileText, Settings, Info } from 'lucide-react'

export default function Navbar({ current, setCurrent }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <LineChart size={18} /> },
    { key: 'members', label: 'Membros', icon: <Users size={18} /> },
    { key: 'statistics', label: 'Estatísticas', icon: <BarChart3 size={18} /> },
    { key: 'analysis', label: 'Análise', icon: <TrendingUp size={18} /> },
    { key: 'reports', label: 'Relatórios', icon: <FileText size={18} /> },
    { key: 'wars', label: 'Guerras', icon: <Sword size={18} /> },
    { key: 'raids', label: 'Raids', icon: <Castle size={18} /> },
    { key: 'settings', label: 'Config', icon: <Settings size={18} /> },
    { key: 'about', label: 'Sobre', icon: <Info size={18} /> },
  ]
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 border-b-4 border-amber-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-500">
          <div>
            <div className="font-black text-2xl text-white drop-shadow-lg">⚔️ METE OU LATE</div>
            <div className="text-xs text-amber-100 font-bold">Dashboard Estratégico de Clã</div>
          </div>
          <span className="badge-epic">v0.2.0</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setCurrent(t.key)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-bold whitespace-nowrap text-sm ${
                current === t.key 
                  ? 'bg-gradient-to-br from-amber-900 to-amber-800 text-white shadow-lg border border-yellow-400 scale-105' 
                  : 'text-amber-100 hover:bg-amber-600 hover:text-white border border-transparent'
              }`}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
