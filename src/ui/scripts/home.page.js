import { filterNotDeleted, sortByDate, truncateAt } from '../../domain/posts.js'
import { PostsService } from '../../services/posts.service.js'
import { renderCard } from './card.component.js'
import { renderHero } from './hero.component.js'

const gridSlot = document.getElementById('news-hub-grid-slot')
const heroSlot = document.getElementById('news-hub-hero-slot')
const emptyStateElement = document.getElementById('empty-state')

if (!gridSlot) {
  throw new Error('Grid slot with ID "news-hub-grid-slot" not found.')
}

if (!heroSlot) {
  throw new Error('Hero slot with ID "news-hub-hero-slot" not found.')
}

if (!emptyStateElement) {
  throw new Error('No empty state section found')
}

const postsData = await PostsService.getAll()
const activePosts = filterNotDeleted(postsData)

if (!activePosts.length) {
  emptyStateElement.classList.remove('empty-state--hidden')
  emptyStateElement.innerHTML = `
    <div class="empty-list__container">
      <h1 class="empty-list__title">No hay noticias</h1>
      <a class="button button--accent" href="/src/ui/pages/create.html">Crear una</a>
    </div>
  `
} else {
  emptyStateElement.classList.add('empty-state--hidden')

  const sortedPosts = sortByDate(activePosts)
  const [heroPost, ...featuredPosts] = truncateAt(sortedPosts, 7)

  heroSlot.insertAdjacentHTML('beforeend', renderHero(heroPost))

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
}
