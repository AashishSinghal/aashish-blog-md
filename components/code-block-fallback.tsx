import type React from "react"
export function CodeBlockFallback({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
      <code className="text-sm font-mono">{children}</code>
    </pre>
  )
}

