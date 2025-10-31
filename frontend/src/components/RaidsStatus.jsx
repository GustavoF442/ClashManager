import React, { useEffect, useState } from 'react'
import { getRaidSeasons } from '../services/api'

export default function RaidsStatus() {
  const [raids, setRaids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRaids = async () => {
      try {
        const r = await getRaidSeasons(3)
        setRaids(r)
      } catch (e) {
        console.error('Erro ao buscar raids:', e)
        setRaids([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchRaids()
  }, [])

  if (loading) return <div className="card">Carregando raids...</div>
  if (!raids.length) return <div className="card text-slate-400">Sem dados de raids</div>

  const raid = raids[0]
  if (!raid) return null

  const members = {}
  if (raid.attacks) {
    raid.attacks.forEach(a => {
      const tag = a.attacker?.tag || 'unknown'
      const name = a.attacker?.name || 'Unknown'
      if (!members[tag]) {
        members[tag] = { name, attacks: 0, stars: 0, damage: 0 }
      }
      members[tag].attacks += 1
      members[tag].stars += a.stars || 0
      members[tag].damage += a.destructionPercentage || 0
    })
  }

  const sorted = Object.values(members).sort((a, b) => b.stars - a.stars)

  return (
    <div className="space-y-4">
      <div className="gradient-raid rounded-2xl p-8 text-white border-4 border-purple-300 shadow-2xl">
        <div className="text-4xl font-black mb-6 drop-shadow-lg">💪 Raid Capital - Temporada {raid.season}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/20 rounded-xl border-2 border-white/40 backdrop-blur-sm hover:bg-white/30 transition">
            <div className="text-4xl font-black text-white">{raid.totalAttacks || 0}</div>
            <div className="text-xs text-white/90 font-bold">⚔️ ATAQUES</div>
          </div>
          <div className="text-center p-4 bg-white/20 rounded-xl border-2 border-white/40 backdrop-blur-sm hover:bg-white/30 transition">
            <div className="text-4xl font-black text-white">{raid.capitalTotalLoot || 0}</div>
            <div className="text-xs text-white/90 font-bold">💰 LOOT</div>
          </div>
          <div className="text-center p-4 bg-white/20 rounded-xl border-2 border-white/40 backdrop-blur-sm hover:bg-white/30 transition">
            <div className="text-4xl font-black text-white">{raid.enemyDistrictsDestroyed || 0}</div>
            <div className="text-xs text-white/90 font-bold">🏰 DISTRITOS</div>
          </div>
          <div className="text-center p-4 bg-white/20 rounded-xl border-2 border-white/40 backdrop-blur-sm hover:bg-white/30 transition">
            <div className="text-4xl font-black text-white">{raid.raidsCompleted || 0}</div>
            <div className="text-xs text-white/90 font-bold">✅ COMPLETAS</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="font-black mb-6 text-2xl gradient-text-raid">🏅 Ranking de Contribuição (por ⭐ Stars)</div>
        <div className="space-y-3">
          {sorted.length > 0 ? (
            sorted.map((m, i) => (
              <div key={i} className="card p-4 border-l-4 border-l-purple-600 hover:shadow-xl transition group">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className={`${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'bg-amber-500 text-white'} font-bold w-12 h-12 rounded-full flex items-center justify-center text-lg`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`}
                    </div>
                    <div>
                      <div className="font-bold text-amber-900 text-lg">{m.name}</div>
                      <div className="text-xs text-amber-700 font-semibold">{m.attacks} ataques realizados</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black gradient-text-raid">{m.stars}⭐</div>
                    <div className="text-xs text-purple-700 font-bold">{Math.round(m.damage/m.attacks)}% média</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-slate-400 text-center py-12">📊 Sem ataques nesta temporada</div>
          )}
        </div>
      </div>
    </div>
  )
}
