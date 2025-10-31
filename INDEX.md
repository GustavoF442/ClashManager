# ⚔️ METE OU LATE - Documentação Completa

Bem-vindo ao **METE OU LATE**! Este é o índice completo da documentação do dashboard de clã.

---

## 📖 Guias Principais

### Para Usuários
1. **[README.md](README.md)** - Como usar o dashboard
   - Instalação e configuração inicial
   - Configuração do token da API
   - Como usar a interface

2. **[FEATURES.md](FEATURES.md)** - Funcionalidades implementadas
   - Dashboard principal
   - Página de guerras
   - Página de raids
   - Tabela de membros

### Para Desenvolvedores
1. **[DEVELOPMENT.md](DEVELOPMENT.md)** - Guia completo de desenvolvimento
   - Regras backend (FastAPI, banco de dados, agendador)
   - Regras frontend (React, TailwindCSS, componentes)
   - Padrões de código e estilo
   - Fluxo de desenvolvimento

2. **[CHANGELOG.md](CHANGELOG.md)** - Histórico de versões
   - v0.2.0 (atual) - Funcionalidades implementadas
   - v0.1.0 - Versão inicial
   - Roadmap futuro

3. **[TODO.md](TODO.md)** - Tarefas e features planejadas
   - Prioridade alta (v0.3.0 e v0.4.0)
   - Prioridade média (v0.5.0)
   - Bugs conhecidos
   - Refatorações técnicas

---

## 🏗️ Arquitetura do Projeto

```
ClashManager/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── main.py         # Rotas e endpoints
│   │   ├── coc_client.py   # Cliente API Clash of Clans
│   │   ├── db.py           # Modelos do banco
│   │   ├── scheduler.py    # Agendador (APScheduler)
│   │   └── alerts.py       # Sistema de alertas
│   ├── .env                # Configurações (não versionado)
│   └── requirements.txt    # Dependências Python
│
├── frontend/               # Interface React + TailwindCSS
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── WarStatus.jsx
│   │   │   ├── RaidsStatus.jsx
│   │   │   ├── MembersTable.jsx
│   │   │   └── ...
│   │   ├── pages/          # Páginas principais
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Members.jsx
│   │   │   ├── Wars.jsx
│   │   │   └── Raids.jsx
│   │   ├── services/
│   │   │   └── api.js      # Comunicação com backend
│   │   ├── hooks/          # Hooks customizados
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Documentação/
│   ├── README.md           # Este arquivo de índice
│   ├── README_NEW.md       # Guia do usuário
│   ├── DEVELOPMENT.md      # Guia do desenvolvedor
│   ├── FEATURES.md         # Funcionalidades
│   ├── CHANGELOG.md        # Histórico
│   └── TODO.md             # Tarefas planejadas
```

---

## 🚀 Quick Start

### Setup Rápido (3 minutos)

