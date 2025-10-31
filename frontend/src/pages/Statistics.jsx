import React, { useState, useEffect } from 'react'
import { getMembers } from '../services/api.js'
import StatsGrid from '../components/StatsGrid.jsx'
import ActivityChart from '../components/ActivityChart.jsx'
import AlertBox from '../components/AlertBox.jsx'
import FilterTabs from '../components/FilterTabs.jsx'

export default function Statistics() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMembers()
        setMembers(data || [])
      } catch (e) {
        console.error('Erro ao carregar membros:', e)
        setMembers([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="card text-center py-8">Carregando estatísticas...</div>
  }

  // Cálculos
  const totalMembers = members.length
  const totalDonations = members.reduce((sum, m) => sum + (m.donations || 0), 0)
  const totalTrophies = members.reduce((sum, m) => sum + (m.trophies || 0), 0)
  const averageTrophies = Math.round(totalTrophies / (totalMembers || 1))
  const topDonator = [...members].sort((a, b) => (b.donations || 0) - (a.donations || 0))[0]
  const topTrophies = [...members].sort((a, b) => (b.trophies || 0) - (a.trophies || 0))[0]
  const leaderCount = members.filter(m => m.role?.toLowerCase() === 'leader').length
  const coleaderCount = members.filter(m => m.role?.toLowerCase() === 'coleader').length
  const elderCount = members.filter(m => m.role?.toLowerCase() === 'elder').length
  const memberCount = members.filter(m => m.role?.toLowerCase() === 'member').length

  // Chart data
  const donationChart = members
    .sort((a, b) => (b.donations || 0) - (a.donations || 0))
    .slice(0, 10)
    .map(m => ({ name: m.name.split(' ')[0], value: m.donations || 0 }))

  const trophyChart = members
    .sort((a, b) => (b.trophies || 0) - (a.trophies || 0))
    .slice(0, 10)
    .map(m => ({ name: m.name.split(' ')[0], value: m.trophies || 0 }))

  const stats = [
    { label: '👥 Total de Membros', value: totalMembers, icon: '👥' },
    { label: '💰 Total Doações', value: totalDonations, icon: '💰' },
    { label: '🏆 Avg Troféus', value: averageTrophies, icon: '🏆' },
    { label: '⭐ Maior Troféus', value: topTrophies?.trophies || 0, subtitle: topTrophies?.name, icon: '⭐' },
  ]

  const roleStats = [
    { label: '🟡 Líderes', value: leaderCount, icon: '🟡' },
    { label: '🟣 Co-Líderes', value: coleaderCount, icon: '🟣' },
    { label: '🔵 Elders', value: elderCount, icon: '🔵' },
    { label: '⚪ Membros', value: memberCount, icon: '⚪' },
  ]

  const tabs = [
    { id: 'all', label: 'Todos', icon: '📊' },
    { id: 'leaders', label: 'Líderes', icon: '🟡' },
    { id: 'elders', label: 'Elders', icon: '🔵' },
    { id: 'members', label: 'Membros', icon: '⚪' },
  ]

  return (
    <div className="space-y-6">
      <div className="hero-section header-glow">
        <h1 className="epic-title mb-2">📊 Estatísticas do Clã</h1>
        <p className="text-amber-700 font-semibold">Análise completa de performance e composição • Dados em tempo real</p>
      </div>

      {/* Alerta de Info */}
      <AlertBox
        type="info"
        title="💡 Dica"
        message="Clique em 'Atualizar agora' para sincronizar dados mais recentes com a API do Clash of Clans"
      />

      {/* Stats Principais */}
      <div>
        <h3 className="epic-title text-2xl mb-4">📈 Métricas Principais</h3>
        <StatsGrid stats={stats} />
      </div>

      {/* Stats de Cargos */}
      <div>
        <h3 className="epic-title text-2xl mb-4">👥 Composição por Cargo</h3>
        <StatsGrid stats={roleStats} />
      </div>

      {/* Top Doador */}
      {topDonator && (
        <div className="card battle-ready overflow-hidden relative">
          <div className="flex items-center gap-4 relative z-10">
            <div className="text-6xl sword-animate">💰</div>
            <div>
              <p className="text-sm text-green-700 font-bold uppercase">💎 TOP DOADOR DO CLÃ</p>
              <p className="text-3xl font-black text-green-900 mt-1">{topDonator.name}</p>
              <p className="text-sm text-green-700 font-semibold mt-2">
                {topDonator.donations} doações • {topDonator.donationsReceived} recebidas
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityChart
          data={donationChart}
          title="🎯 Top 10 Doadores"
        />
        <ActivityChart
          data={trophyChart}
          title="🏆 Top 10 Troféus"
        />
      </div>

      {/* Tabela de distribuição */}
      <div className="card">
        <h3 className="epic-title text-2xl mb-4">📋 Distribuição de Estatísticas</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-amber-100 to-orange-100 border-b-2 border-amber-300">
                <th className="py-3 px-4 text-left font-black text-amber-900">MEMBRO</th>
                <th className="py-3 px-4 text-left font-black text-amber-900">CARGO</th>
                <th className="py-3 px-4 text-left font-black text-amber-900">TROFÉUS</th>
                <th className="py-3 px-4 text-left font-black text-amber-900">NÍVEL</th>
                <th className="py-2 px-4 text-left text-amber-900 font-semibold">Doações</th>
                <th className="py-2 px-4 text-left text-amber-900 font-semibold">Taxa</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 15).map((m, idx) => {
                const donationRate = m.donations && m.donationsReceived 
                  ? (m.donations / (m.donations + m.donationsReceived) * 100).toFixed(1)
                  : 0
                return (
                  <tr key={m.tag || idx} className="border-t border-amber-100 hover:bg-amber-50 transition">
                    <td className="py-2 px-4 font-semibold text-amber-900">{m.name}</td>
                    <td className="py-2 px-4 text-sm">{m.role}</td>
                    <td className="py-2 px-4 font-bold text-blue-600">{m.trophies || 0}</td>
                    <td className="py-2 px-4 font-semibold text-amber-700">{m.expLevel || '—'}</td>
                    <td className="py-2 px-4 font-bold text-green-600">{m.donations || 0}</td>
                    <td className="py-2 px-4">
                      <div className="w-16 bg-amber-200 rounded-full h-2">
                        <div
                          className="bg-amber-600 h-2 rounded-full"
                          style={{ width: `${donationRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-amber-700 font-semibold">{donationRate}%</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-600">
          <p className="text-sm text-blue-700 font-semibold">Média de Doações</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">
            {Math.round(totalDonations / (totalMembers || 1))}
          </p>
          <p className="text-xs text-blue-600 mt-1">por membro</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-600">
          <p className="text-sm text-purple-700 font-semibold">Atividade Geral</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">
            {Math.round((totalDonations + totalTrophies) / totalMembers)}
          </p>
          <p className="text-xs text-purple-600 mt-1">pontos por membro</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-600">
          <p className="text-sm text-orange-700 font-semibold">Membros Inativos</p>
          <p className="text-2xl font-bold text-orange-900 mt-1">
            {members.filter(m => (m.donations || 0) === 0).length}
          </p>
          <p className="text-xs text-orange-600 mt-1">sem doações</p>
        </div>
      </div>
    </div>
  )
}
