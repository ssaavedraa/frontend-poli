import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components';
import { filterNotDeleted, getFavoritesData, sortByDate } from '../../domain';
import { CardPost } from '../../models';
import { FavoritesService, PostsService } from '../../services';

@Component({
  selector: 'app-favorites-page',
  imports: [CardComponent],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.css']
})
export class FavoritesPage implements OnInit {
  private readonly postsService = inject(PostsService)
  private readonly favoritesService = inject(FavoritesService)
  favoritePosts: CardPost[] = []

  ngOnInit() {
    const posts = this.postsService.getAll()
    const favoriteIds = this.favoritesService.getFavorites()
    const favoritedPosts = getFavoritesData(favoriteIds, posts)
    const activeFavoritePosts = filterNotDeleted(favoritedPosts)
    const sortedFavoritePosts = sortByDate(activeFavoritePosts)

    this.favoritePosts = sortedFavoritePosts
  }
}