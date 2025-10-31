import requests

class CocClient:
    def __init__(self, api_token: str, clan_tag: str):
        self.api_token = api_token
        self.clan_tag = clan_tag

    @property
    def headers(self):
        return {"Authorization": f"Bearer {self.api_token}"}

    def _encode_tag(self, tag: str) -> str:
        return tag.replace("#", "%23")

    def fetch_members(self):
        tag = self._encode_tag(self.clan_tag)
        url = f"https://api.clashofclans.com/v1/clans/{tag}/members"
        r = requests.get(url, headers=self.headers, timeout=20)
        if r.status_code != 200:
            raise RuntimeError(f"Erro API {r.status_code}: {r.text}")
        items = r.json().get("items", [])
        normalized = []
        for m in items:
            normalized.append({
                "tag": m.get("tag"),
                "name": m.get("name"),
                "role": m.get("role"),
                "expLevel": m.get("expLevel"),
                "league": (m.get("league") or {}).get("name"),
                "trophies": m.get("trophies"),
                "versusTrophies": m.get("versusTrophies"),
                "clanRank": m.get("clanRank"),
                "previousClanRank": m.get("previousClanRank"),
                "donations": m.get("donations"),
                "donationsReceived": m.get("donationsReceived"),
            })
        return normalized

    def fetch_warlog(self):
        tag = self._encode_tag(self.clan_tag)
        url = f"https://api.clashofclans.com/v1/clans/{tag}/warlog"
        r = requests.get(url, headers=self.headers, timeout=20)
        if r.status_code != 200:
            return {"items": []}
        return r.json()

    def fetch_capital_raid_seasons(self, limit: int = 3):
        tag = self._encode_tag(self.clan_tag)
        url = f"https://api.clashofclans.com/v1/clans/{tag}/capitalraidseasons?limit={limit}"
        r = requests.get(url, headers=self.headers, timeout=20)
        if r.status_code != 200:
            return {"items": []}
        return r.json()

    def fetch_current_war(self):
        tag = self._encode_tag(self.clan_tag)
        url = f"https://api.clashofclans.com/v1/clans/{tag}/currentwar"
        r = requests.get(url, headers=self.headers, timeout=20)
        if r.status_code != 200:
            return None
        return r.json()

    def fetch_clan_info(self):
        tag = self._encode_tag(self.clan_tag)
        url = f"https://api.clashofclans.com/v1/clans/{tag}"
        r = requests.get(url, headers=self.headers, timeout=20)
        if r.status_code != 200:
            return None
        return r.json()
