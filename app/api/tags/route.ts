import { NextResponse } from "next/server"
import { getAllTags } from "@/lib/blog"
import { logger } from "@/lib/logger"

export async function GET() {
  try {
    const tags = getAllTags()
    return NextResponse.json(tags)
  } catch (error) {
    logger.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}

