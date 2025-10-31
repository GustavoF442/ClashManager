# ⚔️ METE OU LATE - Guia de Desenvolvimento

O **METE OU LATE** é um sistema completo de gerenciamento e monitoramento de clãs em Clash of Clans. Ele fornece informações em tempo real sobre membros, guerras, raids da capital, estatísticas e alertas automáticos. O sistema é dividido em backend FastAPI e frontend React, com integração direta à API oficial da Supercell e suporte a automações e notificações externas.

## Estrutura do Projeto

```
ClashManager/
│
├── backend/
│   ├── app/
│   │   ├── main.py              # Rotas FastAPI
│   │   ├── coc_client.py        # Comunicação com a API Clash of Clans
│   │   ├── db.py                # Modelos e persistência de dados
│   │   ├── scheduler.py         # Agendador de tarefas (APScheduler)
│   │   ├── alerts.py            # Sistema de lembretes e alertas automáticos
│   │   ├── utils.py             # Funções auxiliares
│   │   └── __init__.py
│   ├── .env                     # Contém COC_API_TOKEN, CLAN_TAG e variáveis do sistema
│   ├── requirements.txt
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/          # Componentes reutilizáveis (tabelas, cards, gráficos)
    │   │   ├── WarStatus.jsx    # Status da guerra em tempo real
    │   │   ├── RaidsStatus.jsx  # Status da raid capital
    │   │   ├── MembersTable.jsx # Tabela interativa de membros
    │   │   ├── Navbar.jsx       # Navegação principal
    │   │   ├── StatCard.jsx     # Cards KPI
    │   │   └── ...
    │   ├── pages/               # Páginas principais
    │   │   ├── Dashboard.jsx    # Visão geral e KPIs
    │   │   ├── Members.jsx      # Lista de membros
    │   │   ├── Wars.jsx         # Histórico e status de guerras
    │   │   ├── Raids.jsx        # Histórico e status de raids
    │   │   └── ...
    │   ├── services/api.js      # Comunicação com o backend (Axios)
    │   ├── hooks/               # Hooks personalizados
    │   ├── App.jsx              # Componente raiz
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    ├── package.json
    └── postcss.config.js
│
├── FEATURES.md                  # Funcionalidades implementadas
├── DEVELOPMENT.md               # Este arquivo
├── README.md                    # Guia de uso
└── CHANGELOG.md                 # Histórico de versões
```

## Tecnologias Utilizadas

### Backend
- **FastAPI**: Framework web moderno e rápido
- **APScheduler**: Agendador de tarefas automáticas
- **SQLAlchemy**: ORM para banco de dados
- **python-dotenv**: Gerenciamento de variáveis de ambiente
- **requests**: Comunicação HTTP com a API do Clash of Clans

### Frontend
- **React 18+**: Biblioteca UI
- **TailwindCSS**: Estilização com utility classes
- **Recharts**: Gráficos e visualizações
- **Axios**: Cliente HTTP
- **Vite**: Build tool e dev server

### Banco de Dados
- **SQLite**: Desenvolvimento local
- **MySQL**: Produção (configurável)

### Integrações Externas
- API oficial do Clash of Clans
- Discord Webhooks (opcional)
- Telegram Bot API (opcional)

---

## Regras para Desenvolvimento Backend

### 1. Padrões de Rotas e Respostas

✅ Todas as rotas devem começar com o prefixo `/api/`.

✅ Seguir padrão RESTful e retornar sempre `application/json`.

✅ Toda resposta deve conter estrutura padronizada:

```python
# Sucesso
{ "success": true, "data": {...}, "message": "OK" }

# Erro
{ "success": false, "error": "Descrição do erro", "status_code": 400 }
```

### 2. Configuração do Banco de Dados

O banco padrão no ambiente local é **SQLite**, configurável via variável de ambiente:

```python
# db.py
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///clash.db")
engine = create_engine(DATABASE_URL)
```

Para MySQL em produção:
```env
DATABASE_URL=mysql+pymysql://user:password@localhost/clashmanager
```

### 3. Modelos de Dados

