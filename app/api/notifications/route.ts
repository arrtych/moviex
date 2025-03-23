import { NextResponse } from "next/server"
import type { Notification } from "@/types/movie"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 180))

  const notifications: Notification[] = [
    {
      id: "notif-1",
      type: "new_content",
      title: "New Movie Added",
      message: "Inception has been added to our collection.",
      movieId: "1",
      createdAt: "2023-04-15T20:30:00Z",
      read: false,
    },
    {
      id: "notif-2",
      type: "recommendation",
      title: "Recommended for You",
      message: "Based on your watch history, you might enjoy The Dark Knight.",
      movieId: "3",
      createdAt: "2023-04-10T19:15:00Z",
      read: false,
    },
    {
      id: "notif-3",
      type: "system",
      title: "Welcome to MovieX",
      message: "Thank you for using MovieX! Start exploring your personal film library.",
      createdAt: "2023-04-05T21:00:00Z",
      read: true,
    },
  ]

  return NextResponse.json(notifications)
}

