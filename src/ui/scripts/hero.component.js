import { escapeHtml } from '../../../utils/escape-html.js'

/**
 * @typedef {Object} HeroData
 * @property {Image} image - The image for the hero.
 * @property {string} title - The title of the hero.
 * @property {string} summary - A brief summary of the hero content.
 * @property {string} slug - A unique identifier for the hero, often used in URLs.
*/

/**
 * @typedef {Object} Image
 * @property {string} src - The URL of the image.
 * @property {string} alt - The alternative text for the image, used for accessibility.
 */

/**
 * Renders a hero component with the provided data.
 * @param {HeroData} heroData - The data to be displayed in the hero.
 * @returns {string} - The HTML string representing the hero component.
 */
export function renderHero(heroData) {
  const title = escapeHtml(heroData.title)
  const summary = escapeHtml(heroData.summary)
  const imageSrc = escapeHtml(heroData.image.src)
  const imageAlt = escapeHtml(heroData.image.alt)
  const slug = encodeURIComponent(heroData.slug)

  return `
    <article class="hero">
      <div class="hero__overlay">
        <h1 class="hero__title">${title}</h1>
        <p class="hero__summary">${summary}</p>
        <a href="/src/ui/pages/detail.html?slug=${slug}" class="hero__link">Leer más</a>
      </div>
      <img src="${imageSrc}" alt="${imageAlt}" class="hero__image" />
    </article>
  `
}
