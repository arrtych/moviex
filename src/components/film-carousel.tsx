'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FilmCard from './film-card'
import type { Movie } from '@/types/movie'
import Link from 'next/link'

interface FilmCarouselProps {
  title: string
  movies: Movie[]
  variant?: 'default' | 'small' | 'large'
  loadMore?: () => void
  hasMore?: boolean
  showAllLink?: string
  showAllLabel?: string
}

export default function FilmCarousel({
  title,
  movies,
  variant = 'default',
  loadMore,
  hasMore = false,
  showAllLink,
  showAllLabel = 'Show All',
}: FilmCarouselProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const scrollWidth = containerRef.current.scrollWidth
        setMaxScroll(scrollWidth - containerWidth)
      }
    }

    updateMaxScroll()

    // Use ResizeObserver instead of window resize event
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      const observer = new ResizeObserver(updateMaxScroll)
      observer.observe(containerRef.current)
      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current)
      }
    } else {
      // Fallback to window resize event
      window.addEventListener('resize', updateMaxScroll)
      return () => window.removeEventListener('resize', updateMaxScroll)
    }
  }, [movies])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const scrollAmount = containerWidth * 0.8

    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(maxScroll, scrollPosition + scrollAmount)

    setScrollPosition(newPosition)

    // Use scrollTo method safely
    try {
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      })
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      containerRef.current.scrollLeft = newPosition
    }
  }

  const handleActivate = (id: string) => {
    setActiveId(id)
  }

  const handleLoadMore = () => {
    if (loadMore) {
      loadMore()
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex space-x-2">
          {showAllLink ? (
            <Link href={showAllLink}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-primary hover:text-primary"
              >
                {showAllLabel}
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleScroll('left')}
                disabled={scrollPosition <= 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleScroll('right')}
                disabled={scrollPosition >= maxScroll}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <FilmCard
              movie={movie}
              variant={variant}
              activeId={activeId || undefined}
              onActivate={handleActivate}
            />
          </div>
        ))}

        {hasMore && !showAllLink && (
          <div className="flex-shrink-0 flex items-center justify-center">
            <Button variant="outline" onClick={handleLoadMore} className="h-60 px-6">
              Load More
            </Button>
          </div>
        )}

        {showAllLink && (
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href={showAllLink} className="h-60 flex items-center">
              <Button variant="outline" className="h-60 px-6 group">
                <div className="flex flex-col items-center justify-center">
                  <ArrowRight className="h-6 w-6 mb-2 group-hover:translate-x-1 transition-transform" />
                  <span>{showAllLabel}</span>
                </div>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
