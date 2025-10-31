from apscheduler.schedulers.background import BackgroundScheduler
from .db import snapshot_members
from datetime import datetime

def start_scheduler(on_tick):
    scheduler = BackgroundScheduler(timezone="UTC")
    scheduler.add_job(on_tick, "cron", hour=3, minute=0, id="daily_sync")
    scheduler.add_job(snapshot_members, "cron", hour=3, minute=5, id="daily_snapshot")
    scheduler.start()
    print(f"🕒 Scheduler iniciado ({datetime.utcnow().isoformat()}Z)")
    return scheduler
