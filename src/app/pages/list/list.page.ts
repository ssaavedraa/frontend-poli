import { Component, inject, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CardComponent } from '../../components'
import { filterNotDeleted, sortByDate } from '../../domain'
import { CardPost } from '../../models'
import { PostsService } from '../../services'

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './list.page.html',
  styleUrl: './list.page.css',
})
export class ListPage implements OnInit {
  private readonly postsService = inject(PostsService)
  posts: CardPost[] = []

  ngOnInit(): void {
    const posts = this.postsService.getAll()
    const activePosts = filterNotDeleted(posts)
    const sortedPosts = sortByDate(activePosts)
    this.posts = sortedPosts
  }
}
