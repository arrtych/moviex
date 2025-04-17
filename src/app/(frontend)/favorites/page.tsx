'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import FilmCard from '@/components/film-card'
import EmptyState from '@/components/empty-state'
import { useMovies } from '@/context/movie-context'
import type { Movie } from '@/types'

export default function FavoritesPage() {
  const { movies, favorites } = useMovies()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [displayLimit, setDisplayLimit] = useState(12)

  // Filter movies by favorite type
  const bookmarkedMovies = movies.filter((movie) =>
    favorites.some((fav) => fav.movieId === movie.id && fav.bookmark),
  )
  const likedMovies = movies.filter((movie) =>
    favorites.some((fav) => fav.movieId === movie.id && fav.like),
  )
  const allFavoriteMovies = movies.filter((movie) =>
    favorites.some((fav) => fav.movieId === movie.id),
  )

  const handleActivate = (id: string) => {
    setActiveId(id)
  }

  const loadMore = () => {
    setDisplayLimit((prev) => prev + 12)
  }

  const renderEmptyState = (type: string) => (
    <EmptyState
      type="collection-not-found"
      title={`No ${type} Movies`}
      description={`You haven't added any movies to your ${type.toLowerCase()} collection yet.`}
      actionLabel="Explore Movies"
      actionHref="/"
    />
  )

  const renderMovieGrid = (moviesToDisplay: Movie[]) => {
    const displayedMovies = moviesToDisplay.slice(0, displayLimit)
    const hasMore = displayedMovies.length < moviesToDisplay.length

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {displayedMovies.map((movie) => (
            <FilmCard
              key={movie.id}
              movie={movie}
              activeId={activeId || undefined}
              onActivate={handleActivate}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({allFavoriteMovies.length})</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked ({bookmarkedMovies.length})</TabsTrigger>
          <TabsTrigger value="liked">Liked ({likedMovies.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {allFavoriteMovies.length === 0
            ? renderEmptyState('Favorite')
            : renderMovieGrid(allFavoriteMovies)}
        </TabsContent>

        <TabsContent value="bookmarked">
          {bookmarkedMovies.length === 0
            ? renderEmptyState('Bookmarked')
            : renderMovieGrid(bookmarkedMovies)}
        </TabsContent>

        <TabsContent value="liked">
          {likedMovies.length === 0 ? renderEmptyState('Liked') : renderMovieGrid(likedMovies)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
