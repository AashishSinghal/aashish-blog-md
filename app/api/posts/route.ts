import { NextResponse } from "next/server"
import { getAllPosts, getPostBySlug, getPostsByTag } from "@/lib/blog"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const tag = searchParams.get("tag")

  try {
    if (slug) {
      // Get a specific post by slug
      const post = getPostBySlug(slug)
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }
      return NextResponse.json(post)
    } else if (tag) {
      // Get posts by tag
      const posts = getPostsByTag(tag)
      return NextResponse.json(posts)
    } else {
      // Get all posts
      const posts = getAllPosts()
      return NextResponse.json(posts)
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

