import React from 'react'
import AlertBox from '../components/AlertBox.jsx'

export default function About() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="card bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-2">⚔️ METE OU LATE</h1>
        <p className="text-lg font-semibold text-amber-100">
          Dashboard Estratégico para Clãs de Clash of Clans
        </p>
        <p className="text-sm text-amber-200 mt-2">v0.2.0 • Desenvolvido com ❤️</p>
      </div>

      <AlertBox
        type="info"
        title="🚀 Bem-vindo ao METE OU LATE"
        message="A plataforma completa para gerenciar seu clã em Clash of Clans com dados em tempo real e análises profundas."
      />

      {/* O que é */}
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">🎯 O Que é METE OU LATE?</h2>
        <p className="text-amber-800 mb-4">
          METE OU LATE é um dashboard web moderno e responsivo que oferece gerenciamento completo de clãs em Clash of Clans. 
          Com acesso em tempo real a dados de membros, guerras e raids capitais, você pode tomar decisões estratégicas com informações 
          precisas e atualizadas.
        </p>
        <p className="text-amber-700 text-sm">
          <strong>Frase de efeito:</strong> "Você ataca ou vai ficar para a próxima?" 💪🏆
        </p>
      </div>

      {/* Features */}
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">✨ Funcionalidades Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '📊', title: 'Dashboard', desc: 'Resumo completo com KPIs e gráficos' },
            { icon: '👥', title: 'Membros', desc: 'Gerenciar e analisar membros do clã' },
            { icon: '⚔️', title: 'Guerras', desc: 'Status em tempo real de guerras' },
            { icon: '💪', title: 'Raids', desc: 'Ranking e análise de raids capitais' },
            { icon: '📈', title: 'Estatísticas', desc: 'Gráficos e métricas completas' },
            { icon: '🔍', title: 'Análise', desc: 'Busca avançada e filtros inteligentes' },
          ].map((f, i) => (
            <div key={i} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <p className="text-3xl mb-2">{f.icon}</p>
              <p className="font-bold text-amber-900">{f.title}</p>
              <p className="text-sm text-amber-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Técnico */}
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">🛠️ Stack Tecnológico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-3">🔧 Backend</h3>
            <ul className="space-y-2">
              <li className="text-sm text-blue-800">• <strong>FastAPI</strong> - Framework web rápido</li>
              <li className="text-sm text-blue-800">• <strong>Python 3.10+</strong> - Linguagem robusta</li>
              <li className="text-sm text-blue-800">• <strong>APScheduler</strong> - Automação de tarefas</li>
              <li className="text-sm text-blue-800">• <strong>SQLAlchemy</strong> - ORM para banco de dados</li>
              <li className="text-sm text-blue-800">• <strong>SQLite</strong> - Banco de dados</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3">🎨 Frontend</h3>
            <ul className="space-y-2">
              <li className="text-sm text-purple-800">• <strong>React 18+</strong> - Biblioteca UI</li>
              <li className="text-sm text-purple-800">• <strong>Vite 5.4</strong> - Build tool moderno</li>
              <li className="text-sm text-purple-800">• <strong>TailwindCSS</strong> - Estilização utility</li>
              <li className="text-sm text-purple-800">• <strong>Recharts</strong> - Gráficos</li>
              <li className="text-sm text-purple-800">• <strong>Axios</strong> - Cliente HTTP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">🗺️ Roadmap</h2>
        <div className="space-y-3">
          {[
            { version: 'v0.2.0', status: '✅ Atual', features: 'Dashboard, Membros, Guerras, Raids, Estatísticas' },
            { version: 'v0.3.0', status: '🔜 Próximo', features: 'Histórico, Análise temporal, Gráficos avançados' },
            { version: 'v0.4.0', status: '⏳ Futuro', features: 'Alertas Discord, Autenticação, Permissões' },
            { version: 'v1.0.0', status: '🌟 Release', features: 'PWA, PWA installável, i18n, Temas' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-slate-900">{item.version}</p>
                <span className="text-xs font-semibold text-slate-700">{item.status}</span>
              </div>
              <p className="text-sm text-slate-700">{item.features}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Time */}
      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">👥 Desenvolvido Por</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="font-bold text-green-900">👨‍💻 Full Stack Developer</p>
            <p className="text-sm text-green-700 mt-2">
              Responsável pelo desenvolvimento completo do projeto, desde o backend até o frontend, integração com APIs e deployment.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <p className="font-bold text-blue-900">🤖 Suporte por IA</p>
            <p className="text-sm text-blue-700 mt-2">
              Assistência em desenvolvimento, otimização de código, best practices e suporte contínuo.
            </p>
          </div>
        </div>
      </div>

      {/* Contribuições */}
      <div className="card border-l-4 border-green-600 bg-gradient-to-r from-green-50 to-emerald-50">
        <h2 className="text-2xl font-bold text-green-900 mb-4">🤝 Como Contribuir</h2>
        <ol className="space-y-2 text-green-800">
          <li className="text-sm"><strong>1.</strong> Fork do repositório</li>
          <li className="text-sm"><strong>2.</strong> Crie uma branch para sua feature (git checkout -b feature/nova-feature)</li>
          <li className="text-sm"><strong>3.</strong> Commit suas mudanças (git commit -m "feat: descrição")</li>
          <li className="text-sm"><strong>4.</strong> Push para a branch (git push origin feature/nova-feature)</li>
          <li className="text-sm"><strong>5.</strong> Abra um Pull Request</li>
        </ol>
      </div>

      {/* Licença */}
      <div className="card bg-slate-50">
        <h3 className="text-lg font-bold text-slate-900 mb-2">📜 Licença</h3>
        <p className="text-sm text-slate-700">
          METE OU LATE é distribuído sob a licença MIT, o que significa que você é livre para usar, modificar e distribuir 
          este software, desde que inclua uma cópia da licença original.
        </p>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg">
          📚 Documentação
        </button>
        <button className="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold transition shadow-lg">
          🐛 Reportar Bug
        </button>
        <button className="px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition shadow-lg">
          ⭐ GitHub
        </button>
        <button className="px-4 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold transition shadow-lg">
          💬 Suporte
        </button>
      </div>

      {/* Footer */}
      <div className="card text-center border-t-2 border-amber-300">
        <p className="text-sm text-amber-800">
          Feito com ❤️ para a comunidade de Clash of Clans
        </p>
        <p className="text-xs text-amber-700 mt-2">
          © 2025 METE OU LATE • Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}
