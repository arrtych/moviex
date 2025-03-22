import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { kinopoiskApi } from "@/services/kinopoiskApi";
import { MovieCard } from "@/components/MovieCard";
import { IMovie } from "./types/IMovie";

export const metadata: Metadata = {
  title: "Next.js",
};
// const apiUrl = "/api/show-data";

async function getMovie() {
  try {
    // Using the Fast & Furious movie ID as an example
    const movie = await kinopoiskApi.getMovieById(666);
    return movie;
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    return null;
  }
}

export default async function Home() {
  const movie = await getMovie();

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Failed to load movie
          </h1>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Featured Movie</h1>
      <MovieCard movie={movie} />
    </main>
  );
}