Todos os modelos devem usar **SQLAlchemy** com `declarative_base()`:

```python
# db.py
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Member(Base):
    """Modelo de membro do clã."""
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True)
    tag = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String)
    trophies = Column(Integer, default=0)
    donations = Column(Integer, default=0)
    donations_received = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### 4. Comunicação com API do Clash of Clans

Classe `CocClient` centraliza todas as requisições:

```python
# coc_client.py
class CocClient:
    """Cliente para comunicação com API Clash of Clans."""
    
    def __init__(self, api_token: str, clan_tag: str):
        """Inicializa cliente com token e tag do clã."""
        self.api_token = api_token
        self.clan_tag = clan_tag
    
    def fetch_members(self) -> list:
        """Retorna lista de membros do clã."""
        pass
    
    def fetch_current_war(self) -> dict:
        """Retorna status da guerra atual."""
        pass
    
    def fetch_capital_raid_seasons(self, limit: int = 3) -> list:
        """Retorna últimas temporadas de raid capital."""
        pass
```

### 5. Agendador de Tarefas

Use **APScheduler** para sincronizações automáticas:

```python
# scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler

def start_scheduler(on_tick=None):
    """Inicia agendador de sincronizações automáticas."""
    scheduler = BackgroundScheduler()
    
    # Sincroniza membros a cada intervalo definido
    scheduler.add_job(
        on_tick,
        'interval',
        seconds=int(os.getenv('SYNC_INTERVAL', 3600)),
        id='sync_members'
    )
    
    scheduler.start()
    return scheduler
```

### 6. Variáveis de Ambiente Obrigatórias

Arquivo `.env`:

```env
# API Clash of Clans
COC_API_TOKEN=seu_token_jwt_aqui
CLAN_TAG=#2GL2CYGLO

# Banco de dados
DATABASE_URL=sqlite:///clash.db

# Agendador
SYNC_INTERVAL=3600

# Alertas (opcional)
ALERT_METHOD=discord
ALERT_INTERVAL=1800
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### 7. Docstrings e Código

Toda função deve ter docstring em português:

```python
def fetch_members(self) -> list[dict]:
    """
    Busca lista de membros do clã na API Clash of Clans.
    
    Returns:
        list[dict]: Lista de membros com tag, nome, cargo, troféus, doações.
        
    Raises:
        RuntimeError: Se a requisição falhar.
    """
    pass
```

Seguir **PEP8** e usar **black** para formatação:

```bash
black app/
```

### 8. Tratamento de Erros Padronizado

```python
from fastapi import HTTPException

@app.get("/api/members")
def get_members():
    """Retorna lista de membros sincronizados."""
    if not client:
        raise HTTPException(
            status_code=400,
            detail="Configure COC_API_TOKEN e CLAN_TAG no .env"
        )
    return {"members": list_members()}
```

---

## Regras para Desenvolvimento Frontend

### 1. Responsividade e Layout

✅ Projeto é 100% responsivo com **TailwindCSS**.

✅ Usar grid e flexbox para layouts adaptáveis:

```jsx
// Desktop: 3 colunas, Mobile: 1 coluna
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map((item) => <Card key={item.id} {...item} />)}
</div>
```

### 2. Estrutura de Componentes

Componentes reutilizáveis em `src/components/`:

```jsx
// src/components/StatCard.jsx
export default function StatCard({ title, value, hint }) {
  return (
    <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="text-3xl font-bold text-blue-600 mt-2">{value}</div>
      {hint && <div className="text-xs text-slate-500 mt-2">{hint}</div>}
    </div>
  )
}
```

Componentes específicos de página em `src/pages/`:

```jsx
// src/pages/Wars.jsx
export default function Wars() {
  return (
    <div className="space-y-4">
      <h1>Guerras</h1>
      <WarStatus />
    </div>
  )
}
```

### 3. Comunicação com Backend

Centralizar requisições em `src/services/api.js`:

