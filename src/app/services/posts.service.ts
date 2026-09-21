import { inject, Injectable } from '@angular/core'
import posts from '../../../public/data/posts.json'
import { CreatePostData, Image, Post } from '../models'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly LOCAL_STORAGE_POSTS_KEY = 'posts'
  private readonly localStorageService = inject(LocalStorageService)

  public getAll(): Post[] {
    let storedPosts = this.localStorageService.get<Post[]>(this.LOCAL_STORAGE_POSTS_KEY) ?? null

    if (!storedPosts) {
      storedPosts = this.preloadPosts()
    }

    return storedPosts
  }

  public softDelete(id: string): void {
    const storedPosts = this.getAll()

    if (!storedPosts) {
      console.warn('No posts found')
      return
    }

    const updatedPosts = storedPosts.map((post) =>
      post.id === id ? { ...post, deletedAt: new Date() } : post,
    )

    this.localStorageService.set<Post[]>(this.LOCAL_STORAGE_POSTS_KEY, updatedPosts)
  }

  private preloadPosts(): Post[] {
    const preloadedPosts = posts.map<Post>((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }))

    this.localStorageService.set(this.LOCAL_STORAGE_POSTS_KEY, preloadedPosts)

    return preloadedPosts
  }

  public create(payload: CreatePostData): Post {
    const storedPosts = this.getAll() ?? []

    const postImage: Image = {
      src: payload.imageSrc,
      alt: payload.imageAlt,
    }

    const newPost: Post = {
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

    this.localStorageService.set(this.LOCAL_STORAGE_POSTS_KEY, storedPosts)

    return newPost
  }
}
