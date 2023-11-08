import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar} from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMovieDetails } from '../redux/actions/movieDetailsActions';
import { useDispatch, useSelector } from 'react-redux';

const MovieDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.Detail.movie);

  useEffect(() => {
    dispatch(getMovieDetails(token, id));
  }, [token, id, dispatch]);

  if (!movie) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="img-fluid rounded"
        style={{ width: '100%', height: 'auto', filter: 'brightness(30%)' }}
      />
      <div
        className='deskripsi'
        style={{
          marginTop: '-800px',
          paddingLeft: '120px',
          position: 'absolute',
          color: '#fff',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          style={{ width: '300px', height: 'auto', marginBottom: '10px', marginTop: '100px' }}
        />
        <div className='teks' style={{ paddingLeft: '320px', marginTop: '-400px', width: '70%' }}>
          <h2>{movie.title}</h2>
          <p>
            <FaStar style={{ color: '#FFD700', marginRight: '4px' }} />
            {movie.vote_average}
          </p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p>{movie.overview}</p>
          <button style={{backgroundColor:"#D90811", color:'#fff', borderRadius:'999px', padding:'5px 5px 5px 5px'}}> <FaPlayCircle style={{ marginRight: '8px', marginBottom: '5px' }} />Watch Trailer</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
