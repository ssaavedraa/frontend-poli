import { LocalStorageService } from './local-storage.service'

const STORAGE_KEY = 'favorites'

function getFavorites() {
  return LocalStorageService.get(STORAGE_KEY) ?? []
}

function addFavorite(id) {
  const storedFavorites = getFavorites()

  if (storedFavorites.includes(id)) {
    return
  }

  LocalStorageService.set(STORAGE_KEY, [...storedFavorites, id])
}

function removeFavorite(id) {
  const storedFavorites = getFavorites()

  const filteredFavorites = storedFavorites.filter(storedId => storedId !== id)

  LocalStorageService.set(STORAGE_KEY, filteredFavorites)
}

export const FavoritesService = {
  getFavorites,
  addFavorite,
  removeFavorite,
}