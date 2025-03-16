import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from "@/lib/blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Tags",
  description: "Browse all blog post tags",
}

export default function TagsPage() {
  const posts = getAllPosts()
  const tagMap = new Map<string, number>()

  // Count occurrences of each tag
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })

  // Convert to array and sort alphabetically
  const tags = Array.from(tagMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">All Tags</h1>

      <div className="flex flex-wrap gap-4">
        {tags.map(([tag, count]) => (
          <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
            <Badge variant="outline" className="text-base py-2 px-4 hover:bg-secondary cursor-pointer">
              {tag} <span className="ml-2 text-muted-foreground">({count})</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}

