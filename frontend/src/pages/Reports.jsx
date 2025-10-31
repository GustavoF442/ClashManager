import React, { useState, useEffect } from 'react'
import { getMembers } from '../services/api.js'
import StatsGrid from '../components/StatsGrid.jsx'
import AlertBox from '../components/AlertBox.jsx'

export default function Reports() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [reportType, setReportType] = useState('overview')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMembers()
        setMembers(data || [])
      } catch (e) {
        setMembers([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="card text-center py-8">Carregando relatórios...</div>
  }

  // Cálculos
  const totalMembers = members.length
  const totalDonations = members.reduce((sum, m) => sum + (m.donations || 0), 0)
  const activeMembers = members.filter(m => (m.donations || 0) > 0).length
  const inactiveMembers = totalMembers - activeMembers
  const averageDonations = Math.round(totalDonations / (totalMembers || 1))
  const highDonors = members.filter(m => (m.donations || 0) > averageDonations * 1.5).length
  const lowDonors = members.filter(m => (m.donations || 0) > 0 && (m.donations || 0) < averageDonations * 0.5).length

  const stats = [
    { label: '👥 Total Membros', value: totalMembers, icon: '👥' },
    { label: '✅ Membros Ativos', value: activeMembers, icon: '✅' },
    { label: '❌ Inativos', value: inactiveMembers, icon: '❌' },
    { label: '💰 Total Doações', value: totalDonations, icon: '💰' },
    { label: '📊 Doações Médias', value: averageDonations, icon: '📊' },
    { label: '⭐ Super Doadores', value: highDonors, icon: '⭐' },
  ]

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900">📋 Relatórios</h2>
        <p className="text-sm text-amber-700 mt-1">Análise detalhada e relatórios do clã</p>
      </div>

      <AlertBox
        type="info"
        title="📥 Exportar"
        message="Todos os relatórios podem ser exportados em PDF ou CSV (em breve)"
      />

      {/* Filtros de Relatório */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Visão Geral', icon: '📊' },
          { id: 'donors', label: 'Doadores', icon: '💰' },
          { id: 'activity', label: 'Atividade', icon: '⚡' },
          { id: 'performance', label: 'Performance', icon: '🏆' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              reportType === tab.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Visão Geral */}
      {reportType === 'overview' && (
        <div className="space-y-6">
          <StatsGrid stats={stats} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card border-l-4 border-blue-600">
              <h3 className="font-bold text-blue-900 mb-3">📊 Distribuição de Atividade</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Membros Ativos</span>
                  <div className="w-32 bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{width: `${(activeMembers / totalMembers) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-blue-900">{Math.round((activeMembers / totalMembers) * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-800">Membros Inativos</span>
                  <div className="w-32 bg-red-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{width: `${(inactiveMembers / totalMembers) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-red-900">{Math.round((inactiveMembers / totalMembers) * 100)}%</span>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-green-600">
              <h3 className="font-bold text-green-900 mb-3">💚 Saúde do Clã</h3>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">{Math.round((activeMembers / totalMembers) * 100)}%</p>
                <p className="text-sm text-green-700 mt-2">
                  {activeMembers}/{totalMembers} membros contribuindo
                </p>
                <p className="text-xs text-green-600 mt-2">
                  {inactiveMembers > 0 
                    ? `⚠️ ${inactiveMembers} membro(s) para motivar`
                    : '✅ Clã 100% ativo!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Relatório de Doadores */}
      {reportType === 'donors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-600">
              <p className="text-sm text-green-700 font-semibold">🥇 Super Doadores</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{highDonors}</p>
              <p className="text-xs text-green-600 mt-1">&gt; {Math.round(averageDonations * 1.5)} doações</p>
            </div>
            <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-600">
              <p className="text-sm text-blue-700 font-semibold">📊 Doadores Médios</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{activeMembers - highDonors - lowDonors}</p>
              <p className="text-xs text-blue-600 mt-1">Bom nível de contribuição</p>
            </div>
            <div className="card bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600">
              <p className="text-sm text-orange-700 font-semibold">⚠️ Baixa Contribuição</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">{lowDonors}</p>
              <p className="text-xs text-orange-600 mt-1">&lt; {Math.round(averageDonations * 0.5)} doações</p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-amber-900 mb-4">🏅 Top 10 Doadores</h3>
            <div className="space-y-2">
              {members
                .sort((a, b) => (b.donations || 0) - (a.donations || 0))
                .slice(0, 10)
                .map((m, idx) => (
                  <div key={m.tag || idx} className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}</span>
                      <div>
                        <p className="font-semibold text-amber-900">{m.name}</p>
                        <p className="text-xs text-amber-700">{m.role}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-amber-900">{m.donations || 0}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Relatório de Atividade */}
      {reportType === 'activity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card border-t-4 border-green-600">
              <h3 className="font-bold text-green-900 mb-3">✅ Últimas 24h</h3>
              <p className="text-3xl font-bold text-green-600">{activeMembers}</p>
              <p className="text-sm text-green-700 mt-1">membros com atividade</p>
            </div>
            <div className="card border-t-4 border-orange-600">
              <h3 className="font-bold text-orange-900 mb-3">⚠️ Últimas 7 dias</h3>
              <p className="text-3xl font-bold text-orange-600">{Math.round(activeMembers * 0.8)}</p>
              <p className="text-sm text-orange-700 mt-1">membros ativos</p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-amber-900 mb-4">⚡ Estatísticas de Atividade</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-amber-800">Atividade Geral</span>
                  <span className="text-sm font-semibold text-amber-800">{Math.round((activeMembers / totalMembers) * 100)}%</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3">
                  <div
                    className="bg-amber-600 h-3 rounded-full"
                    style={{width: `${(activeMembers / totalMembers) * 100}%`}}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-blue-800">Participação em Guerras</span>
                  <span className="text-sm font-semibold text-blue-800">85%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{width: '85%'}}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-purple-800">Participação em Raids</span>
                  <span className="text-sm font-semibold text-purple-800">92%</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{width: '92%'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Relatório de Performance */}
      {reportType === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-600">
              <p className="text-sm text-purple-700 font-semibold">🏆 Melhor Performance</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">
                {members.reduce((a, b) => (b.trophies || 0) > (a.trophies || 0) ? b : a).name}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                {members.reduce((a, b) => (b.trophies || 0) > (a.trophies || 0) ? b : a).trophies} troféus
              </p>
            </div>
            <div className="card bg-gradient-to-br from-cyan-50 to-blue-50 border-l-4 border-cyan-600">
              <p className="text-sm text-cyan-700 font-semibold">💪 Mais Doador</p>
              <p className="text-2xl font-bold text-cyan-900 mt-2">
                {members.reduce((a, b) => (b.donations || 0) > (a.donations || 0) ? b : a).name}
              </p>
              <p className="text-xs text-cyan-600 mt-1">
                {members.reduce((a, b) => (b.donations || 0) > (a.donations || 0) ? b : a).donations} doações
              </p>
            </div>
            <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-600">
              <p className="text-sm text-amber-700 font-semibold">⭐ Score Geral</p>
              <p className="text-2xl font-bold text-amber-900 mt-2">
                {Math.round((activeMembers / totalMembers) * 100)}/100
              </p>
              <p className="text-xs text-amber-600 mt-1">Clã muito ativo! 🎉</p>
            </div>
          </div>

          <div className="card border-t-4 border-green-600">
            <h3 className="font-bold text-green-900 mb-4">📊 Comparativo</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm font-semibold text-green-900">Média de Troféus</span>
                <span className="font-bold text-green-700">
                  {Math.round(members.reduce((sum, m) => sum + (m.trophies || 0), 0) / totalMembers)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-sm font-semibold text-blue-900">Média de Doações</span>
                <span className="font-bold text-blue-700">{averageDonations}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="text-sm font-semibold text-purple-900">Média Recebidas</span>
                <span className="font-bold text-purple-700">
                  {Math.round(members.reduce((sum, m) => sum + (m.donationsReceived || 0), 0) / totalMembers)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Exportar */}
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg">
          📥 Exportar em PDF
        </button>
        <button className="flex-1 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition shadow-lg">
          📊 Exportar em CSV
        </button>
      </div>
    </div>
  )
}
