import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the request is for the dashboard
    // TODO: Re-enable this authentication check before pushing to Git
    // This is temporarily commented out to allow dashboard access during development
    /*
    if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    */
  } catch (error) {
    console.error("Middleware error:", error)
    // If Supabase is not configured, still allow access to public routes
    // TODO: Re-enable this authentication check before pushing to Git
    // This is temporarily commented out to allow dashboard access during development
    /*
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }
    */
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

