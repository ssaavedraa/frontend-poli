import { Routes } from '@angular/router'
import { ContactPage, FavoritesPage, HomePage, ListPage, NotFoundPage, PostPage } from './pages'

export const routes: Routes = [
  {
    path: '',
    title: 'NewsHub | Home',
    component: HomePage,
  },
  {
    path: 'favorites',
    title: 'NewsHub | Favorites',
    component: FavoritesPage,
  },
  {
    path: 'post/:slug',
    title: 'NewsHub | Post',
    component: PostPage,
  },
  // {
  //   path: 'create',
  //   title: 'NewsHub | Create Post',
  //   component: CreatePostPage,
  // },
  {
    path: 'contact',
    title: 'NewsHub | Contact',
    component: ContactPage,
  },
  {
    path: 'list',
    title: 'NewsHub | List',
    component: ListPage,
  },
  {
    path: 'not-found',
    title: 'NewsHub | Not Found',
    component: NotFoundPage,
  },
  {
    path: '**',
    title: 'NewsHub | Not Found',
    component: NotFoundPage,
  },
]
