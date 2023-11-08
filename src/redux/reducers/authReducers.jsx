import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  user: null,
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
      console.log("token ssss", action.payload);
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      console.log("isLoggedIn sss", action.payload); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("User has sss:", action.payload); 

    },
  },
});

export const { setToken, setIsLoggedIn, setUser } = authSlicer.actions;

export default authSlicer.reducer;