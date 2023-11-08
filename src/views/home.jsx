import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaSearch } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './index.css'
import { getMe, getPopularMovies } from '../redux/actions/authActions';
import { getSearchMovies } from '../redux/actions/authActions'; 
import { fetchData } from '../redux/actions/authActions'; 
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const popularMovies = useSelector(state => state.auth.popularMovies);
  
  useEffect(() => {
    if (token) {
      dispatch(getPopularMovies(token)); 
      dispatch(fetchData(token, text, refreshing));
      dispatch(getMe());
    }
  }, [token, dispatch]);
  
  useEffect(() => {
    dispatch(fetchData(token, refreshing));
  }, [text, refreshing, token]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const apiKey = '08a7cbb1d8fe54cae31787a3e5bc00d2';
        const upcomingMoviesEndpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
        const response = await axios.get(upcomingMoviesEndpoint);

        const trailerKeys = await Promise.all(
          response.data.results.map(async (movie) => {
            const trailerResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
            );
            const trailer = trailerResponse.data.results.find((video) => video.type === 'Trailer');
            return trailer ? trailer.key : null;
          })
        );

        setUpcomingMovies(
          response.data.results.map((movie, index) => ({
            ...movie,
            trailerKey: trailerKeys[index],
          }))
        );
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, []);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery) {
      dispatch(getSearchMovies(token, searchQuery));
    }
  };

  return (
    <div>

<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {upcomingMovies.slice(0, 3).map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {upcomingMovies.slice(0, 3).map((movie, index) => (
            <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="d-block w-100"
                alt={movie.title}
                style={{ width: '80%', filter: 'brightness(20%)' }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h1 className="h1slide" style={{ marginTop: "-520px", fontSize: '60px', width: '55%', textAlign: 'left' }}>{movie.title}</h1>
                <p style={{ textAlign: 'left', fontSize: '20px' }}>{movie.overview} </p>
                {movie.trailerKey && (
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                    target="_blank"
                    className="btn"
                    style={{
                      marginLeft: '-85%',
                      borderRadius: '999px',
                      backgroundColor: '#D90811',
                      color: '#fff',
                      transition: 'background-color 0.5s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#8d0208')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#D90811')}
                  >
                    <FaPlay style={{ marginRight: '8px', marginBottom: '5px' }} />
                    Watch Trailer
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {token && user && (
        <div className='username' style={{paddingTop:'40px', paddingLeft:'60px'}}>
          <h4>Welcome, {user.name}</h4>
        </div>
      )}

      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
        <h2 className="display-5 " style={{ fontSize: '40px', fontWeight: '600', marginTop: '-80px', paddingBottom: '25px' }}>
            <Link to="/" style={{ color: '#D90811', textDecoration: 'none' }}>Popular Movie</Link>
          </h2>
          <h3 className="" style={{ fontSize: '22px', fontWeight: '600', marginTop: '-70px', paddingBottom: '25px', textAlign: 'right', color: '#D90811' }}>
            See All Movies <BsArrowRight style={{ marginLeft: '5px', fontSize: '20px' }} />
          </h3>
          <div>
    </div>
   
          <div className="mb-3" style={{ position: 'relative' }}>
          <input
  type="text"
  className="form-control"
  placeholder="Search for movies..."
  value={searchQuery}
  onChange={handleSearchChange}
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }}
  style={{ borderRadius: '999px', borderColor: '#D90811', color: '#000', paddingRight: '40px' }}
/>
        <FaSearch
          onClick={handleSearch}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        />
      </div>

          {token ? (
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
              {popularMovies.map((movie) => (
                <div key={movie.id} className="col">
                  <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                    <div className="card h-100" style={{ border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          className="card-img-top"
                          alt={movie.title}
                        />
                      )}
                      <div className="card-body">
                        {movie.title && <h5 className="card-title" style={{ textDecoration: 'none' }}>{movie.title}</h5>}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Please login to see popular movies</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home
