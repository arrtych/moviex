import { NextResponse } from "next/server"
import type { Favorite } from "@/types/movie"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150))

  const favorites: Favorite[] = [
    {
      id: "fav-1",
      movieId: "1",
      bookmark: true,
      like: true,
      watchLater: false,
      createdAt: "2023-04-15T20:30:00Z",
    },
    {
      id: "fav-2",
      movieId: "2",
      bookmark: false,
      like: true,
      watchLater: false,
      createdAt: "2023-04-10T19:15:00Z",
    },
    {
      id: "fav-3",
      movieId: "4",
      bookmark: false,
      like: false,
      watchLater: true,
      createdAt: "2023-04-05T21:00:00Z",
    },
  ]

  return NextResponse.json(favorites)
}

