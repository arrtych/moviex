import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  type: "movie-not-found" | "collection-not-found" | "no-results"
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({
  type,
  title,
  description,
  actionLabel = "Go Home",
  actionHref = "/",
}: EmptyStateProps) {
  const defaultContent = {
    "movie-not-found": {
      title: "Movie Not Found",
      description:
        "We couldn't find the movie you're looking for. It may have been removed or you might have followed a broken link.",
      image: "/placeholder.svg?height=200&width=200",
    },
    "collection-not-found": {
      title: "Collection Empty",
      description: "You haven't added any movies to this collection yet. Start exploring and add some movies!",
      image: "/placeholder.svg?height=200&width=200",
    },
    "no-results": {
      title: "No Results Found",
      description:
        "We couldn't find any movies matching your search criteria. Try adjusting your filters or search terms.",
      image: "/placeholder.svg?height=200&width=200",
    },
  }

  const content = defaultContent[type]

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-40 h-40 relative mb-6">
        <Image src={content.image || "/placeholder.svg"} alt={title || content.title} fill className="object-contain" />
      </div>

      <h2 className="text-2xl font-bold mb-2">{title || content.title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description || content.description}</p>

      <Link href={actionHref}>
        <Button>{actionLabel}</Button>
      </Link>
    </div>
  )
}

