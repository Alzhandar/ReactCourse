import React from 'react';
import '../styles/components/CharacterCard.css';

const CharacterCard = ({ character }) => {
  return (
    <li className="character-card">
      <div className="character-image">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <div className="character-details">
          <span className={`status ${character.status.toLowerCase()}`}>
            {character.status}
          </span>
          <span className="species">{character.species}</span>
        </div>
        <p className="character-location">
          <strong>Location:</strong> {character.location.name}
        </p>
        <p className="character-origin">
          <strong>Origin:</strong> {character.origin.name}
        </p>
      </div>
    </li>
  );
};

export default CharacterCard;