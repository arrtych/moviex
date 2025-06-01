'use client'

import { MovieDetails } from '@/components/MovieDetails'
import { findMovieBySlug } from '@/data/mockMovies'
import { notFound } from 'next/navigation'

interface FilmPageProps {
  params: {
    slug: string
  }
}

export default function FilmPage({ params }: FilmPageProps) {
  const movie = findMovieBySlug(params.slug)

  if (!movie) {
    notFound()
  }

  return <MovieDetails movieId={movie.kinopoiskId} useMockData />
}
