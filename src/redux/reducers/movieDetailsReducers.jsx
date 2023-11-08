import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: null,
  details: {
    title: '',
    backdrop_path: '',
    poster_path: '',
    vote_average: 0,
    release_date: '',
    overview: '',
  },
};

const DetailSlice = createSlice({
  name: 'Detail',
  initialState,
  reducers: {
    setMovieDetails: (state, action) => {
      state.movie = action.payload;
      state.details = {
        title: action.payload.title,
        backdrop_path: action.payload.backdrop_path,
        poster_path: action.payload.poster_path,
        vote_average: action.payload.vote_average,
        release_date: action.payload.release_date,
        overview: action.payload.overview,
      };
      console.log("MovieDetails:", action.payload);
    },
  },
});

export const { setMovieDetails } = DetailSlice.actions;

export default DetailSlice.reducer;
