import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { getPostsByTag, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `Posts tagged with "${tag}"`,
    description: `Browse all blog posts tagged with ${tag}`,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag)
    })
  })

  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Posts tagged with &quot;{tag}&quot;</h1>
        <p className="text-muted-foreground mt-2">
          Found {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md h-full">
              {post.thumbnail && (
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={340}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col space-y-2 p-4 flex-grow">
                <div className="space-x-2">
                  {post.tags.map((postTag) => (
                    <Badge key={postTag} variant={postTag === tag ? "default" : "secondary"} className="text-xs">
                      {postTag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-tight">{post.title}</h2>
                <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">By {post.author}</span>
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

