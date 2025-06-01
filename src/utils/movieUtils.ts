import { MovieDetails } from '../store/types/movie.types'

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
}

export function transformMovieData(data: any): MovieDetails {
  return {
    ...data,
    slug: generateSlug(data.nameOriginal || data.nameRu),
  }
}

export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/\d+$/)
  return match ? parseInt(match[0], 10) : null
}
