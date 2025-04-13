"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Film, Tv, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/movie-context";
import Image from "next/image";
import Link from "next/link";

interface OverlaySearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OverlaySearch({ isOpen, onClose }: OverlaySearchProps) {
  const [query, setQuery] = useState("");
  const { searchMovies } = useMovies();
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (query.length > 1) {
      const searchResults = searchMovies(query).slice(0, 6);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, searchMovies]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col transition-opacity duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search for movies, TV shows, actors..."
              className="pl-12 pr-12 py-5 text-base border-2 border-primary/30 focus:border-primary focus-visible:ring-primary/20 rounded-xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
              disabled={!query.trim()}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/film/${result.slug}`}
                  onClick={onClose}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors"
                >
                  <div className="relative h-20 w-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={
                        result.posterPath ||
                        "/placeholder.svg?height=80&width=56"
                      }
                      alt={result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h3 className="font-medium truncate text-sm">
                        {result.title}
                      </h3>
                      {result.type === "serial" ? (
                        <Tv className="h-3 w-3 ml-2 text-primary" />
                      ) : (
                        <Film className="h-3 w-3 ml-2 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>{new Date(result.releaseDate).getFullYear()}</span>
                      <span className="mx-1">•</span>
                      <span className="truncate">
                        {result.genres.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(result.duration / 60)}h{" "}
                        {result.duration % 60}m
                      </span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-xs">
                          {result.ratings.imdb.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {results.length > 0 && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                    onClose();
                  }}
                >
                  View all results
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No results found for "{query}"
            </p>
          </div>
        )}

        {!query && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Start typing to search</p>
          </div>
        )}
      </div>
    </div>
  );
}
