export interface Country {
  country: string
}

export interface Genre {
  genre: string
}

// Essential fields that are always used in the UI
export interface MovieEssentials {
  kinopoiskId: number
  nameRu: string
  nameOriginal: string
  posterUrl: string
  year: number
  description: string
  genres: Genre[]
  countries: Country[]
  filmLength: number
  ratingKinopoisk: number
  ratingImdb: number
  slug: string // URL-friendly name
}

// All other fields are optional and can be used in the future
export interface MovieDetails {
  kinopoiskId: number
  nameRu?: string
  nameOriginal?: string
  posterUrl: string
  coverUrl?: string
  ratingKinopoisk?: number
  ratingImdb?: number
  year: number
  filmLength: number
  description?: string
  shortDescription?: string
  ratingMpaa?: string
  ratingAgeLimits?: string
  genres: { genre: string }[]
  countries: { country: string }[]
  hasAwards?: boolean
  facts?: string[]
  slogan?: string
  type: 'FILM' | 'TV_SERIES'
  webUrl?: string
  budget?: {
    value: number
    currency: string
  }
  fees?: {
    world: {
      value: number
      currency: string
    }
    russia: {
      value: number
      currency: string
    }
    usa: {
      value: number
      currency: string
    }
  }
  // TV Series specific fields
  seasons?: number
  episodes?: number
  lastWatchedEpisode?: {
    season: number
    episode: number
    title: string
  }
}
