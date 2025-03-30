import matter from "gray-matter"
import type { BlogPost, BlogPostMetadata } from "./types"
import { cache } from "react"
import { mockBlogMetadata } from "./mock-data"
import { getMarkdownFiles, readMarkdownFile, fileExists, BLOGS_DIRECTORY } from "./file-utils"
import { logger } from "./logger"
import { generateSampleMarkdownFiles } from "./generate-sample-files"
import path from "path"

// Generate sample files in development mode
if (process.env.NODE_ENV === "development") {
  generateSampleMarkdownFiles()
}

/**
 * Parses a Markdown file and extracts metadata and content
 */
function parseMarkdownFile(filename: string): BlogPost | null {
  try {
    const fileContent = readMarkdownFile(filename)

    if (!fileContent) {
      logger.warn(`Failed to read Markdown file: ${filename}`)
      return null
    }

    // Parse frontmatter and content
    const { data, content } = matter(fileContent)

    // Validate required fields
    if (!data.title || !data.date) {
      logger.warn(`Missing required frontmatter in ${filename}`)
      return null
    }

    // Create slug from filename (remove extension)
    const slug = filename.replace(/\.mdx?$/, "")

    // Ensure date is in the correct format
    const date = data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString()

    // Ensure tags is an array
    const tags = Array.isArray(data.tags) ? data.tags : []

    // Create blog post object
    return {
      id: slug,
      slug,
      title: data.title,
      description: data.description || "",
      date,
      author: data.author || "Anonymous",
      tags,
      thumbnail: data.thumbnail || null,
      filename,
      content,
    }
  } catch (error) {
    logger.error(`Error parsing Markdown file: ${filename}`, error)
    return null
  }
}

/**
 * Creates a fallback post with minimal content
 */
function createFallbackPost(metadata: BlogPostMetadata): BlogPost {
  return {
    ...metadata,
    content: "# Content not available due to an error",
  }
}

/**
 * Gets all blog posts from Markdown files
 */
export const getAllPosts = cache((): BlogPost[] => {
  try {
    // In development, if USE_MOCK_DATA is true, return mock data
    if (process.env.NODE_ENV === "development" && process.env.USE_MOCK_DATA === "true") {
      logger.info("Using mock blog data for development")

      // Convert metadata to full posts by loading content from files
      return mockBlogMetadata.map((metadata) => {
        const content = readMarkdownFile(metadata.filename)
        if (content) {
          return { ...metadata, content }
        }
        return createFallbackPost(metadata)
      })
    }

    // Check if the blogs directory exists
    if (!fileExists(BLOGS_DIRECTORY)) {
      logger.warn(`Blog directory not found: ${BLOGS_DIRECTORY}`)

      // In development, generate sample files and try again
      if (process.env.NODE_ENV === "development") {
        generateSampleMarkdownFiles()

        // If still no directory, fall back to mock data
        if (!fileExists(BLOGS_DIRECTORY)) {
          logger.info("Falling back to mock data after failed directory creation")
          return mockBlogMetadata.map((metadata) => createFallbackPost(metadata))
        }
      } else {
        return []
      }
    }

    // Get all Markdown files
    const markdownFiles = getMarkdownFiles()

    if (markdownFiles.length === 0) {
      logger.warn("No Markdown files found in blogs directory")

      // In development, generate sample files and try again
      if (process.env.NODE_ENV === "development") {
        generateSampleMarkdownFiles()
        const newFiles = getMarkdownFiles()

        if (newFiles.length === 0) {
          logger.info("Falling back to mock data after generating sample files")
          return mockBlogMetadata.map((metadata) => createFallbackPost(metadata))
        }

        logger.info(`Found ${newFiles.length} Markdown files after generation`)
        markdownFiles.push(...newFiles)
      } else {
        return []
      }
    }

    // Parse each Markdown file
    const posts = markdownFiles
      .map((filename) => parseMarkdownFile(filename))
      .filter((post): post is BlogPost => post !== null)

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    logger.error("Error reading blog posts:", error)

    // In development, return mock data if there's an error
    if (process.env.NODE_ENV === "development") {
      logger.info("Falling back to mock blog data due to error")
      const fallbackPosts: BlogPost[] = []
      for (const metadata of mockBlogMetadata) {
        fallbackPosts.push(createFallbackPost(metadata))
      }
      return fallbackPosts
    }

    return []
  }
})

/**
 * Gets a specific post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    // First try to find the post in the loaded posts
    const posts = getAllPosts()
    const post = posts.find((post) => post.slug === slug)

    if (post) {
      return post
    }

    // If not found, try to load it directly from a file
    const filename = `${slug}.md`
    const filePath = path.join(BLOGS_DIRECTORY, filename)

    if (fileExists(filePath)) {
      const post = parseMarkdownFile(filename)
      if (post) {
        return post
      }
    }

    logger.warn(`Post with slug "${slug}" not found`)
    return undefined
  } catch (error) {
    logger.error(`Error getting post with slug ${slug}:`, error)
    return undefined
  }
}

/**
 * Gets posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter((post) => post.tags.includes(tag))
  } catch (error) {
    logger.error(`Error getting posts with tag ${tag}:`, error)
    return []
  }
}

/**
 * Gets all unique tags from all posts
 */
export function getAllTags(): string[] {
  try {
    const posts = getAllPosts()
    const tagSet = new Set<string>()

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    })

    return Array.from(tagSet).sort()
  } catch (error) {
    logger.error("Error getting all tags:", error)
    return []
  }
}

/**
 * Validates the consistency between metadata and Markdown files
 */
export function validateBlogConsistency(): {
  valid: boolean
  missingFiles: string[]
  invalidMetadata: string[]
} {
  try {
    const result = {
      valid: true,
      missingFiles: [] as string[],
      invalidMetadata: [] as string[],
    }

    // Check if all metadata entries have corresponding files
    mockBlogMetadata.forEach((metadata) => {
      const filePath = path.join(BLOGS_DIRECTORY, metadata.filename)
      if (!fileExists(filePath)) {
        result.valid = false
        result.missingFiles.push(metadata.filename)
      }
    })

    // Check if all files have valid metadata
    const markdownFiles = getMarkdownFiles()
    markdownFiles.forEach((filename) => {
      const post = parseMarkdownFile(filename)
      if (!post) {
        result.valid = false
        result.invalidMetadata.push(filename)
      }
    })

    return result
  } catch (error) {
    logger.error("Error validating blog consistency:", error)
    return {
      valid: false,
      missingFiles: [],
      invalidMetadata: [],
    }
  }
}

