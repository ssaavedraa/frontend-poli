import { getLatestSlugIndex, slugify } from '../../domain/posts.js'
import { PostsService } from '../../services/posts.service.js'

const SUMMARY_MAX_LENGTH = 220

const addParagraphButton = document.getElementById('add-paragraph')
const formElement = document.getElementById('create-form')
const paragraphsList = document.getElementById('paragraphs-list')
const paragraphTemplate = document.getElementById('create-paragraph-template')
const summaryInput = document.getElementById('summary')
const summaryCount = document.getElementById('summary-count')
const paragraphsCount = document.getElementById('paragraphs-count')

if (!addParagraphButton) {
  throw new Error('Add paragraph button not found')
}

if (!formElement) {
  throw new Error('Create form not found')
}

if (!paragraphsList || !paragraphTemplate) {
  throw new Error('Paragraph list or template not found')
}

if (!summaryInput || !summaryCount || !paragraphsCount) {
  throw new Error('Summary or paragraph counters not found')
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

  window.location.href = `/src/ui/pages/detail.html?slug=${encodeURIComponent(finalSlug)}`
})

formElement.addEventListener('reset', () => {
  getParagraphs().slice(1).forEach((paragraph) => paragraph.remove())
  updateParagraphLabels()
  updateParagraphsCount()
  requestAnimationFrame(updateSummaryCount)
})

addParagraphButton.addEventListener('click', () => {
  addParagraph()
})

paragraphsList.addEventListener('click', (event) => {
  const target = event.target

  if (!(target instanceof Element)) {
    return
  }

  const removeButton = target.closest('.create__paragraph-remove')

  if (!removeButton) {
    return
  }

  removeParagraph(removeButton.closest('.create__paragraph'))
})

summaryInput.addEventListener('input', updateSummaryCount)

updateSummaryCount()
updateParagraphsCount()

function getParagraphs() {
  return [...paragraphsList.querySelectorAll('.create__paragraph')]
}

function updateParagraphLabels() {
  getParagraphs().forEach((paragraph, index) => {
    const number = index + 1
    const label = paragraph.querySelector('label')
    const textArea = paragraph.querySelector('textarea')

    paragraph.id = `create-paragraph-${number}`

    if (label) {
      label.textContent = `Párrafo ${number}`
      label.htmlFor = `paragraph-${number}`
    }

    if (textArea) {
      textArea.id = `paragraph-${number}`
    }
  })
}

function updateParagraphsCount() {
  const count = getParagraphs().length

  paragraphsCount.textContent = count === 1
    ? '1 párrafo redactado'
    : `${count} párrafos redactados`
}

function updateSummaryCount() {
  summaryCount.textContent = `${summaryInput.value.length} / ${SUMMARY_MAX_LENGTH} caracteres`
}

function addParagraph() {
  const newParagraph = paragraphTemplate.content.firstElementChild?.cloneNode(true)

  if (!(newParagraph instanceof HTMLElement)) {
    throw new Error('Paragraph template is empty')
  }

  paragraphsList.appendChild(newParagraph)
  updateParagraphLabels()
  updateParagraphsCount()
}

function removeParagraph(paragraph) {
  if (!paragraph || getParagraphs().length <= 1) {
    return
  }

  paragraph.remove()
  updateParagraphLabels()
  updateParagraphsCount()
}

function getFormData() {
  const formData = new FormData(formElement)

  const title = formData.get('title')
  const subtitle = formData.get('subtitle')
  const summary = formData.get('summary')
  const imageSrc = formData.get('imageSrc')
  const imageAlt = formData.get('imageAlt')
  const paragraphs = formData.getAll('paragraphs')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return {
    title,
    subtitle,
    summary,
    content: paragraphs,
    imageSrc,
    imageAlt,
  }
}
