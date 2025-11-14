import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
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
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;