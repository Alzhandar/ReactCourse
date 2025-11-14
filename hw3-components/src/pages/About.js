import React from 'react';
import '../styles/pages/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Me</h1>
        
        <div className="about-section">
          <h2>Name</h2>
          <p>Alzhan Daribaev</p>
        </div>

        <div className="about-section">
          <h2>Role</h2>
          <p>Full Stack Developer at Avatariya</p>
        </div>

        <div className="about-section">
          <h2>Description</h2>
          <p>
            I'm a passionate developer specializing in modern web technologies 
            and creating innovative solutions.
          </p>
        </div>

        <div className="about-section">
          <h2>Technical Skills</h2>
          <p>Frontend: Vue.js, Next.js, JavaScript, React</p>
          <p>Backend: Go, FastAPI, Django</p>
          <p>Tools: Git, Ubuntu, VSCode, GitLab</p>
        </div>

        <div className="about-section">
          <h2>Contact</h2>
          <p>Email: a_daribayev@kbtu.kz</p>
          <p>GitHub: @Alzhandar</p>
        </div>
      </div>
    </div>
  );
};

export default About;