```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

export async function getMembers() {
  const { data } = await api.get('/members')
  return data.members || []
}

export async function getCurrentWar() {
  try {
    const { data } = await api.get('/currentwar')
    return data
  } catch (e) {
    console.error('Erro ao buscar guerra:', e)
    return null
  }
}

export async function syncNow() {
  const { data } = await api.post('/sync')
  return data
}
```

### 4. Hooks Personalizados

Extrair lógica em hooks reutilizáveis (`src/hooks/`):

```javascript
// src/hooks/useMembers.js
import { useEffect, useState } from 'react'
import { getMembers, syncNow } from '../services/api'

export function useMembers() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function loadMembers() {
    setLoading(true)
    try {
      const m = await getMembers()
      setMembers(m)
    } catch (e) {
      console.error('Erro ao carregar membros:', e)
    } finally {
      setLoading(false)
    }
  }
  
  async function sync() {
    await syncNow()
    await loadMembers()
  }
  
  useEffect(() => { loadMembers() }, [])
  
  return { members, loading, sync }
}
```

Uso em componentes:

```jsx
import { useMembers } from '../hooks/useMembers'

export default function Members() {
  const { members, loading, sync } = useMembers()
  
  return (
    <div>
      <button onClick={sync}>Sincronizar</button>
      <MembersTable data={members} />
    </div>
  )
}
```

### 5. Identidade Visual e Padrões

Cards com estilo uniforme:

```jsx
<div className="card bg-white rounded-lg shadow-sm p-6 border border-slate-100">
  <h2 className="text-lg font-semibold text-slate-900">Título</h2>
  <p className="text-sm text-slate-600 mt-2">Conteúdo</p>
</div>
```

Cores e espaçamento:

- **Cores primárias**: azul (blue-600), roxo (purple-600)
- **Cores secundárias**: slate, gray (neutros)
- **Espaçamento**: `space-y-4`, `gap-4` (16px)
- **Sombras**: `shadow-sm` (desenvolvimento), `shadow-md` (destaque)

### 6. Gráficos com Recharts

Implementar gráficos com legendas e tooltips:

```jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function DonationsChart({ data }) {
  return (
    <div className="card p-6">
      <h3 className="font-bold mb-4">Doações por Membro</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
          />
          <Line 
            type="monotone" 
            dataKey="donations" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

### 7. Formulários e Inputs

Padrão para inputs e formulários:

```jsx
export default function FilterForm({ onFilter }) {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter({ search, role })
  }
  
  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-3">
      <input
        type="text"
        placeholder="Buscar membro..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos os cargos</option>
        <option value="leader">Líder</option>
        <option value="coLeader">Co-Líder</option>
      </select>
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Filtrar
      </button>
    </form>
  )
}
```

---

## Sistema de Alertas e Lembretes

### Módulo `alerts.py`

Gerencia lembretes automáticos de guerras e raids:

```python
# app/alerts.py
import os
import requests
from datetime import datetime

class AlertManager:
    """Gerencia lembretes automáticos e alertas."""
    
    def __init__(self):
        self.alert_method = os.getenv('ALERT_METHOD', 'console')
        self.discord_webhook = os.getenv('DISCORD_WEBHOOK_URL')
    
    def check_war_status(self, war_data: dict):
        """Verifica status da guerra e envia alertas se necessário."""
        if not war_data:
            return
        
        clan = war_data.get('clan', {})
        members = clan.get('members', [])
        attacks = clan.get('attacks', [])
        
        # Encontrar membros que não atacaram
        not_attacked = [
            m['name'] for m in members
            if not any(a['attacker']['tag'] == m['tag'] for a in attacks)
        ]
        
        if not_attacked:
            message = f"🚨 Alerta: {len(not_attacked)} membros ainda não atacaram:\n"
            message += ", ".join(not_attacked)
            
            self.send_alert(message)
    
    def send_alert(self, message: str):
        """Envia alerta pelo método configurado."""
        if self.alert_method == 'discord':
            self._send_discord(message)
        elif self.alert_method == 'telegram':
            self._send_telegram(message)
        else:
            print(f"[ALERTA] {message}")
    
    def _send_discord(self, message: str):
        """Envia mensagem via Discord Webhook."""
        if not self.discord_webhook:
            print("DISCORD_WEBHOOK_URL não configurado")
            return
        
        payload = {
            "content": message,
            "username": "ClashManager Bot"
        }
        
        try:
            requests.post(self.discord_webhook, json=payload, timeout=10)
        except Exception as e:
            print(f"Erro ao enviar alerta Discord: {e}")
