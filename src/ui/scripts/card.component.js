import { escapeHtml } from '../../../utils/escape-html.js'

/**
 * @typedef {Object} CardData
 * @property {Image} image - The image for the card.
 * @property {string} title - The title of the card.
 * @property {string} summary - A brief summary of the card content.
 * @property {string} slug - A unique identifier for the card, often used in URLs.
*/

/**
 * @typedef {Object} Image
 * @property {string} src - The URL of the image.
 * @property {string} alt - The alternative text for the image, used for accessibility.
 */

/**
 * Renders a card component with the provided data.
 * @param {CardData} cardData - The data to be displayed in the card.
 * @returns {string} - The HTML string representing the card component.
 */
export function renderCard(cardData) {
  const title = escapeHtml(cardData.title)
  const summary = escapeHtml(cardData.summary)
  const imageSrc = escapeHtml(cardData.image.src)
  const imageAlt = escapeHtml(cardData.image.alt)
  const slug = encodeURIComponent(cardData.slug)

  return `
    <article class="card">
      <img src="${imageSrc}" alt="${imageAlt}" class="card__image" />
      <h2 class="card__title">${title}</h2>
      <p class="card__summary">${summary}</p>
      <a href="/src/ui/pages/detail.html?slug=${slug}" class="card__link">Leer más</a>
    </article>
  `
}
