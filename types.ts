export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export type ContentType = 'Text Article' | 'Video'
export type AccessLevel = 'Free' | 'Premium'

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    avatar?: {
      url: string
      imgix_url: string
    }
  }
}

export interface Article extends CosmicObject {
  type: 'articles'
  metadata: {
    summary?: string
    content_type?: ContentType
    access_level?: AccessLevel
    body?: string
    video_url?: string
    video_duration?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: Author
    published_date?: string
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}