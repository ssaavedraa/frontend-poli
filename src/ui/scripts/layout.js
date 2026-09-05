import { HttpClient } from '../../services/http-client.service.js'

export async function renderLayoutComponent(src, slotId) {
  const slot = document.getElementById(slotId)
  let componentContent = null

  if (!slot) {
    throw new Error(`Slot with ID "${slotId}" not found.`)
  }

  try {
    const srcUrl = new URL(src, import.meta.url).href
    componentContent = await HttpClient.get(srcUrl, 'text/html')
  } catch (error) {
    console.error(`Failed to load component from "${src}":`, error)
  }

  if (!componentContent) {
    throw new Error(`Failed to load component from "${src}".`)
  }

  slot.innerHTML = componentContent
}