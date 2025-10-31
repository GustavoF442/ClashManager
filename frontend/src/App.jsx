import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Members from './pages/Members.jsx'
import Wars from './pages/Wars.jsx'
import Raids from './pages/Raids.jsx'
import Statistics from './pages/Statistics.jsx'
import Analysis from './pages/Analysis.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import About from './pages/About.jsx'
import { getMembers, syncNow } from './services/api.js'
import LoadingSpinner from './components/LoadingSpinner.jsx'

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [members, setMembers] = useState([])
  const [syncStatus, setSyncStatus] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadMembers() {
    try {
      const m = await getMembers()
      setMembers(m)
    } catch (e) {
      setMembers([])
    }
  }

  async function doSync() {
    setSyncStatus('Sincronizando...')
    try {
      const res = await syncNow()
      setSyncStatus(`✅ Sincronizado: ${res.count} membros.`)
      await loadMembers()
      setTimeout(() => setSyncStatus(''), 3000)
    } catch (e) {
      setSyncStatus('❌ Erro ao sincronizar. Verifique o backend/.env.')
      setTimeout(() => setSyncStatus(''), 3000)
    }
  }

  useEffect(() => {
    loadMembers().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <LoadingSpinner text="Carregando METE OU LATE..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar current={tab} setCurrent={setTab} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="header-glow rounded-3xl p-8 mb-8 border-2 border-amber-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="epic-title mb-2">⚔️ METE OU LATE</h1>
              <p className="text-amber-800 text-lg font-semibold">Dashboard Estratégico do Clã • Clash of Clans</p>
              <p className="text-amber-700 text-sm mt-1">Controle absoluto sobre guerras, ataques e membros</p>
            </div>
            <button 
              onClick={doSync} 
              className="btn-epic"
            >
              🔄 Atualizar Dados
            </button>
          </div>
          {syncStatus && (
            <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-l-amber-600">
              <p className="text-amber-900 font-semibold">{syncStatus}</p>
            </div>
          )}
        </div>

        {tab === 'dashboard' && <Dashboard members={members} />}
        {tab === 'members' && <Members members={members} />}
        {tab === 'statistics' && <Statistics />}
        {tab === 'analysis' && <Analysis />}
        {tab === 'reports' && <Reports />}
        {tab === 'wars' && <Wars />}
        {tab === 'raids' && <Raids />}
        {tab === 'settings' && <Settings />}
        {tab === 'about' && <About />}
      </main>
      <footer className="text-center text-amber-700 text-xs py-8 border-t border-amber-200 mt-12 bg-gradient-to-r from-amber-50 to-orange-50">
        <p className="font-bold text-sm mb-1">⚔️ METE OU LATE v0.2.0</p>
        <p>Dashboard Estratégico de Clã • Clash of Clans • Desenvolvido com React + FastAPI</p>
        <p className="text-amber-600 mt-2">🏆 Para guerreiros que acertam o alvo!</p>
      </footer>
    </div>
  )
}
