import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from "@/lib/blog"

// Make this a server component that fetches data on the server
export default async function BlogPage() {
  // Since this is a server component, we can use the server-side function directly
  const posts = getAllPosts()

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
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
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
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

