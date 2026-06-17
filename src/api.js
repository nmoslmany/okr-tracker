async function request(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export function getOkrs() {
  return request('/api/okrs')
}

export function patchKr(id, patch) {
  return request(`/api/krs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
}

export function addKrApi(okrId, kr) {
  return request(`/api/okrs/${okrId}/krs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kr || {}),
  })
}

export function removeKrApi(id) {
  return request(`/api/krs/${id}`, { method: 'DELETE' })
}
