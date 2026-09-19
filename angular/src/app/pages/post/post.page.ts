import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { DialogComponent } from '../../components'
import { findPostBySlug, isFavorited } from '../../domain'
import { Post } from '../../models'
import { FavoritesService, PostsService } from '../../services'

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css'],
})
export class PostPage implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly postsService = inject(PostsService)
  private readonly favoritesSevice = inject(FavoritesService)
  private readonly router = inject(Router)
  private readonly destroyRef = inject(DestroyRef)

  @ViewChild('confirmationDialog') confirmationDialogRef!: DialogComponent
  post: Post | null = null
  isFavorite: WritableSignal<boolean> = signal(false)

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('slug')

      if (!slug) {
        // TODO: redirect to not found page
        this.router.navigate(['/'])
        return
      }

      const posts = this.postsService.getAll()
      const post = findPostBySlug(posts, slug)

      if (!post) {
        // TODO: redirect to not found page
        this.router.navigate(['/'])
      }

      this.post = post
      this.isFavorite.set(this.checkInitialFavoriteStatus())
    })
  }

  private checkInitialFavoriteStatus(): boolean {
    const favorites = this.favoritesSevice.getFavorites()

    return isFavorited(this.post!.id, favorites)
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

  openConfirmationDialog(): void {
    if (!this.confirmationDialogRef) {
      console.warn('Dialog reference not found')
      return
    }

    this.confirmationDialogRef.openDialog()
  }

  closeConfirmationDialog(): void {
    if (!this.confirmationDialogRef) {
      console.warn('Dialog reference not found')
      return
    }

    this.confirmationDialogRef.closeDialog()
  }
}
