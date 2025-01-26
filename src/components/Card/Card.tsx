import React from 'react';
import { iCard } from "../../types/interfaces";
import './Card.css';

interface CardProps {
  card: iCard;
  handleCardClick?: (event: React.MouseEvent) => void;
  handleTouch: (id:number,row: number, col: number) => void;
}

const Card: React.FC<CardProps> = React.memo(({ card, handleCardClick, handleTouch }) => {

  return (
    <div
      onClick={handleCardClick}
      onTouchStart={() => handleTouch(card.id, card.row, card.col)}
      className={`card ${card.live ? 'live' : 'killed'} ${card.highlighted ? 'highlighted' : ''}`}
      key={card.id}
      style={{ backgroundColor: card.highlightColor }}
    >
      <img src={card.imageSrc} alt={card.id.toString()} />
      <div className='card-info'>
        <h3>{card.name}</h3>
      </div>
      <h3 className='diagonal-text'>{card.live === false ? "DEAD" : ""}</h3>
    </div>
  );
});

export default Card;