import type { BlogPost } from "./types"

/**
 * Client-side function to fetch all posts
 */
export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch("/api/posts")
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

/**
 * Client-side function to fetch a post by slug
 */
export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`)
    if (response.status === 404) {
      return null
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

/**
 * Client-side function to fetch posts by tag
 */
export async function fetchPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`/api/posts?tag=${encodeURIComponent(tag)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch posts with tag ${tag}: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error(`Error fetching posts with tag ${tag}:`, error)
    return []
  }
}

/**
 * Client-side function to fetch all tags
 */
export async function fetchAllTags(): Promise<string[]> {
  try {
    const response = await fetch("/api/tags")
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

/**
 * Client-side function to validate blog consistency
 */
export async function validateBlogSystem(): Promise<{
  valid: boolean
  missingFiles: string[]
  invalidMetadata: string[]
}> {
  try {
    const response = await fetch("/api/blog-validation")
    if (!response.ok) {
      throw new Error(`Failed to validate blog system: ${response.status}`)
    }
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("Error validating blog system:", error)
    return {
      valid: false,
      missingFiles: [],
      invalidMetadata: [],
    }
  }
}

