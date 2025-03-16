import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import type { Metadata } from "next"
import { Clock, Calendar, User } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { ShareButtons } from "@/components/share-buttons"
import { LikeButton } from "@/components/like-button"
import { CommentSection } from "@/components/comment-section"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

// Add this function to the existing file
export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  return (
    <div className="container py-12">
      <article className="mx-auto max-w-3xl">
        <div className="mb-8 space-y-4">
          <div className="space-x-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>

        {post.thumbnail && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="prose dark:prose-invert prose-lg max-w-none mb-8">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="border-t pt-6 mt-8">
          <div className="flex items-center justify-between mb-8">
            <LikeButton postId={post.id} />
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          <CommentSection postId={post.id} />
        </div>
      </article>
    </div>
  )
}

