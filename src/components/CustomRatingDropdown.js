import React, { useState, useRef, useEffect } from 'react';
import StarRating from './starRating'; // Import StarRating component
import './CustomRatingDropdown.css';

const CustomRatingDropdown = ({ selectedRating, setSelectedRating }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRatingChange = (rating) => {
    // Toggle the rating selection
    if (selectedRating.includes(rating)) {
      setSelectedRating(selectedRating.filter(r => r !== rating));
    } else {
      setSelectedRating([...selectedRating, rating]);
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
      <button className="button-1" onClick={toggleDropdown}>
        Rating
        <span className="arrow-icon-1">
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
        <div className="menu-2">
          <div className="option2" onClick={() => handleRatingChange('')}>
            <input type="checkbox" checked={selectedRating.length === 0} readOnly />
            <label className="rating-label">Any rating</label>
          </div>
          {[...Array(11)].map((_, index) => {
            const rating = index;
            return (
              <div key={rating} className="option2" onClick={() => handleRatingChange(rating)}>
                <input type="checkbox" checked={selectedRating.includes(rating)} readOnly />
                <StarRating rating={rating} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomRatingDropdown;
