import { filterNotDeleted, sortByDate } from '../../domain/posts.js'
import { PostsService } from '../../services/posts.service.js'
import { renderCard } from './card.component.js'

const gridSlot = document.getElementById('news-hub-section')

if (!gridSlot) {
  throw new Error('Grid slot with ID "news-hub-section" not found.')
}

const emptyStateElement = document.getElementById('empty-state')

if (!emptyStateElement) {
  throw new Error('No empty state section found')
}

const postsData = await PostsService.getAll()
const activePosts = filterNotDeleted(postsData)

if (!activePosts || activePosts.length === 0) {
  emptyStateElement.classList.remove('empty-state--hidden')

  const emptyStateContent = `
    <div class="empty-list__container">
      <p class="empty-list__title"> There are no posts </p>
      <a class="button button--accent" href="src/ui/pages/create.html"> Create one </a>
    </div>
  `

  emptyStateElement.innerHTML = emptyStateContent
} else {
  emptyStateElement.classList.add('empty-state--hidden')
  const sortedPosts = sortByDate(activePosts)

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
