"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { AuthModal } from "@/components/auth-modal"

interface LikeButtonProps {
  postId: string
}

export function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const { user, isLoading, isConfigured } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Load likes from localStorage on component mount
  useEffect(() => {
    const storedLikes = localStorage.getItem(`blog-likes-${postId}`)

    if (storedLikes) {
      setLikes(Number.parseInt(storedLikes, 10))
    }

    if (user) {
      const hasLiked = localStorage.getItem(`blog-liked-${user.id}-${postId}`) === "true"
      setLiked(hasLiked)
    }
  }, [postId, user])

  const handleLike = () => {
    if (!user) {
      console.log("User not logged in, opening auth modal")
      setAuthModalOpen(true)
      return
    }

    const newLiked = !liked
    const newLikes = newLiked ? likes + 1 : likes - 1

    setLiked(newLiked)
    setLikes(newLikes)

    // Save to localStorage
    localStorage.setItem(`blog-likes-${postId}`, newLikes.toString())
    localStorage.setItem(`blog-liked-${user.id}-${postId}`, newLiked.toString())
  }

  // If Supabase is not configured, show a simplified like button
  if (!isConfigured) {
    return (
      <Button variant="ghost" size="sm" className="flex items-center gap-2" disabled>
        <Heart className="h-5 w-5 text-muted-foreground" />
        <span>{likes} likes</span>
      </Button>
    )
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" className="flex items-center gap-2" disabled>
        <Heart className="h-5 w-5 text-muted-foreground" />
        <span>Loading...</span>
      </Button>
    )
  }

  return (
    <>
      <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLike}>
        <Heart className={`h-5 w-5 ${user && liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        <span>{likes} likes</span>
      </Button>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultTab="login" />
    </>
  )
}

