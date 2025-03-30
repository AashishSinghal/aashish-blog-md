"use client"

import { useState, useEffect } from "react"
import { validateBlogSystem } from "@/lib/client-blog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export function BlogSystemStatus() {
  const [status, setStatus] = useState<{
    valid: boolean
    missingFiles: string[]
    invalidMetadata: string[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkBlogSystem = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await validateBlogSystem()
      setStatus(result)
    } catch (err) {
      setError("Failed to validate blog system")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkBlogSystem()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog System Status</CardTitle>
        <CardDescription>Validate the consistency of your blog system</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2">Checking blog system...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : status ? (
          <>
            {status.valid ? (
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>All good!</AlertTitle>
                <AlertDescription>Your blog system is consistent and working properly.</AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Inconsistencies detected</AlertTitle>
                <AlertDescription>There are issues with your blog system that need attention.</AlertDescription>
              </Alert>
            )}

            <div className="mt-4 space-y-4">
              {status.missingFiles.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Missing Markdown Files:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {status.missingFiles.map((file) => (
                      <li key={file} className="text-sm text-destructive">
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {status.invalidMetadata.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Files with Invalid Metadata:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {status.invalidMetadata.map((file) => (
                      <li key={file} className="text-sm text-destructive">
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : null}

        <Button onClick={checkBlogSystem} disabled={loading} className="mt-4" variant="outline">
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

