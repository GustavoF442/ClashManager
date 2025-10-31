import axios from 'axios'

const api = axios.create({ baseURL: 'http://127.0.0.1:8000' })

export async function getMembers() { 
  try {
    const { data } = await api.get('/api/members')
    return data.members || []
  } catch (e) {
    console.error('Erro ao buscar membros:', e.message)
    throw e
  }
}

export async function syncNow() { 
  try {
    const { data } = await api.post('/api/sync')
    return data
  } catch (e) {
    console.error('Erro ao sincronizar:', e.response?.data?.detail || e.message)
    throw e
  }
}

export async function getWarlog() { 
  try {
    const { data } = await api.get('/api/warlog')
    return data.items || []
  } catch (e) {
    console.error('Erro ao buscar warlog:', e.message)
    return []
  }
}

export async function getRaidSeasons(limit=3) { 
  try {
    const { data } = await api.get(`/api/capitalraidseasons?limit=${limit}`)
    return data.items || []
  } catch (e) {
    console.error('Erro ao buscar raids:', e.message)
    return []
  }
}

export async function getCurrentWar() { 
  try {
    const { data } = await api.get('/api/currentwar')
    return data
  } catch(e) {
    console.error('Erro ao buscar guerra atual:', e.message)
    return null
  }
}

export async function getClanInfo() { 
  try {
    const { data } = await api.get('/api/claninfo')
    return data
  } catch(e) {
    console.error('Erro ao buscar info do clã:', e.message)
    return null
  }
}

export async function getHealth() {
  try {
    const { data } = await api.get('/api/health')
    return data
  } catch (e) {
    console.error('Erro de health check:', e.message)
    return { status: 'error', message: e.message }
  }
}

export default api
