import sqlite3
from typing import List, Dict
import json

DB_PATH = "clash.db"

def connect():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = connect()
    cur = conn.cursor()
    cur.execute(
        """CREATE TABLE IF NOT EXISTS members (
            tag TEXT PRIMARY KEY,
            name TEXT,
            role TEXT,
            expLevel INTEGER,
            league TEXT,
            trophies INTEGER,
            versusTrophies INTEGER,
            clanRank INTEGER,
            previousClanRank INTEGER,
            donations INTEGER,
            donationsReceived INTEGER
        )"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS member_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taken_at DATETIME DEFAULT (datetime('now')),
            payload TEXT NOT NULL
        )"""
    )
    conn.commit()
    conn.close()

def upsert_members(members: List[Dict]):
    conn = connect()
    cur = conn.cursor()
    for m in members:
        cur.execute(
            """INSERT INTO members(tag, name, role, expLevel, league, trophies, versusTrophies, clanRank, previousClanRank, donations, donationsReceived)
                   VALUES (:tag, :name, :role, :expLevel, :league, :trophies, :versusTrophies, :clanRank, :previousClanRank, :donations, :donationsReceived)
                   ON CONFLICT(tag) DO UPDATE SET
                       name=excluded.name,
                       role=excluded.role,
                       expLevel=excluded.expLevel,
                       league=excluded.league,
                       trophies=excluded.trophies,
                       versusTrophies=excluded.versusTrophies,
                       clanRank=excluded.clanRank,
                       previousClanRank=excluded.previousClanRank,
                       donations=excluded.donations,
                       donationsReceived=excluded.donationsReceived
            """
        , m)
    conn.commit()
    conn.close()

def list_members():
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT tag, name, role, expLevel, league, trophies, donations, donationsReceived FROM members ORDER BY trophies DESC")
    rows = cur.fetchall()
    conn.close()
    result = []
    for r in rows:
        result.append({
            "tag": r[0],
            "name": r[1],
            "role": r[2],
            "expLevel": r[3],
            "league": r[4],
            "trophies": r[5],
            "donations": r[6],
            "donationsReceived": r[7]
        })
    return result

def snapshot_members():
    payload = json.dumps(list_members(), ensure_ascii=False)
    conn = connect()
    cur = conn.cursor()
    cur.execute("INSERT INTO member_snapshots(payload) VALUES (?)", (payload,))
    conn.commit()
    conn.close()
