'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bookmark,
  Heart,
  Tv,
  Calendar,
  Filter,
  Download,
  Pause,
  CheckCircle,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useMovies } from '@/context/movie-context'
import type { FeedItem, Movie } from '@/types/movie'

export default function FeedPage() {
  const { movies } = useMovies()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Fetch feed items
  const { data: feedItems = [], isLoading } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      const res = await fetch('/api/feed')
      if (!res.ok) throw new Error('Failed to fetch feed')
      return res.json()
    },
  })

  // Filter feed items based on active filter
  const filteredFeedItems = feedItems.filter((item: FeedItem) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'collections') return item.type === 'collection_add'
    if (activeFilter === 'likes') return item.type === 'like'
    if (activeFilter === 'episodes') return item.type === 'watched_episode'
    if (activeFilter === 'downloads') return item.type === 'download_status'
    return true
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // Format file size
  const formatSize = (sizeInMB?: number) => {
    if (!sizeInMB) return 'Unknown size'
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(2)} GB`
    }
    return `${sizeInMB.toFixed(0)} MB`
  }

  // Get movie details by ID
  const getMovie = (movieId: string): Movie | undefined => {
    return movies.find((movie) => movie.id === movieId)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Activity Feed</h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-muted rounded"></div>
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
        <h1 className="text-2xl font-bold">Activity Feed</h1>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-2">Filter:</span>
          <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="episodes">Episodes</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFeedItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No activity found for this filter.</p>
            </CardContent>
          </Card>
        ) : (
          filteredFeedItems.map((item: FeedItem) => {
            const movie = getMovie(item.movieId)
            if (!movie) return null

            return (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 md:h-auto">
                      <Image
                        src={movie.posterPath || '/placeholder.svg?height=192&width=128'}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                      {movie.type === 'serial' && (
                        <div className="absolute top-2 right-2 bg-primary/80 rounded-full p-1">
                          <Tv className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/film/${movie.slug}`} className="hover:underline">
                            <h3 className="text-xl font-semibold">{movie.title}</h3>
                          </Link>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <span>{new Date(movie.releaseDate).getFullYear()}</span>
                            <span className="mx-2">•</span>
                            <span>{movie.genres.join(', ')}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        {item.type === 'collection_add' && (
                          <div className="flex items-center">
                            <Bookmark className="h-5 w-5 text-primary mr-2" />
                            <div>
                              <p className="font-medium">Added to collections</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.collections?.map((collection) => (
                                  <Badge key={collection} variant="secondary">
                                    {collection}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {item.type === 'like' && (
                          <div className="flex items-center">
                            <Heart className="h-5 w-5 text-primary fill-primary mr-2" />
                            <p className="font-medium">Added to favorites</p>
                          </div>
                        )}

                        {item.type === 'watched_episode' && (
                          <div className="flex items-center">
                            <Tv className="h-5 w-5 text-primary mr-2" />
                            <div>
                              <p className="font-medium">Watched an episode</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Season {item.season}, Episode {item.episode}: "{item.episodeTitle}"
                              </p>
                            </div>
                          </div>
                        )}

                        {item.type === 'download_status' && (
                          <div className="flex items-center">
                            {item.downloadStatus === 'downloaded' && (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            )}
                            {item.downloadStatus === 'downloading' && (
                              <Download className="h-5 w-5 text-blue-500 mr-2" />
                            )}
                            {item.downloadStatus === 'paused' && (
                              <Pause className="h-5 w-5 text-amber-500 mr-2" />
                            )}
                            {item.downloadStatus === 'deleted' && (
                              <Trash2 className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <div>
                              <p className="font-medium">
                                {item.downloadStatus === 'downloaded' && 'Download completed'}
                                {item.downloadStatus === 'downloading' && 'Download started'}
                                {item.downloadStatus === 'paused' && 'Download paused'}
                                {item.downloadStatus === 'deleted' && 'Download deleted'}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.quality} • {formatSize(item.size)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <Link href={`/film/${movie.slug}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
