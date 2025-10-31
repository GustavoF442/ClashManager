import React, { useState, useEffect } from 'react'
import { getMembers } from '../services/api.js'
import StatsGrid from '../components/StatsGrid.jsx'
import MemberCard from '../components/MemberCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterTabs from '../components/FilterTabs.jsx'

export default function Analysis() {
  const [members, setMembers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    let result = members

    // Filtrar por termo de busca
    if (searchTerm) {
      result = result.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por tipo
    if (activeFilter === 'active') {
      result = result.filter(m => (m.donations || 0) > 0)
    } else if (activeFilter === 'inactive') {
      result = result.filter(m => (m.donations || 0) === 0)
    } else if (activeFilter === 'donors') {
      result = result.filter(m => (m.donations || 0) > 100)
    } else if (activeFilter === 'topTrophies') {
      result = result.filter(m => (m.trophies || 0) > 4000)
    }

    setFiltered(result.sort((a, b) => (b.donations || 0) - (a.donations || 0)))
  }, [searchTerm, activeFilter, members])

  if (loading) {
    return <div className="card text-center py-8">Carregando análise...</div>
  }

  const tabs = [
    { id: 'all', label: 'Todos', icon: '👥' },
    { id: 'active', label: 'Ativos', icon: '✅' },
    { id: 'inactive', label: 'Inativos', icon: '❌' },
    { id: 'donors', label: 'Top Doadores', icon: '💰' },
    { id: 'topTrophies', label: 'Top Troféus', icon: '🏆' },
  ]

  const activeCount = members.filter(m => (m.donations || 0) > 0).length
  const inactiveCount = members.filter(m => (m.donations || 0) === 0).length
  const avgDonations = Math.round(
    members.reduce((sum, m) => sum + (m.donations || 0), 0) / (members.length || 1)
  )

  const stats = [
    { label: '✅ Membros Ativos', value: activeCount, icon: '✅' },
    { label: '❌ Membros Inativos', value: inactiveCount, icon: '❌' },
    { label: '📊 Doações Médias', value: avgDonations, icon: '📊', progress: (avgDonations / 500) * 100 },
  ]

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900">🔍 Análise de Membros</h2>
        <p className="text-sm text-amber-700 mt-1">Visualize e analise membros com filtros avançados</p>
      </div>

      {/* Stats Rápidos */}
      <StatsGrid stats={stats} />

      {/* Barra de Busca */}
      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="🔍 Buscar membro por nome..."
      />

      {/* Filtros */}
      <FilterTabs tabs={tabs} active={activeFilter} onChange={setActiveFilter} />

      {/* Grid de Membros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((member, idx) => (
            <MemberCard
              key={member.tag || idx}
              member={member}
              rank={idx + 1}
            />
          ))
        ) : (
          <div className="col-span-full card text-center py-12">
            <p className="text-2xl">🔍</p>
            <p className="text-slate-600 font-semibold mt-2">Nenhum membro encontrado</p>
            <p className="text-sm text-slate-500">Tente ajustar seus filtros ou termo de busca</p>
          </div>
        )}
      </div>

      {/* Resumo */}
      {filtered.length > 0 && (
        <div className="card border-t-4 border-amber-600">
          <h3 className="font-bold text-amber-900 mb-3">📈 Resumo da Busca</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <p className="text-2xl font-bold text-blue-600">{filtered.length}</p>
              <p className="text-xs text-blue-700">Membros encontrados</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <p className="text-2xl font-bold text-green-600">
                {Math.round(
                  filtered.reduce((sum, m) => sum + (m.donations || 0), 0) / filtered.length
                )}
              </p>
              <p className="text-xs text-green-700">Doações médias</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(
                  filtered.reduce((sum, m) => sum + (m.trophies || 0), 0) / filtered.length
                )}
              </p>
              <p className="text-xs text-purple-700">Troféus médios</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded">
              <p className="text-2xl font-bold text-orange-600">
                {filtered.filter(m => (m.donations || 0) > 0).length}
              </p>
              <p className="text-xs text-orange-700">Membros doadores</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
