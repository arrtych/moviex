"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import EmptyState from "@/components/empty-state"

export default function NotFound() {
  const router = useRouter()

  // Ensure dark mode is applied
  useEffect(() => {
    document.documentElement.classList.add("dark")
    return () => {
      // Clean up when component unmounts
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 pt-24 bg-background">
      <EmptyState
        type="movie-not-found"
        title="Page Not Found"
        description="We couldn't find the page you're looking for. It may have been removed or you might have followed a broken link."
        actionLabel="Go Home"
        actionHref="/"
      />
    </div>
  )
}

