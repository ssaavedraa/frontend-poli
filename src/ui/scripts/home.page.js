import { renderLayoutComponent } from './layout.js'

console.log('mi propia URL es: ', import.meta.url)

const components = [
  renderLayoutComponent('../components/header.html', 'header-slot'),
  renderLayoutComponent('../components/footer.html', 'footer-slot')
]

await Promise.all(components)