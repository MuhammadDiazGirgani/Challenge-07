import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import { AuthProvider } from './views/AuthContext';
import LogoutButton from './views/LogoutButton';

const App = () => {
  
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.reload();
    
  };
  return (
    <AuthProvider>
      <>
        <div>
          <nav className="navbar navbar-expand-lg bg-transparent" style={{ width: '100%', position: 'relative', zIndex: '1000',  }}>
            <div className="container">
              <Link to="/" className="navbar-brand" style={{ color: '#D90811', fontSize: '40px', fontWeight: '700' }}>Movielist</Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/posts" className="nav-link active" aria-current="page"></Link>
                  </li>
                </ul>
                {token ? (
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                      <LogoutButton onLogout={handleLogout} />
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <Link to="/login" className="btn btn-transparent" style={{ borderRadius: '999px', borderColor: '#D90811', color: '#DC3545' }}>
                      Login
                    </Link>
                    <Link to="/register" className="btn" style={{ borderRadius: '999px', backgroundColor: '#D90811', color: '#fff' }}>
                      Register
                    </Link>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>

        <div style={{ zIndex: '1', marginTop: '-90px' }}>
          <Routes />
        </div>
      </>
    </AuthProvider>
  );
};

export default App;
