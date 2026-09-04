export async function renderLayoutComponent(src, slotId) {
  const slot = document.getElementById(slotId)
  let componentContent = null

  if (!slot) {
    throw new Error(`Slot with ID "${slotId}" not found.`)
  }

  try {
    componentContent = await loadComponent(src)
  } catch (error) {
    console.error(`Failed to load component from "${src}":`, error)
  }

  if (!componentContent) {
    throw new Error(`Failed to load component from "${src}".`)
  }

  slot.innerHTML = componentContent
}

async function loadComponent(src) {
  const componentUrl = new URL(src, import.meta.url).href
  const component = await fetch(componentUrl)

  if (!component.ok) {
    throw new Error(`Failed to fetch component from "${src}". Status: ${component.status}`)
  }

  const componentContent = await component.text()

  return componentContent
}