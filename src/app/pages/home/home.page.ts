import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CardComponent, HeroComponent } from '../../components'
import { filterNotDeleted, sortByDate, truncateAt } from '../../domain'
import { CardPost } from '../../models'
import { PostsService } from '../../services'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, HeroComponent, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  private readonly postsService = inject(PostsService)
  readonly heroPost: CardPost | null
  readonly featuredPosts: CardPost[]

  constructor() {
    const posts = this.postsService.getAll()
    const activePosts = filterNotDeleted(posts)
    const sortedPosts = sortByDate(activePosts)
    const [heroPost, ...featuredPosts] = truncateAt(sortedPosts, 7)

    this.heroPost = heroPost ?? null
    this.featuredPosts = featuredPosts
  }
}
