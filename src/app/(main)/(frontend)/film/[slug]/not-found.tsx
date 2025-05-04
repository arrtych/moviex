"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MovieNotFound() {
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
    <div className="min-h-screen flex flex-col">
      {/* Background with film reel pattern */}
      <div className="absolute inset-0 bg-background z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 right-0 h-full w-full bg-repeat"
            style={{ backgroundImage: "url('/placeholder.svg?height=100&width=100')", backgroundSize: "100px" }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-24 z-10 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="mb-6 relative h-40 w-40 mx-auto">
            <div className="absolute inset-0 animate-pulse bg-primary/20 rounded-full"></div>
            <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>

          <p className="text-muted-foreground mb-8">
            We couldn't find the movie you're looking for. It may have been removed or you might have followed a broken
            link.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Link href="/" className="w-full">
              <Button className="w-full flex items-center justify-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>

            <Link href="/search" className="w-full">
              <Button variant="secondary" className="w-full flex items-center justify-center">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <p className="text-sm text-muted-foreground col-span-full mb-2">Popular genres:</p>
            {["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance"].map((genre) => (
              <Link
                key={genre}
                href={`/search?genre=${genre}`}
                className="text-sm px-3 py-2 bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-6 border-t border-border z-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MovieX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

