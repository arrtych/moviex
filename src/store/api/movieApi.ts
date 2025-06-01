import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieDetails } from '../types/movie.types'

const API_KEY = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films'

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', API_KEY || '')
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getMovieById: builder.query<MovieDetails, number>({
      query: (id) => `/${id}`,
      transformResponse: (response: any): MovieDetails => {
        return {
          kinopoiskId: response.kinopoiskId,
          nameRu: response.nameRu,
          nameOriginal: response.nameOriginal,
          posterUrl: response.posterUrl,
          coverUrl: response.coverUrl,
          ratingKinopoisk: response.ratingKinopoisk,
          ratingImdb: response.ratingImdb,
          year: response.year,
          filmLength: response.filmLength,
          description: response.description,
          shortDescription: response.shortDescription,
          ratingMpaa: response.ratingMpaa,
          ratingAgeLimits: response.ratingAgeLimits,
          genres: response.genres || [],
          countries: response.countries || [],
          hasAwards: response.hasAwards,
          facts: response.facts,
          slogan: response.slogan,
          type: response.type,
          webUrl: response.webUrl,
          budget: response.budget,
          fees: response.fees,
        }
      },
    }),
  }),
})

export const { useGetMovieByIdQuery } = movieApi
