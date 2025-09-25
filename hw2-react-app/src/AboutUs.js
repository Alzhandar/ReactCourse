import React from 'react';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="about-header">
          <h1 className="about-title">Alzhan Daribaev</h1>
          <div className="about-subtitle">Full Stack Developer at Avatariya</div>
        </div>
        
        <div className="about-content">
          <div className="about-intro">
            <h2>Hi, I'm Alzhan Daribaev!</h2>
            <p>
              I'm a full-stack developer working at Avatariya. I specialize in building 
              modern web applications using cutting-edge technologies for both frontend and backend development.
            </p>
          </div>

          <div className="skills-section">
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              <div className="skill-item">
                <h4>Frontend</h4>
                <p>Vue.js, Next.js, JavaScript</p>
              </div>
              <div className="skill-item">
                <h4>Backend</h4>
                <p>Go, FastAPI, Django</p>
              </div>
              <div className="skill-item">
                <h4>Tools</h4>
                <p>Git, Ubuntu, VSCode, GitLab</p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h3>Get In Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <span className="contact-value">a_daribayev@kbtu.kz</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">GitHub:</span>
                <span className="contact-value">@Alzhandar</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Company:</span>
                <span className="contact-value">Avatariya</span>
              </div>
            </div>
          </div>

          <div className="interests-section">
            <h3>Interests & Technologies</h3>
            <div className="interests-list">
              <span className="interest-tag">Full Stack Development</span>
              <span className="interest-tag">Vue.js</span>
              <span className="interest-tag">Go Programming</span>
              <span className="interest-tag">API Development</span>
              <span className="interest-tag">DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;