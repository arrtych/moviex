'use client'

import { MovieDetails } from '@/components/MovieDetails'
import { notFound } from 'next/navigation'

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = parseInt(params.id, 10)

  if (isNaN(movieId)) {
    notFound()
  }

  return <MovieDetails movieId={movieId} />
}
