'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Download, Check } from 'lucide-react'
import type { DownloadCandidate } from '@/types/movie'

interface DownloadCandidatesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movieId: string
  movieTitle: string
}

export default function DownloadCandidatesModal({
  open,
  onOpenChange,
  movieId,
  movieTitle,
}: DownloadCandidatesModalProps) {
  const { toast } = useToast()
  const [candidates, setCandidates] = useState<DownloadCandidate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)

  // Fetch download candidates when modal opens
  useEffect(() => {
    if (open) {
      setIsLoading(true)
      fetch(`/api/download-candidates?movieId=${movieId}`)
        .then((res) => res.json())
        .then((data) => {
          setCandidates(data)
          if (data.length > 0) {
            setSelectedCandidate(data[0].id)
          }
          setIsLoading(false)
        })
        .catch((err) => {
          console.error('Failed to fetch download candidates:', err)
          setIsLoading(false)
        })
    }
  }, [open, movieId])

  const handleStartDownload = () => {
    if (!selectedCandidate) return

    const candidate = candidates.find((c) => c.id === selectedCandidate)
    if (!candidate) return

    toast({
      title: 'Download started',
      description: `Started downloading ${movieTitle} (${candidate.quality})`,
    })

    onOpenChange(false)
  }

  // Format file size
  const formatSize = (sizeInMB: number) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(2)} GB`
    }
    return `${sizeInMB.toFixed(0)} MB`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download "{movieTitle}"</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No download candidates found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Group candidates by variant */}
              {candidates.length > 0 && (
                <>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">4K Quality</h3>
                    <div className="space-y-2">
                      {candidates
                        .filter((c) => c.quality.includes('4K'))
                        .map((candidate) => (
                          <div
                            key={candidate.id}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              selectedCandidate === candidate.id
                                ? 'bg-primary/10 border border-primary/30'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                            onClick={() => setSelectedCandidate(candidate.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-3">
                                  {selectedCandidate === candidate.id ? (
                                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{candidate.quality}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {candidate.source} • {candidate.format}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatSize(candidate.size)}</p>
                                {candidate.seeders && candidate.leechers && (
                                  <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500">{candidate.seeders}</span> /
                                    <span className="text-red-500">{candidate.leechers}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Full HD</h3>
                    <div className="space-y-2">
                      {candidates
                        .filter((c) => c.quality.includes('1080p'))
                        .map((candidate) => (
                          <div
                            key={candidate.id}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              selectedCandidate === candidate.id
                                ? 'bg-primary/10 border border-primary/30'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                            onClick={() => setSelectedCandidate(candidate.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-3">
                                  {selectedCandidate === candidate.id ? (
                                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{candidate.quality}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {candidate.source} • {candidate.format}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatSize(candidate.size)}</p>
                                {candidate.seeders && candidate.leechers && (
                                  <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500">{candidate.seeders}</span> /
                                    <span className="text-red-500">{candidate.leechers}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">HD</h3>
                    <div className="space-y-2">
                      {candidates
                        .filter((c) => c.quality.includes('720p'))
                        .map((candidate) => (
                          <div
                            key={candidate.id}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              selectedCandidate === candidate.id
                                ? 'bg-primary/10 border border-primary/30'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                            onClick={() => setSelectedCandidate(candidate.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-3">
                                  {selectedCandidate === candidate.id ? (
                                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{candidate.quality}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {candidate.source} • {candidate.format}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatSize(candidate.size)}</p>
                                {candidate.seeders && candidate.leechers && (
                                  <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500">{candidate.seeders}</span> /
                                    <span className="text-red-500">{candidate.leechers}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStartDownload}
            disabled={isLoading || candidates.length === 0 || !selectedCandidate}
          >
            <Download className="h-4 w-4 mr-2" />
            Start Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
