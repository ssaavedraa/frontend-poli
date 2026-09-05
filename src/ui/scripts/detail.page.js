import { findPostBySlug } from '../../domain/detail.js'
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