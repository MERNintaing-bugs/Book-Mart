import React from 'react';
import './Dashboard.css';
import { BookOpen, ShoppingCart, Heart, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Book Mart Dashboard </h2>
        <p>Manage your books, orders, and wishlist here.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <BookOpen className="icon" />
          <h3>12</h3>
          <p>Books Listed</p>
        </div>
        <div className="stat-card">
          <ShoppingCart className="icon" />
          <h3>8</h3>
          <p>Orders</p>
        </div>
        <div className="stat-card">
          <Heart className="icon" />
          <h3>5</h3>
          <p>Wishlist</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/add-book" className="action-btn">
          <PlusCircle size={20} />
          Add New Book
        </Link>
        <Link to="/orders" className="action-btn secondary">
          View Orders
        </Link>
      </div>

      <div className="dashboard-listings">
        <h3>Your Recent Listings</h3>
        <ul>
          <li>
            <span className="book-title">The Alchemist</span>
            <span className="book-price">₹250</span>
          </li>
          <li>
            <span className="book-title">Clean Code</span>
            <span className="book-price">₹500</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
