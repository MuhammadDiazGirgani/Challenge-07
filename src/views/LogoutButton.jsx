import React from 'react';
import { useAuth } from './AuthContext';
import './LogoutButton.css'
const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className="button1">
      Logout
    </button>
  );
};

export default LogoutButton;
