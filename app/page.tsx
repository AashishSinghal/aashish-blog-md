import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from "@/lib/blog"
import { AnimatedText } from "@/components/animated-text"

export default function Home() {
  const posts = getAllPosts().slice(0, 6) // Get the 6 most recent posts

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            <AnimatedText>Hi, I&apos;m Aashish</AnimatedText>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            <AnimatedText delay={0.3}>Sharing thoughts on coding, travel, and life.</AnimatedText>
          </p>
          <div className="flex justify-center pt-4">
            <Button asChild className="group">
              <Link href="/blog">
                Read Blogs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="container py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Recent Posts</h2>
          <Link href="/blog" className="text-primary hover:underline inline-flex items-center">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`}>
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
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold leading-tight tracking-tight">{post.title}</h3>
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
  )
}

