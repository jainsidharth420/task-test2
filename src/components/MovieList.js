import React, { useState } from 'react';
import moviesData from '../moviedata';
import StarRating from '../components/starRating';
import CustomRatingDropdown from './CustomRatingDropdown';
import CustomGenreDropdown from './CustomGenreDropdown';
import '../components/MovieList.css';



const MovieList = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [suggestions, setSuggestions] = useState(moviesData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    updateSuggestions(value, selectedRating, selectedGenre);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    updateSuggestions(searchText, selectedRating, genre);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    updateSuggestions(searchText, rating, selectedGenre);
  };

  const updateSuggestions = (searchText, rating, genre) => {
    let filteredMovies = moviesData;

    if (searchText) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.Title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (rating.length > 0) {
      filteredMovies = filteredMovies.filter(movie => rating.includes(Math.floor(movie.Rating)));
    }

    if (genre.length > 0) {
      filteredMovies = filteredMovies.filter(movie => genre.includes(movie.Category));
    }

    setSuggestions(filteredMovies);
  };

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item" key={suggestion.Title}>
      <div className="suggestion-box">
        <div className="movie-info">
          <div className="title-genre">
            <div className="title">{suggestion.Title}</div>
            <div className="genre">{suggestion.Category}</div>
          </div>
          <div className="rating">
            <StarRating rating={suggestion.Rating} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="movie-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter movie name"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="search-input"
        />
        {(isSearchFocused || searchText) && suggestions.length > 0 && (
          <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
              <div className="suggestion-item" key={index}>
                {renderSuggestion(suggestion)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filters-container">
        <CustomRatingDropdown selectedRating={selectedRating} setSelectedRating={handleRatingChange} />
        <CustomGenreDropdown selectedGenre={selectedGenre} setSelectedGenre={handleGenreChange} />
      </div>
    </div>
  );
};

export default MovieList;