export function findPostBySlug(posts, slug) {
  return posts.find(post => post.slug === slug && !post.deletedAt)
}