import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

export default function ActivityChart({ data, title = "Atividade" }) {
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4 text-amber-900">{title}</h3>
      {data && data.length > 0 ? (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b' }}
              />
              <Legend />
              <Bar dataKey="value" fill="#b45309" name="Atividade" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-slate-400 text-center py-8">Sem dados disponíveis</p>
      )}
    </div>
  )
}
