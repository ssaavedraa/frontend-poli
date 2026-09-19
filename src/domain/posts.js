export function filterNotDeleted(posts) {
  return posts.filter(post => !post.deletedAt)
}

export function sortByDate(posts) {
  return posts.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function truncateAt(posts, count) {
  return posts.slice(0, count)
}

export function getLatestSlugIndex(slug, storedPosts) {
  const slugRegex = new RegExp(`^${slug}$|^${slug}-[0-9]+$`)

  const matchCount = storedPosts
    .filter((post) => slugRegex.test(post.slug)).length

  return matchCount
}

export function slugify(text) {
  return text.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}