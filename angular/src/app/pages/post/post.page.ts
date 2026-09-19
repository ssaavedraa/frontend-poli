import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findPostBySlug } from '../../domain';
import { Post } from '../../models';
import { PostsService } from '../../services';

@Component({
  selector: 'app-post-page',
  standalone: true,
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css'],
})
export class PostPage {
  readonly slug: string
  readonly post: Post | null = null

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly router: Router,
  ) {
    this.slug = this.route.snapshot.params['slug']

    const posts = this.postsService.getAll()
    const post = findPostBySlug(posts, this.slug)

    if (!post) {
      this.router.navigate(['/'])
      return
    }

    this.post = post
  }
}