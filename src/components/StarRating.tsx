import React from 'react';

interface StarRatingProps {
  rating: number;
}

function getStarFill(index: number, rating: number): string {
  const fillPercentage = Math.min(Math.max(rating - index, 0), 1);
  if (fillPercentage === 1) return 'text-yellow-400'; // Full star
  if (fillPercentage > 0) return `text-gradient-${Math.round(fillPercentage * 100)}`; // Partial star
  return 'text-gray-300'; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
  <div className="flex items-center">
    <div className="text-sm text-gray-900 mt-1">{rating.toFixed(1)}</div>

    <div className="ml-1 flex">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={getStarFill(index, rating)}>
          ★
        </span>
      ))}
    </div>
  </div>
);

export default StarRating;