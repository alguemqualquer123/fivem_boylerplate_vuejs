const fallbackResourceName = 'boylerplate_vuejs'

export const getResourceName = () => (
  window.GetParentResourceName ? window.GetParentResourceName() : fallbackResourceName
)

export async function nuiCallback(event, data = {}) {
  if (!window.GetParentResourceName) {
    console.info(`[NUI MOCK] ${event}`, data)
    return { ok: true, mocked: true }
  }

  const resource = getResourceName()
  const response = await fetch(`https://${resource}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`NUI callback "${event}" failed with status ${response.status}`)
  }

  return await response.json()
}
