export function getFavoritesData(favorites, posts) {
  return posts.filter(post => favorites.includes(post.id))
}

export function isFavorited(id, favorites) {
  return favorites.includes(id)
}