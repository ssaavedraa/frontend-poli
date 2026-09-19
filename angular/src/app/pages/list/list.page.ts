import { Component, OnInit } from '@angular/core'
import { CardComponent } from '../../components'
import { filterNotDeleted, sortByDate } from '../../domain'
import { CardPost } from '../../models'
import { PostsService } from '../../services'

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './list.page.html',
  styleUrl: './list.page.css',
})
export class ListPage implements OnInit {
  posts: CardPost[] = []

  constructor(private readonly postsService: PostsService) {}

  ngOnInit(): void {
    const posts = this.postsService.getAll()
    const activePosts = filterNotDeleted(posts)
    const sortedPosts = sortByDate(activePosts)
    this.posts = sortedPosts
  }
}