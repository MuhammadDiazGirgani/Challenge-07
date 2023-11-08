
import axios from 'axios';
import { setMovieDetails } from '../reducers/movieDetailsReducers';

export const getMovieDetails = (token,id) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movie/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
    const data = response.data.data;
    dispatch(setMovieDetails(data));
  
    console.log('Detail Film:', movie); 
    console.log('Title:', movie.title); 
    console.log('Backdrop Path:', data.backdrop_path); 
    console.log('HomePage', data.poster_path); 
    console.log('HomePage', data.movie.vote_average); 
    console.log('HomePage', data.movie.release_date); 
    console.log('HomePage', data.movie.overview); 
  } catch (error) {
    console.error('Error fetching film detail:', error);
  }
  };
  