```

### Integração no Scheduler

```python
# app/main.py
from app.alerts import AlertManager

alert_manager = AlertManager()

def sync_tick():
    """Sincroniza dados e verifica alertas."""
    if not client:
        return
    
    try:
        # Sincroniza membros
        members = client.fetch_members()
        upsert_members(members)
        
        # Verifica guerra
        war = client.fetch_current_war()
        alert_manager.check_war_status(war)
        
        # Log
        print(f"✅ Sincronização: {len(members)} membros, guerra status OK")
    except Exception as e:
        print(f"❌ Erro na sincronização: {e}")
```

---

## Módulos Principais

### 1. **Dashboard**
Resumo geral do clã com KPIs, gráficos e status em tempo real.

**Componentes:**
- StatCard: Cards com métricas principais
- WarStatus: Status atual da guerra
- RaidsStatus: Status da raid capital
- DonationsChart: Gráfico de doações

**Dados exibidos:**
- Total de membros
- Média de troféus
- Top doador
- Status da guerra (ataques disponíveis, quem falta atacar)
- Status de raids (loot, ranking)

### 2. **Membros**
Listagem detalhada com ordenação, filtros e histórico.

**Features:**
- Tabela interativa com sorting por: ranking, nome, troféus, doações
- Filtro por cargo (Líder, Co-Líder, Elder, Membro)
- Cores por cargo e emojis de liga
- Histórico de mudanças de rank

### 3. **Guerras**
Histórico completo e status da guerra atual.

**Funcionalidades:**
- Status em tempo real (placar, destruição, ataques)
- Lista de membros que faltam atacar (destacados)
- Últimos ataques realizados
- Histórico de guerras

### 4. **Raid Capital**
Desempenho de ataques e loot por jogador.

**Métricas:**
- Total de ataques e loot conquistado
- Ranking por contribuição (estrelas)
- Dano médio por membro
- Histórico de últimas 3 temporadas

### 5. **Estatísticas** (Futuro)
Evolução histórica de troféus, doações, vitórias.

- Gráficos de evolução de troféus
- Análise de padrões de doação
- Ranking histórico

### 6. **Logs** (Futuro)
Entradas, saídas e mudanças no clã.

- Registro de membros que entraram/saíram
- Mudanças de cargo
- Histórico de promoções/demissões

### 7. **Alertas** (Futuro)
Lembretes automáticos e manuais.

- Notificações de guerra terminando
- Lembretes de membros não atacarem
- Alertas de raid capital
- Histórico de notificações enviadas

### 8. **Administração** (Futuro)
Login e configurações do sistema.

- Autenticação de usuários
- Gerenciamento de permissões
- Configurações de alertas
- Backup de dados

---

## Padrões e Estilo de Código

### Nomenclatura

```python
# ❌ Evitar abreviações
def get_mbr_data():
    pass

# ✅ Usar nomes descritivos
def get_member_data():
    """Obtém dados detalhados de membros do clã."""
    pass
```

### Comentários

```python
# ❌ Comentários óbvios
x = y + 1  # Adiciona 1 a y

# ✅ Comentários descritivos
trophies_adjustment = current_trophies + trophy_gain  # Recalcula troféus após guerra
```

### Estrutura de Módulos

Manter funções puras e modularizadas:

```python
# ❌ Lógica misturada
def process_war_data(war_dict, db):
    for attack in war_dict['attacks']:
        db.save(attack)
    return sum([a['stars'] for a in war_dict['attacks']])

# ✅ Separação de responsabilidades
def calculate_total_stars(attacks: list) -> int:
    """Calcula total de estrelas conquistadas."""
    return sum(a.get('stars', 0) for a in attacks)

def save_attacks(attacks: list, db):
    """Persiste ataques no banco de dados."""
    for attack in attacks:
        db.save(attack)
