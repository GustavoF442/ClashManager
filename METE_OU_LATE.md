# ⚔️ METE OU LATE 

![Mete ou Late Logo](../meteoulatelogo.jpg)

> **"Você ataca ou vai ficar para a próxima?"** 💪🏆

---

## 🎯 O Que é METE OU LATE?

**METE OU LATE** é um dashboard estratégico para gerenciadores de clãs em **Clash of Clans**. A plataforma oferece monitoramento em tempo real de:

- ⚔️ **Guerras** - Quem atacou, quem faltou, destruição vs oponente
- 💪 **Raid Capital** - Ranking automático por contribuição
- 👥 **Membros** - Performance, doações, ligações
- 📊 **Estatísticas** - Evolução, análise de trends, relatórios

---

## 🚀 Por Que METE OU LATE?

### O Problema
- 😴 Ter que entrar no Clash constantemente para verificar status
- 🤔 Não saber quem ainda precisa atacar na guerra
- 📉 Difícil rastrear performance dos membros
- 😤 Perder guerras por falta de organização

### A Solução
- ✅ Dashboard automático e sempre atualizado
- ✅ Alertas visuais de quem não atacou
- ✅ Ranking automático de contribuições
- ✅ Dados históricos para análise
- ✅ Sincronização em tempo real

---

## 📱 Funcionalidades Principais

### 1. 🏠 Dashboard Principal
```
┌─────────────────────────────────────────┐
│ ⚔️ METE OU LATE                         │
├─────────────────────────────────────────┤
│ 👥 Membros: 50                          │
│ 🏆 Avg Troféus: 4.500                  │
│ 💰 Top Doador: João (500 doações)     │
├─────────────────────────────────────────┤
│ [Gráfico de Doações]                   │
├─────────────────────────────────────────┤
│ ⚔️ GUERRA ATUAL                         │
│ Clan vs Opponent                        │
│ ⭐ 100 vs 85 ⭐                          │
│ 🟨 Faltam atacar: 5 membros            │
├─────────────────────────────────────────┤
│ 💪 RAID CAPITAL (Temporada 50)         │
│ Ranking dos tops contribuidores        │
└─────────────────────────────────────────┘
```

### 2. ⚔️ Monitor de Guerra
- **Status Real-Time**: Veja a guerra acontecendo ao vivo
- **Quem Faltou**: Lista de membros que ainda não atacaram
- **Progresso**: Destruição do clã vs oponente
- **Ataques**: Detalhes de cada ataque (stars, dano, alvo)
- **Estimativa**: Quem provavelmente vai vencer

### 3. 💪 Raid Capital Analytics
- **Ranking Automático**: Top contribuidores por stars
- **Damage Médio**: Performance individual
- **Loot Total**: Quanto o clã conquistou
- **Distritos**: Qual foi destruído
- **Histórico**: Todas as temporadas anteriores

### 4. 👥 Tabela de Membros
- **Sorting Interativo**: Clique em qualquer coluna para ordenar
- **Cores por Cargo**: Líder (🟡), Colíder (🟣), Elder (🔵), Membro (⚪)
- **Emojis de Liga**: Cristalina ⭐ | Ouro 🥇 | Prata 🥈 | Bronze 🥉
- **Flow de Doações**: Quem doa mais vs quem recebe mais
- **Busca Rápida**: Encontre membros em segundos

---

## 🛠️ Stack Tecnológico

### Backend (Python FastAPI)
```
FastAPI 0.115.0      ← Web framework rápido
APScheduler 3.10.4   ← Agendador automático
SQLAlchemy          ← Banco de dados
python-dotenv       ← Variáveis de ambiente
requests            ← HTTP client
```

### Frontend (React + Vite)
```
React 18+           ← UI framework
Vite 5.4.21        ← Build tool
TailwindCSS 3+     ← Estilização
Recharts           ← Gráficos
Axios             ← HTTP client
```

---

## 📊 Dashboard Páginas

| Página | Funcionalidade | Atualização |
|--------|----------------|------------|
| **Dashboard** | KPIs, gráficos, status atual | Real-time |
| **Membros** | Tabela com sorting, busca | A cada 1h |
| **Guerras** | Status, ataques, histórico | Real-time |
| **Raids** | Ranking, temporadas | Real-time |

---

## ⚡ Performance

- **Sincronização**: A cada 1 hora (configurável)
- **Resposta API**: < 200ms
- **Latência**: ~50-100ms de rede
- **Cache**: Dados em memória (otimizado)
- **Escalabilidade**: Suporta 50-500 membros por clã

---

## 🔐 Segurança

✅ **Token JWT**: API key protegida em `.env`  
✅ **CORS**: Apenas localhost em desenvolvimento  
✅ **Validação**: Input validation em todos os endpoints  
✅ **Erro Handling**: Sem exposição de detalhes internos  
✅ **Rate Limiting**: Proteção contra abuso (futuro v0.4.0)  

---

## 🎮 Como Usar

