import React from 'react';
import ReactStars from 'react-rating-stars-component';
import './starRating.css';

const StarRating = ({ rating, size = 24 }) => {
  return (
    <div className="star-rating" style={{ fontSize: size }}>
      <ReactStars
        count={10}
        value={rating}
        isHalf={true}
        edit={false}
        size={size}
        activeColor="#ffd700"
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fas fa-star-half-alt"></i>}
        filledIcon={<i className="fas fa-star"></i>}
      />
    </div>
  );
};

export default StarRating;
