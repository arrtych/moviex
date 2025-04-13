import { NextResponse } from 'next/server'
import type { LibraryItem } from '@/types/movie'

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Only include some of the movies in the library
  // Movies with IDs 21-30 will not be in the library
  const libraryItems: LibraryItem[] = [
    {
      id: 'lib-1',
      movieId: '1',
      status: 'downloaded',
      size: 4200,
      downloadedSize: 4200,
      path: '/movies/Inception (2010)/Inception.2010.2160p.BluRay.x265.10bit.HDR.mkv',
      quality: '4K HDR',
      format: 'MKV',
      addedAt: '2023-04-15T20:30:00Z',
      completedAt: '2023-04-15T21:45:00Z',
      storageId: 'storage-1',
    },
    {
      id: 'lib-2',
      movieId: '2',
      status: 'downloaded',
      size: 3800,
      downloadedSize: 3800,
      path: '/movies/The Shawshank Redemption (1994)/The.Shawshank.Redemption.1994.1080p.BluRay.x264.mkv',
      quality: '1080p',
      format: 'MKV',
      addedAt: '2023-04-10T19:15:00Z',
      completedAt: '2023-04-10T20:30:00Z',
      storageId: 'storage-1',
    },
    {
      id: 'lib-3',
      movieId: '3',
      status: 'downloading',
      size: 5100,
      downloadedSize: 3570,
      path: '/movies/The Dark Knight (2008)/The.Dark.Knight.2008.2160p.BluRay.x265.10bit.HDR.mkv',
      quality: '4K HDR',
      format: 'MKV',
      addedAt: '2023-05-05T11:00:00Z',
      storageId: 'storage-2',
    },
    // Skip movie ID 4 (Pulp Fiction) - not in library
    {
      id: 'lib-5',
      movieId: '5',
      status: 'downloaded',
      size: 3600,
      downloadedSize: 3600,
      path: '/movies/The Matrix (1999)/The.Matrix.1999.2160p.BluRay.x265.10bit.HDR.mkv',
      quality: '4K HDR',
      format: 'MKV',
      addedAt: '2023-02-15T18:30:00Z',
      completedAt: '2023-02-15T20:00:00Z',
      storageId: 'storage-1',
    },
    // Skip movie ID 6 (Goodfellas) - not in library
    {
      id: 'lib-7',
      movieId: '7',
      status: 'downloaded',
      size: 45000,
      downloadedSize: 45000,
      path: '/tv/Breaking Bad/Breaking.Bad.S01-S05.1080p.BluRay.x264/',
      quality: '1080p',
      format: 'MKV',
      addedAt: '2023-03-20T14:30:00Z',
      completedAt: '2023-03-21T10:15:00Z',
      storageId: 'storage-3',
    },
    {
      id: 'lib-8',
      movieId: '8',
      status: 'downloading',
      size: 120000,
      downloadedSize: 60000,
      path: '/tv/Game of Thrones/Game.of.Thrones.S01-S08.2160p.BluRay.x265.10bit.HDR/',
      quality: '4K HDR',
      format: 'MKV',
      addedAt: '2023-05-01T07:00:00Z',
      storageId: 'storage-3',
    },
    // Skip movie ID 9 (Stranger Things) - not in library
    {
      id: 'lib-10',
      movieId: '10',
      status: 'downloading',
      size: 28000,
      downloadedSize: 14000,
      path: '/tv/The Mandalorian/The.Mandalorian.S01-S03.2160p.DSNP.WEB-DL.DV/',
      quality: '4K Dolby Vision',
      format: 'MKV',
      addedAt: '2023-05-03T09:30:00Z',
      storageId: 'storage-3',
    },
    // Movies 21-30 are not in the library
  ]

  return NextResponse.json(libraryItems)
}
