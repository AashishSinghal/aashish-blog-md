import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "./types"
import { cache } from "react"

// Directory where blog posts are stored
const blogsDirectory = path.join(process.cwd(), "blogs")

// Function to read all blog posts
export const getAllPosts = cache((): BlogPost[] => {
  try {
    // Check if the directory exists
    if (!fs.existsSync(blogsDirectory)) {
      console.warn(`Blog directory not found: ${blogsDirectory}`)
      return []
    }

    // Get all files from the blogs directory
    const fileNames = fs.readdirSync(blogsDirectory)

    // Filter for markdown files
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))

    // Read and parse each file
    const posts = markdownFiles.map((fileName) => {
      // Create slug from filename
      const slug = fileName.replace(/\.mdx?$/, "")

      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents)

      // Validate required fields
      if (!data.title || !data.date) {
        console.warn(`Missing required frontmatter in ${fileName}`)
      }

      // Ensure date is in the correct format
      const date = data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString()

      // Ensure tags is an array
      const tags = Array.isArray(data.tags) ? data.tags : []

      // Create blog post object
      return {
        id: slug,
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date,
        author: data.author || "Anonymous",
        tags,
        thumbnail: data.thumbnail || null,
        content,
      } as BlogPost
    })

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
})

// Function to get a specific post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    const posts = getAllPosts()
    return posts.find((post) => post.slug === slug)
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error)
    return undefined
  }
}

// Function to get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter((post) => post.tags.includes(tag))
  } catch (error) {
    console.error(`Error getting posts with tag ${tag}:`, error)
    return []
  }
}

