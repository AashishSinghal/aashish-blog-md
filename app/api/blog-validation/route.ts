import { NextResponse } from "next/server"
import { validateBlogConsistency } from "@/lib/blog"
import { logger } from "@/lib/logger"

export async function GET() {
  try {
    const result = validateBlogConsistency()

    if (result.valid) {
      return NextResponse.json({
        status: "success",
        message: "Blog system is consistent",
        data: result,
      })
    } else {
      return NextResponse.json(
        {
          status: "warning",
          message: "Blog system has inconsistencies",
          data: result,
        },
        { status: 200 },
      ) // Still return 200 as this is not a server error
    }
  } catch (error) {
    logger.error("Error validating blog consistency:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to validate blog consistency",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

