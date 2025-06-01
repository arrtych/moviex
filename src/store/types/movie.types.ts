export interface Country {
  country: string
}

export interface Genre {
  genre: string
}

export interface MovieDetails {
  kinopoiskId: number
  kinopoiskHDId: string
  imdbId: string
  nameRu: string
  nameEn: string | null
  nameOriginal: string
  posterUrl: string
  posterUrlPreview: string
  coverUrl: string
  logoUrl: string
  reviewsCount: number
  ratingGoodReview: number
  ratingGoodReviewVoteCount: number
  ratingKinopoisk: number
  ratingKinopoiskVoteCount: number
  ratingImdb: number
  ratingImdbVoteCount: number
  ratingFilmCritics: number
  ratingFilmCriticsVoteCount: number
  ratingAwait: number | null
  ratingAwaitCount: number
  ratingRfCritics: number | null
  ratingRfCriticsVoteCount: number
  webUrl: string
  year: number
  filmLength: number
  slogan: string
  description: string
  shortDescription: string
  editorAnnotation: string | null
  isTicketsAvailable: boolean
  productionStatus: string | null
  type: string
  ratingMpaa: string
  ratingAgeLimits: string
  countries: Country[]
  genres: Genre[]
  startYear: number | null
  endYear: number | null
  serial: boolean
  shortFilm: boolean
  completed: boolean
  hasImax: boolean
  has3D: boolean
  lastSync: string
}
