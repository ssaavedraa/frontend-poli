import { Component } from '@angular/core';
import { CardComponent } from '../../components';
import { filterNotDeleted, sortByDate, truncateAt } from '../../domain';
import { CardPost } from '../../models';
import { PostsService } from '../../services';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  readonly heroPost: CardPost
  readonly featuredPosts: CardPost[]

  constructor(private readonly postsService: PostsService) {
    const posts = this.postsService.getAll()
    const activePosts = filterNotDeleted(posts)
    const sorteedPosts = sortByDate(activePosts)
    const [heroPost, ...featuredPosts] = truncateAt(sorteedPosts, 7)

    this.heroPost = heroPost
    this.featuredPosts = featuredPosts
  }
}