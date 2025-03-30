import { ensureBlogsDirectory, writeMarkdownFile, fileExists, BLOGS_DIRECTORY } from "./file-utils"
import { sampleMarkdownContent } from "./mock-data"
import { logger } from "./logger"
import path from "path"

/**
 * Generates sample Markdown files for development
 */
export function generateSampleMarkdownFiles(): void {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  logger.info("Checking for sample Markdown files...")

  // Ensure the blogs directory exists
  if (!ensureBlogsDirectory()) {
    logger.error("Failed to create blogs directory, cannot generate sample files")
    return
  }

  // Write each sample file if it doesn't exist
  let filesCreated = 0
  Object.entries(sampleMarkdownContent).forEach(([filename, content]) => {
    const filePath = path.join(BLOGS_DIRECTORY, filename)

    if (!fileExists(filePath)) {
      if (writeMarkdownFile(filename, content)) {
        filesCreated++
      }
    }
  })

  if (filesCreated > 0) {
    logger.info(`Generated ${filesCreated} sample Markdown files in ${BLOGS_DIRECTORY}`)
  } else {
    logger.info("No new sample files needed to be generated")
  }
}

