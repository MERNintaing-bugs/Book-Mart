import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { BookOpen, ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Books', path: '/books' },
    { name: 'Deals', path: '/deals' },
    { name: 'Sell', path: '/add-book' },
    { name: 'Orders', path: '/orders', auth: true },
    { name:'Dashboard',path:'/Dashboard'}
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <BookOpen size={28} />
            <span>BookMart</span>
          </Link>
        </div>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search books, authors, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <Search size={18} />
          </button>
        </form>
        <div className="navbar-links">
          {navLinks.map(
            (link) =>
              (!link.auth || user) && (
                <Link key={link.name} to={link.path} className="navbar-link">
                  {link.name}
                </Link>
              )
          )}
        </div>
        <div className="navbar-icons">
          <Link to="/cart" className="navbar-icon">
            <ShoppingCart size={22} />
            {getTotalItems() > 0 && <span className="navbar-cart-badge">{getTotalItems()}</span>}
          </Link>
          {user ? (
            <div
              className="navbar-icon user-icon"
              tabIndex={0}
              onClick={() => setDropdownOpen((open) => !open)}
              onBlur={(e) => {
                // Only close dropdown if focus moves outside the dropdown
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setDropdownOpen(false);
                }
              }}
            >
              <User size={22} />
              {dropdownOpen && (
                <div className="user-dropdown-card" tabIndex={-1}>
                  <div className="user-profile-info">
                    <div className="user-profile-username">{user.username}</div>
                    <div className="user-profile-email">{user.email}</div>
                  </div>
                  <button onClick={handleLogout} className="user-dropdown-link logout">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar-icon sign-in-btn">
              <User size={22} />
              <span className="sign-in-text">Sign In</span>
            </Link>
          )}
          <button className="navbar-icon mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay and Slide-in */}
      <div className={`mobile-menu-overlay${isMenuOpen ? ' open' : ''}`}></div>
      <div className={`mobile-menu${isMenuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="navbar-logo-link" onClick={() => setIsMenuOpen(false)}>
            <BookOpen size={24} /> BookMart
          </Link>
          <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <form className="navbar-search mobile" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search books, authors, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <Search size={18} />
          </button>
        </form>
        <div className="mobile-menu-links">
          {navLinks.map(
            (link) =>
              (!link.auth || user) && (
                <Link
                  key={link.name}
                  to={link.path}
                  className="mobile-menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
          )}
          <Link to="/cart" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
            Cart {getTotalItems() > 0 && <span className="navbar-cart-badge">{getTotalItems()}</span>}
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/orders" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                Orders
              </Link>
              <button onClick={handleLogout} className="mobile-menu-link logout">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-menu-link sign-in-btn" onClick={() => setIsMenuOpen(false)}>
              <User size={20} /> <span className="sign-in-text">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;