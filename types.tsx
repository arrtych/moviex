// Add the MovieLabel interface
export interface MovieLabel {
  slug: string
  text: string
  color: string
}

export interface Movie {
  id: string
  title: string
  slug: string
  overview: string
  releaseDate: string
  genres: string[]
  duration: number // in minutes
  posterPath: string
  backdropPath: string
  director: string
  cast: string[]
  ratings: {
    imdb: number
    kinopoisk: number
  }
  tags: string[]
  progress?: number // For continue watching
  labels?: MovieLabel[] // Add labels to the Movie interface
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

