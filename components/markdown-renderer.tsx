"use client"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Image from "next/image"
import Link from "next/link"

// Lazy load the syntax highlighter to avoid SSR issues
import dynamic from "next/dynamic"

// Dynamically import the syntax highlighter components
const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then((mod) => mod.Prism), {
  ssr: false,
  loading: () => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
      <code>Loading syntax highlighter...</code>
    </pre>
  ),
})

const vscDarkPlus = dynamic(
  () => import("react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus").then((mod) => mod.default),
  { ssr: false },
)

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // State to track if the component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        a: ({ node, href, ...props }) => {
          if (href?.startsWith("http")) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                {...props}
              />
            )
          }
          return <Link href={href || "#"} className="text-primary hover:underline" {...props} />
        },
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
        ),
        img: ({ node, src, alt, ...props }) => (
          <div className="my-6">
            <Image src={src || "/placeholder.svg"} alt={alt || ""} width={800} height={450} className="rounded-lg" />
          </div>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")

          // For inline code
          if (inline) {
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          }

          // For code blocks
          if (match && isMounted) {
            return (
              <div className="my-6 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            )
          }

          // Fallback for non-mounted state or no language specified
          return (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
              <code className="text-sm font-mono" {...props}>
                {children}
              </code>
            </pre>
          )
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
        th: ({ node, ...props }) => (
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" {...props} />
        ),
        td: ({ node, ...props }) => <td className="px-4 py-3" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

