export interface MovieLabel {
  slug: string
  text: string
  color: string
}

export interface Country {
  country: string
}

export interface Genre {
  genre: string
}

export interface Storage {
  id: string
  name: string
  path: string
  type: "local" | "network" | "external" | "cloud"
  totalSpace?: number // in GB
  freeSpace?: number // in GB
}

export interface LibraryItem {
  id: string
  movieId: string
  status: "downloaded" | "downloading" | "paused" | "deleted"
  size: number // in MB
  downloadedSize: number // in MB
  path: string
  quality: string
  format: string
  addedAt: string
  completedAt?: string
  storageId: string // Reference to the storage where the file is located
}

export interface DownloadCandidate {
  id: string
  movieId: string
  quality: string
  size: number // in MB
  format: string
  source: string
  seeders?: number
  leechers?: number
}

export interface Movie {
  // Basic identifiers
  id: string
  kinopoiskId?: number
  kinopoiskHDId?: string
  imdbId?: string

  // Titles
  title: string
  nameRu?: string
  nameEn?: string
  nameOriginal?: string

  // URLs and media
  posterPath: string
  backdropPath: string
  posterUrl?: string
  posterUrlPreview?: string
  coverUrl?: string
  logoUrl?: string
  webUrl?: string
  trailerUrl?: string

  // Basic info
  slug: string
  overview: string
  description?: string
  shortDescription?: string
  editorAnnotation?: string
  slogan?: string

  // Dates and times
  releaseDate: string
  year?: number
  startYear?: number
  endYear?: number
  lastSync?: string

  // Duration
  duration: number // in minutes
  filmLength?: number

  // Categories
  genres: string[]
  countries?: Country[]
  tags: string[]
  type: "movie" | "serial" | "tv-show" | "mini-series" | "video"

  // People
  director: string
  cast: string[]

  // Ratings
  ratings: {
    imdb: number
    kinopoisk: number
  }
  ratingKinopoisk?: number
  ratingKinopoiskVoteCount?: number
  ratingImdb?: number
  ratingImdbVoteCount?: number
  ratingFilmCritics?: number
  ratingFilmCriticsVoteCount?: number
  ratingRfCritics?: number
  ratingRfCriticsVoteCount?: number
  ratingGoodReview?: number
  ratingGoodReviewVoteCount?: number
  ratingAwait?: number
  ratingAwaitCount?: number
  reviewsCount?: number

  // Classifications
  ratingMpaa?: string
  ratingAgeLimits?: string

  // Flags
  hasImax?: boolean
  has3D?: boolean
  isTicketsAvailable?: boolean
  serial?: boolean
  shortFilm?: boolean
  completed?: boolean

  // Status
  productionStatus?: string

  // App-specific fields
  progress?: number // For continue watching
  labels?: MovieLabel[] // Add labels to the Movie interface

  // Series-specific fields
  seasons?: number // Number of seasons for serials
  episodes?: number // Total number of episodes for serials
  lastWatchedEpisode?: {
    season: number
    episode: number
    title: string
  } // Last watched episode for serials
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
}

export interface WatchHistory {
  id: string
  movieId: string
  watchedAt: string
  progress: number // 0 to 1
  season?: number // For serials
  episode?: number // For serials
}

export interface Favorite {
  id: string
  movieId: string
  bookmark: boolean
  like: boolean
  watchLater: boolean
  createdAt: string
}

export interface Notification {
  id: string
  type: "new_content" | "recommendation" | "system"
  title: string
  message: string
  movieId?: string
  createdAt: string
  read: boolean
}

// Update feed item types to include download status updates
export interface FeedItem {
  id: string
  type: "collection_add" | "like" | "watched_episode" | "download_status"
  userId: string
  movieId: string
  createdAt: string
  collections?: string[] // For collection_add type
  season?: number // For watched_episode type
  episode?: number // For watched_episode type
  episodeTitle?: string // For watched_episode type
  downloadStatus?: "downloaded" | "paused" | "deleted" // For download_status type
  size?: number // For download_status type
  quality?: string // For download_status type
}

export interface Actor {
  id: string
  name: string
  slug: string
  profileImage: string
  biography: string
  birthDate: string
  birthPlace?: string
  deathDate?: string
  height?: number // in cm
  popularity: number
  knownFor: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
  imdbId?: string
  movieIds: string[] // References to movies this actor has appeared in
}

export interface Director {
  id: string
  name: string
  slug: string
  profileImage: string
  biography: string
  birthDate: string
  birthPlace?: string
  deathDate?: string
  popularity: number
  knownFor: string[] // Notable movies
  socialMedia?: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
  imdbId?: string
  movieIds: string[] // References to movies directed by this person
}

