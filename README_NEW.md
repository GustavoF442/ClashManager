# ClashManager 2.0 

**Dashboard completo para gerenciamento de clãs do Clash of Clans com status em tempo real, rankings, históricos e alertas automáticos.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/versão-0.2.0-blue)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![React](https://img.shields.io/badge/react-18%2B-61dafb)

---

## 🎯 Funcionalidades

### Dashboard Principal
- 📊 KPIs do clã (membros, média de troféus, top doador)
- ⚔️ Status em tempo real da guerra (placar, ataques, quem falta atacar)
- 💪 Status da raid capital (loot, ranking de contribuição)
- 📈 Gráficos de doações

### Membros
- 👥 Tabela interativa com sorting e filtros
- 🏆 Ordenação por ranking, troféus, doações
- 🎨 Cores por cargo (Líder, Co-Líder, Elder, Membro)
- ⚡ Emojis de liga para visualização rápida

### Guerras
- 🎯 Histórico completo de guerras
- 📋 Lista de membros que faltam atacar
- 🔄 Últimos ataques realizados
- 📊 Estatísticas de destruição e estrelas

### Raids
- 🏅 Ranking de membros por contribuição
- 📈 KPIs da temporada (ataques, loot, distritos)
- 📚 Histórico das últimas 3 temporadas
- 💯 Dano médio por membro

---

## 🚀 Quick Start

### Pré-requisitos
- Python 3.10+
- Node.js 16+
- Token JWT da API do Clash of Clans ([obter aqui](https://developer.clashofclans.com/))

### Instalação Rápida (Windows)

#### 1. Backend

```bash
cd backend

# Criar e ativar virtualenv
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
copy .env.example .env
# Edite .env e adicione seu token e tag do clã
```

#### 2. Frontend

```bash
cd ../frontend

# Instalar dependências
npm install
```

#### 3. Rodar Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
.\\.venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📦 Estrutura do Projeto

```
ClashManager/
├── backend/
│   ├── app/
│   │   ├── main.py           # Rotas FastAPI
│   │   ├── coc_client.py     # Cliente da API Clash of Clans
│   │   ├── db.py             # Modelos do banco de dados
│   │   ├── scheduler.py      # Agendador automático
│   │   └── alerts.py         # Sistema de alertas
│   ├── .env                  # Configurações (não versionado)
│   ├── requirements.txt      # Dependências Python
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas principais
│   │   ├── services/api.js   # Comunicação com backend
│   │   ├── hooks/            # Hooks customizados
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── DEVELOPMENT.md            # Guia completo de desenvolvimento
├── FEATURES.md               # Funcionalidades implementadas
├── CHANGELOG.md              # Histórico de versões
└── README.md                 # Este arquivo
```

---

## ⚙️ Configuração

### Backend (.env)

```env
# API Clash of Clans (obrigatório)
COC_API_TOKEN=seu_token_jwt_aqui
CLAN_TAG=#2GL2CYGLO

# Banco de dados
DATABASE_URL=sqlite:///clash.db

# Agendador (sincronização a cada X segundos)
SYNC_INTERVAL=3600

# Alertas (opcional)
ALERT_METHOD=discord
ALERT_INTERVAL=1800
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

**Como obter o token:**
1. Acesse https://developer.clashofclans.com/
2. Faça login com sua conta
3. Crie uma aplicação
4. Copie o token JWT
5. Configure em `.env`

---

## 🔌 API Endpoints

### Membros
- `GET /api/members` — Lista todos os membros sincronizados
- `POST /api/sync` — Sincroniza membros manualmente

### Guerra
- `GET /api/currentwar` — Status atual da guerra (quem atacou, quem falta, placar)
- `GET /api/warlog` — Histórico completo de guerras

### Raids
- `GET /api/capitalraidseasons?limit=3` — Últimas 3 temporadas de raid

### Clã
- `GET /api/claninfo` — Informações gerais do clã

### Docs Interativa
- `GET /` → http://127.0.0.1:8000/docs (Swagger UI)

---

## 🎨 Interface

### Dashboard
- Visualização em tempo real de guerra
- KPIs do clã
- Gráficos de desempenho

### Membros
- Tabela interativa
- Sorting por qualquer coluna
- Filtros por cargo e liga

### Guerras
- Placar ao vivo
- Lista de quem falta atacar
- Histórico de ataques

---

## 📱 Responsividade

✅ Desktop (≥ 1024px)  
✅ Tablet (768px - 1023px)  
✅ Mobile (< 768px)

Teste em diferentes tamanhos:
```bash
# Em tempo real
npm run dev
# Abra DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
```

---

## 🔄 Sincronização Automática

A sincronização ocorre automaticamente a cada intervalo configurado em `SYNC_INTERVAL` (padrão: 3600 segundos = 1 hora).

Para sincronizar manualmente:
- Clique em **"Atualizar agora"** no topo da página
- Ou use: `curl -X POST http://127.0.0.1:8000/api/sync`

---

## 🚨 Alertas e Lembretes

Sistema de alertas automáticos para:
- ⚔️ Guerra terminando em breve
- 🔴 Membros que não atacaram
- 💪 Raid capital ativa
- 🔔 Horários críticos

Configurar alertas no `.env`:
```env
ALERT_METHOD=discord  # discord, telegram ou console
ALERT_INTERVAL=1800   # A cada 30 minutos
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

---

## 🛠️ Desenvolvimento

Para contribuir ou estender funcionalidades, consulte [DEVELOPMENT.md](DEVELOPMENT.md).

**Resumo rápido:**

```bash
# Backend: adicionar novo endpoint
# 1. Implementar em app/main.py
# 2. Testar em /docs
# 3. Atualizar frontend em services/api.js

# Frontend: adicionar novo componente
# 1. Criar em src/components/ (se reutilizável)
# 2. Importar em página correspondente
# 3. Testar responsividade
```

---

## 📊 Technologia Stack

| Camada | Tecnologia |
|--------|------------|
| Backend | FastAPI, APScheduler, SQLAlchemy |
| Frontend | React 18, TailwindCSS, Recharts, Axios |
| Banco | SQLite (dev), MySQL (prod) |
| API | Clash of Clans Official API |

---

## 📝 Licença

Este projeto é de código aberto para uso pessoal e educacional.

---

## 🤝 Contribuições

Melhorias e sugestões são bem-vindas! 

**Como contribuir:**
1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit: `git commit -m "Adiciona nova feature"`
4. Push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 🐛 Problemas Conhecidos

- ⚠️ Alertas Discord requerem configuração manual do webhook
- ⚠️ Sincronização pode levar alguns segundos em conexões lentas
- ⚠️ Dados históricos requerem múltiplas sincronizações

**Soluções:**
- Verifique se `DISCORD_WEBHOOK_URL` está correto no `.env`
- Aumente `SYNC_INTERVAL` se enfrentar rate limiting
- Use `POST /api/sync` para sincronizar manualmente

---

## 📚 Recursos Úteis

- [Guia de Desenvolvimento](DEVELOPMENT.md)
- [Funcionalidades Implementadas](FEATURES.md)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Clash of Clans API](https://developer.clashofclans.com/)

---

## 📞 Suporte

Dúvidas ou problemas? 

- 📖 Consulte [DEVELOPMENT.md](DEVELOPMENT.md) para orientações técnicas
- 🐛 Abra uma issue no GitHub
- 💬 Envie um email para suporte

---

**ClashManager 2.0** — Gerenciando clãs com estilo 🎮  
Última atualização: 31 de outubro de 2025 | v0.2.0
