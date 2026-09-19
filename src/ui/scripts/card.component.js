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
  return `
    <article class="card">
      <img src="${cardData.image.src}" alt="${cardData.image.alt}" class="card__image" />
      <h2 class="card__title">${cardData.title}</h2>
      <p class="card__summary">${cardData.summary}</p>
      <a href="/src/ui/pages/detail.html?slug=${cardData.slug}" class="card__link">Leer más</a>
    </article>
  `
}
