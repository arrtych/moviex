import { Suspense } from 'react'
import { MovieDetailsClient } from './MovieDetailsClient'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorBoundary } from './ErrorBoundary'

interface MovieDetailsProps {
  movieId: number
  useMockData?: boolean
}

export function MovieDetails({ movieId, useMockData = false }: MovieDetailsProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <MovieDetailsClient movieId={movieId} useMockData={useMockData} />
      </Suspense>
    </ErrorBoundary>
  )
}
