import { Routes } from '@angular/router'
import {
  ContactPage,
  CreatePage,
  FavoritesPage,
  HomePage,
  ListPage,
  NotFoundPage,
  PostPage,
} from './pages'

export const routes: Routes = [
  {
    path: '',
    title: 'NewsHub | Inicio',
    component: HomePage,
  },
  {
    path: 'favorites',
    title: 'NewsHub | Favoritos',
    component: FavoritesPage,
  },
  {
    path: 'post/:slug',
    title: 'NewsHub | Noticia',
    component: PostPage,
  },
  {
    path: 'create',
    title: 'NewsHub | Crear noticia',
    component: CreatePage,
  },
  {
    path: 'contact',
    title: 'NewsHub | Contacto',
    component: ContactPage,
  },
  {
    path: 'list',
    title: 'NewsHub | Noticias',
    component: ListPage,
  },
  {
    path: 'not-found',
    title: 'NewsHub | No encontrada',
    component: NotFoundPage,
  },
  {
    path: '**',
    title: 'NewsHub | No encontrada',
    component: NotFoundPage,
  },
]
