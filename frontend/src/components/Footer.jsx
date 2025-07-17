import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <a href="/" className="footer-logo">
            <BookOpen size={22} /> BookMart
          </a>
          <div className="footer-social">
            {/* Add social icons here if desired */}
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-links">
            <a href="/books" className="footer-link">Browse Books</a>
            <a href="/add-book" className="footer-link">Sell Your Books</a>
            <a href="/about" className="footer-link">About Us</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-links">
            <a href="/books?category=fiction" className="footer-link">Fiction</a>
            <a href="/books?category=non-fiction" className="footer-link">Non-Fiction</a>
            <a href="/books?category=textbooks" className="footer-link">Textbooks</a>
            <a href="/books?category=children" className="footer-link">Children's Books</a>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-links">
            <div className="footer-link"><Mail size={14} /> support@bookmart.com</div>
            <div className="footer-link"><Phone size={14} /> +1 (555) 123-4567</div>
            <div className="footer-link"><MapPin size={14} /> 123 Book Street, Reading City</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2025 BookMart. All rights reserved.</span>
        <span style={{ marginLeft: '1.5rem' }}>
          <a href="/privacy" className="footer-link">Privacy Policy</a> | <a href="/terms" className="footer-link">Terms</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;