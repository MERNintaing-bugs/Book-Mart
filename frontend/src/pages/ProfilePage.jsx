import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, BookOpen, Package, Settings, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { orders } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user?.avatar} alt={user?.name} />
          </div>
          <div className="profile-info">
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Books Sold</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="profile-section">
              <div className="section-header">
                <h3>Personal Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-secondary btn-small"
                >
                  <Edit2 size={14} />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <User size={16} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      <Phone size={16} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address" className="form-label">
                      <MapPin size={16} />
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <User size={16} />
                    <div>
                      <label>Full Name</label>
                      <span>{user?.name}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Mail size={16} />
                    <div>
                      <label>Email Address</label>
                      <span>{user?.email}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Phone size={16} />
                    <div>
                      <label>Phone Number</label>
                      <span>{user?.phone || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <MapPin size={16} />
                    <div>
                      <label>Address</label>
                      <span>{user?.address || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <div className="section-header">
                <h3>Recent Orders</h3>
                <Link to="/orders" className="view-all-link">
                  View All
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="orders-list">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-header">
                        <span className="order-id">Order #{order.id}</span>
                        <span className={`order-status ${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-details">
                        <span className="order-date">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                        <span className="order-total">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="order-items">
                        {order.items.slice(0, 2).map((item) => (
                          <span key={item.id} className="order-item-name">
                            {item.title}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="order-more">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-orders">
                  <Package size={48} />
                  <p>No orders yet</p>
                  <Link to="/books" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="profile-sidebar">
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <Link to="/add-book" className="action-link">
                <BookOpen size={16} />
                Sell a Book
              </Link>
              <Link to="/orders" className="action-link">
                <Package size={16} />
                View Orders
              </Link>
              <Link to="/cart" className="action-link">
                <Package size={16} />
                View Cart
              </Link>
              <Link to="/books" className="action-link">
                <BookOpen size={16} />
                Browse Books
              </Link>
            </div>

            <div className="account-settings">
              <h3>Account Settings</h3>
              <button className="settings-link">
                <Settings size={16} />
                Account Settings
              </button>
              <button className="settings-link">
                <Settings size={16} />
                Privacy Settings
              </button>
              <button className="settings-link">
                <Settings size={16} />
                Notification Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;