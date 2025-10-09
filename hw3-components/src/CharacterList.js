import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCharacters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      
      const data = await response.json();
      setCharacters(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="character-list-container">
      <h1>Rick and Morty Characters</h1>
      
      <button 
        className="load-button" 
        onClick={loadCharacters}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load Characters'}
      </button>

      {error && <div className="error-message">Error: {error}</div>}

      {characters.length > 0 && (
        <ul className="character-list">
          {characters.map(character => (
            <CharacterCard 
              key={character.id} 
              character={character} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterList;