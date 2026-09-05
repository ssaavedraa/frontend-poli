import { getFavoritesData } from '../../domain/favorites.js'
import { filterNotDeleted, sortByDate } from '../../domain/posts.js'
import { FavoritesService } from '../../services/favorites.service.js'
import { HttpClient } from '../../services/http-client.service.js'
import { renderCard } from './card.component.js'

const gridSlot = document.getElementById('news-hub-section')

if (!gridSlot) {
  throw new Error('Grid slot with ID "news-hub-section" not found.')
}

const emptyStateElement = document.getElementById('empty-state')

if (!emptyStateElement) {
  throw new Error('No empty state section found')
}

const postsUrl = new URL('../../assets/data/posts.json', import.meta.url).href
const postsData = await HttpClient.get(postsUrl, 'application/json')
const activePosts = filterNotDeleted(postsData)

const favorites = FavoritesService.getFavorites()
const favoritesData = getFavoritesData(favorites, activePosts)

if (!favoritesData || favoritesData.length === 0) {
  emptyStateElement.classList.remove('empty-state--hidden')

  const emptyStateContent = `
    <div class="empty-list__container">
      <p class="empty-list__title"> There are no posts </p>
      <a class="button button--accent" href="list.html"> Explore posts </a>
    </div>
  `

  emptyStateElement.innerHTML = emptyStateContent
} else {
  emptyStateElement.classList.add('empty-state--hidden')
  const sortedPosts = sortByDate(favoritesData)

  sortedPosts.forEach((post) => {
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
