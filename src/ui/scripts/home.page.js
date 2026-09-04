import { renderLayoutComponent } from './layout.js'

const components = [
  renderLayoutComponent('../components/header.html', 'header-slot'),
  renderLayoutComponent('../components/footer.html', 'footer-slot')
]

await Promise.all(components)