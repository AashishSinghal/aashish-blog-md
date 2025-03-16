export interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  author: string
  slug: string
  content: string
  tags: string[]
  thumbnail?: string | null
}

