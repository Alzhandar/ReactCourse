import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setQuery } from '../features/characters/charactersSlice';
import CharacterCard from '../components/CharacterCard';
import Spinner from '../components/shared/Spinner';
import ErrorBox from '../components/shared/ErrorBox';
import '../styles/pages/CharacterList.css';

const CharacterList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { list, loadingList, errorList } = useSelector((state) => state.characters);
  
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    dispatch(fetchCharacters(searchTerm));
    dispatch(setQuery(searchTerm));
  }, [dispatch, searchTerm]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredCharacters = list.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingList) return <Spinner />;
  if (errorList) return <ErrorBox message={errorList} />;

  return (
    <div className="character-list-page">
      <div className="character-list-header">
        <h1>Rick and Morty Characters</h1>
        <p>Explore the multiverse and discover your favorite characters</p>
      </div>
      
      {list.length > 0 && (
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