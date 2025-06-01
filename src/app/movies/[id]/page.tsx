'use client'

import { MovieDetails } from '@/components/MovieDetails'

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = parseInt(params.id, 10)

  return (
    <main className="container mx-auto py-8">
      <MovieDetails movieId={movieId} />
    </main>
  )
}
