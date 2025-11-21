import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/components/NavBar.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/">
            Rick & Morty Explorer
          </NavLink>
        </div>

        <ul className="navbar-menu">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/characters" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              About
            </NavLink>
          </li>
          
          {currentUser ? (
            <>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link nav-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;