```bash
# Backend
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
copy .env.example .env
# Edite .env com seu token e clan tag
.\\.venv\\Scripts\\python.exe -m uvicorn app.main:app --reload

# Frontend (novo terminal)
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📋 Checklist para Iniciantes

- [ ] Li [README.md](README_NEW.md) e entendi como rodar o projeto
- [ ] Configurei meu token JWT em `backend/.env`
- [ ] Backend rodando em http://127.0.0.1:8000
- [ ] Frontend rodando em http://localhost:5173
- [ ] Cliquei em "Atualizar agora" para sincronizar dados
- [ ] Explorei todas as páginas (Dashboard, Membros, Guerras, Raids)

---

## 🔧 Desenvolvimento

### Para Adicionar Nova Feature

1. **Ler [DEVELOPMENT.md](DEVELOPMENT.md)**
   - Seção "Regras para Desenvolvimento"
   - Seção "Fluxo de Desenvolvimento"

2. **Escolher entre Backend ou Frontend:**

   **Backend:**
   - Adicionar endpoint em `app/main.py`
   - Testar em http://127.0.0.1:8000/docs
   - Atualizar `services/api.js` no frontend

   **Frontend:**
   - Criar componente em `src/components/` (se reutilizável)
   - Integrar em página correspondente
   - Testar responsividade (desktop, tablet, mobile)

3. **Documentação:**
   - Atualizar `CHANGELOG.md` (nova entrada em versionning)
   - Atualizar `FEATURES.md` (if relevant)
   - Atualizar `DEVELOPMENT.md` (if changing patterns)

---

## 🎯 Funcionalidades Atuais (v0.2.0)

### ✅ Implementado

**Backend (API)**
- ✅ Sincronização automática de membros
- ✅ Status em tempo real de guerra (`GET /api/currentwar`)
- ✅ Status de raid capital (`GET /api/capitalraidseasons`)
- ✅ Histórico de guerras (`GET /api/warlog`)
- ✅ Informações do clã (`GET /api/claninfo`)
- ✅ Sincronização manual (`POST /api/sync`)

**Frontend (Interface)**
- ✅ Dashboard com KPIs
- ✅ Status da guerra com placar e membros que faltam atacar
- ✅ Ranking de raid capital
- ✅ Tabela de membros com sorting
- ✅ Página de histórico de guerras
- ✅ Página de histórico de raids
- ✅ Responsividade (desktop, tablet, mobile)
- ✅ Gráficos com Recharts

---

## 📊 Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Backend | FastAPI | 0.115.0 |
| Framework Task | APScheduler | 3.10.4 |
| ORM | SQLAlchemy | (via FastAPI) |
| HTTP Client | requests | 2.32.3 |
| Frontend | React | 18+ |
| Build Tool | Vite | 5.4.21 |
| Styling | TailwindCSS | 3+ |
| Gráficos | Recharts | Latest |
| HTTP Client | Axios | Latest |
| Banco | SQLite (dev) | - |

---

## 🎨 Design System

### Cores
- **Primária:** Azul (`blue-600`)
- **Secundária:** Roxo (`purple-600`)
- **Neutro:** Slate (cinza)
- **Sucesso:** Verde
- **Alerta:** Amarelo
- **Erro:** Vermelho

### Componentes Base
- **Card:** `card p-6 rounded-lg shadow-sm border border-slate-100`
- **Button:** `px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700`
- **Input:** `w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500`

---

## 🐛 Troubleshooting

### Backend não conecta à API
**Problema:** `ModuleNotFoundError: No module named 'app'`
- **Solução:** Verifique se está no diretório `backend/` antes de rodar o comando

### Frontend vazio
**Problema:** Tela branca em http://localhost:5173
- **Solução:** 
  1. Verifique logs do Vite (terminal do frontend)
  2. Abra console do navegador (F12)
  3. Verifique se backend está rodando em http://127.0.0.1:8000

### Sincronização falha
**Problema:** "Erro ao sincronizar. Verifique o backend/.env."
- **Solução:**
  1. Verifique se `COC_API_TOKEN` e `CLAN_TAG` estão configurados em `backend/.env`
  2. Verifique se o token não expirou (vai para https://developer.clashofclans.com/)
  3. Verifique se tem acesso à internet

---

## 📞 Suporte

### Perguntas Técnicas
- Consulte [DEVELOPMENT.md](DEVELOPMENT.md) - Seção "Regras" tem respostas para dúvidas comuns

### Relatar Bugs
- Crie um issue no GitHub com:
  - Descrição do problema
  - Passos para reproduzir
  - Screenshots (se aplicável)
  - Logs (backend e frontend)

### Sugestões de Features
- Consulte [TODO.md](TODO.md) para ver roadmap
- Abra um issue com tag `enhancement`

---

## 📚 Recursos Externos

### Documentação Oficial
- [FastAPI](https://fastapi.tiangolo.com/) - Framework backend
- [React](https://react.dev/) - Framework frontend
- [TailwindCSS](https://tailwindcss.com/) - Estilização
- [Clash of Clans API](https://developer.clashofclans.com/) - Integração

### Tutoriais
- Python: https://docs.python.org/3/
- JavaScript/React: https://javascript.info/
- CSS/TailwindCSS: https://www.youtube.com/results?search_query=tailwindcss

---

## 🤝 Contribuindo

Para contribuir:

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Siga as regras em [DEVELOPMENT.md](DEVELOPMENT.md)
4. Faça commit: `git commit -m "feat: descrição"`
5. Atualize [CHANGELOG.md](CHANGELOG.md)
6. Push: `git push origin feature/sua-feature`
7. Abra um Pull Request

---

## 📄 Estrutura de Documentação

```
docs/
├── README.md              # Este arquivo (índice)
├── README_NEW.md          # Guia do usuário
├── DEVELOPMENT.md         # Guia do desenvolvedor
├── FEATURES.md            # Funcionalidades
├── CHANGELOG.md           # Histórico de versões
├── TODO.md                # Tarefas planejadas
└── screenshots/           # (opcional) Imagens da interface
```

---

## 📈 Roadmap Geral

```
v0.2.0 (Atual) ✅
├─ Dashboard com KPIs
├─ Status de guerra em tempo real
├─ Ranking de raid capital
└─ Tabela de membros com sorting

v0.3.0 (Próximo)
├─ Histórico e evolução de dados
├─ Página de estatísticas
└─ Análise de padrões

v0.4.0
├─ Alertas automáticos (Discord/Telegram)
├─ Sistema de login
└─ Logs de entradas/saídas

v0.5.0
├─ Suporte multi-clã
├─ Exportações (PDF, CSV)
└─ Integração com Discord Bot

v1.0.0
├─ PWA (instalável no celular)
├─ Temas customizáveis
└─ Suporte a múltiplos idiomas
```

---

## 📌 Pontos-Chave

✅ **Iniciante?** Comece com [README.md](README_NEW.md)  
✅ **Quer desenvolver?** Leia [DEVELOPMENT.md](DEVELOPMENT.md)  
✅ **Quer saber o que existe?** Veja [FEATURES.md](FEATURES.md)  
✅ **Quer saber o que vem?** Consulte [TODO.md](TODO.md)  
✅ **Quer ver mudanças?** Abra [CHANGELOG.md](CHANGELOG.md)  

---

**ClashManager 2.0** — Sistema completo de gerenciamento de clãs Clash of Clans  
**Última atualização:** 31 de Outubro de 2025  
**Versão:** 0.2.0  
**Status:** ✅ Em Desenvolvimento Ativo
