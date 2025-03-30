"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Plus, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import type { BlogPost } from "@/lib/types"
import { fetchAllPosts } from "@/lib/client-blog"
import { BlogSystemStatus } from "@/components/blog-admin"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch posts when the component mounts
  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true)
        const fetchedPosts = await fetchAllPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error("Error loading posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  // TODO: Re-enable this authentication check before pushing to Git
  // This is temporarily commented out to allow dashboard access during development
  /*
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [authLoading, user, router])

  if (authLoading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center">
          <div className="animate-pulse h-8 w-48 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }
  */

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Blog Posts</CardTitle>
            <CardDescription>Manage your blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center py-6 text-destructive">
                <p>{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No posts yet</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first post
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {posts.map((post) => (
                  <div key={post.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`}>View</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <BlogSystemStatus />
      </div>
    </div>
  )
}

