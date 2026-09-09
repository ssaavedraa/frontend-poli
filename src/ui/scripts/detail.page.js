import { findPostBySlug } from '../../domain/detail.js'
import { isFavorited } from '../../domain/favorites.js'
import { FavoritesService } from '../../services/favorites.service.js'
import { PostsService } from '../../services/posts.service.js'
import { renderDialog } from './dialog.component.js'

const postSlug = new URLSearchParams(window.location.search).get('slug')

if (!postSlug) {
  throw new Error('Post slug not found')
}

const pageTitle = postSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
document.title = `NewsHub | ${pageTitle}`

const posts = await PostsService.getAll()
const post = findPostBySlug(posts, postSlug)
if (!post) {
  document.location.href = '/'

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

const CONFIRMATION_DIALOG_ID = 'confirmation-dialog'

renderDialog({
  elementId: CONFIRMATION_DIALOG_ID,
  showConfirmationButton: true,
  showCancelButton: true,
  dialogMessage: 'Estas seguro de eliminar esta noticia? Esta accion no se puede deshacer'
})
const dialogContainer = document.getElementById(CONFIRMATION_DIALOG_ID)

function deletePost() {
  dialogContainer.showModal()
}

async function confirmPostDeletion() {
  await PostsService.softDelete(post.id)

  dialogContainer.close()
  document.location.href = '/'
}

function cancelDialogAction() {
  dialogContainer.close()
}

const deletePostButton = document.getElementById('delete-button')

if (!deletePostButton) {
  throw new Error('No se puede encontrar el boton para eliminar la noticia')
}

deletePostButton.addEventListener('click', deletePost)

const dialogConfirmButton = document.getElementById('dialog-confirmation-button')

if (!dialogConfirmButton) {
  throw new Error('No se puede encontrar el boton de confirmacion del dialogo')
}

dialogConfirmButton.addEventListener('click', async () => confirmPostDeletion() )

const dialogCancelButton = document.getElementById('dialog-cancel-button')

if (!dialogCancelButton) {
  throw new Error('No se puede encontrar el boton de confirmacion del dialogo')
}

dialogCancelButton.addEventListener('click', cancelDialogAction)