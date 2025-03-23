"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Info,
  Film,
  Star,
  ImageIcon,
  Code,
  Clock,
  Heart,
  Bookmark,
  FolderOpen,
  Download,
  User,
  Users,
  Globe,
  Tag,
  Activity,
  FileText,
  Calendar,
  Award,
  MessageSquare,
  ImageIcon as ImageIcon2,
  Layers,
  Hash,
  Link2,
  Tv,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import RatingDisplay from "@/components/rating-display"
import TagCloud from "@/components/tag-cloud"
import FilmCarousel from "@/components/film-carousel"
import FileLocationModal from "@/components/file-location-modal"
import DownloadCandidatesModal from "@/components/download-candidates-modal"
import { useMovies } from "@/context/movie-context"
import { useToast } from "@/hooks/use-toast"
import type { LibraryItem } from "@/types/movie"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function FilmPage({ params }: { params: { slug: string } }) {
  const {
    movies,
    addToFavorites,
    removeFromFavorites,
    favorites,
    getActorsByMovieId,
    getGenresByMovieId,
    getDirectorByMovieId,
  } = useMovies()
  const { toast } = useToast()
  const [showFileLocationModal, setShowFileLocationModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  // Find the movie from the context
  const movie = movies.find((m) => m.slug === params.slug)

  // If movie not found, show 404
  if (!movie) {
    notFound()
  }

  // Get favorite status
  const favorite = favorites.find((fav) => fav.movieId === movie.id)
  const isBookmarked = favorite?.bookmark || false
  const isLiked = favorite?.like || false

  // Fetch library items to check if this movie is in the library
  const { data: libraryItems = [] } = useQuery({
    queryKey: ["library"],
    queryFn: async () => {
      const res = await fetch("/api/library")
      if (!res.ok) throw new Error("Failed to fetch library")
      return res.json()
    },
  })

  // Find the library item for this movie
  const libraryItem = libraryItems.find((item: LibraryItem) => item.movieId === movie.id)
  const isInLibrary = !!libraryItem

  // Fetch similar movies
  const { data: similarMovies = [] } = useQuery({
    queryKey: ["similarMovies", movie.id],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 300))

      return [
        {
          id: "3",
          title: "The Dark Knight",
          slug: "the-dark-knight",
          overview:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          releaseDate: "2008-07-18",
          genres: ["Action", "Crime", "Drama"],
          duration: 152,
          posterPath: "/placeholder.svg?height=600&width=400",
          backdropPath: "/placeholder.svg?height=1080&width=1920",
          director: "Christopher Nolan",
          cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
          ratings: {
            imdb: 9.0,
            kinopoisk: 8.5,
          },
          tags: ["superhero", "villain", "crime"],
          type: "movie",
          trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
        },
        {
          id: "4",
          title: "Interstellar",
          slug: "interstellar",
          overview:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          releaseDate: "2014-11-07",
          genres: ["Adventure", "Drama", "Sci-Fi"],
          duration: 169,
          posterPath: "/placeholder.svg?height=600&width=400",
          backdropPath: "/placeholder.svg?height=1080&width=1920",
          director: "Christopher Nolan",
          cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
          ratings: {
            imdb: 8.6,
            kinopoisk: 8.6,
          },
          tags: ["space", "time", "relativity"],
          type: "movie",
          trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
        },
      ]
    },
  })

  // Fetch actors
  const { data: actors = [] } = useQuery({
    queryKey: ["actors"],
    queryFn: async () => {
      const res = await fetch("/api/actors")
      if (!res.ok) throw new Error("Failed to fetch actors")
      return res.json()
    },
  })

  const toggleLike = () => {
    if (isLiked) {
      removeFromFavorites(movie.id, "like")
      toast({
        title: "Removed from favorites",
        description: `"${movie.title}" has been removed from your favorites`,
      })
    } else {
      addToFavorites(movie.id, "like")
      toast({
        title: "Added to favorites",
        description: `"${movie.title}" has been added to your favorites`,
      })
    }
  }

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeFromFavorites(movie.id, "bookmark")
      toast({
        title: "Removed from watch later",
        description: `"${movie.title}" has been removed from your watch later list`,
      })
    } else {
      addToFavorites(movie.id, "bookmark")
      toast({
        title: "Added to watch later",
        description: `"${movie.title}" has been added to your watch later list`,
      })
    }
  }

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <TooltipProvider>
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src={movie.backdropPath || "/placeholder.svg?height=1080&width=1920"}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
          </div>

          <div className="relative container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl group">
                <Image
                  src={movie.posterPath || "/placeholder.svg?height=600&width=400"}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {movie.type === "serial" && (
                  <div className="absolute top-2 right-2 bg-primary/80 rounded-full p-1.5 shadow-lg">
                    <Tv className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-md">
                {movie.title}
              </h1>
              {movie.nameOriginal && movie.nameOriginal !== movie.title && (
                <h2 className="text-xl text-white/80 mb-2 drop-shadow-md">{movie.nameOriginal}</h2>
              )}

              {movie.slogan && <p className="text-sm italic text-white/70 mb-3 drop-shadow-md">"{movie.slogan}"</p>}

              {movie.labels && movie.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.labels.map((label) => (
                    <span
                      key={label.slug}
                      className={`text-xs md:text-sm font-bold px-2 py-1 rounded ${label.color} text-white shadow-lg`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base mb-4 text-white/90">
                <span className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {new Date(movie.releaseDate).getFullYear()}
                </span>
                <div className="flex items-center bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                  </span>
                </div>
                {movie.ratingMpaa && (
                  <Badge variant="outline" className="bg-primary/20 backdrop-blur-sm border-primary/30">
                    {movie.ratingMpaa}
                  </Badge>
                )}
                {movie.ratingAgeLimits && (
                  <Badge variant="outline" className="bg-primary/20 backdrop-blur-sm border-primary/30">
                    {movie.ratingAgeLimits?.replace("age", "")}
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <RatingDisplay imdb={movie.ratings.imdb} kinopoisk={movie.ratings.kinopoisk} size="lg" />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => {
                  const genreEntity = getGenresByMovieId(movie.id).find((g) => g.name === genre)
                  return genreEntity ? (
                    <Link
                      key={genre}
                      href={`/genres/${genreEntity.slug}`}
                      className="tag bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-colors"
                    >
                      {genre}
                    </Link>
                  ) : (
                    <span
                      key={genre}
                      className="tag bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-colors"
                    >
                      {genre}
                    </span>
                  )
                })}
              </div>

              {movie.type === "serial" && (
                <div className="mb-6 bg-secondary/20 backdrop-blur-sm p-4 rounded-xl border border-secondary/30">
                  <h3 className="text-lg font-semibold mb-3 text-white">Series Info</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-secondary/30 px-3 py-2 rounded-md">
                      <span className="text-sm text-white/70">Seasons</span>
                      <p className="font-medium text-white">{movie.seasons}</p>
                    </div>
                    <div className="bg-secondary/30 px-3 py-2 rounded-md">
                      <span className="text-sm text-white/70">Episodes</span>
                      <p className="font-medium text-white">{movie.episodes}</p>
                    </div>
                    <div className="bg-secondary/30 px-3 py-2 rounded-md">
                      <span className="text-sm text-white/70">Episode Length</span>
                      <p className="font-medium text-white">{movie.duration} min</p>
                    </div>
                  </div>

                  {movie.lastWatchedEpisode && (
                    <div className="mt-4 bg-primary/10 p-3 rounded-md border border-primary/20">
                      <h4 className="text-sm font-medium text-primary mb-1">Last Watched</h4>
                      <p className="text-sm text-white">
                        Season {movie.lastWatchedEpisode.season}, Episode {movie.lastWatchedEpisode.episode}:
                        <span className="font-medium ml-1">{movie.lastWatchedEpisode.title}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="text-base md:text-lg mb-6 text-white/90 backdrop-blur-sm bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                {movie.shortDescription || movie.overview}
              </p>

              <div className="flex flex-wrap gap-3">
                {isInLibrary ? (
                  <Button onClick={() => setShowFileLocationModal(true)} className="shadow-lg">
                    <FolderOpen className="mr-2 h-4 w-4" /> Locate File
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowDownloadModal(true)}
                    className="bg-green-600 hover:bg-green-700 shadow-lg"
                  >
                    <Download className="mr-2 h-4 w-4" /> Add to Library
                  </Button>
                )}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isLiked ? "default" : "secondary"}
                      onClick={toggleLike}
                      className={`shadow-lg ${isLiked ? "bg-primary hover:bg-primary/90" : "bg-secondary/50 backdrop-blur-sm"}`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isLiked ? "Remove from favorites" : "Add to favorites"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isBookmarked ? "default" : "secondary"}
                      onClick={toggleBookmark}
                      className={`shadow-lg ${isBookmarked ? "bg-primary hover:bg-primary/90" : "bg-secondary/50 backdrop-blur-sm"}`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isBookmarked ? "Remove from watch later" : "Add to watch later"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6 p-1 bg-background/95 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
              <TabsTrigger
                value="overview"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Info className="h-4 w-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Film className="h-4 w-4 mr-2" /> Details
              </TabsTrigger>
              <TabsTrigger
                value="ratings"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Star className="h-4 w-4 mr-2" /> Ratings
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <ImageIcon className="h-4 w-4 mr-2" /> Media
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Code className="h-4 w-4 mr-2" /> Technical
              </TabsTrigger>
              <TabsTrigger
                value="cast"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Users className="h-4 w-4 mr-2" /> Cast
              </TabsTrigger>
              <TabsTrigger
                value="trailer"
                className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Film className="h-4 w-4 mr-2" /> Trailer
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    Synopsis
                  </h3>
                  <p className="text-base leading-relaxed">{movie.description || movie.overview}</p>

                  {movie.editorAnnotation && (
                    <div className="mt-6 bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <h4 className="text-sm font-medium mb-2 text-primary">Editor's Note</h4>
                      <p className="text-sm italic">{movie.editorAnnotation}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-primary" />
                      Director
                    </h3>
                    {getDirectorByMovieId(movie.id) ? (
                      <Link
                        href={`/directors/${getDirectorByMovieId(movie.id)?.slug}`}
                        className="text-base hover:text-primary"
                      >
                        {getDirectorByMovieId(movie.id)?.name}
                      </Link>
                    ) : (
                      <p className="text-base">{movie.director}</p>
                    )}
                  </div>

                  <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Cast
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor) => {
                        const actorEntity = getActorsByMovieId(movie.id).find((a) => a.name === actor)
                        return actorEntity ? (
                          <Link
                            key={actor}
                            href={`/actors/${actorEntity.slug}`}
                            className="tag bg-secondary/80 hover:bg-secondary transition-colors"
                          >
                            {actor}
                          </Link>
                        ) : (
                          <span key={actor} className="tag bg-secondary/80 hover:bg-secondary transition-colors">
                            {actor}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {movie.countries && movie.countries.length > 0 && (
                    <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-primary" />
                        Countries
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.countries.map((country, index) => (
                          <span key={index} className="tag bg-secondary/80 hover:bg-secondary transition-colors">
                            {country.country}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary" />
                  Tags
                </h3>
                <TagCloud tags={movie.tags} />
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Release Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Release Date:</span>
                      <span className="font-medium">{formatDate(movie.releaseDate)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-medium">{movie.year || new Date(movie.releaseDate).getFullYear()}</span>
                    </div>
                    {movie.startYear && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground">Start Year:</span>
                        <span className="font-medium">{movie.startYear}</span>
                      </div>
                    )}
                    {movie.endYear && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground">End Year:</span>
                        <span className="font-medium">{movie.endYear}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-primary" />
                    Production Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">{movie.productionStatus || "Released"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{movie.completed ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Tickets Available:</span>
                      <span className="font-medium">{movie.isTicketsAvailable ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Classification
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium capitalize">{movie.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">MPAA Rating:</span>
                      <span className="font-medium">{movie.ratingMpaa || "Not rated"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Age Limits:</span>
                      <span className="font-medium">
                        {movie.ratingAgeLimits ? movie.ratingAgeLimits.replace("age", "") : "Not rated"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Serial:</span>
                      <span className="font-medium">{movie.serial ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Short Film:</span>
                      <span className="font-medium">{movie.shortFilm ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Film className="h-5 w-5 mr-2 text-primary" />
                    Format
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{movie.filmLength || movie.duration} min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">IMAX:</span>
                      <span className="font-medium">{movie.hasImax ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">3D:</span>
                      <span className="font-medium">{movie.has3D ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Ratings Tab */}
            <TabsContent value="ratings" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    User Ratings
                  </h3>
                  <div className="space-y-6">
                    {/* IMDb Rating */}
                    {movie.ratingImdb !== undefined && (
                      <div className="bg-gradient-to-r from-yellow-950/30 to-yellow-900/10 p-5 rounded-lg border border-yellow-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-yellow-500 text-black font-bold px-2 py-1 rounded text-sm mr-2">
                              IMDb
                            </div>
                            <span className="text-muted-foreground text-sm">User Rating</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-bold text-xl">{movie.ratingImdb?.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              /10 ({movie.ratingImdbVoteCount?.toLocaleString() || "N/A"} votes)
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                            style={{ width: `${((movie.ratingImdb || 0) / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Kinopoisk Rating */}
                    {movie.ratingKinopoisk !== undefined && (
                      <div className="bg-gradient-to-r from-orange-950/30 to-orange-900/10 p-5 rounded-lg border border-orange-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-orange-500 text-black font-bold px-2 py-1 rounded text-sm mr-2">KP</div>
                            <span className="text-muted-foreground text-sm">Kinopoisk</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-orange-500 fill-orange-500 mr-1" />
                            <span className="font-bold text-xl">{movie.ratingKinopoisk?.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              /10 ({movie.ratingKinopoiskVoteCount?.toLocaleString() || "N/A"} votes)
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                            style={{ width: `${((movie.ratingKinopoisk || 0) / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Good Review Rating */}
                    {movie.ratingGoodReview !== undefined && (
                      <div className="bg-gradient-to-r from-green-950/30 to-green-900/10 p-5 rounded-lg border border-green-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-green-500 text-black font-bold px-2 py-1 rounded text-sm mr-2">GR</div>
                            <span className="text-muted-foreground text-sm">Good Reviews</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-green-500 fill-green-500 mr-1" />
                            <span className="font-bold text-xl">{movie.ratingGoodReview?.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              /10 ({movie.ratingGoodReviewVoteCount?.toLocaleString() || "N/A"} votes)
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                            style={{ width: `${((movie.ratingGoodReview || 0) / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Critics Ratings
                  </h3>
                  <div className="space-y-6">
                    {/* Film Critics Rating */}
                    {movie.ratingFilmCritics !== undefined && (
                      <div className="bg-gradient-to-r from-purple-950/30 to-purple-900/10 p-5 rounded-lg border border-purple-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-purple-500 text-white font-bold px-2 py-1 rounded text-sm mr-2">FC</div>
                            <span className="text-muted-foreground text-sm">Film Critics</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-purple-500 fill-purple-500 mr-1" />
                            <span className="font-bold text-xl">{movie.ratingFilmCritics?.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              /10 ({movie.ratingFilmCriticsVoteCount?.toLocaleString() || "N/A"} votes)
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                            style={{ width: `${((movie.ratingFilmCritics || 0) / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* RF Critics Rating */}
                    {movie.ratingRfCritics !== undefined && (
                      <div className="bg-gradient-to-r from-indigo-950/30 to-indigo-900/10 p-5 rounded-lg border border-indigo-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-indigo-500 text-white font-bold px-2 py-1 rounded text-sm mr-2">RFC</div>
                            <span className="text-muted-foreground text-sm">Russian Film Critics</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-indigo-500 fill-indigo-500 mr-1" />
                            <span className="font-bold text-xl">{movie.ratingRfCritics?.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              /10 ({movie.ratingRfCriticsVoteCount?.toLocaleString() || "N/A"} votes)
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to indigo-400 rounded-full"
                            style={{ width: `${((movie.ratingRfCritics || 0) / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Reviews Count */}
                    {movie.reviewsCount !== undefined && (
                      <div className="bg-gradient-to-r from-blue-950/30 to-blue-900/10 p-5 rounded-lg border border-blue-900/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-blue-500 text-white font-bold px-2 py-1 rounded text-sm mr-2">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                            <span className="text-muted-foreground text-sm">Reviews</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold text-xl">{movie.reviewsCount?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <ImageIcon2 className="h-5 w-5 mr-2 text-primary" />
                    Poster
                  </h3>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl max-w-xs mx-auto group">
                    <Image
                      src={movie.posterUrl || movie.posterPath || "/placeholder.svg?height=600&width=400"}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <Button variant="secondary" size="sm" className="backdrop-blur-sm bg-background/70">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                      Cover
                    </h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl group">
                      <Image
                        src={movie.coverUrl || movie.backdropPath || "/placeholder.svg?height=1080&width=1920"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <Button variant="secondary" size="sm" className="backdrop-blur-sm bg-background/70">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  {movie.logoUrl && (
                    <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-primary" />
                        Logo
                      </h3>
                      <div className="relative h-32 rounded-lg overflow-hidden shadow-xl bg-black/50 group">
                        <Image
                          src={movie.logoUrl || "/placeholder.svg"}
                          alt={`${movie.title} logo`}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                          <Button variant="secondary" size="sm" className="backdrop-blur-sm bg-background/70">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Technical Tab */}
            <TabsContent value="technical" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Hash className="h-5 w-5 mr-2 text-primary" />
                    IDs
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">MovieX ID:</span>
                      <span className="font-mono bg-secondary/50 px-2 py-1 rounded text-xs">{movie.id}</span>
                    </div>
                    {movie.kinopoiskId && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground">Kinopoisk ID:</span>
                        <span className="font-mono bg-secondary/50 px-2 py-1 rounded text-xs">{movie.kinopoiskId}</span>
                      </div>
                    )}
                    {movie.kinopoiskHDId && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground">Kinopoisk HD ID:</span>
                        <span className="font-mono bg-secondary/50 px-2 py-1 rounded text-xs">
                          {movie.kinopoiskHDId}
                        </span>
                      </div>
                    )}
                    {movie.imdbId && (
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-muted-foreground">IMDb ID:</span>
                        <span className="font-mono bg-secondary/50 px-2 py-1 rounded text-xs">{movie.imdbId}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Link2 className="h-5 w-5 mr-2 text-primary" />
                    URLs
                  </h3>
                  <div className="space-y-3">
                    {movie.webUrl && (
                      <div className="flex flex-col py-2 border-b border-border/30">
                        <span className="text-muted-foreground mb-1">Web URL:</span>
                        <a
                          href={movie.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all bg-secondary/50 px-3 py-2 rounded text-sm"
                        >
                          {movie.webUrl}
                        </a>
                      </div>
                    )}
                    {movie.posterUrl && (
                      <div className="flex flex-col py-2 border-b border-border/30">
                        <span className="text-muted-foreground mb-1">Poster URL:</span>
                        <a
                          href={movie.posterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all bg-secondary/50 px-3 py-2 rounded text-sm"
                        >
                          {movie.posterUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Other Information
                </h3>
                <div className="space-y-3">
                  {movie.lastSync && (
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">Last Synced:</span>
                      <span className="font-medium">{formatDate(movie.lastSync)}</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Cast Tab */}
            <TabsContent value="cast" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {actors
                  .filter((actor) => actor.movieIds.includes(movie.id))
                  .map((actor) => (
                    <Link key={actor.id} href={`/actors/${actor.slug}`}>
                      <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105">
                        <CardContent className="p-0">
                          <div className="relative aspect-[3/4]">
                            <Image
                              src={actor.profileImage || "/placeholder.svg?height=400&width=300"}
                              alt={actor.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="text-xs text-white">{actor.popularity.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-sm line-clamp-1">{actor.name}</h3>
                            <p className="text-xs text-muted-foreground">{actor.knownFor[0]}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            {/* Trailer Tab */}
            <TabsContent value="trailer" className="space-y-8 animate-in fade-in-50 duration-300">
              <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Film className="h-5 w-5 mr-2 text-primary" />
                  Movie Trailer
                </h3>

                <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                  {movie.trailerUrl ? (
                    <iframe
                      src={movie.trailerUrl}
                      title={`${movie.title} Trailer`}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-8">
                        <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h4 className="text-lg font-medium mb-2">No Trailer Available</h4>
                        <p className="text-muted-foreground">We don't have a trailer for this movie yet.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Movies */}
        <div className="container mx-auto px-4 py-8 mb-8">
          <div className="bg-secondary/10 p-6 rounded-xl border border-border/50">
            <FilmCarousel title="Similar Movies" movies={similarMovies} />
          </div>
        </div>

        {/* File Location Modal */}
        {libraryItem && (
          <FileLocationModal
            open={showFileLocationModal}
            onOpenChange={setShowFileLocationModal}
            libraryItem={libraryItem}
            movieTitle={movie.title}
          />
        )}

        {/* Download Candidates Modal */}
        <DownloadCandidatesModal
          open={showDownloadModal}
          onOpenChange={showDownloadModal}
          movieId={movie.id}
          movieTitle={movie.title}
        />
      </div>
    </TooltipProvider>
  )
}

