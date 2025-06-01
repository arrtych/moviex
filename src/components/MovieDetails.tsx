'use client'

import { useGetMovieByIdQuery } from '../store/api/movieApi'

interface MovieDetailsProps {
  movieId: number
}

export function MovieDetails({ movieId }: MovieDetailsProps) {
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(movieId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading movie details. Please try again later.</div>
    )
  }

  if (!movie) {
    return <div className="p-4">No movie found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={movie.posterUrl}
            alt={movie.nameRu || movie.nameOriginal}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{movie.nameRu || movie.nameOriginal}</h1>
          {movie.nameOriginal && movie.nameRu && (
            <h2 className="text-xl text-gray-600 mb-4">{movie.nameOriginal}</h2>
          )}

          <div className="space-y-4">
            <div>
              <p className="text-gray-700">{movie.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Year</h3>
                <p>{movie.year}</p>
              </div>
              <div>
                <h3 className="font-semibold">Length</h3>
                <p>{movie.filmLength} minutes</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating KinoPoisk</h3>
                <p>
                  {movie.ratingKinopoisk} ({movie.ratingKinopoiskVoteCount} votes)
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Rating IMDB</h3>
                <p>
                  {movie.ratingImdb} ({movie.ratingImdbVoteCount} votes)
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {movie.genres.map((genre) => (
                  <span key={genre.genre} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {genre.genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Countries</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {movie.countries.map((country) => (
                  <span
                    key={country.country}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {country.country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
