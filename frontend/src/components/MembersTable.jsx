import React, { useState } from 'react'

export default function MembersTable({ data }) {
  const [sortBy, setSortBy] = useState('clanRank')
  const [order, setOrder] = useState('asc')

  const sorted = [...data].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    
    if (sortBy === 'donations' || sortBy === 'trophies') {
      aVal = Number(aVal) || 0
      bVal = Number(bVal) || 0
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    if (typeof aVal === 'string') {
      return order === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal)
    }
    
    aVal = Number(aVal) || 0
    bVal = Number(bVal) || 0
    return order === 'asc' ? aVal - bVal : bVal - aVal
  })

  const toggleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setOrder('asc')
    }
  }

  const getRoleColor = (role) => {
    switch(role?.toLowerCase()) {
      case 'leader': return 'bg-yellow-100 text-yellow-900'
      case 'coLeader':
      case 'coleader': return 'bg-purple-100 text-purple-900'
      case 'elder': return 'bg-blue-100 text-blue-900'
      default: return 'bg-slate-100 text-slate-900'
    }
  }

  const getLeagueEmoji = (league) => {
    if (!league) return ''
    const name = league.toLowerCase()
    if (name.includes('unranked')) return '⚪'
    if (name.includes('bronze')) return '🟤'
    if (name.includes('silver')) return '⚫'
    if (name.includes('gold')) return '🟡'
    if (name.includes('crystal')) return '🔵'
    if (name.includes('master')) return '🟣'
    if (name.includes('champion')) return '🟠'
    if (name.includes('titan')) return '🟢'
    if (name.includes('legend')) return '⭐'
    return ''
  }

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th 
              className="py-3 px-4 text-left text-slate-600 font-semibold cursor-pointer hover:bg-slate-100" 
              onClick={() => toggleSort('clanRank')}
            >
              Ranking
            </th>
            <th 
              className="py-3 px-4 text-left text-slate-600 font-semibold cursor-pointer hover:bg-slate-100"
              onClick={() => toggleSort('name')}
            >
              Nome
            </th>
            <th className="py-3 px-4 text-left text-slate-600 font-semibold">Cargo</th>
            <th className="py-3 px-4 text-left text-slate-600 font-semibold">Nível</th>
            <th 
              className="py-3 px-4 text-left text-slate-600 font-semibold cursor-pointer hover:bg-slate-100"
              onClick={() => toggleSort('trophies')}
            >
              Troféus
            </th>
            <th 
              className="py-3 px-4 text-left text-slate-600 font-semibold cursor-pointer hover:bg-slate-100"
              onClick={() => toggleSort('donations')}
            >
              Doações ⬆️
            </th>
            <th className="py-3 px-4 text-left text-slate-600 font-semibold">Recebidas ⬇️</th>
            <th className="py-3 px-4 text-left text-slate-600 font-semibold">Liga</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, idx) => (
            <tr key={m.tag || idx} className="border-t border-slate-100 hover:bg-slate-50 transition">
              <td className="py-3 px-4 font-bold text-slate-600">#{m.clanRank || '—'}</td>
              <td className="py-3 px-4 font-semibold">{m.name}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getRoleColor(m.role)}`}>
                  {m.role === 'coLeader' ? 'Co-Lider' : m.role === 'member' ? 'Membro' : m.role}
                </span>
              </td>
              <td className="py-3 px-4 text-center font-semibold">{m.expLevel ?? ''}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{m.trophies ?? 0}</span>
                  {m.league && <span className="text-lg">{getLeagueEmoji(m.league)}</span>}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <span className="text-green-600 font-bold">↑ {m.donations ?? 0}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-blue-600 font-bold">↓ {m.donationsReceived ?? 0}</span>
              </td>
              <td className="py-3 px-4 text-sm text-slate-600">{m.league ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <div className="text-center text-slate-400 py-8">Nenhum membro sincronizado ainda.</div>}
    </div>
  )
}
