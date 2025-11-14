import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Rick and Morty Universe</h1>
        <p className="home-subtitle">Explore characters from the multiverse!</p>
      </div>

      <div className="home-content">
        <div className="home-description">
          <h2>Welcome to Rick and Morty Character Explorer</h2>
          <p>
            Dive into the wild and wacky multiverse of Rick and Morty! 
            This application allows you to browse through all the characters 
            from the show, search for your favorites, and view detailed information 
            about each character.
          </p>
        </div>

        <div className="home-image">
          <img 
            src="https://cdn.costumewall.com/wp-content/uploads/2017/01/rick-sanchez.jpg" 
            alt="Rick and Morty"
          />
        </div>

        <div className="home-links">
          <Link to="/characters" className="home-link-card">
            <h3>Browse Characters</h3>
            <p>View all characters from the Rick and Morty universe</p>
          </Link>

          <Link to="/about" className="home-link-card">
            <h3>About</h3>
            <p>Learn more about this project and the developer</p>
          </Link>

          <Link to="/login" className="home-link-card">
            <h3>Login</h3>
            <p>Access your account (coming soon)</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
