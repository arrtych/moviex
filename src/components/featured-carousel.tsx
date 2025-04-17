'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Movie } from '@/types/movie'
import { useMovies } from '@/context/movie-context'

interface FeaturedCarouselProps {
  movies: Movie[]
}

export default function FeaturedCarousel({ movies }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { addToFavorites } = useMovies()

  const currentMovie = movies[currentIndex]

  const goToNext = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, movies.length])

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, movies.length])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 8000)

    return () => clearInterval(interval)
  }, [goToNext])

  if (!currentMovie) return null

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
        <Image
          src={currentMovie.backdropPath || `/placeholder.svg?height=1080&width=1920`}
          alt={currentMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative h-full flex flex-col justify-end p-6 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{currentMovie.title}</h1>

          <div className="flex items-center space-x-4 text-sm md:text-base mb-2 md:mb-4">
            <span>{new Date(currentMovie.releaseDate).getFullYear()}</span>
            <span>
              {Math.floor(currentMovie.duration / 60)}h {currentMovie.duration % 60}m
            </span>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{currentMovie.ratings.imdb.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-3 md:line-clamp-4">
            {currentMovie.overview}
          </p>

          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {currentMovie.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="tag">
                {genre}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            <Link href={`/film/${currentMovie.slug}`}>
              <Button>
                <Info className="mr-2 h-4 w-4" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 hover:bg-background/40"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 hover:bg-background/40"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-400/50'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => {
                  setIsTransitioning(false)
                }, 500)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
