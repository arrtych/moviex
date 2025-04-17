"use client";

import { useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import FeaturedCarousel from "@/components/featured-carousel";
import FilmCarousel from "@/components/film-carousel";
import { useMovies } from "@/context/movie-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { movies } = useMovies();
  const [recommendedLimit, setRecommendedLimit] = useState(8);
  const [trendingLimit, setTrendingLimit] = useState(8);

  // For demo purposes, we'll use the same movies for different sections
  const featuredMovies = movies.slice(0, 3);
  const recommendedMovies = movies.slice(1, recommendedLimit + 1);
  const trendingMovies = [...movies]
    .sort(() => Math.random() - 0.5)
    .slice(0, trendingLimit);

  const loadMoreRecommended = () => {
    setRecommendedLimit((prev) => Math.min(prev + 4, movies.length));
  };

  const loadMoreTrending = () => {
    setTrendingLimit((prev) => Math.min(prev + 4, movies.length));
  };

  return (
    <div className="pt-16">
      <Suspense fallback={<div className="h-[50vh] bg-muted animate-pulse" />}>
        <FeaturedCarousel movies={featuredMovies} />
      </Suspense>

      <div className="container mx-auto px-4 py-8 space-y-10">
        <Suspense
          fallback={<div className="h-72 bg-muted animate-pulse rounded-lg" />}
        >
          <FilmCarousel
            title="Recommended for You"
            movies={recommendedMovies}
            showAllLink="/search?category=recommended"
            showAllLabel="View All Recommendations"
          />
        </Suspense>

        <Suspense
          fallback={<div className="h-72 bg-muted animate-pulse rounded-lg" />}
        >
          <FilmCarousel
            title="Trending Now"
            movies={trendingMovies}
            showAllLink="/search?category=trending"
            showAllLabel="View All Trending"
          />
        </Suspense>

        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Explore</h2>
            <div className="flex space-x-2">
              <Link href="/genres">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All Categories
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/genres">
              <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105 group">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Genres"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          Genres
                        </h3>
                        <p className="text-sm text-white/80">
                          Explore movies by genre
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/directors">
              <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105 group">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Directors"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          Directors
                        </h3>
                        <p className="text-sm text-white/80">
                          Discover films by director
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/actors">
              <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105 group">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Actors"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          Actors
                        </h3>
                        <p className="text-sm text-white/80">
                          Find movies by actor
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/search">
              <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105 group">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Advanced Search"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          Advanced Search
                        </h3>
                        <p className="text-sm text-white/80">
                          Find exactly what you're looking for
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
