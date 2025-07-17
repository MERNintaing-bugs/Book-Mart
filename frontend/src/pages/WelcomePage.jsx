import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-hero">
      <div className="welcome-bg"></div>
      <div className="welcome-overlay"></div>
      <div className="welcome-content animate-fadein">
        <div className="welcome-icon">
          <BookOpen size={44} />
        </div>
        <h1 className="welcome-title">Welcome to BookMart</h1>
        <p className="welcome-subtitle">Buy and sell used books with ease. Join BookMart today!</p>
        <Link to="/register" className="btn get-started-hero animate-slideup">Get Started</Link>
      </div>
    </div>
  );
};

export default WelcomePage; 