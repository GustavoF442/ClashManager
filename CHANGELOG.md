# ⚔️ METE OU LATE - Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

---

## [0.2.0] - 31 de Outubro de 2025

### ✨ Adicionado

#### Backend
- ✅ Endpoint `/api/currentwar` - Status em tempo real da guerra com placar, ataques e membros que faltam atacar
- ✅ Endpoint `/api/claninfo` - Informações gerais do clã
- ✅ Suporte a sincronização automática via APScheduler
- ✅ Sistema de logs para todas as operações críticas
- ✅ Tratamento padronizado de erros com mensagens descritivas

#### Frontend
- ✅ **Dashboard Principal** com KPIs do clã (membros, média de troféus, top doador)
- ✅ **Componente WarStatus** - Visualização em tempo real da guerra:
  - Placar com estrelas e destruição (clan vs oponente)
  - Barra de progresso de ataques disponíveis
  - Lista de membros que faltam atacar (destaque em amarelo)
  - Últimos ataques realizados
- ✅ **Componente RaidsStatus** - Visualização da raid capital:
  - KPIs: total de ataques, loot, distritos destruídos
  - Ranking de membros por contribuição (ordenado por estrelas)
  - Dano médio por membro
  - Histórico das últimas 3 temporadas
- ✅ **Tabela de Membros Melhorada**:
  - Sorting interativo por: ranking, nome, troféus, doações
  - Cores por cargo (Líder=🟡, Co-Líder=🟣, Elder=🔵, Membro=⚪)
  - Emojis de liga para visualização rápida
  - Indicadores de doações (↑ enviadas, ↓ recebidas)
- ✅ Página **Guerras** com histórico completo
- ✅ Página **Raids** com estatísticas detalhadas
- ✅ Responsividade 100% (desktop, tablet, mobile)
- ✅ Gráficos com Recharts (LineChart para doações)

### 🔧 Melhorado

#### Backend
- 🔄 Estrutura de roteamento organizada por recursos
- 🔄 Validação de token e configurações no startup
- 🔄 Logging detalhado com timestamps

#### Frontend
- 🔄 Performance otimizada com memoização em componentes
- 🔄 Carregamento automático de dados com useEffect
- 🔄 Tratamento de erros em requisições HTTP
- 🔄 Interface limpa e intuitiva com TailwindCSS

### 🐛 Corrigido

- ✅ Correção de imports em componentes React
- ✅ Ajuste de layout no Dashboard para melhor responsividade
- ✅ Tratamento de dados nulos na API

### 📚 Documentação

- ✅ Criado `DEVELOPMENT.md` com guia completo de desenvolvimento
- ✅ Criado `FEATURES.md` com lista de funcionalidades
- ✅ Atualizado `README.md` com instruções de setup
- ✅ Criado `CHANGELOG.md` (este arquivo)

---

## [0.1.0] - Versão Inicial

### ✨ Adicionado

- Estrutura base do projeto (backend FastAPI + frontend React)
- Endpoints básicos: `/api/members`, `/api/warlog`, `/api/capitalraidseasons`
- Cliente para comunicação com API Clash of Clans
- Banco de dados SQLite com modelos iniciais
- Vite como build tool e dev server
- TailwindCSS para estilização
- Navbar de navegação básica
- Página de Membros simples

---

## Planejado (Roadmap)

### [0.3.0] - Histórico e Análise
- [ ] Armazenamento e histórico local de dados
- [ ] Evolução de troféus (gráficos com trending)
- [ ] Análise de padrões de doação
- [ ] Histórico de mudanças de cargo
- [ ] Página de Estatísticas com dashboards avançados

### [0.4.0] - Alertas e Automação
- [ ] Sistema de alertas automáticos (Discord, Telegram)
- [ ] Sistema de login e permissões
- [ ] Logs de entradas e saídas de membros
- [ ] Backup automático de dados
- [ ] Página de Logs com filtros

### [0.5.0] - Multi-Clã e Avançado
- [ ] Suporte a múltiplos clãs
- [ ] Comparativos entre clãs
- [ ] Exportação de relatórios (PDF, CSV)
- [ ] Integração com Discord Bot
- [ ] Página de Administração

### [1.0.0] - Release Completo
- [ ] PWA (instalável no celular)
- [ ] Notificações push
- [ ] Integração com Telegram Bot
- [ ] Temas customizáveis (claro/escuro)
- [ ] Suporte a múltiplos idiomas
- [ ] Cache offline

---

## Notas de Desenvolvimento

### v0.2.0 - Melhorias Técnicas

**Backend:**
- APScheduler configurado para sincronizar a cada 1 hora (ajustável via `.env`)
- Logs estruturados com data/hora para debugging
- Tratamento robusto de erros na comunicação com Clash of Clans API
- Endpoints padronizados com respostas JSON consistentes

**Frontend:**
- Componentes otimizados com React.memo quando apropriado
- useEffect configurado corretamente para evitar looping infinito
- Tratamento de states (loading, error, data)
- Styling coeso com TailwindCSS utility classes

### Commits Principais

```
v0.2.0:
- feat: adicionar WarStatus com visualização em tempo real da guerra
- feat: adicionar RaidsStatus com ranking de membros
- feat: melhorar MembersTable com sorting e cores por cargo
- feat: criar Dashboard com KPIs e gráficos
- feat: adicionar endpoints /api/currentwar e /api/claninfo
- docs: criar DEVELOPMENT.md com guia completo
- docs: atualizar README.md e criar FEATURES.md

v0.1.0:
- Initial commit: estrutura base do projeto
```

---

## Como Contribuir

Para adicionar uma nova feature:

1. **Criar branch:** `git checkout -b feature/nome-feature`
2. **Desenvolver:** Seguir as regras em [DEVELOPMENT.md](DEVELOPMENT.md)
3. **Testar:** Validar em desktop, tablet e mobile
4. **Commit:** `git commit -m "feat: descrição clara da mudança"`
5. **Update CHANGELOG:** Adicionar entrada em seção apropriada
6. **Push:** `git push origin feature/nome-feature`

---

## Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): Nova funcionalidade compatível
- **PATCH** (0.0.X): Bug fixes

---

**Última atualização:** 31 de Outubro de 2025  
**Mantido por:** ClashManager Team
