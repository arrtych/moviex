"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMovies } from "@/context/movie-context"
import { useToast } from "@/hooks/use-toast"

interface CollectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movieId: string
  type: "bookmark" | "like"
  movieTitle: string
}

interface Collection {
  id: string
  name: string
  description: string
}

export default function CollectionModal({ open, onOpenChange, movieId, type, movieTitle }: CollectionModalProps) {
  // Mock collections - in a real app, these would come from an API
  const collections: Collection[] = [
    { id: "c1", name: "Favorites", description: "My favorite movies" },
    { id: "c2", name: "Watch Later", description: "Movies to watch later" },
    { id: "c3", name: "Action", description: "Action movies" },
    { id: "c4", name: "Comedy", description: "Comedy movies" },
    { id: "c5", name: "Drama", description: "Drama movies" },
  ]

  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const { addToFavorites } = useMovies()
  const { toast } = useToast()

  // Preselect "Watch Later" when opened for bookmarks
  useEffect(() => {
    if (open && type === "bookmark") {
      const watchLaterCollection = collections.find((c) => c.name === "Watch Later")
      if (watchLaterCollection) {
        setSelectedCollections([watchLaterCollection.id])
      }
    }
  }, [open, type])

  const handleToggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId],
    )
  }

  const handleSave = () => {
    // In a real app, you would save to multiple collections
    // For now, we'll just use the existing favorites system
    addToFavorites(movieId, type)

    // Get the names of selected collections for the toast
    const selectedCollectionNames = collections
      .filter((c) => selectedCollections.includes(c.id))
      .map((c) => c.name)
      .join(", ")

    toast({
      title: "Added to collections",
      description: `"${movieTitle}" has been added to: ${selectedCollectionNames}`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to collections</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCollections.includes(collection.id)
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
                onClick={() => handleToggleCollection(collection.id)}
              >
                <div>
                  <h4 className="font-medium">{collection.name}</h4>
                  <p className="text-xs text-muted-foreground">{collection.description}</p>
                </div>

                {selectedCollections.includes(collection.id) && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={selectedCollections.length === 0}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

