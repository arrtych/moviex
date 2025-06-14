'use client'

import { MovieDetails } from '@/components/MovieDetails'
import { notFound } from 'next/navigation'
import React from 'react'

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = React.use(params)
  const movieId = parseInt(id, 10)

  if (isNaN(movieId)) {
    notFound()
  }

  return <MovieDetails movieId={movieId} />
}
