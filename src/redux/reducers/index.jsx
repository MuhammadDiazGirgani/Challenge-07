import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./authReducers";
import DetailFilmReducers from "./movieDetailsReducers";

// We will have some reducers here
export default combineReducers({

  auth: authReducers,
  Detail: DetailFilmReducers,
});