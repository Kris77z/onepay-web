export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '')

type Json = Record<string, unknown>

export async function postJson<T = unknown>(path: string, body: Json, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    credentials: 'include',
    body: JSON.stringify(body),
    ...init,
  })
  if (!res.ok) {
    let err: unknown
    try { err = await res.json() } catch { err = { error: res.statusText } }
    throw Object.assign(new Error('RequestFailed'), { status: res.status, data: err })
  }
  try { return await res.json() as T } catch { return {} as T }
}

export async function getJson<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    ...init,
  })
  if (!res.ok) {
    let err: unknown
    try { err = await res.json() } catch { err = { error: res.statusText } }
    throw Object.assign(new Error('RequestFailed'), { status: res.status, data: err })
  }
  try { return await res.json() as T } catch { return {} as T }
}


