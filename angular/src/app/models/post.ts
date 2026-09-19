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