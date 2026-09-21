import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public get<T>(key: string): T | null {
    const storageData = window.localStorage.getItem(key)

    if (!storageData) {
      console.warn(`empty data for key: ${key}`)
      return null
    }

    try {
      return JSON.parse(storageData) as T
    } catch (error) {
      throw new Error('failed to parse JSON data', { cause: error })
    }
  }

  public set<T>(key: string, payload: T) {
    if (!payload) {
      throw new Error('cannot set empty payload')
    }

    if (!key) {
      throw new Error('a storage key is needed')
    }

    window.localStorage.setItem(key, JSON.stringify(payload))
  }
}
