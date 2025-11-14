import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import * as charactersService from '../services/charactersService';
import CharacterCard from '../components/CharacterCard';
import Spinner from '../components/shared/Spinner';
import ErrorBox from '../components/shared/ErrorBox';
import '../styles/pages/CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await charactersService.getAll();
      setCharacters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="character-list-page">
      <div className="character-list-header">
        <h1>Rick and Morty Characters</h1>
        <p>Explore the multiverse and discover your favorite characters</p>
      </div>
      
      {characters.length > 0 && (
        <>
          <div className="search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search characters by name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="characters-grid">
            {filteredCharacters.map(character => (
              <Link 
                key={character.id} 
                to={`/characters/${character.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CharacterCard character={character} />
              </Link>
            ))}
          </div>

          {filteredCharacters.length === 0 && searchTerm && (
            <div className="no-results">
              <h2>No Results</h2>
              <p>No characters found matching "{searchTerm}"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterList;