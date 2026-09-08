import { filterNotDeleted, sortByDate, truncateAt } from '../../domain/posts.js'
import { PostsService } from '../../services/posts.service.js'
import { renderCard } from './card.component.js'
import { renderHero } from './hero.component.js'

const gridSlot = document.getElementById('news-hub-grid-slot')
const heroSlot = document.getElementById('news-hub-hero-slot')

if (!gridSlot) {
  throw new Error('Grid slot with ID "news-hub-grid-slot" not found.')
}

if (!heroSlot) {
  throw new Error('Hero slot with ID "news-hub-hero-slot" not found.')
}

const postsData = await PostsService.getAll()
const activePosts = filterNotDeleted(postsData)
const sortedPosts = sortByDate(activePosts)
const [heroPost, ...featuredPosts] = truncateAt(sortedPosts, 7)

const heroElement =renderHero(heroPost)
heroSlot.insertAdjacentHTML('beforeend', heroElement)

featuredPosts.forEach((post) => {
  const postElement = renderCard({
    title: post.title,
    summary: post.summary,
    image: {
      src: post.image.src,
      alt: post.image.alt,
    },
    slug: post.slug,
  })

  gridSlot.insertAdjacentHTML('beforeend', postElement)
})
