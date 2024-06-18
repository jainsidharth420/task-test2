import React, { useState, useRef, useEffect } from 'react';
import './CustomGenreDropdown.css';

const CustomGenreDropdown = ({ selectedGenre, setSelectedGenre }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleGenreChange = (genre) => {
    if (genre === 'Any genre') {
      if (selectedGenre.length === 0) {
        // If no genres are selected, select all genres
        setSelectedGenre(['Any genre', 'Action', 'Comedy', 'Thriller', 'Drama']);
      } else {
        // If genres are selected, clear the selection
        setSelectedGenre([]);
      }
    } else {
      // Toggle the selection of other genres
      if (selectedGenre.includes(genre)) {
        setSelectedGenre(selectedGenre.filter(g => g !== genre));
      } else {
        setSelectedGenre([...selectedGenre, genre]);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="first-class" ref={dropdownRef}>
      <button className="button-2" onClick={toggleDropdown}>
        Genre
        <span className="arrow-icon">
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-up"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
        </span>
      </button>

      {isOpen && (
        <div className="menu">
          {/* <div className="option" onClick={() => handleGenreChange('')}>
            <input type="checkbox" checked={selectedGenre.length === 0} readOnly />
            <label className="genre-label">Any genre</label>
          </div> */}
          {['Any genre', 'Action', 'Comedy', 'Thriller', 'Drama'].map((genre) => (
  <div key={genre} className="genre-option" onClick={() => handleGenreChange(genre)}>
    <input type="checkbox" checked={selectedGenre.includes(genre)} readOnly />
    <label className="genre-label">{genre}</label>
  </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default CustomGenreDropdown;
