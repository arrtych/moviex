'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Calendar,
  MapPin,
  Ruler,
  Star,
  Film,
  Instagram,
  Twitter,
  Facebook,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useMovies } from '@/context/movie-context'
import type { Actor } from '@/types/movie'

export default function ActorPage({ params }: { params: { slug: string } }) {
  const { movies } = useMovies()

  // Fetch actors
  const { data: actors = [], isLoading } = useQuery({
    queryKey: ['actors'],
    queryFn: async () => {
      const res = await fetch('/api/actors')
      if (!res.ok) throw new Error('Failed to fetch actors')
      return res.json()
    },
  })

  // Find the actor from the fetched data
  const actor = actors.find((a: Actor) => a.slug === params.slug)

  // If actor not found, show 404
  if (!actor && !isLoading) {
    notFound()
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

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  // Get movies this actor has appeared in
  const getActorMovies = () => {
    if (!actor || !movies) return []
    return movies.filter((movie) => actor.movieIds.includes(movie.id))
  }

  const actorMovies = getActorMovies()

  if (isLoading || !actor) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded-lg mb-6"></div>
          <div className="h-8 bg-muted rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-muted rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={actor.profileImage || '/placeholder.svg?height=600&width=450'}
                  alt={actor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{actor.name}</h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>Born: {formatDate(actor.birthDate)}</span>
                  <span className="ml-2">
                    ({calculateAge(actor.birthDate, actor.deathDate)} years old)
                  </span>
                </div>

                {actor.birthPlace && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span>{actor.birthPlace}</span>
                  </div>
                )}

                {actor.height && (
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2 text-primary" />
                    <span>{actor.height} cm</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                  <span>{actor.popularity.toFixed(1)} Popularity</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Known For</h2>
                <div className="flex flex-wrap gap-2">
                  {actor.knownFor.map((movie, index) => (
                    <Badge key={index} variant="secondary">
                      {movie}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-base md:text-lg">{actor.biography}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {actor.socialMedia?.instagram && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://instagram.com/${actor.socialMedia.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="mr-2 h-3 w-3" /> Instagram
                    </a>
                  </Button>
                )}

                {actor.socialMedia?.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://twitter.com/${actor.socialMedia.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="mr-2 h-3 w-3" /> Twitter
                    </a>
                  </Button>
                )}

                {actor.socialMedia?.facebook && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://facebook.com/${actor.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="mr-2 h-3 w-3" /> Facebook
                    </a>
                  </Button>
                )}

                {actor.imdbId && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.imdb.com/name/${actor.imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" /> IMDb
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="filmography">
          <TabsList className="mb-6 h-9">
            <TabsTrigger value="filmography" className="flex items-center h-7 text-xs">
              <Film className="h-3 w-3 mr-2" /> Filmography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="filmography" className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {actorMovies.length > 0 ? (
                actorMovies.map((movie) => (
                  <Link key={movie.id} href={`/film/${movie.slug}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="relative w-24 h-36 flex-shrink-0">
                            <Image
                              src={movie.posterPath || '/placeholder.svg?height=144&width=96'}
                              alt={movie.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 flex-1">
                            <h3 className="font-medium text-sm line-clamp-1">{movie.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(movie.releaseDate).getFullYear()}
                            </p>
                            <div className="flex items-center mt-2">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-xs">{movie.ratings.imdb.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No Movies Found</h2>
                  <p className="text-muted-foreground">
                    We don't have any movies for this actor in our database yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
