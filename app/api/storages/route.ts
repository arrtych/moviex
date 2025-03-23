import { NextResponse } from "next/server"
import type { Storage } from "@/types/movie"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const storages: Storage[] = [
    {
      id: "storage-1",
      name: "Main Library",
      path: "/movies",
      type: "local",
      totalSpace: 2000,
      freeSpace: 500,
    },
    {
      id: "storage-2",
      name: "External HDD",
      path: "/media/external",
      type: "external",
      totalSpace: 4000,
      freeSpace: 1200,
    },
    {
      id: "storage-3",
      name: "NAS Media",
      path: "//nas/media",
      type: "network",
      totalSpace: 8000,
      freeSpace: 3500,
    },
    {
      id: "storage-4",
      name: "Cloud Storage",
      path: "cloud://media-library",
      type: "cloud",
      totalSpace: 1000,
      freeSpace: 800,
    },
  ]

  return NextResponse.json(storages)
}

