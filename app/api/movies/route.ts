import { NextResponse } from "next/server";
import type { Movie, MovieLabel } from "@/types/movie";
import { prisma } from "@/lib/db/prisma";
import { handlePrismaError } from "@/lib/db/utils";
import staticData from "@/app/data/movies.json";

// Feature flag to control data source
const USE_STATIC_DATA = process.env.USE_STATIC_DATA === "true";

// Helper function to randomly assign labels to movies
const getRandomLabels = () => {
  const numberOfLabels = Math.floor(Math.random() * 3); // 0 to 2 labels per movie
  const shuffled = [...staticData.possibleLabels].sort(
    () => 0.5 - Math.random()
  );
  return shuffled.slice(0, numberOfLabels);
};

export async function GET() {
  try {
    // If using static data, return mock data
    if (USE_STATIC_DATA) {
      // Simulate API delay for consistent behavior
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Add random labels to each movie
      const moviesWithLabels = staticData.movies.map((movie) => ({
        ...movie,
        labels: getRandomLabels(),
      }));
      return NextResponse.json(moviesWithLabels);
    }

    // Otherwise, fetch from database
    const dbMovies = await prisma.movie.findMany({
      include: {
        ratings: {
          select: {
            value: true,
          },
        },
      },
    });

    return NextResponse.json(dbMovies);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Always create in database, even when using static data
    const movie = await prisma.movie.create({
      data: {
        tmdbId: body.tmdbId,
        title: body.title,
        overview: body.overview,
        posterPath: body.posterPath,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
        voteAverage: body.voteAverage,
      },
    });

    // If using static data, also add to static array for immediate reflection
    if (USE_STATIC_DATA) {
      const newStaticMovie: Movie = {
        id: movie.id,
        title: movie.title,
        slug: movie.tmdbId,
        overview: movie.overview || "",
        releaseDate: movie.releaseDate?.toISOString().split("T")[0] || "",
        genres: [], // Add default or derived values as needed
        duration: 0,
        posterPath: movie.posterPath || "",
        backdropPath: "/placeholder.svg?height=1080&width=1920",
        director: "",
        cast: [],
        ratings: {
          imdb: 0,
          kinopoisk: 0,
        },
        tags: [],
        labels: getRandomLabels(),
        type: "movie",
      };
      staticData.movies.unshift(newStaticMovie);
    }

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
