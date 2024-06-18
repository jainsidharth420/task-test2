import React from 'react';
import ReactDOM from 'react-dom';
import MovieList from './components/MovieList'; // Adjust path if necessary
import './index.css'; // You can create this file later for global styles
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.render(
  <React.StrictMode>
    <MovieList />
  </React.StrictMode>,
  document.getElementById('root')
);
