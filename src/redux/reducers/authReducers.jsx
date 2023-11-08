import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  user: null,
  popularMovies: [], 
  searchMovies: [],
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }

      state.token = action.payload;
      console.log("token", action.payload);
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      console.log("isLoggedIn", action.payload); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("User:", action.payload); 

    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
      console.log("Popular Movies:", action.payload);
    },
    setSearchMovies: (state, action) => {
      state.searchMovies = action.payload; 
      console.log("Search Movies:", action.payload);
    },
    setText: (state, action) => {
      state.text = action.payload; 
      console.log("Search Movies:", action.payload);
    },
  },
});

export const { setToken, setIsLoggedIn, setUser, setPopularMovies, setSearchMovies, setText} = authSlicer.actions;
export default authSlicer.reducer; 