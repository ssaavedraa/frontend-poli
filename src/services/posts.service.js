import { HttpClient } from './http-client.service.js'
import { LocalStorageService } from './local-storage.service.js'

const LOCAL_STORAGE_POSTS_KEY = 'posts'

async function getAll() {
  let storedPosts = LocalStorageService.get(LOCAL_STORAGE_POSTS_KEY) ?? null

  if (!storedPosts) {
    storedPosts = await preloadPosts()
  }

  return storedPosts
}

async function preloadPosts() {
  const preloadedPosts = await HttpClient.get(new URL('../assets/data/posts.json', import.meta.url), 'application/json')

  LocalStorageService.set(LOCAL_STORAGE_POSTS_KEY, preloadedPosts)

  return preloadedPosts
}

export const PostsService = {
  getAll
}