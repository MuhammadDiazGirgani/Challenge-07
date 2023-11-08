import { setIsLoggedIn, setToken, setUser, setPopularMovies, setSearchMovies, setText } from "../reducers/authReducers";
import axios from "axios";
import { toast } from "react-toastify";

export const registerLoginWithGoogle =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(getMe(null, null, null));

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };
export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));

    if (navigate) navigate("/");
  } catch (error) {
    toast.error(error?.message);
  }
};


// ...

export const fetchData = (token, text, refreshing) => async (dispatch) => {
  try {
    if (token) {
      const userData = await dispatch(getMe(token));
      if (userData) {
        console.log('User Data:', userData);
        dispatch(setUserData(userData));
      }
    }

    if (text !== '') {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/search/movie?page=1&query=${text}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      dispatch(setMovies(data));

      console.log('Search', data);
      console.log('Search Text:', text);
      console.log('Token:', token);

      dispatch(setRefreshing(false));
    } else if (refreshing) {
      dispatch(setText('data'));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getMe =
  (navigate, navigatePath, navigatePathError) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(setUser(data));


      if (navigatePath) navigate(navigatePath);
    } catch (error) {
      if (axios.isAxiosError(error)) {

        if (error.response.status === 401) {
          dispatch(logout(null));


          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const login = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    navigate("/");
    window.location.reload();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      console.log("ninggali Axios Error:", error.response); 
      return;
    }
    toast.error(error.message);
    console.log("Ninggali Error:", error); 
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: 
      `${import.meta.env.VITE_API_URL}/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    navigate("/login");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
  
};

export const getPopularMovies = (token) => async (dispatch) => {
  try {
    const response = await axios.get('https://shy-cloud-3319.fly.dev/api/v1/movie/popular', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const mappedMovies = response.data.data.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path, 
    }));

    dispatch(setPopularMovies(mappedMovies));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }
};


export const getSearchMovies = (token, searchQuery) => async (dispatch) => {
  try {
    const endpoint = `https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${searchQuery}`;
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data = response.data.data;
    dispatch(setSearchMovies(data));
    dispatch(setPopularMovies(data));

    console.log('Search Results:', data);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};