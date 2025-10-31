import React, { useEffect, useState } from 'react'
import { getWarlog } from '../services/api.js'
import WarStatus from '../components/WarStatus'

export default function Wars() {
  const [items, setItems] = useState([])
  useEffect(()=>{ getWarlog().then(setItems).catch(()=>setItems([])) },[])
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">⚔️ Guerras</div>
        <div className="text-sm text-slate-500">Status atual e histórico de guerras</div>
      </div>
      
      <WarStatus />
      
      <div className="mt-8">
        <div className="card">
          <div className="text-lg font-semibold mb-4">Histórico de Guerras</div>
          <div className="text-sm text-slate-500 mb-4">Últimos resultados do clã</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((w, idx)=>(
            <div key={idx} className="card">
              <div className="font-semibold">{w.clan?.name} vs {w.opponent?.name}</div>
              <div className="text-sm text-slate-500">Resultado: {w.result || '—'}</div>
              <div className="text-sm">Estrelas: <span className="font-bold">{w.clan?.stars}</span> - <span className="font-bold">{w.opponent?.stars}</span></div>
              <div className="text-sm">Destruição: <span className="font-bold">{w.clan?.destructionPercentage}%</span> - <span className="font-bold">{w.opponent?.destructionPercentage}%</span></div>
            </div>
          ))}
          {items.length===0 && <div className="card text-slate-400">Sem dados de guerra (ou log privado).</div>}
        </div>
      </div>
    </div>
  )
}
