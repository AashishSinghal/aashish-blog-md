"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { User } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

interface Comment {
  id: string
  author: string
  authorId: string
  content: string
  date: string
  avatar?: string
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { toast } = useToast()
  const { user, isLoading, isConfigured } = useAuth()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem(`blog-comments-${postId}`)

    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [postId])

  const handleSubmitComment = () => {
    if (!user || !comment.trim()) return

    // In a real app, you would send this to your API
    const newComment: Comment = {
      id: Date.now().toString(),
      author: user.user_metadata?.full_name || user.email?.split("@")[0] || "Anonymous",
      authorId: user.id,
      content: comment,
      date: new Date().toISOString(),
      avatar: user.user_metadata?.avatar_url,
    }

    const updatedComments = [newComment, ...comments]
    setComments(updatedComments)
    setComment("")

    // Save to localStorage
    localStorage.setItem(`blog-comments-${postId}`, JSON.stringify(updatedComments))

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    })
  }

  const handleSignInClick = () => {
    console.log("Sign in button clicked in comments")
    setAuthModalOpen(true)
  }

  // If Supabase is not configured, show a simplified comment section
  if (!isConfigured) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
        <div className="space-y-6 mt-8">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author ? comment.author.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <p>Loading comments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>

      {user ? (
        <div className="space-y-4">
          <Textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <p className="mb-4">Sign in to leave a comment</p>
          <Button onClick={handleSignInClick}>Sign In</Button>
        </div>
      )}

      <div className="space-y-6 mt-8">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>
                  {comment.author ? comment.author.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{comment.author}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultTab="login" />
    </div>
  )
}