```

### Consistência Entre Backend e Frontend

**Backend** (Python):
```python
def get_war_status():
    return {
        "clan_name": "...",
        "total_attacks": 50,
        "remaining_attacks": 10
    }
```

**Frontend** (JavaScript):
```javascript
// Usar mesmos nomes de campo
const { clan_name, total_attacks, remaining_attacks } = warData
```

---

## Fluxo de Desenvolvimento

### 1. Planejamento
- Definir feature/bugfix que será desenvolvida
- Criar issue ou tarefa
- Documentar requisitos

### 2. Backend

```bash
# Criar branch
git checkout -b feature/nova-feature

# Desenvolver endpoint
# - Implementar rota em main.py
# - Adicionar método em CocClient se necessário
# - Criar/atualizar modelo em db.py
# - Testar em http://127.0.0.1:8000/docs

# Testar com curl
curl http://127.0.0.1:8000/api/novo-endpoint

# Formatar código
black app/
```

### 3. Frontend

```bash
# Atualizar api.js com nova rota
# - Adicionar função em src/services/api.js
# - Testar requisição

# Criar componente visual
# - src/components/NovoComponente.jsx (se reutilizável)
# - ou adicionar em src/pages/

# Testar responsividade
# - Desktop (>= 1024px)
# - Tablet (768px - 1023px)
# - Mobile (< 768px)

# Dev mode
npm run dev
```

### 4. Testes e Validação

```bash
# Testar manualmente
# 1. Abrir http://localhost:5173
# 2. Validar funcionalidade em todos os dispositivos
# 3. Verificar console (F12) para erros

# Validar logs
# - Backend logs em http://127.0.0.1:8000/docs
# - Check .env configurado corretamente
```

### 5. Commit e Documentação

```bash
# Commit com mensagem clara
git commit -m "feat: adicionar dashboard de raids com ranking"

# Atualizar FEATURES.md e CHANGELOG.md
# - Descrever nova feature
# - Adicionar versão e data

# Push para repositório
git push origin feature/nova-feature
```

---

## Roadmap Técnico

### v0.2.0 (Atual)
- ✅ Base do painel e API principal
- ✅ Dashboard com status de guerra e raids
- ✅ Tabela interativa de membros
- ✅ Sincronização automática
- Próximos: Melhorar alertas, adicionar filtros

### v0.3.0
- [ ] Sistema de armazenamento e histórico local
- [ ] Evolução de troféus (gráficos)
- [ ] Análise de padrões de doação
- [ ] Histórico de mudanças de cargo

### v0.4.0
- [ ] Lembretes automáticos via Discord/Telegram
- [ ] Sistema de login e permissões
- [ ] Logs de entradas e saídas
- [ ] Backup automático de dados

### v0.5.0
- [ ] Suporte a multi-clã
- [ ] Comparativos entre clãs
- [ ] Exportação de relatórios (PDF, CSV)
- [ ] Integração com Discord Bot

### v1.0.0
- [ ] PWA (instalável no celular)
- [ ] Notificações push
- [ ] Integração com Telegram Bot
- [ ] Temas customizáveis

---

## Resumo das Regras Principais

| Aspecto | Regra |
|---------|-------|
| **Rotas** | Prefixo `/api/`, padrão RESTful, JSON |
| **Banco** | SQLite (dev), MySQL (prod), SQLAlchemy |
| **Agendador** | APScheduler, sincronização a cada hora |
| **Docstrings** | Português, explicar entrada/saída |
| **Código** | PEP8, black formatter, sem abreviações |
| **Frontend** | 100% responsivo, TailwindCSS, Recharts |
| **Componentes** | PascalCase, reutilizáveis, em folders |
| **Requisições** | Centralizadas em api.js, com erro handling |
| **Hooks** | Extrair lógica duplicada, em src/hooks/ |

---

## Recursos Úteis

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Clash of Clans API](https://developer.clashofclans.com/)

---

**Última atualização**: 31 de outubro de 2025  
**Versão**: 0.2.0  
**Mantido por**: ClashManager Team
