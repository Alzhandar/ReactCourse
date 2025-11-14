import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as charactersService from '../services/charactersService';
import Spinner from '../components/shared/Spinner';
import ErrorBox from '../components/shared/ErrorBox';
import './CharacterDetails.css';

const CharacterDetails = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCharacter();
  }, [id]);

  const loadCharacter = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await charactersService.getById(id);
      setCharacter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!character) return <ErrorBox message="Character not found" />;

  return (
    <div className="character-details-page">
      <button className="back-button" onClick={handleGoBack}>
        ← Back
      </button>

      <div className="character-details-card">
        <div className="character-details-image">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="character-details-info">
          <h1>{character.name}</h1>

          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`status-badge ${character.status.toLowerCase()}`}>
              {character.status}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Species:</span>
            <span className="detail-value">{character.species}</span>
          </div>

          {character.type && (
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{character.type}</span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">{character.gender}</span>
          </div>

          <div className="detail-section">
            <h3>Origin</h3>
            <p>{character.origin.name}</p>
          </div>

          <div className="detail-section">
            <h3>Last Known Location</h3>
            <p>{character.location.name}</p>
          </div>

          <div className="detail-section">
            <h3>Episodes</h3>
            <p className="episode-count">
              Appeared in {character.episode.length} episodes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;