### 1. Instalação (5 minutos)
```bash
# Clone o repo
git clone <repo>
cd ClashManager

# Backend
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### 2. Configuração
```bash
# Criar .env no backend/ com:
COC_API_TOKEN=seu_token_jwt_aqui
CLAN_TAG=#2GL2CYGLO
SYNC_INTERVAL=3600
```

### 3. Rodar
```bash
# Terminal 1 (Backend)
cd backend
python -m uvicorn app.main:app --reload

# Terminal 2 (Frontend)
cd frontend
npm run dev

# Abra http://localhost:5173
```

### 4. Usar
- Clique em **"🔄 Atualizar Agora"** para sincronizar
- Navegue pelas abas para explorar dados
- Veja guerra em tempo real enquanto ela acontece
- Acompanhe ranking de raid capital

---

## 📈 Roadmap

### v0.2.0 (Atual) ✅
- ✅ Dashboard com KPIs
- ✅ Monitor de guerra em tempo real
- ✅ Ranking de raid capital
- ✅ Tabela interativa de membros
- ✅ Sincronização automática

### v0.3.0 (Próximo) 🔜
- ⏳ Histórico completo (24h, 7d, 30d)
- ⏳ Gráficos de evolução de troféus
- ⏳ Análise de padrões de doação
- ⏳ Página de estatísticas completa

### v0.4.0 (Futuro) 🚀
- ⏳ Alertas via Discord
- ⏳ Sistema de login
- ⏳ Permissões por usuário
- ⏳ Logs de entradas/saídas

### v0.5.0 (Later) 🌟
- ⏳ Suporte a múltiplos clãs
- ⏳ Exportação em PDF/CSV
- ⏳ Comparativos entre clãs
- ⏳ API pública

### v1.0.0 (Release) 🏆
- ⏳ PWA (instalável)
- ⏳ Discord Bot integrado
- ⏳ Temas personalizados
- ⏳ Suporte multilíngue (i18n)

---

## 💡 Destaques

### 🎯 Para Líderes de Clã
- Saiba quem não atacou **antes de ir pedir**
- Acompanhe raid capital em tempo real
- Identifique membros inativos
- Tome decisões com dados concretos

### 📊 Para Desenvolvedores
- Código bem estruturado e modular
- Fácil adicionar novas features
- Documentação completa
- Padrões claros (FastAPI + React)

### ⚡ Para Usuários
- Interface intuitiva e responsiva
- Acesso em qualquer dispositivo
- Atualização automática
- Sem necessidade de entrar no game

---

## 🤝 Como Contribuir

```bash
1. Fork do repositório
2. git checkout -b feature/sua-feature
3. Desenvolva seguindo os padrões
4. git commit -m "feat: descrição"
5. git push origin feature/sua-feature
6. Abra um Pull Request
```

Veja [DEVELOPMENT.md](DEVELOPMENT.md) para detalhes completos.

---

## 📚 Documentação

- **[README.md](README.md)** - Guia rápido
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Para desenvolvedores
- **[FEATURES.md](FEATURES.md)** - Features implementadas
- **[CHANGELOG.md](CHANGELOG.md)** - Histórico de versões
- **[INDEX.md](INDEX.md)** - Índice de documentação
- **[SUMMARY.md](SUMMARY.md)** - Resumo executivo

---

## 🎓 Aprenda

Desenvolvendo **METE OU LATE**, você vai aprender:

- ✅ FastAPI e boas práticas
- ✅ React Hooks e State Management
- ✅ TailwindCSS para design
- ✅ REST API Design
- ✅ Database Design com SQLAlchemy
- ✅ Async/Await em Python
- ✅ Component-Based Architecture
- ✅ Full-Stack Development

---

## 📞 Suporte

| Problema | Solução |
|----------|---------|
| Backend não inicia | Verifique se está em `backend/` e `.venv` ativado |
| Frontend branco | Abra F12 (dev tools) e veja console para erros |
| Sincronização falha | Verifique `.env` com token e clan tag válidos |
| Porta 5173 em uso | Use `npm run dev -- --port 5174` |

---

## 🏆 Status do Projeto

- **Versão**: v0.2.0 (Stable)
- **Status**: ✅ Em Desenvolvimento Ativo
- **Próxima Versão**: v0.3.0 (Estatísticas)
- **Última Atualização**: 31 de Outubro de 2025
- **Licença**: MIT (gratuito e open-source)

---

## 💬 Mensagem Final

**METE OU LATE** é muito mais que um dashboard. É uma ferramenta que:
- Organiza seu clã
- Motiva membros
- Melhora comunicação
- Aumenta wins em guerras
- Facilita gerenciamento

> **Lembre-se: Clãs bem organizados ganham mais. E com METE OU LATE, sua organização vai ser de ponta.** ⚔️🏆

---

**Desenvolvido com ❤️ para clãs de Clash of Clans**

```
    ⚔️  METE OU LATE  ⚔️
"Você ataca ou vai ficar para a próxima?"
```
