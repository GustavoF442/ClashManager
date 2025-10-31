import React from 'react'

export default function MemberCard({ member, rank }) {
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'leader':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300'
      case 'coleader':
        return 'bg-purple-100 text-purple-900 border-purple-300'
      case 'elder':
        return 'bg-blue-100 text-blue-900 border-blue-300'
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300'
    }
  }

  const getLeagueEmoji = (league) => {
    if (!league) return '⚪'
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
    <div className="card border-l-4 border-amber-600 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-amber-600">#{rank}</span>
            <div>
              <h3 className="font-bold text-amber-900 text-lg">{member.name}</h3>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded border ${getRoleColor(
                  member.role
                )}`}
              >
                {member.role === 'coLeader' ? '🟣 Co-Lider' : `${member.role}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs text-blue-700">Troféus</p>
              <p className="text-lg font-bold text-blue-900">{member.trophies || 0}</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-green-700">Nível</p>
              <p className="text-lg font-bold text-green-900">{member.expLevel || '—'}</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-green-700">↑ Doações</p>
              <p className="text-lg font-bold text-green-900">{member.donations || 0}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <p className="text-xs text-purple-700">↓ Recebidas</p>
              <p className="text-lg font-bold text-purple-900">{member.donationsReceived || 0}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl">{getLeagueEmoji(member.league)}</span>
            <span className="text-sm text-slate-600">{member.league || 'Sem Liga'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
