import { Image } from './image'

export interface Post {
  id: string
  title: string
  slug: string
  subtitle: string
  summary: string
  content: string[]
  image: Image
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface CreatePostData {
  title: string
  slug: string
  subtitle: string
  summary: string
  content: string[]
  imageSrc: string
  imageAlt: string
}

export type CardPost = Pick<Post, 'id' | 'image' | 'title' | 'summary' | 'slug'>