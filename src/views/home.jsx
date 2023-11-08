import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './index.css'

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://shy-cloud-3319.fly.dev/api/v1/movie/popular', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data.data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    if (token) {
      fetchPopularMovies();
    }
  }, [token]);

  const fetchMovies = async (endpoint) => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
    const endpoint = `${'https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query='}${searchQuery}`;
    fetchMovies(endpoint);
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


      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
        <h2 className="display-5 " style={{ fontSize: '40px', fontWeight: '600', marginTop: '-50px', paddingBottom: '25px' }}>
            <Link to="/" style={{ color: '#D90811', textDecoration: 'none' }}>Popular Movie</Link>
          </h2>
          <h3 className="" style={{ fontSize: '22px', fontWeight: '600', marginTop: '-70px', paddingBottom: '25px', textAlign: 'right', color: '#D90811' }}>
            See All Movies <BsArrowRight style={{ marginLeft: '5px', fontSize: '20px' }} />
          </h3>
          <div className="mb-3" style={{ position: 'relative' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
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
              {movies.map((movie) => (
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
