import { NextResponse } from "next/server"
import type { WatchHistory } from "@/types/movie"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const watchHistory: WatchHistory[] = [
    {
      id: "history-1",
      movieId: "1",
      watchedAt: "2023-04-15T20:30:00Z",
      progress: 0.3,
    },
    {
      id: "history-2",
      movieId: "3",
      watchedAt: "2023-04-10T19:15:00Z",
      progress: 0.7,
    },
    {
      id: "history-3",
      movieId: "5",
      watchedAt: "2023-04-05T21:00:00Z",
      progress: 0.1,
    },
  ]

  return NextResponse.json(watchHistory)
}

