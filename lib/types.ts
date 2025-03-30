export interface BlogPostMetadata {
  id: string
  title: string
  description: string
  date: string
  author: string
  slug: string
  tags: string[]
  thumbnail?: string | null
  filename: string // Reference to the Markdown file
}

export interface BlogPost extends BlogPostMetadata {
  content: string // Content loaded from the Markdown file
}

