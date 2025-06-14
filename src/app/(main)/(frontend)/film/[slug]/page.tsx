'use client'

import { MovieDetails } from '@/components/MovieDetails'
import { findMovieBySlug } from '@/data/mockMovies'
import { notFound } from 'next/navigation'
import React from 'react'

interface FilmPageProps {
  params: {
    slug: string
  }
}

export default function FilmPage({ params }: FilmPageProps) {
  const { slug } = React.use(params)
  const movie = findMovieBySlug(slug)

  if (!movie) {
    notFound()
  }

  return <MovieDetails movieId={movie.kinopoiskId} useMockData />
}
