import React from 'react';
import "./App.css"
const Card = ({ title, description, selectedCard,shortcode, handleCardClick }) => {
  const isSelected = shortcode === selectedCard;
  //console.log(title,description,selectedCard,shortcode)
  const handleClick = () => {
    console.log(shortcode)
    if (!isSelected) {
      handleCardClick(shortcode);
    }
  };

  return (
    <div className={`card ${isSelected ? 'selected card-highlight' : ''}`} onClick={handleClick}>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
