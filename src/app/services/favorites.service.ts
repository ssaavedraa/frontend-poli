import { inject, Injectable } from '@angular/core'
import { Favorites } from '../models'
import { LocalStorageService } from './local-storage.service'
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites'
  private readonly localStorageService = inject(LocalStorageService)

  public getFavorites(): Favorites {
    return this.localStorageService.get<Favorites>(this.STORAGE_KEY) ?? []
  }

  public addFavorite(id: string): void {
    if (!id) {
      throw new Error('post id is required')
    }

    const storedFavorites = this.getFavorites()

    if (storedFavorites.includes(id)) {
      return
    }

    this.localStorageService.set<Favorites>(this.STORAGE_KEY, [...storedFavorites, id])
  }

  public removeFavorite(id: string): void {
    const storedFavorites = this.getFavorites()

    const filteredFavorites = storedFavorites.filter((storedId) => storedId !== id)

    this.localStorageService.set<Favorites>(this.STORAGE_KEY, filteredFavorites)
  }
}
