import React, { useEffect, useState } from 'react'
import { getCurrentWar } from '../services/api'

export default function WarStatus() {
  const [war, setWar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWar = async () => {
      try {
        const w = await getCurrentWar()
        setWar(w)
      } catch (e) {
        console.error('Erro ao buscar guerra:', e)
        setWar(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchWar()
    const timer = setInterval(fetchWar, 10000)
    return () => clearInterval(timer)
  }, [])

  if (loading) return <div className="card">Carregando guerra...</div>
  if (!war) return <div className="card text-slate-400">Nenhuma guerra em progresso</div>

  const { clan = {}, opponent = {} } = war
  const clanAttacksUsed = (clan.attacks || []).length
  const clanAttacksTotal = clan.members?.length || 0
  const opponentAttacksUsed = (opponent.attacks || []).length
  const opponentAttacksTotal = opponent.members?.length || 0

  return (
    <div className="space-y-4">
      <div className="war-card">
        <div className="grid grid-cols-3 gap-4 text-center relative z-10">
          <div className="float-animate">
            <div className="text-2xl font-bold text-amber-900">{clan.name || 'Clã'}</div>
            <div className="text-5xl font-black mt-2 gradient-text-war">{clan.stars || 0}⭐</div>
            <div className="text-lg font-bold text-amber-700 mt-2">{clan.destructionPercentage || 0}%</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-5xl font-black animate-pulse">⚔️</div>
          </div>
          <div className="float-animate" style={{animationDelay: '0.3s'}}>
            <div className="text-2xl font-bold text-amber-900">{opponent.name || 'Oponente'}</div>
            <div className="text-5xl font-black mt-2 gradient-text-war">{opponent.stars || 0}⭐</div>
            <div className="text-lg font-bold text-amber-700 mt-2">{opponent.destructionPercentage || 0}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-l-green-500">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">✅</span>
            <span className="font-bold text-green-900">Ataques Disponíveis (METE!)</span>
          </div>
          <div className="text-4xl font-black text-green-600 mb-3 gradient-text-war">{clanAttacksTotal - clanAttacksUsed}/{clanAttacksTotal}</div>
          <div className="progress-epic bg-green-200 h-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded transition-all" style={{width: `${(clanAttacksUsed/clanAttacksTotal)*100}%`}}></div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">❌</span>
            <span className="font-bold text-red-900">Oponente (Ataques)</span>
          </div>
          <div className="text-4xl font-black text-red-600 mb-3 gradient-text-war">{opponentAttacksTotal - opponentAttacksUsed}/{opponentAttacksTotal}</div>
          <div className="progress-epic bg-red-200 h-4">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded transition-all" style={{width: `${(opponentAttacksUsed/opponentAttacksTotal)*100}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
