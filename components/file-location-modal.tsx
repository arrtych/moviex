"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { HardDrive, FileText, FolderOpen, Copy, Database, Server, Cloud } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import type { LibraryItem, Storage } from "@/types/movie"

interface FileLocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  libraryItem: LibraryItem
  movieTitle: string
}

export default function FileLocationModal({ open, onOpenChange, libraryItem, movieTitle }: FileLocationModalProps) {
  const { toast } = useToast()

  // Fetch storages
  const { data: storages = [] } = useQuery({
    queryKey: ["storages"],
    queryFn: async () => {
      const res = await fetch("/api/storages")
      if (!res.ok) throw new Error("Failed to fetch storages")
      return res.json()
    },
  })

  // Find the storage for this library item
  const storage = storages.find((s: Storage) => s.id === libraryItem.storageId)

  const handleCopyPath = () => {
    navigator.clipboard.writeText(libraryItem.path)
    toast({
      title: "Path copied",
      description: "File path has been copied to clipboard",
    })
  }

  const handleOpenFolder = () => {
    toast({
      title: "Opening folder",
      description: `Opening folder containing ${movieTitle}`,
    })
    // In a real app, this would trigger a system action to open the folder
  }

  // Format file size
  const formatSize = (sizeInMB: number) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(2)} GB`
    }
    return `${sizeInMB.toFixed(0)} MB`
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>File Location</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            {storage && (
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-start">
                  {getStorageIcon(storage.type)}
                  <div className="ml-2">
                    <p className="font-medium text-sm">{storage.name}</p>
                    <p className="text-xs text-muted-foreground">{storage.path}</p>
                    {storage.totalSpace && storage.freeSpace && (
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <div className="w-24 h-2 bg-muted-foreground/20 rounded-full mr-2">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${((storage.totalSpace - storage.freeSpace) / storage.totalSpace) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span>
                          {storage.freeSpace} GB free of {storage.totalSpace} GB
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-muted p-3 rounded-md overflow-hidden">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="font-medium text-sm mb-1">File Path</p>
                  <p className="text-xs text-muted-foreground break-all">{libraryItem.path}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Size</p>
                    <p className="font-medium text-sm">{formatSize(libraryItem.size)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Format</p>
                    <p className="font-medium text-sm">{libraryItem.format}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Quality</p>
                    <p className="font-medium text-sm">{libraryItem.quality}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Added</p>
                    <p className="font-medium text-sm">{formatDate(libraryItem.addedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleCopyPath}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Path
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleOpenFolder}>
            <FolderOpen className="h-4 w-4 mr-2" />
            Open Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

