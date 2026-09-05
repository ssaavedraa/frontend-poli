function get(key) {
  const storageData = window.localStorage.getItem(key)

  if (!storageData) {
    console.warn(`empty data for key: ${key}`)
    return null
  }

  let data = null

  try {
    data = JSON.parse(storageData)
  } catch (error) {
    throw new Error('failed to parse JSON data')
  }

  return data
}

function set(key, payload) {
  if (!payload) {
    throw new Error('cannot set empty payload')
  }

  if (!key) {
    throw new Error('a storage key is needed')
  }

  window.localStorage.setItem(key, JSON.stringify(payload))
}

export const LocalStorageService = {
  get,
  set
}