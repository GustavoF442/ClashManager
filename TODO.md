# TODO - Próximas Features do ClashManager 2.0

## 🎯 Prioridade Alta (v0.3.0)

### Backend
- [ ] Criar tabela de histórico de membros (entradas/saídas)
- [ ] Criar tabela de histórico de ataques (para análise de padrões)
- [ ] Endpoint `/api/statistics` - retornar estatísticas históricas
- [ ] Endpoint `/api/member/{tag}/history` - histórico de um membro
- [ ] Sistema de snapshots automáticos (a cada sincronização)
- [ ] Criar módulo `history.py` para gestão de históricos

### Frontend
- [ ] Página **Estatísticas** com gráficos de evolução
  - Gráfico de troféus ao longo do tempo (por membro)
  - Gráfico de doações acumuladas
  - Gráfico de participação em guerras
- [ ] Filtro de período temporal (últimas 24h, 7 dias, 30 dias)
- [ ] Página de **Membros - Histórico**
  - Timeline de quando entrou/saiu
  - Mudanças de cargo
  - Gráfico de evolução de troféus do membro

---

## 🎯 Prioridade Alta (v0.4.0)

### Backend - Alertas
- [ ] Criar módulo `alerts.py` completo
- [ ] Detector de guerra terminando em < X horas
- [ ] Detector de membros que não atacaram
- [ ] Integração com Discord Webhooks
- [ ] Integração com Telegram Bot API
- [ ] Tabela de `alerts_sent` (para não repetir alertas)
- [ ] Endpoint `/api/alerts` - listar alertas enviados

### Frontend - Alertas
- [ ] Página **Alertas** com histórico
- [ ] Notificação toast quando alerta é enviado
- [ ] Configurações de alertas (enable/disable por tipo)
- [ ] Página de configurações básicas

### Backend - Login
- [ ] Criar modelo `Admin` no banco
- [ ] Implementar JWT authentication
- [ ] Endpoint `POST /auth/login` com credenciais
- [ ] Middleware para proteger rotas

### Frontend - Login
- [ ] Página de login simples
- [ ] Token armazenado em localStorage
- [ ] Proteção de rotas (redirect para login se não autenticado)

---

## 🎯 Prioridade Média (v0.5.0)

### Backend - Multi-Clã
- [ ] Modelo `ClanConfig` para suportar múltiplos clãs
- [ ] Endpoint `POST /api/clans` - adicionar novo clã
- [ ] Endpoint `GET /api/clans` - listar clãs configurados
- [ ] Endpoint `DELETE /api/clans/{clan_tag}` - remover clã
- [ ] Sistema de sincronização para todos os clãs
- [ ] Tabela `clan_configs` com CLAN_TAG como referência

### Frontend - Multi-Clã
- [ ] Dropdown para selecionar clã ativo
- [ ] Página de **Configurações** - gerenciar clãs
- [ ] Comparativo entre clãs (opcional)

### Backend - Exportações
- [ ] Endpoint `GET /api/export/members/csv` - exportar membros
- [ ] Endpoint `GET /api/export/warlog/pdf` - exportar guerra
- [ ] Endpoint `GET /api/export/statistics/xlsx` - exportar estatísticas

### Frontend - Exportações
- [ ] Botões de download em cada página
- [ ] Preview do arquivo antes de download

---

## 🎯 Prioridade Baixa (v1.0.0)

### PWA (Progressive Web App)
- [ ] Adicionar `manifest.json`
- [ ] Adicionar service worker para cache offline
- [ ] Implementar instalação do app
- [ ] Suporte a notificações push

### Temas e Personalizações
- [ ] Dark mode / Light mode toggle
- [ ] Sistema de temas customizáveis
- [ ] Paleta de cores configurável
- [ ] Preferências salvas em localStorage

### Idioma
- [ ] Suporte a múltiplos idiomas (PT-BR, EN-US)
- [ ] Arquivo de traduções (i18n)
- [ ] Seletor de idioma

### Integração com Bots
- [ ] Discord Bot comandos (ex: `/clan status`)
- [ ] Telegram Bot API integration
- [ ] Notificações automáticas via bot

---

## 🐛 Bugs Reportados

- [ ] Sincronização pode falhar silenciosamente (adicionar retry)
- [ ] Gráficos de Recharts podem quebrar em mobile (validar)
- [ ] Componentes podem re-renderizar desnecessariamente (otimizar)

---

## 🔧 Refatoração Técnica

- [ ] Extrair componentes de tabela em hook customizado
- [ ] Criar factory de HTTP requests com retry logic
- [ ] Implementar error boundary no React
- [ ] Adicionar testes unitários (Jest + React Testing Library)
- [ ] Adicionar testes de integração (Pytest no backend)
- [ ] Configurar CI/CD (GitHub Actions)
- [ ] Setup de linting (ESLint + Prettier no frontend)
- [ ] Setup de formatação (Black no backend)

---

## 📊 Métricas e Analytics

- [ ] Adicionar Google Analytics (opcional)
- [ ] Dashboard de performance (tempos de resposta)
- [ ] Logs estruturados para análise

---

## 📝 Documentação

- [ ] Criar API documentation (Swagger/OpenAPI)
- [ ] Criar guia de deployment (Docker, produçã)
- [ ] Criar guia de troubleshooting
- [ ] Criar video tutorial de setup
- [ ] Documentar environment variables completo

---

## 🚀 Deployment

- [ ] Criar Dockerfile para backend
- [ ] Criar docker-compose para stack completo
- [ ] Setup de CI/CD automático
- [ ] Deployment em AWS/Heroku/DigitalOcean (escolher)
- [ ] Setup de SSL/HTTPS
- [ ] Backup automático de banco de dados

---

## Template para Nova Feature

Quando adicionar nova feature, seguir este template:

```markdown
## Funcionalidade: [Nome]

### Descrição
[Descrever o que a feature faz]

### Backend
- [ ] Criar endpoint `/api/...`
- [ ] Criar/atualizar modelo no banco
- [ ] Implementar lógica de negócio
- [ ] Adicionar logs
- [ ] Testar em /docs

### Frontend
- [ ] Criar componente em src/components/ (se reutilizável)
- [ ] Adicionar função em services/api.js
- [ ] Criar página ou integrar em página existente
- [ ] Testar responsividade
- [ ] Testar diferentes tamanhos de tela

### Documentação
- [ ] Atualizar DEVELOPMENT.md
- [ ] Atualizar FEATURES.md
- [ ] Atualizar CHANGELOG.md

### Tests
- [ ] Testar em desktop
- [ ] Testar em tablet
- [ ] Testar em mobile
- [ ] Validar performance

### Aceitar/Merge
- [ ] Code review
- [ ] Todos os tests passando
- [ ] Documentação atualizada
```

---

**Última atualização:** 31 de Outubro de 2025  
**Status:** Em desenvolvimento ativo
