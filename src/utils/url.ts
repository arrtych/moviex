import type { Movie } from '@/types/movie'

/**
 * Generates a URL-friendly slug from a string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Generates a movie URL based on the movie data
 * For API data: /movies/{kinopoiskId}
 * For mock data: /film/{slug}
 */
export const getMovieUrl = (movie: Movie): string => {
  // For mock data, use the slug route
  if (movie.slug) {
    return `/film/${movie.slug}`
  }

  // For API data, use the kinopoiskId route
  return `/movies/${movie.kinopoiskId}`
}

/**
 * Extracts the movie ID from a URL
 */
export const extractMovieId = (url: string): string | null => {
  const moviesMatch = url.match(/\/movies\/(\d+)/)
  if (moviesMatch) return moviesMatch[1]

  const filmMatch = url.match(/\/film\/(.+)$/)
  if (filmMatch) return filmMatch[1]

  return null
}
