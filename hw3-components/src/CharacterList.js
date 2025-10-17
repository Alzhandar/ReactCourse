import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search characters by name..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button 
              className="clear-button" 
              onClick={handleClearSearch}
              disabled={!searchTerm}
            >
              Clear
            </button>
          </div>

          <div className="results-info">
            Showing {filteredCharacters.length} of {characters.length} characters
          </div>

          <ul className="character-list">
            {filteredCharacters.map(character => (
              <CharacterCard 
                key={character.id} 
                character={character} 
              />
            ))}
          </ul>

          {filteredCharacters.length === 0 && searchTerm && (
            <div className="no-results">
              No characters found matching "{searchTerm}"
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterList;