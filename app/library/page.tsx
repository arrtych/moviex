"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { Pause, Play, Trash2, FileText, HardDrive, Filter, Tv, Database, Server, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useMovies } from "@/context/movie-context"
import { useToast } from "@/hooks/use-toast"
import type { LibraryItem, Movie, Storage } from "@/types/movie"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import ScrollableFilters from "@/components/scrollable-filters"

export default function LibraryPage() {
  const { movies } = useMovies()
  const { toast } = useToast()
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [activeStorageFilter, setActiveStorageFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("date-desc")

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null)

  // Fetch library items
  const { data: libraryItems = [], isLoading: isLibraryLoading } = useQuery({
    queryKey: ["library"],
    queryFn: async () => {
      const res = await fetch("/api/library")
      if (!res.ok) throw new Error("Failed to fetch library")
      return res.json()
    },
  })

  // Fetch storages
  const { data: storages = [], isLoading: isStoragesLoading } = useQuery({
    queryKey: ["storages"],
    queryFn: async () => {
      const res = await fetch("/api/storages")
      if (!res.ok) throw new Error("Failed to fetch storages")
      return res.json()
    },
  })

  // Get movie details by ID
  const getMovie = (movieId: string): Movie | undefined => {
    return movies.find((movie) => movie.id === movieId)
  }

  // Filter library items based on active filter and storage filter
  const filteredLibraryItems = libraryItems.filter((item: LibraryItem) => {
    const movie = getMovie(item.movieId)
    if (!movie) return false

    const statusMatch =
      activeFilter === "all"
        ? true
        : activeFilter === "downloaded"
          ? item.status === "downloaded"
          : activeFilter === "downloading"
            ? item.status === "downloading"
            : activeFilter === "paused"
              ? item.status === "paused"
              : true

    const storageMatch = activeStorageFilter === "all" ? true : item.storageId === activeStorageFilter

    const searchMatch =
      searchQuery === ""
        ? true
        : movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.quality.toLowerCase().includes(searchQuery.toLowerCase())

    return statusMatch && storageMatch && searchMatch
  })

  // Sort the filtered items
  const sortedLibraryItems = [...filteredLibraryItems].sort((a, b) => {
    const movieA = getMovie(a.movieId)
    const movieB = getMovie(b.movieId)
    if (!movieA || !movieB) return 0

    switch (sortBy) {
      case "title-asc":
        return movieA.title.localeCompare(movieB.title)
      case "title-desc":
        return movieB.title.localeCompare(movieA.title)
      case "size-asc":
        return a.size - b.size
      case "size-desc":
        return b.size - a.size
      case "date-asc":
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
      case "date-desc":
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      default:
        return 0
    }
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Format file size
  const formatSize = (sizeInMB: number) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(2)} GB`
    }
    return `${sizeInMB.toFixed(0)} MB`
  }

  // Get storage by ID
  const getStorage = (storageId: string): Storage | undefined => {
    return storages.find((storage: Storage) => storage.id === storageId)
  }

  // Get storage icon based on type
  const getStorageIcon = (type: string) => {
    switch (type) {
      case "local":
        return <HardDrive className="h-4 w-4 text-blue-500" />
      case "network":
        return <Server className="h-4 w-4 text-purple-500" />
      case "external":
        return <Database className="h-4 w-4 text-green-500" />
      case "cloud":
        return <Cloud className="h-4 w-4 text-sky-500" />
      default:
        return <HardDrive className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Handle resume download
  const handleResume = (item: LibraryItem) => {
    toast({
      title: "Download resumed",
      description: `Resuming download for ${getMovie(item.movieId)?.title}`,
    })
  }

  // Handle pause download
  const handlePause = (item: LibraryItem) => {
    toast({
      title: "Download paused",
      description: `Paused download for ${getMovie(item.movieId)?.title}`,
    })
  }

  const handleDelete = (item: LibraryItem) => {
    const movie = getMovie(item.movieId)
    if (movie) {
      setItemToDelete({ id: item.id, title: movie.title })
      setDeleteModalOpen(true)
    }
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      toast({
        title: "Download deleted",
        description: `Deleted "${itemToDelete.title}" from library`,
        variant: "destructive",
      })
      setDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }

  // Handle view file info
  const handleViewFileInfo = (item: LibraryItem) => {
    toast({
      title: "File information",
      description: `Path: ${item.path}`,
    })
  }

  const isLoading = isLibraryLoading || isStoragesLoading

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Home Library</h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl font-bold mb-6">Home Library</h1>

      <ScrollableFilters className="mb-4">
        <div className="flex items-center space-x-2 mr-4">
          <Filter className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Status:</span>
          <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter} className="h-7">
            <TabsList className="h-7 p-1">
              <TabsTrigger value="all" className="text-xs h-5 px-2">
                All
              </TabsTrigger>
              <TabsTrigger value="downloaded" className="text-xs h-5 px-2">
                Downloaded
              </TabsTrigger>
              <TabsTrigger value="downloading" className="text-xs h-5 px-2">
                Downloading
              </TabsTrigger>
              <TabsTrigger value="paused" className="text-xs h-5 px-2">
                Paused
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center space-x-2">
          <HardDrive className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Storage:</span>
          <Tabs defaultValue="all" value={activeStorageFilter} onValueChange={setActiveStorageFilter} className="h-7">
            <TabsList className="h-7 p-1">
              <TabsTrigger value="all" className="text-xs h-5 px-2">
                All
              </TabsTrigger>
              {storages.map((storage: Storage) => (
                <TabsTrigger key={storage.id} value={storage.id} className="text-xs h-5 px-2 flex items-center">
                  {getStorageIcon(storage.type)}
                  <span className="ml-1">{storage.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </ScrollableFilters>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <div className="relative flex items-center">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary">
              <Search className="h-3 w-3" />
            </div>
            <Input
              type="search"
              placeholder="Search library..."
              className="pl-7 pr-16 h-8 text-xs border-2 border-primary/30 focus:border-primary focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/10 px-2 py-0.5 rounded-full text-xs font-medium text-primary">
              {filteredLibraryItems.length} items
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date Added (Newest)</SelectItem>
              <SelectItem value="date-asc">Date Added (Oldest)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="size-desc">Size (Largest)</SelectItem>
              <SelectItem value="size-asc">Size (Smallest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Storage overview */}
      <ScrollableFilters className="mb-4">
        {storages.map((storage: Storage) => (
          <Card
            key={storage.id}
            className={`overflow-hidden transition-all hover:shadow-md flex-shrink-0 w-48 mr-2 ${activeStorageFilter === storage.id ? "ring-1 ring-primary" : ""}`}
            onClick={() => setActiveStorageFilter(storage.id)}
          >
            <CardContent className="p-2">
              <div className="flex items-center mb-1">
                {getStorageIcon(storage.type)}
                <h3 className="font-medium ml-1 text-xs">{storage.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-1 truncate">{storage.path}</p>
              {storage.totalSpace && storage.freeSpace && (
                <>
                  <div className="h-1 bg-muted rounded-full mb-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${((storage.totalSpace - storage.freeSpace) / storage.totalSpace) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{storage.freeSpace} GB free</span>
                    <span>{storage.totalSpace} GB</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </ScrollableFilters>

      <div className="space-y-4">
        {sortedLibraryItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No items found for this filter.</p>
            </CardContent>
          </Card>
        ) : (
          sortedLibraryItems.map((item: LibraryItem) => {
            const movie = getMovie(item.movieId)
            if (!movie) return null

            const downloadProgress = (item.downloadedSize / item.size) * 100
            const storage = getStorage(item.storageId)

            return (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 md:h-auto">
                      <Image
                        src={movie.posterPath || "/placeholder.svg?height=192&width=128"}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                      {movie.type === "serial" && (
                        <div className="absolute top-2 right-2 bg-primary/80 rounded-full p-1">
                          <Tv className="h-4 w-4 text-white" />
                        </div>
                      )}

                      {/* Status badge */}
                      <div
                        className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium text-white ${
                          item.status === "downloaded"
                            ? "bg-green-500"
                            : item.status === "downloading"
                              ? "bg-blue-500"
                              : item.status === "paused"
                                ? "bg-amber-500"
                                : "bg-red-500"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </div>

                    <div className="p-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/film/${movie.slug}`} className="hover:underline">
                            <h3 className="text-base font-semibold">{movie.title}</h3>
                          </Link>
                          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                            <span>{new Date(movie.releaseDate).getFullYear()}</span>
                            <span className="mx-1">•</span>
                            <span className="truncate max-w-[200px]">{movie.genres.join(", ")}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-xs">
                          {storage && (
                            <div className="flex items-center bg-secondary/50 px-1.5 py-0.5 rounded-md">
                              {getStorageIcon(storage.type)}
                              <span className="ml-1 text-xs">{storage.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-xs font-medium mr-1">{item.quality}</span>
                            <span className="text-xs text-muted-foreground">{item.format}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.status !== "downloaded" ? (
                              <span>
                                {formatSize(item.downloadedSize)} of {formatSize(item.size)}
                              </span>
                            ) : (
                              <span>Added: {formatDate(item.addedAt)}</span>
                            )}
                          </div>
                        </div>

                        {item.status !== "downloaded" && <Progress value={downloadProgress} className="h-1.5 mb-2" />}

                        <div className="flex items-center justify-between mt-3">
                          <div>
                            {item.status === "downloading" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePause(item)}
                                className="mr-2 h-7 text-xs"
                              >
                                <Pause className="h-3 w-3 mr-1" />
                                Pause
                              </Button>
                            )}

                            {item.status === "paused" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleResume(item)}
                                className="mr-2 h-7 text-xs"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Resume
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewFileInfo(item)}
                              className="h-7 text-xs"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              File Info
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete
                ? `This action cannot be undone. This will permanently delete "${itemToDelete.title}" from your library.`
                : "This action cannot be undone. This will permanently delete this item from your library."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

