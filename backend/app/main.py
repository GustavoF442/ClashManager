from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from app.coc_client import CocClient
from app.db import init_db, upsert_members, list_members, snapshot_members
from app.scheduler import start_scheduler
import os

load_dotenv()

app = FastAPI(
    title="⚔️ METE OU LATE",
    description="Dashboard estratégico para gerenciamento de clãs em Clash of Clans",
    version="0.2.0"
)

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COC_API_TOKEN = os.getenv("COC_API_TOKEN")
CLAN_TAG = os.getenv("CLAN_TAG")
client = None
scheduler = None

@app.on_event("startup")
def startup():
    global client, scheduler
    init_db()
    if not COC_API_TOKEN or not CLAN_TAG:
        print("⚠️  Variáveis de ambiente não configuradas (COC_API_TOKEN, CLAN_TAG).")
        return
    client = CocClient(api_token=COC_API_TOKEN, clan_tag=CLAN_TAG)
    print(f"✅ METE OU LATE iniciado com o clã {CLAN_TAG}")
    print(f"🎯 Dashboard disponível em http://localhost:5173")
    print(f"📊 Docs disponível em http://127.0.0.1:8000/docs")
    scheduler = start_scheduler(on_tick=sync_tick)

@app.get("/api/health")
def health():
    if not client:
        return {"status": "error", "message": "Cliente não inicializado. Configure .env"}
    try:
        info = client.fetch_clan_info()
        return {"status": "ok", "clan": info.get("name"), "tag": info.get("tag")}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def sync_tick():
    if not client:
        return
    try:
        members = client.fetch_members()
        upsert_members(members)
        snapshot_members()
        print(f"⚔️  METE OU LATE: {len(members)} membros atualizados.")
    except Exception as e:
        print(f"❌ Erro na sincronização: {e}")

@app.get("/api/members")
def get_members():
    """Retorna lista de membros do clã sincronizados"""
    return {"members": list_members()}

@app.post("/api/sync")
def sync_members():
    """Sincroniza membros imediatamente com a API do Clash of Clans"""
    global client
    if not client:
        raise HTTPException(status_code=400, detail="Configure COC_API_TOKEN e CLAN_TAG no .env")
    try:
        members = client.fetch_members()
        upsert_members(members)
        snapshot_members()
        return {"count": len(members), "success": True}
    except RuntimeError as e:
        raise HTTPException(status_code=401, detail=f"Erro na API do Clash: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao sincronizar: {str(e)}")

@app.get("/api/warlog")
def warlog():
    """Retorna histórico de guerras do clã"""
    if not client:
        raise HTTPException(status_code=400, detail="Configure COC_API_TOKEN e CLAN_TAG no .env")
    return client.fetch_warlog()

@app.get("/api/capitalraidseasons")
def capitalraidseasons(limit: int = 3):
    """Retorna temporadas de raid capital com contribuições dos membros"""
    if not client:
        raise HTTPException(status_code=400, detail="Configure COC_API_TOKEN e CLAN_TAG no .env")
    return client.fetch_capital_raid_seasons(limit=limit)

@app.get("/api/currentwar")
def currentwar():
    """Retorna status atual da guerra (quem atacou, quem não atacou, destruição)"""
    if not client:
        raise HTTPException(status_code=400, detail="Configure COC_API_TOKEN e CLAN_TAG no .env")
    war = client.fetch_current_war()
    if not war:
        raise HTTPException(status_code=404, detail="Nenhuma guerra em progresso")
    return war

@app.get("/api/claninfo")
def claninfo():
    """Retorna informações gerais do clã (nome, tag, level, membros, etc)"""
    if not client:
        raise HTTPException(status_code=400, detail="Configure COC_API_TOKEN e CLAN_TAG no .env")
    info = client.fetch_clan_info()
    if not info:
        raise HTTPException(status_code=404, detail="Informações do clã não disponíveis")
    return info

if os.path.isdir("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")
