import { Routes } from '@angular/router';
import { HomePage, ListPage } from './pages';
import { PostPage } from './pages/post/post.page';

export const routes: Routes = [
  {
    path: '',
    title: 'NewsHub | Home',
    component: HomePage,
  },
  // {
  //   path: 'favorites',
  //   title: 'NewsHub | Favorites',
  //   component: FavoritesPage,
  // },
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
  // {
  //   path: 'contact',
  //   title: 'NewsHub | Contact',
  //   component: ContactPage,
  // },
  {
    path: 'list',
    title: 'NewsHub | List',
    component: ListPage,
  },
  // {
  //   path: '**',
  //   title: 'NewsHub | Not Found',
  //   component: NotFoundPage,
  // },
];