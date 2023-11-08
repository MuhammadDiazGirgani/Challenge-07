import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import MovieDetails from '../views/MovieDetails';
import Login from '../views/Login';
import Register from '../views/Register'; 

function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/" element={<Route />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RoutesIndex;
