'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Film } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Genre } from '@/types/genre'

export default function GenresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<string>('popularity-desc')
  const [displayLimit, setDisplayLimit] = useState(20)

  // Fetch genres
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const res = await fetch('/api/genres')
      if (!res.ok) throw new Error('Failed to fetch genres')
      return res.json()
    },
  })

  // Filter genres based on search query
  const filteredGenres = genres.filter((genre: Genre) => {
    return (
      genre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (genre.description && genre.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  // Sort the filtered genres
  const sortedGenres = [...filteredGenres].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'popularity-asc':
        return a.popularity - b.popularity
      case 'popularity-desc':
        return b.popularity - a.popularity
      default:
        return 0
    }
  })

  // Get genres to display based on limit
  const displayedGenres = sortedGenres.slice(0, displayLimit)
  const hasMore = displayedGenres.length < sortedGenres.length

  const loadMore = () => {
    setDisplayLimit((prev) => prev + 20)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Genres</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted"></div>
                <div className="p-3">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Genres</h1>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-2">Sort:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity-desc">Popularity (High to Low)</SelectItem>
              <SelectItem value="popularity-asc">Popularity (Low to High)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search genres..."
          className="pl-10 pr-10 border-2 border-primary/30 focus:border-primary focus-visible:ring-primary/20 h-10 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredGenres.length === 0 ? (
        <div className="text-center py-12">
          <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Genres Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any genres matching your search criteria. Try adjusting your search
            terms.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Found {filteredGenres.length} {filteredGenres.length === 1 ? 'genre' : 'genres'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedGenres.map((genre: Genre) => (
              <Link key={genre.id} href={`/genres/${genre.slug}`}>
                <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={genre.imageUrl || '/placeholder.svg?height=200&width=400'}
                        alt={genre.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-xl font-bold text-white">{genre.name}</h3>
                          <p className="text-sm text-white/80">{genre.movieIds.length} movies</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="sm" onClick={loadMore}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
