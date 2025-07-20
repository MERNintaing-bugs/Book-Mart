import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Upload, DollarSign, Tag } from 'lucide-react';
import { bookService } from '../services/bookService';
import { useAuth } from '../contexts/AuthContext';
import './AddBookPage.css';

const AddBookPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    condition: '',
    price: '',
    originalPrice: '',
    description: '',
    isbn: '',
    publishedYear: '',
    image: ''
  });

  const categories = ['Fiction', 'Non-Fiction', 'Textbooks', 'Children'];
  const conditions = ['Excellent', 'Good', 'Fair'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        publishedYear: parseInt(formData.publishedYear),
        sellerId: user.id,
        sellerName: user.username, // changed from user.name to user.username
        image: formData.image || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
      };

      await bookService.addBook(bookData);
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="add-book-page">
        <div className="container">
          <div className="auth-required">
            <h2>Please sign in to sell books</h2>
            <button onClick={() => navigate('/login')} className="btn btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-book-page">
      <div className="container">
        <div className="page-header">
          <h1>Sell Your Book</h1>
          <p>Add your book to the marketplace and reach thousands of potential buyers</p>
        </div>

        <div className="add-book-form">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>
                <BookOpen size={20} />
                Book Information
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Book Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="author" className="form-label">Author *</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="condition" className="form-label">Condition *</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="isbn" className="form-label">ISBN</label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter ISBN (optional)"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="publishedYear" className="form-label">Published Year</label>
                  <input
                    type="number"
                    id="publishedYear"
                    name="publishedYear"
                    value={formData.publishedYear}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Describe the book condition, contents, and any other relevant details..."
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>
                <DollarSign size={20} />
                Pricing
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">Your Price *</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="originalPrice" className="form-label">Original Price</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className="form-input"
                      step="0.01"
                      min="0"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>

              <div className="pricing-tips">
                <h4>Pricing Tips:</h4>
                <ul>
                  <li>Research similar books on the platform</li>
                  <li>Consider the book's condition and age</li>
                  <li>Price competitively to attract buyers</li>
                  <li>Include original price to show value</li>
                </ul>
              </div>
            </div>

            <div className="form-section">
              <h3>
                <Upload size={20} />
                Book Image
              </h3>
              
              <div className="form-group">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter image URL (optional - default image will be used)"
                />
              </div>

              <div className="image-preview">
                {formData.image && (
                  <div className="preview-container">
                    <img
                      src={formData.image}
                      alt="Book preview"
                      className="preview-image"
                      onError={(e) => {
                        e.target.src = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-large"
              >
                {loading ? 'Adding Book...' : 'Add Book to Marketplace'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;