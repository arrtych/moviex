import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MovieDetails } from '../types/movie.types'

interface MovieState {
  selectedMovie: MovieDetails | null
  loading: boolean
  error: string | null
}

const initialState: MovieState = {
  selectedMovie: null,
  loading: false,
  error: null,
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<MovieDetails>) => {
      state.selectedMovie = action.payload
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setSelectedMovie, clearSelectedMovie, setLoading, setError } = movieSlice.actions
export default movieSlice.reducer
