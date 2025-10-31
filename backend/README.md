# Backend - ClashManager 2.0

## Rodar localmente
```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate  # Windows
# source .venv/bin/activate # Linux/Mac
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```
Base: http://127.0.0.1:8000

Rotas: /api/members, /api/sync, /api/warlog, /api/capitalraidseasons
