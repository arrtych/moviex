'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMovies } from '@/context/movie-context'
import { Card, CardContent } from '@/components/ui/card'
import type { Movie } from '@/types/movie'

interface SearchResultsProps {
  query: string
  onSelect: () => void
}

export default function SearchResults({ query, onSelect }: SearchResultsProps) {
  const { searchMovies } = useMovies()
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      setIsLoading(true)
      const searchResults = searchMovies(query)
      setResults(searchResults)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, searchMovies])

  if (isLoading) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-2">
          <div className="flex items-center justify-center p-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-4">
          <p className="text-center text-muted-foreground">No results found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-fade-in overflow-hidden max-h-[70vh] overflow-y-auto">
      <CardContent className="p-0">
        <ul className="divide-y">
          {results.slice(0, 5).map((movie) => (
            <li key={movie.id}>
              <Link
                href={`/film/${movie.slug}`}
                className="flex items-center p-3 hover:bg-muted/50 transition-colors"
                onClick={onSelect}
              >
                <div className="w-12 h-16 relative rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={movie.posterPath || '/placeholder.svg?height=64&width=48'}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium line-clamp-1">{movie.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(movie.releaseDate).getFullYear()} •{' '}
                    {movie.genres.slice(0, 2).join(', ')}
                  </p>
                </div>
              </Link>
            </li>
          ))}

          {results.length > 5 && (
            <li>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="block p-3 text-center text-sm text-primary hover:bg-muted/50 transition-colors"
                onClick={onSelect}
              >
                View all {results.length} results
              </Link>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
