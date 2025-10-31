import React, { useState, useMemo } from 'react'
import MembersTable from '../components/MembersTable.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterTabs from '../components/FilterTabs.jsx'
import StatsGrid from '../components/StatsGrid.jsx'

export default function Members({ members }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredMembers = useMemo(() => {
    let result = members

    // Busca
    if (searchTerm) {
      result = result.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtros
    if (activeFilter === 'leaders') {
      result = result.filter(m => m.role?.toLowerCase() === 'leader')
    } else if (activeFilter === 'coleaders') {
      result = result.filter(m => m.role?.toLowerCase() === 'coleader')
    } else if (activeFilter === 'elders') {
      result = result.filter(m => m.role?.toLowerCase() === 'elder')
    }

    return result
  }, [members, searchTerm, activeFilter])

  const tabs = [
    { id: 'all', label: 'Todos', icon: '👥' },
    { id: 'leaders', label: 'Líderes', icon: '🟡' },
    { id: 'coleaders', label: 'Co-Líderes', icon: '🟣' },
    { id: 'elders', label: 'Elders', icon: '🔵' },
  ]

  const stats = [
    { label: '👥 Total', value: members.length, icon: '👥' },
    { label: '💰 Total Doações', value: members.reduce((sum, m) => sum + (m.donations || 0), 0), icon: '💰' },
    { label: '🏆 Avg Troféus', value: Math.round(members.reduce((sum, m) => sum + (m.trophies || 0), 0) / (members.length || 1)), icon: '🏆' },
  ]

  return (
    <div className="space-y-6">
      <div className="hero-section header-glow">
        <h1 className="epic-title mb-2">👥 Membros do Clã</h1>
        <p className="text-amber-700 font-semibold">Gerencie e visualize todos os guerreiros • Total: {members.length} membros</p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Busca */}
      <SearchBar 
        onSearch={setSearchTerm} 
        placeholder="🔍 Buscar por nome..."
      />

      {/* Filtros */}
      <FilterTabs tabs={tabs} active={activeFilter} onChange={setActiveFilter} />

      {/* Tabela */}
      <MembersTable data={filteredMembers} />
      
      {filteredMembers.length === 0 && (
        <div className="card text-center py-12 hover-lift">
          <p className="text-5xl animate-bounce">🔍</p>
          <p className="text-amber-700 font-black mt-4 text-lg">Nenhum membro encontrado</p>
          <p className="text-amber-600 text-sm mt-1">Tente ajustar sua busca ou filtros</p>
        </div>
      )}
    </div>
  )
}
