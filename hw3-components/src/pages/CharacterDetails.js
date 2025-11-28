import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterById, clearSelectedCharacter } from '../features/characters/charactersSlice';
import Spinner from '../components/shared/Spinner';
import ErrorBox from '../components/shared/ErrorBox';
import '../styles/pages/CharacterDetails.css';

const CharacterDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { selectedCharacter, loadingCharacter, errorCharacter } = useSelector(
    (state) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacterById(id));
    
    return () => {
      dispatch(clearSelectedCharacter());
    };
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loadingCharacter) return <Spinner />;
  if (errorCharacter) return <ErrorBox message={errorCharacter} />;
  if (!selectedCharacter) return <ErrorBox message="Character not found" />;

  return (
    <div className="character-details-page">
      <button className="back-button" onClick={handleGoBack}>
        ← Back
      </button>

      <div className="character-details-card">
        <div className="character-details-image">
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        </div>

        <div className="character-details-info">
          <h1>{selectedCharacter.name}</h1>

          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`status-badge ${selectedCharacter.status.toLowerCase()}`}>
              {selectedCharacter.status}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Species:</span>
            <span className="detail-value">{selectedCharacter.species}</span>
          </div>

          {selectedCharacter.type && (
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{selectedCharacter.type}</span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">{selectedCharacter.gender}</span>
          </div>

          <div className="detail-section">
            <h3>Origin</h3>
            <p>{selectedCharacter.origin.name}</p>
          </div>

          <div className="detail-section">
            <h3>Last Known Location</h3>
            <p>{selectedCharacter.location.name}</p>
          </div>

          <div className="detail-section">
            <h3>Episodes</h3>
            <p className="episode-count">
              Appeared in {selectedCharacter.episode.length} episodes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;