import React, { useEffect, useState } from 'react'
import { getRaidSeasons } from '../services/api.js'
import RaidsStatus from '../components/RaidsStatus'

export default function Raids() {
  const [items, setItems] = useState([])
  useEffect(()=>{ getRaidSeasons(3).then(setItems).catch(()=>setItems([])) },[])
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">💪 Raid Capital</div>
        <div className="text-sm text-slate-500">Progresso e contribuições</div>
      </div>
      
      <RaidsStatus />
    </div>
  )
}
