"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, X, SlidersHorizontal, Tag, Calendar, Star, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import FilmCard from "@/components/film-card"
import { useMovies } from "@/context/movie-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialGenre = searchParams.get("genre") || ""

  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [displayLimit, setDisplayLimit] = useState(20)
  const [sortOrder, setSortOrder] = useState("relevance")

  // Filters
  const [filters, setFilters] = useState({
    genre: initialGenre,
    year: "",
    rating: 0,
    duration: 240, // Max duration in minutes
  })

  const { searchMovies, movies } = useMovies()

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const searchResults = searchMovies(debouncedQuery, filters)
  const displayedResults = searchResults.slice(0, displayLimit)
  const hasMore = displayedResults.length < searchResults.length

  const handleActivate = (id: string) => {
    setActiveId(id)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      genre: "",
      year: "",
      rating: 0,
      duration: 240,
    })
  }

  const loadMore = () => {
    setDisplayLimit((prev) => prev + 20)
  }

  // Get unique genres from all movies
  const allGenres = Array.from(new Set(movies.flatMap((movie) => movie.genres))).sort()

  // Get unique years from all movies
  const allYears = Array.from(new Set(movies.map((movie) => new Date(movie.releaseDate).getFullYear()))).sort(
    (a, b) => b - a,
  ) // Sort descending

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Search</h1>
      </div>

      <div className="space-y-4 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="pl-10 pr-10 h-12 text-base border-2 border-primary/30 focus:border-primary focus-visible:ring-primary/20 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Horizontal Filters */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {(filters.genre || filters.year || filters.rating > 0 || filters.duration < 240) && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {[
                        filters.genre ? 1 : 0,
                        filters.year ? 1 : 0,
                        filters.rating > 0 ? 1 : 0,
                        filters.duration < 240 ? 1 : 0,
                      ].reduce((a, b) => a + b, 0)}
                    </Badge>
                  )}
                </Button>
              </CollapsibleTrigger>

              <div className="flex flex-wrap gap-2">
                {filters.genre && (
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    <Tag className="h-3 w-3" />
                    {filters.genre}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleFilterChange("genre", "")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.year && (
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    <Calendar className="h-3 w-3" />
                    {filters.year}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleFilterChange("year", "")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.rating > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    <Star className="h-3 w-3" />
                    {filters.rating}+
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleFilterChange("rating", 0)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.duration < 240 && (
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    <Clock className="h-3 w-3" />
                    {Math.floor(filters.duration / 60)}h {filters.duration % 60}m
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleFilterChange("duration", 240)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>

              {(filters.genre || filters.year || filters.rating > 0 || filters.duration < 240) && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-7">
                  Reset All
                </Button>
              )}
            </div>

            <div className="flex items-center">
              <Select value={filters.genre} onValueChange={(value) => handleFilterChange("genre", value)}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <CollapsibleContent className="mt-4">
            <Card>
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> Year
                  </label>
                  <Select
                    value={filters.year.toString()}
                    onValueChange={(value) => handleFilterChange("year", value ? Number.parseInt(value) : "")}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {allYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" /> Minimum Rating
                    </label>
                    <span className="text-sm text-muted-foreground">{filters.rating.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[filters.rating]}
                    min={0}
                    max={10}
                    step={0.5}
                    onValueChange={(value) => handleFilterChange("rating", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" /> Maximum Duration
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(filters.duration / 60)}h {filters.duration % 60}m
                    </span>
                  </div>
                  <Slider
                    value={[filters.duration]}
                    min={30}
                    max={240}
                    step={15}
                    onValueChange={(value) => handleFilterChange("duration", value[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Search Results */}
      {searchResults.length === 0 ? (
        <div className="bg-secondary/5 rounded-xl p-8 border border-border/50 text-center">
          <div className="max-w-md mx-auto">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="No results"
                fill
                className="object-contain opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="h-16 w-16 text-muted-foreground/30" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">No Results Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any movies matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button onClick={() => setQuery("")}>Clear Search</Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Action", "Drama", "Sci-Fi", "Comedy", "Thriller"].map((genre) => (
                  <Button
                    key={genre}
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setQuery("")
                      handleFilterChange("genre", genre)
                    }}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
            </p>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <SelectValue placeholder="Sort by: Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {displayedResults.map((movie) => (
              <FilmCard
                key={movie.id}
                movie={movie}
                activeId={activeId || undefined}
                onActivate={handleActivate}
                labelSize="xs"
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

