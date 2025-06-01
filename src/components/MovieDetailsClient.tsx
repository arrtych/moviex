'use client'

import { useGetMovieByIdQuery } from '../store/api/movieApi'
import { LoadingSpinner } from './LoadingSpinner'
import { useEffect, useState } from 'react'
import { MovieDetails as MovieDetailsType } from '@/store/types/movie.types'
import { findMovieById } from '@/data/mockMovies'

interface MovieDetailsClientProps {
  movieId: number
  useMockData?: boolean
}

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

export function MovieDetailsClient({ movieId, useMockData = false }: MovieDetailsClientProps) {
  const {
    data: apiMovie,
    isLoading,
    error,
  } = useGetMovieByIdQuery(movieId, {
    skip: useMockData,
  })
  const mockMovie = useMockData ? findMovieById(movieId) : undefined
  const movie = mockMovie || apiMovie
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on server-side and first render
  }

  if (isLoading && !useMockData) {
    return <LoadingSpinner />
  }

  if ((error && !useMockData) || (!movie && useMockData)) {
    return (
      <div className="p-4 text-red-500">Error loading movie details. Please try again later.</div>
    )
  }

  if (!movie) {
    return <div className="p-4">No movie found</div>
  }

  return <MovieContent movie={movie} />
}

// Separate the content rendering to reduce re-renders
function MovieContent({ movie }: { movie: MovieDetailsType }) {
  const runtime = formatRuntime(movie.filmLength)
  const shouldShowMustWatch = (movie.ratingImdb || 0) >= 8.0 || (movie.ratingKinopoisk || 0) >= 8.0

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="relative">
        {/* Background cover image with gradient overlay */}
        <div className="absolute inset-0 h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90" />
          <img
            src={movie.coverUrl || movie.posterUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={movie.posterUrl}
                  alt={movie.nameRu || movie.nameOriginal}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-3 text-white">
              <div className="space-y-4">
                {/* Title and badges */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {shouldShowMustWatch && (
                      <span className="bg-pink-600 text-white px-3 py-1 text-sm font-semibold rounded">
                        MUST WATCH
                      </span>
                    )}
                    <span className="text-gray-300">{movie.year}</span>
                    <span className="text-gray-300">{runtime}</span>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{movie.nameRu || movie.nameOriginal}</h1>
                  {movie.nameOriginal && movie.nameRu && (
                    <h2 className="text-xl text-gray-300">{movie.nameOriginal}</h2>
                  )}
                </div>

                {/* Ratings */}
                <div className="flex gap-4">
                  {movie.ratingImdb && (
                    <div className="flex items-center gap-2">
                      <div className="bg-yellow-500 px-2 py-1 rounded">IMDb</div>
                      <span className="text-xl font-semibold">{movie.ratingImdb}</span>
                    </div>
                  )}
                  {movie.ratingKinopoisk && (
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-500 px-2 py-1 rounded">KP</div>
                      <span className="text-xl font-semibold">{movie.ratingKinopoisk}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.genre}
                      className="px-3 py-1 bg-gray-800 text-gray-200 rounded-md text-sm"
                    >
                      {genre.genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-300 max-w-3xl">{movie.description}</p>

                {/* Action buttons */}
                <div className="flex gap-4 pt-4">
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Locate File
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>

                {/* Additional details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
                  {movie.countries.length > 0 && (
                    <div>
                      <h3 className="text-gray-400 font-semibold mb-2">Countries</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.countries.map((country) => (
                          <span key={country.country} className="text-gray-300">
                            {country.country}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-gray-400 font-semibold mb-2">Runtime</h3>
                    <span className="text-gray-300">{runtime}</span>
                  </div>
                  {movie.ratingMpaa && (
                    <div>
                      <h3 className="text-gray-400 font-semibold mb-2">Rating</h3>
                      <span className="text-gray-300 uppercase">{movie.ratingMpaa}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
