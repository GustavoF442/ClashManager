import React, { useState } from 'react'
import AlertBox from '../components/AlertBox.jsx'

export default function Settings() {
  const [settings, setSettings] = useState({
    autoSync: true,
    syncInterval: 3600,
    notifications: true,
    theme: 'amber',
    language: 'pt-BR',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSave = () => {
    localStorage.setItem('mete-ou-late-settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setSettings({
      autoSync: true,
      syncInterval: 3600,
      notifications: true,
      theme: 'amber',
      language: 'pt-BR',
    })
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900">⚙️ Configurações</h2>
        <p className="text-sm text-amber-700 mt-1">Personalize sua experiência no METE OU LATE</p>
      </div>

      {saved && (
        <AlertBox
          type="success"
          title="✅ Salvo com sucesso"
          message="Suas configurações foram atualizadas"
        />
      )}

      {/* Sincronização */}
      <div className="card">
        <h3 className="text-lg font-bold text-amber-900 mb-4">🔄 Sincronização</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
            <div>
              <p className="font-semibold text-amber-900">Sincronização Automática</p>
              <p className="text-sm text-amber-700">Atualizar dados automaticamente</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={(e) => handleChange('autoSync', e.target.checked)}
              className="w-6 h-6 rounded accent-amber-600"
            />
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <label className="block font-semibold text-amber-900 mb-2">
              Intervalo de Sincronização (segundos)
            </label>
            <input
              type="number"
              value={settings.syncInterval}
              onChange={(e) => handleChange('syncInterval', parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded border border-amber-300 focus:ring-2 focus:ring-amber-600"
            />
            <p className="text-xs text-amber-700 mt-2">
              Padrão: 3600 segundos (1 hora)
            </p>
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="card">
        <h3 className="text-lg font-bold text-amber-900 mb-4">🔔 Notificações</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-semibold text-blue-900">Alertas de Guerra</p>
              <p className="text-sm text-blue-700">Receber notificações sobre guerras</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
              className="w-6 h-6 rounded accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <p className="font-semibold text-purple-900">Alertas de Inativos</p>
              <p className="text-sm text-purple-700">Alertar sobre membros inativos</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-6 h-6 rounded accent-purple-600"
            />
          </div>
        </div>
      </div>

      {/* Aparência */}
      <div className="card">
        <h3 className="text-lg font-bold text-amber-900 mb-4">🎨 Aparência</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-amber-900 mb-2">Tema</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2 rounded border border-amber-300 focus:ring-2 focus:ring-amber-600"
            >
              <option value="amber">🔶 Amber (Padrão)</option>
              <option value="orange">🟠 Orange</option>
              <option value="blue">🔵 Blue</option>
              <option value="purple">🟣 Purple</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-amber-900 mb-2">Idioma</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 rounded border border-amber-300 focus:ring-2 focus:ring-amber-600"
            >
              <option value="pt-BR">🇧🇷 Português (Brasil)</option>
              <option value="en-US">🇺🇸 English (USA)</option>
              <option value="es-ES">🇪🇸 Español (España)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dados & Privacidade */}
      <div className="card">
        <h3 className="text-lg font-bold text-amber-900 mb-4">📊 Dados & Privacidade</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 rounded-lg bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition">
            📥 Importar Configurações
          </button>
          <button className="w-full px-4 py-2 rounded-lg bg-green-100 text-green-900 font-semibold hover:bg-green-200 transition">
            📤 Exportar Configurações
          </button>
          <button className="w-full px-4 py-2 rounded-lg bg-orange-100 text-orange-900 font-semibold hover:bg-orange-200 transition">
            🗑️ Limpar Cache Local
          </button>
        </div>
      </div>

      {/* Sobre */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600">
        <h3 className="text-lg font-bold text-amber-900 mb-2">ℹ️ Sobre</h3>
        <p className="text-sm text-amber-800 mb-2">
          <strong>METE OU LATE v0.2.0</strong> - Dashboard Estratégico de Clã para Clash of Clans
        </p>
        <p className="text-xs text-amber-700">
          Desenvolvido com React, FastAPI e TailwindCSS • Código aberto • MIT License
        </p>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition shadow-lg"
        >
          ✅ Salvar Configurações
        </button>
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold transition shadow-lg"
        >
          🔄 Restaurar Padrões
        </button>
      </div>
    </div>
  )
}
