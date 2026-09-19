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

async function softDelete(id) {
  const storedPosts = await getAll()

  const updatedPosts = storedPosts
    .map(post => post.id === id ? { ...post, deletedAt: new Date() } : post )

  LocalStorageService.set(LOCAL_STORAGE_POSTS_KEY, updatedPosts)
}

async function preloadPosts() {
  const preloadedPosts = await HttpClient.get(new URL('../assets/data/posts.json', import.meta.url), 'application/json')

  LocalStorageService.set(LOCAL_STORAGE_POSTS_KEY, preloadedPosts)

  return preloadedPosts
}

async function create(payload) {
  const storedPosts = await getAll()

  const postImage = {
    src: payload.imageSrc,
    alt: payload.imageAlt,
  }

  const newPost = {
    id: crypto.randomUUID(),
    title: payload.title,
    slug: payload.slug,
    subtitle: payload.subtitle,
    summary: payload.summary,
    content: payload.content,
    image: postImage,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  storedPosts.push(newPost)

  LocalStorageService.set(LOCAL_STORAGE_POSTS_KEY, storedPosts)

  return newPost
}

export const PostsService = {
  getAll,
  softDelete,
  create,
}