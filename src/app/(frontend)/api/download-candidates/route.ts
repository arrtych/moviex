import { NextResponse } from 'next/server'
import type { DownloadCandidate } from '@/types/movie'

export async function GET(request: Request) {
  // Get movieId from query params
  const { searchParams } = new URL(request.url)
  const movieId = searchParams.get('movieId')

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data for download candidates
  const allCandidates: DownloadCandidate[] = [
    // Inception
    {
      id: 'dl-1-1',
      movieId: '1',
      quality: '4K HDR',
      size: 4200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 125,
      leechers: 15,
    },
    {
      id: 'dl-1-2',
      movieId: '1',
      quality: '1080p',
      size: 2100,
      format: 'MKV',
      source: 'BluRay',
      seeders: 350,
      leechers: 30,
    },
    {
      id: 'dl-1-3',
      movieId: '1',
      quality: '720p',
      size: 1200,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 520,
      leechers: 45,
    },

    // The Shawshank Redemption
    {
      id: 'dl-2-1',
      movieId: '2',
      quality: '4K HDR',
      size: 4500,
      format: 'MKV',
      source: 'BluRay',
      seeders: 95,
      leechers: 12,
    },
    {
      id: 'dl-2-2',
      movieId: '2',
      quality: '1080p',
      size: 3800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 280,
      leechers: 25,
    },

    // The Dark Knight
    {
      id: 'dl-3-1',
      movieId: '3',
      quality: '4K HDR',
      size: 5100,
      format: 'MKV',
      source: 'BluRay',
      seeders: 185,
      leechers: 22,
    },
    {
      id: 'dl-3-2',
      movieId: '3',
      quality: '1080p',
      size: 2800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 420,
      leechers: 35,
    },

    // Pulp Fiction
    {
      id: 'dl-4-1',
      movieId: '4',
      quality: '4K HDR',
      size: 4500,
      format: 'MKV',
      source: 'BluRay',
      seeders: 110,
      leechers: 18,
    },
    {
      id: 'dl-4-2',
      movieId: '4',
      quality: '1080p',
      size: 2400,
      format: 'MKV',
      source: 'BluRay',
      seeders: 380,
      leechers: 40,
    },
    {
      id: 'dl-4-3',
      movieId: '4',
      quality: '720p',
      size: 1100,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 450,
      leechers: 25,
    },

    // The Matrix
    {
      id: 'dl-5-1',
      movieId: '5',
      quality: '4K HDR',
      size: 3600,
      format: 'MKV',
      source: 'BluRay',
      seeders: 145,
      leechers: 20,
    },
    {
      id: 'dl-5-2',
      movieId: '5',
      quality: '1080p',
      size: 1900,
      format: 'MKV',
      source: 'BluRay',
      seeders: 320,
      leechers: 28,
    },

    // Goodfellas
    {
      id: 'dl-6-1',
      movieId: '6',
      quality: '4K HDR',
      size: 4200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 85,
      leechers: 15,
    },
    {
      id: 'dl-6-2',
      movieId: '6',
      quality: '1080p',
      size: 2300,
      format: 'MKV',
      source: 'BluRay',
      seeders: 210,
      leechers: 22,
    },

    // Breaking Bad (Series)
    {
      id: 'dl-7-1',
      movieId: '7',
      quality: '4K',
      size: 85000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 65,
      leechers: 20,
    },
    {
      id: 'dl-7-2',
      movieId: '7',
      quality: '1080p',
      size: 45000,
      format: 'MKV',
      source: 'BluRay',
      seeders: 180,
      leechers: 35,
    },
    {
      id: 'dl-7-3',
      movieId: '7',
      quality: '720p',
      size: 25000,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 320,
      leechers: 40,
    },

    // Game of Thrones
    {
      id: 'dl-8-1',
      movieId: '8',
      quality: '4K HDR',
      size: 120000,
      format: 'MKV',
      source: 'BluRay',
      seeders: 95,
      leechers: 30,
    },
    {
      id: 'dl-8-2',
      movieId: '8',
      quality: '1080p',
      size: 65000,
      format: 'MKV',
      source: 'BluRay',
      seeders: 250,
      leechers: 45,
    },

    // Stranger Things
    {
      id: 'dl-9-1',
      movieId: '9',
      quality: '4K Dolby Vision',
      size: 55000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 120,
      leechers: 25,
    },
    {
      id: 'dl-9-2',
      movieId: '9',
      quality: '1080p',
      size: 35000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 280,
      leechers: 35,
    },

    // The Mandalorian
    {
      id: 'dl-10-1',
      movieId: '10',
      quality: '4K Dolby Vision',
      size: 28000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 150,
      leechers: 30,
    },
    {
      id: 'dl-10-2',
      movieId: '10',
      quality: '1080p',
      size: 15000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 320,
      leechers: 40,
    },

    // Interstellar
    {
      id: 'dl-21-1',
      movieId: '21',
      quality: '4K HDR',
      size: 5200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 175,
      leechers: 25,
    },
    {
      id: 'dl-21-2',
      movieId: '21',
      quality: '1080p',
      size: 2800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 420,
      leechers: 38,
    },
    {
      id: 'dl-21-3',
      movieId: '21',
      quality: '720p',
      size: 1500,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 580,
      leechers: 45,
    },

    // The Godfather
    {
      id: 'dl-22-1',
      movieId: '22',
      quality: '4K HDR',
      size: 4800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 95,
      leechers: 15,
    },
    {
      id: 'dl-22-2',
      movieId: '22',
      quality: '1080p',
      size: 2600,
      format: 'MKV',
      source: 'BluRay',
      seeders: 280,
      leechers: 30,
    },

    // Blade Runner 2049
    {
      id: 'dl-23-1',
      movieId: '23',
      quality: '4K HDR',
      size: 5500,
      format: 'MKV',
      source: 'BluRay',
      seeders: 135,
      leechers: 22,
    },
    {
      id: 'dl-23-2',
      movieId: '23',
      quality: '1080p',
      size: 3100,
      format: 'MKV',
      source: 'BluRay',
      seeders: 310,
      leechers: 35,
    },
    {
      id: 'dl-23-3',
      movieId: '23',
      quality: '720p',
      size: 1700,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 420,
      leechers: 40,
    },

    // Parasite
    {
      id: 'dl-24-1',
      movieId: '24',
      quality: '4K HDR',
      size: 3800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 110,
      leechers: 18,
    },
    {
      id: 'dl-24-2',
      movieId: '24',
      quality: '1080p',
      size: 2200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 290,
      leechers: 25,
    },

    // Dune
    {
      id: 'dl-25-1',
      movieId: '25',
      quality: '4K HDR',
      size: 5800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 185,
      leechers: 30,
    },
    {
      id: 'dl-25-2',
      movieId: '25',
      quality: '1080p',
      size: 3200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 420,
      leechers: 45,
    },
    {
      id: 'dl-25-3',
      movieId: '25',
      quality: '720p',
      size: 1800,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 580,
      leechers: 55,
    },

    // The Silence of the Lambs
    {
      id: 'dl-26-1',
      movieId: '26',
      quality: '4K HDR',
      size: 3600,
      format: 'MKV',
      source: 'BluRay',
      seeders: 85,
      leechers: 12,
    },
    {
      id: 'dl-26-2',
      movieId: '26',
      quality: '1080p',
      size: 2000,
      format: 'MKV',
      source: 'BluRay',
      seeders: 210,
      leechers: 25,
    },

    // The Lord of the Rings: The Fellowship of the Ring
    {
      id: 'dl-27-1',
      movieId: '27',
      quality: '4K HDR',
      size: 6200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 155,
      leechers: 25,
    },
    {
      id: 'dl-27-2',
      movieId: '27',
      quality: '1080p',
      size: 3500,
      format: 'MKV',
      source: 'BluRay',
      seeders: 380,
      leechers: 40,
    },
    {
      id: 'dl-27-3',
      movieId: '27',
      quality: '720p',
      size: 1900,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 520,
      leechers: 50,
    },

    // Whiplash
    {
      id: 'dl-28-1',
      movieId: '28',
      quality: '4K HDR',
      size: 3200,
      format: 'MKV',
      source: 'BluRay',
      seeders: 95,
      leechers: 15,
    },
    {
      id: 'dl-28-2',
      movieId: '28',
      quality: '1080p',
      size: 1800,
      format: 'MKV',
      source: 'BluRay',
      seeders: 250,
      leechers: 30,
    },

    // The Queen's Gambit
    {
      id: 'dl-29-1',
      movieId: '29',
      quality: '4K Dolby Vision',
      size: 18000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 120,
      leechers: 25,
    },
    {
      id: 'dl-29-2',
      movieId: '29',
      quality: '1080p',
      size: 10000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 280,
      leechers: 35,
    },

    // Chernobyl
    {
      id: 'dl-30-1',
      movieId: '30',
      quality: '4K HDR',
      size: 15000,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 110,
      leechers: 20,
    },
    {
      id: 'dl-30-2',
      movieId: '30',
      quality: '1080p',
      size: 8500,
      format: 'MKV',
      source: 'WEB-DL',
      seeders: 260,
      leechers: 30,
    },
    {
      id: 'dl-30-3',
      movieId: '30',
      quality: '720p',
      size: 4500,
      format: 'MP4',
      source: 'WEB-DL',
      seeders: 380,
      leechers: 40,
    },
  ]

  // Filter candidates by movieId if provided
  const candidates = movieId
    ? allCandidates.filter((candidate) => candidate.movieId === movieId)
    : allCandidates

  return NextResponse.json(candidates)
}
