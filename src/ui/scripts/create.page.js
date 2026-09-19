import { getLatestSlugIndex, slugify } from '../../domain/posts.js'
import { PostsService } from '../../services/posts.service.js'

let paragraphCount = 1

const addParagraphButton = document.getElementById('add-paragraph')

if (!addParagraphButton) {
  throw new Error('Add paragraph button not found')
}

const formElement = document.getElementById('create-form')

if (!formElement) {
  throw new Error('Create form not found')
}

const posts = await PostsService.getAll()

formElement.addEventListener('submit', async (event) => {
  event.preventDefault()
  const post = getFormData()

  const slug = slugify(post.title)
  const latestSlugIndex = getLatestSlugIndex(slug, posts)

  const finalSlug = latestSlugIndex > 0 ? `${slug}-${latestSlugIndex + 1}` : slug

  await PostsService.create({
    ...post,
    slug: finalSlug,
  })

  window.location.href = new URL(`../pages/detail.html?slug=${finalSlug}`, import.meta.url)
})

addParagraphButton.addEventListener('click', () => {
  addParagraph()
})

function addParagraph() {
  const paragraphToClone = document.getElementById(`create-paragraph-template`)

  if (!paragraphToClone) {
    throw new Error('Paragraph to clone not found')
  }

  const newParagraph = paragraphToClone.cloneNode(true)

  newParagraph.id = `create-paragraph-${paragraphCount + 1}`

  newParagraph.classList.remove('create__paragraph--hidden')
  const textArea = newParagraph.querySelector('textarea')
  const label = newParagraph.querySelector('label')

  if (!textArea || !label) {
    throw new Error('Text area or label not found')
  }

  label.textContent = label.textContent.replace('Párrafo 2', `Párrafo ${paragraphCount + 1}`)
  label.htmlFor = `paragraph-${paragraphCount + 1}`
  textArea.id = `paragraph-${paragraphCount + 1}`
  textArea.required = true

  const paragraphsList = document.getElementById('paragraphs-list')

  if (!paragraphsList) {
    throw new Error('Paragraphs list not found')
  }

  paragraphsList.appendChild(newParagraph)

  paragraphCount++
}

function getFormData() {
  const formData = new FormData(formElement)

  const title = formData.get('title')
  const subtitle = formData.get('subtitle')
  const summary = formData.get('summary')
  const imageSrc = formData.get('imageSrc')
  const imageAlt = formData.get('imageAlt')
  const paragraphs = formData.getAll('paragraphs')

  return {
    title,
    subtitle,
    summary,
    content: paragraphs,
    imageSrc,
    imageAlt,
  }
}