```markdown
# ⚔️ METE OU LATE - Dashboard de Clã (Clash of Clans)

![Mete ou Late Logo](../meteoulatelogo.jpg)

> **"Você ataca ou vai ficar para a próxima?"** 💪🏆

Dashboard completo para gerenciamento de clãs em Clash of Clans com monitoramento em tempo real de guerras, raids capitais e performance de membros.

## 🚀 Como Rodar

### Backend (FastAPI + Python)
```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate    # Windows
# source .venv/bin/activate # Linux/Mac
pip install -r requirements.txt
cp .env.example .env        # Edite COC_API_TOKEN e CLAN_TAG
python -m uvicorn app.main:app --reload
# Acesse: http://127.0.0.1:8000/docs
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# Acesse: http://localhost:5173
```

## 📱 Como Usar

1. Abra http://localhost:5173 no navegador
2. Clique em **"🔄 Atualizar agora"** para sincronizar dados
3. Explore as abas: **Dashboard**, **Membros**, **Guerras**, **Raids**
4. Acompanhe o status em tempo real da sua guerra
5. Veja o ranking de contribuição do raid capital
