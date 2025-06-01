import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieDetails } from '../types/movie.types'

// Note: In production, this should be in an environment variable
const API_KEY = 'dd6f0356-e9dd-482f-80c1-ed6a1dc8b103'

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', API_KEY)
      headers.set('accept', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getMovieById: builder.query<MovieDetails, number>({
      query: (id) => `/films/${id}`,
    }),
  }),
})

export const { useGetMovieByIdQuery } = movieApi
