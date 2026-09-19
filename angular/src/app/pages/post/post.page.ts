import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { findPostBySlug } from '../../domain';
import { Post } from '../../models';
import { FavoritesService, PostsService } from '../../services';

@Component({
  selector: 'app-post-page',
  standalone: true,
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css'],
})
export class PostPage implements OnInit {
  post: Post | null = null
  isFavorite: WritableSignal<boolean> = signal(false)

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly favoritesSevice: FavoritesService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const slug = params.get('slug')

        if (!slug) {
          this.router.navigate(['/'])
          return
        }

        const posts = this.postsService.getAll()
        const post = findPostBySlug(posts, slug)

        if (!post) {
          this.router.navigate(['/'])
        }

        this.post = post
      })
  }

  toggleFavorite(): void {
    if (this.isFavorite()) {
      this.favoritesSevice.removeFavorite(this.post!.id)
    } else {
      this.favoritesSevice.addFavorite(this.post!.id)
    }

    this.isFavorite.update((current) => !current)
  }

  deletePost(): void {
    this.postsService.softDelete(this.post!.id)
    this.router.navigate(['/'])
  }
}