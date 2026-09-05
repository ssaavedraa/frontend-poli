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
  return `
    <article class="hero">
      <div class="hero__overlay">
        <h2 class="hero__title">${heroData.title}</h2>
        <p class="hero__summary">${heroData.summary}</p>
        <a href="/src/ui/pages/detail?slug=${heroData.slug}" class="hero__link">Read More</a>
      </div>
      <img src="${heroData.image.src}" alt="${heroData.image.alt}" class="hero__image" />
    </article>
  `;
}
