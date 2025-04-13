'use client'

import type React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, Heart, Star, Tv, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMovies } from '@/context/movie-context'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import type { Movie, LibraryItem } from '@/types/movie'
import CollectionModal from './collection-modal'

interface FilmCardProps {
  movie: Movie
  variant?: 'default' | 'small' | 'large'
  activeId?: string
  onActivate?: (id: string) => void
  labelSize?: 'default' | 'xs' // Add this new prop
}

export default function FilmCard({
  movie,
  variant = 'default',
  activeId,
  onActivate,
  labelSize = 'default',
}: FilmCardProps) {
  const { addToFavorites, removeFromFavorites, favorites } = useMovies()
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [collectionType, setCollectionType] = useState<'bookmark' | 'like'>('bookmark')

  const isActive = activeId === movie.id
  const isSerial = movie.type === 'serial'

  const favorite = favorites.find((fav) => fav.movieId === movie.id)
  const isBookmarked = favorite?.bookmark || false
  const isLiked = favorite?.like || false

  // Fetch library items to check if this movie is in the library
  const { data: libraryItems = [] } = useQuery({
    queryKey: ['library'],
    queryFn: async () => {
      const res = await fetch('/api/library')
      if (!res.ok) throw new Error('Failed to fetch library')
      return res.json()
    },
  })

  // Find the library item for this movie
  const libraryItem = libraryItems.find((item: LibraryItem) => item.movieId === movie.id)
  const isInLibrary = !!libraryItem

  const handleActivate = () => {
    if (onActivate) {
      onActivate(movie.id)
    }
  }

  const { toast } = useToast()

  const openCollectionModal = (e: React.MouseEvent, type: 'bookmark' | 'like') => {
    e.preventDefault()
    e.stopPropagation()
    setCollectionType(type)
    setShowCollectionModal(true)
  }

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isBookmarked) {
      removeFromFavorites(movie.id, 'bookmark')
      toast({
        title: 'Removed from collections',
        description: `"${movie.title}" has been removed from your collections`,
      })
    } else {
      openCollectionModal(e, 'bookmark')
    }
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      removeFromFavorites(movie.id, 'like')
      toast({
        title: 'Removed from favorites',
        description: `"${movie.title}" has been removed from your favorites`,
      })
    } else {
      addToFavorites(movie.id, 'like')
      toast({
        title: 'Added to favorites',
        description: `"${movie.title}" has been added to your favorites`,
      })
    }
  }

  const cardSizes = {
    small: 'w-32 h-48',
    default: 'w-40 h-60',
    large: 'w-48 h-72',
  }

  const titleSizes = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base',
  }

  return (
    <>
      <Link
        href={`/film/${movie.slug}`}
        className={`block relative rounded-lg overflow-hidden group ${
          isActive ? 'movie-card-active' : 'movie-card-hover'
        } max-w-[${
          variant === 'large' ? '192px' : variant === 'default' ? '160px' : '128px'
        }] ${!isInLibrary && !isActive ? 'opacity-75' : 'opacity-100'}`}
        onMouseEnter={handleActivate}
      >
        <div className={`relative ${cardSizes[variant]}`}>
          <Image
            src={
              movie.posterPath ||
              `/placeholder.svg?height=${
                variant === 'large' ? 288 : variant === 'default' ? 240 : 192
              }&width=${variant === 'large' ? 192 : variant === 'default' ? '160px' : '128px'}`
            }
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            sizes={`(max-width: 768px) 100vw, ${
              variant === 'large' ? '192px' : variant === 'default' ? '160px' : '128px'
            }`}
          />

          {/* Serial indicator */}
          {isSerial && (
            <div className="absolute top-2 right-2 bg-primary/80 rounded-full p-1">
              <Tv className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Library indicator - circular badge with download icon */}
          {isInLibrary && (
            <div
              className={`absolute top-2 right-2 z-10 ${
                libraryItem?.status === 'downloading'
                  ? 'bg-blue-500 animate-pulse'
                  : libraryItem?.status === 'paused'
                    ? 'bg-amber-500'
                    : 'bg-green-500'
              } rounded-full p-1.5 shadow-md`}
            >
              <Download className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Movie Labels */}
          {movie.labels && movie.labels.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {movie.labels.map((label) => (
                <span
                  key={label.slug}
                  className={`${
                    labelSize === 'xs' ? 'text-[0.6rem] px-1 py-0.5' : 'text-xs px-1.5 py-0.5'
                  } font-bold rounded ${label.color} text-white shadow-md`}
                >
                  {label.text}
                </span>
              ))}
            </div>
          )}

          {/* Overlay on hover or active */}
          <div
            className="absolute inset-0 bg-black/70 flex flex-col justify-between p-2 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
            style={{ borderRadius: 'inherit' }}
          >
            <div className="flex justify-between w-full">
              {/* Movie Labels in hover state */}
              {movie.labels && movie.labels.length > 0 && (
                <div className="flex flex-col gap-1">
                  {movie.labels.map((label) => (
                    <span
                      key={label.slug}
                      className={`${
                        labelSize === 'xs' ? 'text-[0.6rem] px-1 py-0.5' : 'text-xs px-1.5 py-0.5'
                      } font-bold rounded ${label.color} text-white shadow-md`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col items-end space-y-2 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:text-primary hover:bg-black/20"
                  onClick={toggleBookmark}
                >
                  <Bookmark
                    className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`}
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:text-primary hover:bg-black/20"
                  onClick={toggleLike}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              {/* IMDB rating and duration row */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-white">
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </span>
                <div className="flex items-center bg-yellow-900/30 text-yellow-500 px-1.5 py-0.5 rounded text-xs">
                  <span className="font-bold mr-1">IMDb</span>
                  <Star className="fill-yellow-500 text-yellow-500 h-3 w-3 mr-0.5" />
                  <span>{movie.ratings.imdb.toFixed(1)}</span>
                </div>
              </div>

              {/* Year and KP rating row */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-white">
                  {new Date(movie.releaseDate).getFullYear()}
                </span>
                <div className="flex items-center bg-orange-900/30 text-orange-500 px-1.5 py-0.5 rounded text-xs">
                  <span className="font-bold mr-1">KP</span>
                  <Star className="fill-orange-500 text-orange-500 h-3 w-3 mr-0.5" />
                  <span>{movie.ratings.kinopoisk.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 px-1">
          <h3
            className={`font-medium whitespace-nowrap overflow-hidden text-ellipsis ${titleSizes[variant]}`}
            title={movie.title}
          >
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground truncate">{movie.genres[0] || 'Unknown'}</p>
            {isSerial && (
              <span className="text-xs bg-primary/10 text-primary px-1 rounded">TV</span>
            )}
          </div>
        </div>
      </Link>

      {showCollectionModal && (
        <CollectionModal
          open={showCollectionModal}
          onOpenChange={setShowCollectionModal}
          movieId={movie.id}
          type={collectionType}
          movieTitle={movie.title}
        />
      )}
    </>
  )
}
