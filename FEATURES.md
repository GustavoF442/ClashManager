# ⚔️ METE OU LATE - Dashboard de Controle de Clã

Sistema de gerenciamento em tempo real para Clash of Clans com dashboards ricos, alertas automáticos e análise de performance.

## 🎯 Features Implementadas

### 1. **Dashboard Principal**
- Resumo de membros e média de troféus
- Top doador do clã
- Gráfico de doações (visual)
- Status atual da guerra
- Status da raid capital

### 2. **⚔️ Página de Guerras**
- **Status da Guerra em Tempo Real**
  - Placar de estrelas
  - Percentual de destruição
  - Ataques disponíveis (com barra de progresso)
  - **Lista de quem falta atacar** (destacado em amarelo)
  - Últimos ataques realizados com detalhes

- **Histórico de Guerras**
  - Últimas guerras do clã
  - Resultados, estrelas e destruição

### 3. **💪 Página de Raids**
- **Status da Raid Capital**
  - Temporada atual
  - Total de ataques
  - Loot total conquistado
  - Distritos destruídos
  
- **Ranking de Contribuição**
  - Membros ordenados por estrelas
  - Número de ataques por membro
  - Dano médio
  
- **Histórico de Temporadas**
  - Últimas 3 temporadas com estatísticas

### 4. **👥 Página de Membros**
- Tabela interativa com sorting
- Códigos de cores por cargo:
  - 🟡 Líder
  - 🟣 Co-Lider
  - 🔵 Elder
  - ⚪ Membro
- Emojis de liga
- Ordenação por ranking, nome, troféus, doações

## 🚀 Endpoints API

### Membros
- `GET /api/members` — Lista todos os membros
- `POST /api/sync` — Sincroniza membros manualmente

### Guerra
- `GET /api/currentwar` — Status atual da guerra (quem atacou, quem falta, etc.)
- `GET /api/warlog` — Histórico de guerras

### Raids
- `GET /api/capitalraidseasons?limit=3` — Últimas temporadas de raid

### Clã
- `GET /api/claninfo` — Informações gerais do clã

## 📊 Visualizações Principais

### Guerra
```
Status em Tempo Real
├─ Placar (Estrelas vs Destruição)
├─ Ataques Restantes (barra de progresso)
├─ Quem Falta Atacar (nome dos membros)
└─ Histórico de Ataques (últimas ações)
```

### Raids
```
Temporada Atual
├─ KPIs (ataques, loot, distritos)
├─ Ranking de Membros (por contribuição)
└─ Histórico (últimas 3 temporadas)
```

### Membros
```
Tabela Interativa
├─ Ordenação por: Ranking, Nome, Troféus, Doações
├─ Indicadores: Cargo, Nível, Liga
└─ Doações ↑ e Recebidas ↓
```

## 🔧 Como Usar

### Backend
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

API em: `http://127.0.0.1:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

UI em: `http://localhost:5173/`

## ⚙️ Configuração

1. Edite `backend/.env`:
```env
COC_API_TOKEN=seu_token_jwt_aqui
CLAN_TAG=#sua_tag_aqui
```

2. O scheduler sincroniza automaticamente a cada 5 minutos
3. A API atualiza dados em tempo real

## 📈 Tecnologias

- **Backend**: FastAPI, Python, APScheduler
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **API**: Clash of Clans Official API

## 💡 Recursos Principais

✅ Visualização de guerra em tempo real  
✅ Ranking de contribuição em raids  
✅ Lista de quem falta atacar  
✅ Sincronização automática de dados  
✅ Dashboard responsivo  
✅ Tabela de membros com sorting  
✅ Histórico de guerras e raids  

---

**Desenvolvido para auxiliar líderes e co-líderes no controle do clã!**
