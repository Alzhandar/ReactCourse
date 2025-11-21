import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pages/Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profile</h1>
        
        <div className="profile-info">
          <div className="profile-section">
            <h2>Email</h2>
            <p>{currentUser.email}</p>
          </div>

          <div className="profile-section">
            <h2>User ID</h2>
            <p className="user-id">{currentUser.uid}</p>
          </div>

          <div className="profile-section">
            <h2>Account Created</h2>
            <p>{new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
          </div>

          <div className="profile-section">
            <h2>Last Sign In</h2>
            <p>{new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()}</p>
          </div>

          <div className="profile-section">
            <h2>Email Verified</h2>
            <p>{currentUser.emailVerified ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
