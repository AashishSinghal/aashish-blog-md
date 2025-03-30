import fs from "fs"
import path from "path"
import { logger } from "./logger"

// Directory where blog posts are stored
export const BLOGS_DIRECTORY = path.join(process.cwd(), "blogs")

/**
 * Checks if a file exists
 */
export function fileExists(filepath: string): boolean {
  try {
    return fs.existsSync(filepath)
  } catch (error) {
    logger.error(`Error checking if file exists: ${filepath}`, error)
    return false
  }
}

/**
 * Gets all Markdown files in the blogs directory
 */
export function getMarkdownFiles(): string[] {
  try {
    if (!fileExists(BLOGS_DIRECTORY)) {
      logger.warn(`Blogs directory not found: ${BLOGS_DIRECTORY}`)
      return []
    }

    const fileNames = fs.readdirSync(BLOGS_DIRECTORY)
    return fileNames.filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
  } catch (error) {
    logger.error("Error reading blog directory", error)
    return []
  }
}

/**
 * Reads a Markdown file and returns its content
 */
export function readMarkdownFile(filename: string): string | null {
  try {
    const filePath = path.join(BLOGS_DIRECTORY, filename)

    if (!fileExists(filePath)) {
      logger.warn(`Markdown file not found: ${filePath}`)
      return null
    }

    return fs.readFileSync(filePath, "utf8")
  } catch (error) {
    logger.error(`Error reading Markdown file: ${filename}`, error)
    return null
  }
}

/**
 * Creates the blogs directory if it doesn't exist
 */
export function ensureBlogsDirectory(): boolean {
  try {
    if (!fileExists(BLOGS_DIRECTORY)) {
      fs.mkdirSync(BLOGS_DIRECTORY, { recursive: true })
      logger.info(`Created blogs directory: ${BLOGS_DIRECTORY}`)
    }
    return true
  } catch (error) {
    logger.error("Error creating blogs directory", error)
    return false
  }
}

/**
 * Writes a Markdown file to the blogs directory
 */
export function writeMarkdownFile(filename: string, content: string): boolean {
  try {
    ensureBlogsDirectory()
    const filePath = path.join(BLOGS_DIRECTORY, filename)
    fs.writeFileSync(filePath, content, "utf8")
    logger.info(`Wrote Markdown file: ${filePath}`)
    return true
  } catch (error) {
    logger.error(`Error writing Markdown file: ${filename}`, error)
    return false
  }
}

