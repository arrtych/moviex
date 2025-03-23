"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import type { Movie, UserPreferences, WatchHistory, Favorite, Notification, Actor, Director } from "@/types/movie"
import type { Genre } from "@/types/genre"

// Add to the existing MovieContextType interface
interface MovieContextType {
  movies: Movie[]
  watchHistory: WatchHistory[]
  favorites: Favorite[]
  userPreferences: UserPreferences
  notifications: Notification[]
  isLoading: boolean
  error: Error | null
  addToFavorites: (movieId: string, type: "bookmark" | "like" | "watchLater") => void
  removeFromFavorites: (movieId: string, type: "bookmark" | "like" | "watchLater") => void
  addToWatchHistory: (movieId: string) => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  getMovie: (id: string) => Movie | undefined
  getRecommendedMovies: () => Movie[]
  getTrendingMovies: () => Movie[]
  getContinueWatching: () => Movie[]
  searchMovies: (query: string, filters?: any) => Movie[]
  getActorsByMovieId: (movieId: string) => Actor[]
  getGenresByMovieId: (movieId: string) => Genre[]
  getDirectorByMovieId: (movieId: string) => Director | undefined
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

// Add to the MovieProvider component
export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Fetch movies
  const {
    data: movies,
    isLoading: isMoviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch("/api/movies")
      if (!res.ok) throw new Error("Failed to fetch movies")
      return res.json()
    },
  })

  // Fetch user preferences
  const {
    data: userPreferences,
    isLoading: isPreferencesLoading,
    error: preferencesError,
  } = useQuery({
    queryKey: ["userPreferences"],
    queryFn: async () => {
      const res = await fetch("/api/user-preferences")
      if (!res.ok) throw new Error("Failed to fetch user preferences")
      return res.json()
    },
  })

  // Fetch watch history
  const {
    data: initialWatchHistory,
    isLoading: isHistoryLoading,
    error: historyError,
  } = useQuery({
    queryKey: ["watchHistory"],
    queryFn: async () => {
      const res = await fetch("/api/watch-history")
      if (!res.ok) throw new Error("Failed to fetch watch history")
      return res.json()
    },
    onSuccess: (data) => {
      setWatchHistory(data)
    },
  })

  // Fetch favorites
  const {
    data: initialFavorites,
    isLoading: isFavoritesLoading,
    error: favoritesError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites")
      if (!res.ok) throw new Error("Failed to fetch favorites")
      return res.json()
    },
    onSuccess: (data) => {
      setFavorites(data)
    },
  })

  // Fetch notifications
  const {
    data: initialNotifications,
    isLoading: isNotificationsLoading,
    error: notificationsError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications")
      if (!res.ok) throw new Error("Failed to fetch notifications")
      return res.json()
    },
    onSuccess: (data) => {
      setNotifications(data)
    },
  })

  // Fetch actors
  const {
    data: actors,
    isLoading: isActorsLoading,
    error: actorsError,
  } = useQuery({
    queryKey: ["actors"],
    queryFn: async () => {
      const res = await fetch("/api/actors")
      if (!res.ok) throw new Error("Failed to fetch actors")
      return res.json()
    },
  })

  // Fetch genres
  const {
    data: genres,
    isLoading: isGenresLoading,
    error: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await fetch("/api/genres")
      if (!res.ok) throw new Error("Failed to fetch genres")
      return res.json()
    },
  })

  // Fetch directors
  const {
    data: directors,
    isLoading: isDirectorsLoading,
    error: directorsError,
  } = useQuery({
    queryKey: ["directors"],
    queryFn: async () => {
      const res = await fetch("/api/directors")
      if (!res.ok) throw new Error("Failed to fetch directors")
      return res.json()
    },
  })

  // Update isLoading and error to include actors
  const isLoading =
    isMoviesLoading ||
    isPreferencesLoading ||
    isHistoryLoading ||
    isFavoritesLoading ||
    isNotificationsLoading ||
    isActorsLoading ||
    isGenresLoading ||
    isDirectorsLoading ||
    !movies ||
    !userPreferences

  const error =
    moviesError ||
    preferencesError ||
    historyError ||
    favoritesError ||
    notificationsError ||
    actorsError ||
    genresError ||
    directorsError

  // Initialize data from API responses
  useEffect(() => {
    if (initialWatchHistory) setWatchHistory(initialWatchHistory)
    if (initialFavorites) setFavorites(initialFavorites)
    if (initialNotifications) setNotifications(initialNotifications)
  }, [initialWatchHistory, initialFavorites, initialNotifications])

  const addToFavorites = (movieId: string, type: "bookmark" | "like" | "watchLater") => {
    const existingFavorite = favorites.find((fav) => fav.movieId === movieId)

    if (existingFavorite) {
      setFavorites(favorites.map((fav) => (fav.movieId === movieId ? { ...fav, [type]: true } : fav)))
    } else {
      setFavorites([
        ...favorites,
        {
          id: `fav-${Date.now()}`,
          movieId,
          bookmark: type === "bookmark",
          like: type === "like",
          watchLater: type === "watchLater",
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  const removeFromFavorites = (movieId: string, type: "bookmark" | "like" | "watchLater") => {
    const existingFavorite = favorites.find((fav) => fav.movieId === movieId)

    if (existingFavorite) {
      // If this is the only type set to true, remove the entire favorite
      if (
        (type === "bookmark" && !existingFavorite.like && !existingFavorite.watchLater) ||
        (type === "like" && !existingFavorite.bookmark && !existingFavorite.watchLater) ||
        (type === "watchLater" && !existingFavorite.bookmark && !existingFavorite.like)
      ) {
        setFavorites(favorites.filter((fav) => fav.movieId !== movieId))
      } else {
        // Otherwise, just set the specific type to false
        setFavorites(favorites.map((fav) => (fav.movieId === movieId ? { ...fav, [type]: false } : fav)))
      }
    }
  }

  const addToWatchHistory = (movieId: string) => {
    const now = new Date().toISOString()
    const existingEntry = watchHistory.find((entry) => entry.movieId === movieId)

    if (existingEntry) {
      setWatchHistory(
        watchHistory.map((entry) =>
          entry.movieId === movieId ? { ...entry, watchedAt: now, progress: Math.min(entry.progress + 0.1, 1) } : entry,
        ),
      )
    } else {
      setWatchHistory([
        ...watchHistory,
        {
          id: `history-${Date.now()}`,
          movieId,
          watchedAt: now,
          progress: 0.1,
        },
      ])
    }
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getMovie = (id: string) => {
    return movies?.find((movie) => movie.id === id)
  }

  const getRecommendedMovies = () => {
    if (!movies) return []
    // In a real app, this would use a recommendation algorithm
    // For now, just return movies with high ratings
    return movies.filter((movie) => movie.ratings.imdb > 7.5).slice(0, 10)
  }

  const getTrendingMovies = () => {
    if (!movies) return []
    // In a real app, this would use trending data
    // For now, just return recent movies
    return [...movies]
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, 10)
  }

  const getContinueWatching = () => {
    if (!movies || !watchHistory) return []

    // Get movies that are in watch history but not completed
    const inProgressMovies = watchHistory
      .filter((entry) => entry.progress < 1)
      .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
      .slice(0, 6)
      .map((entry) => {
        const movie = movies.find((m) => m.id === entry.movieId)
        return movie ? { ...movie, progress: entry.progress } : null
      })
      .filter(Boolean) as Movie[]

    return inProgressMovies
  }

  const searchMovies = (query: string, filters = {}) => {
    if (!movies) return []

    const searchTerms = query.toLowerCase().split(" ")

    return movies.filter((movie) => {
      // Basic search by title, director, and cast
      const matchesSearch = searchTerms.every(
        (term) =>
          movie.title.toLowerCase().includes(term) ||
          movie.director.toLowerCase().includes(term) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(term)),
      )

      // Apply additional filters if provided
      // This is a simplified version - in a real app, you'd have more complex filtering
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true // Skip empty filters

        switch (key) {
          case "genre":
            return movie.genres.includes(value as string)
          case "year":
            return new Date(movie.releaseDate).getFullYear() === value
          case "rating":
            return movie.ratings.imdb >= value
          case "duration":
            return movie.duration <= value
          default:
            return true
        }
      })

      return matchesSearch && matchesFilters
    })
  }

  // Add function to get genres by movie ID
  const getGenresByMovieId = (movieId: string) => {
    if (!genres) return []
    return genres.filter((genre: Genre) => genre.movieIds.includes(movieId))
  }

  // Add function to get director by movie ID
  const getDirectorByMovieId = (movieId: string) => {
    if (!directors) return undefined
    return directors.find((director: Director) => director.movieIds.includes(movieId))
  }

  // Add function to get actors by movie ID
  const getActorsByMovieId = (movieId: string) => {
    if (!actors) return []
    return actors.filter((actor: Actor) => actor.movieIds.includes(movieId))
  }

  return (
    <MovieContext.Provider
      value={{
        movies: movies || [],
        watchHistory,
        favorites,
        userPreferences: userPreferences || { theme: "dark", language: "en" },
        notifications,
        isLoading,
        error: error as Error,
        addToFavorites,
        removeFromFavorites,
        addToWatchHistory,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        getMovie,
        getRecommendedMovies,
        getTrendingMovies,
        getContinueWatching,
        searchMovies,
        getActorsByMovieId,
        getGenresByMovieId,
        getDirectorByMovieId,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => {
  const context = useContext(MovieContext)
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider")
  }
  return context
}

