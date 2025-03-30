import { generateSampleMarkdownFiles } from "../lib/generate-sample-files"
import { validateBlogConsistency } from "../lib/blog"
import { logger } from "../lib/logger"

async function initBlogSystem() {
  logger.info("Initializing blog system...")

  // Generate sample Markdown files
  generateSampleMarkdownFiles()

  // Validate blog consistency
  const result = validateBlogConsistency()

  if (result.valid) {
    logger.info("Blog system initialized successfully!")
  } else {
    logger.warn("Blog system initialized with warnings:")

    if (result.missingFiles.length > 0) {
      logger.warn(`Missing files: ${result.missingFiles.join(", ")}`)
    }

    if (result.invalidMetadata.length > 0) {
      logger.warn(`Files with invalid metadata: ${result.invalidMetadata.join(", ")}`)
    }
  }
}

// Run the initialization
initBlogSystem().catch((error) => {
  logger.error("Failed to initialize blog system:", error)
  process.exit(1)
})

