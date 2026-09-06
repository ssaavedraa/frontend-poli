import { findPostBySlug } from '../../domain/detail.js'
import { isFavorited } from '../../domain/favorites.js'
import { FavoritesService } from '../../services/favorites.service.js'
import { HttpClient } from '../../services/http-client.service.js'

const postSlug = new URLSearchParams(window.location.search).get('slug')

if (!postSlug) {
  throw new Error('Post slug not found')
}

const pageTitle = postSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
document.title = `NewsHub | ${pageTitle}`

const posts = await HttpClient.get(new URL('../../assets/data/posts.json', import.meta.url).href, 'application/json')
const post = findPostBySlug(posts, postSlug)
if (!post) {
  throw new Error(`Post with slug "${postSlug}" not found`)
}

const favorites = FavoritesService.getFavorites()

const newsImageElement = document.getElementById('news-image')
const newsTitleElement = document.getElementById('news-title')
const newsSubtitleElement = document.getElementById('news-subtitle')
const newsContentElement = document.getElementById('news-content')

if (!newsImageElement || !newsTitleElement || !newsSubtitleElement || !newsContentElement) {
  throw new Error('One or more required elements are missing in the DOM')
}

newsImageElement.setAttribute('src', post.image.src)
newsImageElement.setAttribute('alt', `${post.image.alt}`)
newsTitleElement.textContent = post.title
newsSubtitleElement.textContent = post.subtitle

const newsContent = post.content

newsContent.forEach((contentItem) => {
  const contentElement = document.createElement('p')
  contentElement.textContent = contentItem
  newsContentElement.appendChild(contentElement)
})

let isFavoriteButtonActive = isFavorited(post.id, favorites)
const favoritesButton = document.getElementById('favorites-button')

if (!favoritesButton) {
  throw new Error('Favorites button not found')
}

function addFavoriteStyles() {
  favoritesButton.innerText = 'Remove from favorites'
  favoritesButton.classList.add('button--active')
}

function removeFavoriteStyles() {
  favoritesButton.innerText = 'Add to favorites'
  favoritesButton.classList.remove('button--active')
}

function toggleFavorite(id) {
  if (isFavoriteButtonActive) {
    FavoritesService.removeFavorite(id)
    removeFavoriteStyles()
  } else {
    FavoritesService.addFavorite(id)
    addFavoriteStyles()
  }

  isFavoriteButtonActive = !isFavoriteButtonActive
}

if (isFavoriteButtonActive) {
  addFavoriteStyles()
} else {
  removeFavoriteStyles()
}

favoritesButton.addEventListener('click', () => {
  toggleFavorite(post.id)
})