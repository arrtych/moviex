'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Star, Users } from 'lucide-react'
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
import type { Actor } from '@/types/movie'

export default function ActorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<string>('popularity-desc')
  const [displayLimit, setDisplayLimit] = useState(12)

  // Fetch actors
  const { data: actors = [], isLoading } = useQuery({
    queryKey: ['actors'],
    queryFn: async () => {
      const res = await fetch('/api/actors')
      if (!res.ok) throw new Error('Failed to fetch actors')
      return res.json()
    },
  })

  // Filter actors based on search query
  const filteredActors = actors.filter((actor: Actor) => {
    return (
      actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.knownFor.some((movie) => movie.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  // Sort the filtered actors
  const sortedActors = [...filteredActors].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'popularity-asc':
        return a.popularity - b.popularity
      case 'popularity-desc':
        return b.popularity - a.popularity
      case 'birthdate-asc':
        return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
      case 'birthdate-desc':
        return new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime()
      default:
        return 0
    }
  })

  // Get actors to display based on limit
  const displayedActors = sortedActors.slice(0, displayLimit)
  const hasMore = displayedActors.length < sortedActors.length

  const loadMore = () => {
    setDisplayLimit((prev) => prev + 12)
  }

  // Calculate age from birthdate
  const calculateAge = (birthDate: string, deathDate?: string) => {
    const birth = new Date(birthDate)
    const end = deathDate ? new Date(deathDate) : new Date()
    const ageDiff = end.getFullYear() - birth.getFullYear()
    const isBirthdayPassed =
      end.getMonth() > birth.getMonth() ||
      (end.getMonth() === birth.getMonth() && end.getDate() >= birth.getDate())

    return isBirthdayPassed ? ageDiff : ageDiff - 1
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Actors</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-muted"></div>
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
        <h1 className="text-2xl font-bold">Actors</h1>
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
              <SelectItem value="birthdate-desc">Age (Youngest First)</SelectItem>
              <SelectItem value="birthdate-asc">Age (Oldest First)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search actors..."
          className="pl-10 pr-10 border-2 border-primary/30 focus:border-primary focus-visible:ring-primary/20 h-10 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredActors.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Actors Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any actors matching your search criteria. Try adjusting your search
            terms.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Found {filteredActors.length} {filteredActors.length === 1 ? 'actor' : 'actors'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayedActors.map((actor: Actor) => (
              <Link key={actor.id} href={`/actors/${actor.slug}`}>
                <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={actor.profileImage || '/placeholder.svg?height=400&width=300'}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-xs text-white">{actor.popularity.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{actor.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Age: {calculateAge(actor.birthDate, actor.deathDate)}
                      </p>
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
