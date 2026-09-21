import { Favorites, Post } from '../models'

export function getFavoritesData(favorites: Favorites, posts: Post[]): Post[] {
  return posts.filter((post) => favorites.includes(post.id))
}

export function isFavorited(id: string, favorites: Favorites): boolean {
  return favorites.includes(id)
}
