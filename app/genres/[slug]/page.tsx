"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Film, Grid, List, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMovies } from "@/context/movie-context";
import FilmCard from "@/components/film-card";
import type { Genre } from "@/types/genre";
import { useState, use } from "react";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export default function GenrePage({ params }: PageParams) {
  const { slug } = use(params);
  const { movies } = useMovies();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fetch genres
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await fetch("/api/genres");
      if (!res.ok) throw new Error("Failed to fetch genres");
      return res.json();
    },
  });

  // Find the genre from the fetched data
  const genre = genres.find((g: Genre) => g.slug === slug);

  // If genre not found, show 404
  if (!genre && !isLoading) {
    notFound();
  }

  // Get movies in this genre
  const getGenreMovies = () => {
    if (!genre || !movies) return [];
    return movies.filter((movie) => genre.movieIds.includes(movie.id));
  };

  const genreMovies = getGenreMovies();

  // Sort movies based on sortOrder
  const sortedMovies = [...genreMovies].sort((a, b) => {
    const yearA = new Date(a.releaseDate).getFullYear();
    const yearB = new Date(b.releaseDate).getFullYear();
    return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
  });

  const handleActivate = (id: string) => {
    setActiveId(id);
  };

  if (isLoading || !genre) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded-lg mb-6"></div>
          <div className="h-8 bg-muted rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-muted rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={genre.imageUrl || "/placeholder.svg?height=400&width=1200"}
            alt={genre.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {genre.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
            {genre.description}
          </p>
          <div className="flex items-center text-sm md:text-base">
            <span className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {genre.movieIds.length} movies
            </span>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Movies in {genre.name}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={viewMode === "grid" ? "bg-primary/10" : ""}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={viewMode === "list" ? "bg-primary/10" : ""}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
              <span className="ml-2">Year</span>
            </Button>
          </div>
        </div>

        {sortedMovies.length === 0 ? (
          <div className="text-center py-12">
            <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Movies Found</h2>
            <p className="text-muted-foreground">
              We don't have any movies for this genre in our database yet.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sortedMovies.map((movie) => (
              <FilmCard
                key={movie.id}
                movie={movie}
                activeId={activeId || undefined}
                onActivate={handleActivate}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMovies.map((movie) => (
              <Link key={movie.id} href={`/film/${movie.slug}`}>
                <Card className="overflow-hidden transition-all hover:shadow-md hover:bg-secondary/10">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-24 h-36 flex-shrink-0">
                        <Image
                          src={
                            movie.posterPath ||
                            "/placeholder.svg?height=144&width=96"
                          }
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{movie.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(movie.releaseDate).getFullYear()} •{" "}
                              {movie.genres.join(", ")}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{movie.ratings.imdb.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
