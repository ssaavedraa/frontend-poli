import { Post } from '../models'

export function filterNotDeleted(posts: Post[]): Post[] {
  return posts.filter((post) => !post.deletedAt)
}

export function sortByDate(posts: Post[]): Post[] {
  return posts.toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function truncateAt(posts: Post[], count: number): Post[] {
  return posts.slice(0, count)
}

export function getLatestSlugIndex(slug: string, storedPosts: Post[]) {
  const slugRegex = new RegExp(`^${slug}$|^${slug}-[0-9]+$`)

  const matchCount = storedPosts.filter((post) => slugRegex.test(post.slug)).length

  return matchCount
}

export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
