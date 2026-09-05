export function filterNotDeleted(posts) {
  return posts.filter(post => !post.deletedAt)
}

export function sortByDate(posts) {
  return posts.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function truncateAt(posts, count) {
  return posts.slice(0, count)
}