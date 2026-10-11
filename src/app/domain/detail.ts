import { Post } from '../models/post'

export function findPostBySlug(posts: Post[], slug: string): Post | null {
  return posts.find((post) => post.slug === slug && !post.deletedAt) ?? null
}
