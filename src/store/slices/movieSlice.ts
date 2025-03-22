import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/services/kinopoiskApi";

interface MovieState {
  favorites: Movie[];
  watchLater: Movie[];
  watchHistory: Movie[];
  lastViewed?: Movie;
}

const initialState: MovieState = {
  favorites: [],
  watchLater: [],
  watchHistory: [],
  lastViewed: undefined,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const index = state.favorites.findIndex((m) => m.id === movie.id);

      if (index === -1) {
        state.favorites.push(movie);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    addToWatchLater: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      if (!state.watchLater.find((m) => m.id === movie.id)) {
        state.watchLater.push(movie);
      }
    },
    addToHistory: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      state.lastViewed = movie;
      if (!state.watchHistory.find((m) => m.id === movie.id)) {
        state.watchHistory.push(movie);
      }
    },
  },
});

export const { toggleFavorite, addToWatchLater, addToHistory } =
  movieSlice.actions;
export default movieSlice.reducer;
