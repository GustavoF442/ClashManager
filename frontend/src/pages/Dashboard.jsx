import React from 'react'
import StatCard from '../components/StatCard.jsx'
import WarStatus from '../components/WarStatus.jsx'
import RaidsStatus from '../components/RaidsStatus.jsx'
import AlertBox from '../components/AlertBox.jsx'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from 'recharts'

export default function Dashboard({ members }) {
  const total = members.length
  const mediaTrof = members.reduce((a, b) => a + (b.trophies || 0), 0) / (total || 1)
  const topDon = [...members].sort((a,b)=> (b.donations||0)-(a.donations||0))[0]
  const activeMembers = members.filter(m => (m.donations || 0) > 0).length
  const inactiveMembers = total - activeMembers
  
  const sample = Array.from({length: 8}).map((_,i)=>({ 
    name: `S${i+1}`, 
    doacoes: Math.max(0, (topDon?.donations||0) - i*5),
    troféus: Math.max(0, (members[0]?.trophies||0) - i*200)
  }))

  const membersByRole = [
    { name: 'Líderes', value: members.filter(m => m.role?.toLowerCase() === 'leader').length },
    { name: 'Co-Líderes', value: members.filter(m => m.role?.toLowerCase() === 'coleader').length },
    { name: 'Elders', value: members.filter(m => m.role?.toLowerCase() === 'elder').length },
    { name: 'Membros', value: members.filter(m => m.role?.toLowerCase() === 'member').length },
  ]

  return (
    <div className="space-y-8">
      {/* Alerta */}
      <AlertBox
        type="success"
        title="✅ Sistema Online"
        message="Dashboard sincronizado e pronto para uso. Clique em 'Atualizar agora' para dados em tempo real."
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="👥 Membros" 
          value={total} 
          hint={`${activeMembers} ativos · ${inactiveMembers} inativos`}
        />
        <StatCard 
          title="🏆 Avg Troféus" 
          value={Math.round(mediaTrof)}
          hint={`Total: ${Math.round(members.reduce((a, b) => a + (b.trophies || 0), 0))}`}
        />
        <StatCard 
          title="💰 Top Doador" 
          value={topDon ? topDon.donations : 0}
          hint={topDon ? topDon.name : 'N/A'}
        />
        <StatCard 
          title="📊 Total Doações" 
          value={members.reduce((a, b) => a + (b.donations || 0), 0)}
          hint={`Média: ${Math.round(members.reduce((a, b) => a + (b.donations || 0), 0) / (total || 1))}`}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="text-sm text-amber-600 font-bold uppercase tracking-wider mb-4">📈 Tendência de Doações</div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sample}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fef3c7', border: '2px solid #b45309', borderRadius: '8px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="doacoes" 
                  stroke="#b45309" 
                  strokeWidth={3} 
                  name="Doações"
                  dot={{ fill: '#b45309', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="text-sm text-amber-600 font-bold uppercase tracking-wider mb-4">👥 Distribuição por Cargo</div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={membersByRole}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fef3c7', border: '2px solid #b45309', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#b45309" name="Membros" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Guerra */}
      <div className="pt-6 border-t-4 border-gradient-to-r border-amber-300">
        <h2 className="epic-title mb-6">⚔️ Status da Guerra Atual</h2>
        <WarStatus />
      </div>

      {/* Raid Capital */}
      <div className="pt-6 border-t-4 border-gradient-to-r border-purple-300">
        <h2 className="epic-title mb-6">💪 Raid Capital - Ranking</h2>
        <RaidsStatus />
      </div>

      {/* Info Rápida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card border-l-4 border-green-600 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✅</span>
            <p className="text-sm text-green-700 font-bold">MEMBROS ATIVOS</p>
          </div>
          <p className="text-4xl font-black text-green-900 mt-2">{activeMembers}</p>
          <div className="w-full bg-green-200 rounded-full h-3 mt-3 progress-epic">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: `${(activeMembers/total)*100}%`}}></div>
          </div>
          <p className="text-xs text-green-700 font-semibold mt-2">{Math.round((activeMembers/total)*100)}% do clã</p>
        </div>
        <div className="card border-l-4 border-orange-600 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💪</span>
            <p className="text-sm text-orange-700 font-bold">SAÚDE DO CLÃ</p>
          </div>
          <p className="text-4xl font-black text-orange-900 mt-2">{Math.round((activeMembers/total)*100)}%</p>
          <div className="w-full bg-orange-200 rounded-full h-3 mt-3 progress-epic">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all" style={{width: `${(activeMembers/total)*100}%`}}></div>
          </div>
          <p className="text-xs text-orange-700 font-semibold mt-2">Excelente estado</p>
        </div>
        <div className="card border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💤</span>
            <p className="text-sm text-blue-700 font-bold">INATIVOS</p>
          </div>
          <p className="text-4xl font-black text-blue-900 mt-2">{inactiveMembers}</p>
          <div className="w-full bg-blue-200 rounded-full h-3 mt-3 progress-epic">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all" style={{width: `${(inactiveMembers/total)*100}%`}}></div>
          </div>
          <p className="text-xs text-blue-700 font-semibold mt-2">sem doações</p>
        </div>
      </div>
    </div>
  )
}
