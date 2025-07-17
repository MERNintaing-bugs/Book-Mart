import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, User, Calendar, BookOpen, Package } from 'lucide-react';
import { bookService } from '../services/bookService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './BookDetailPage.css';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      const bookData = await bookService.getBookById(id);
      setBook(bookData);
    } catch (error) {
      setError('Book not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(book);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={i <= rating ? 'star-filled' : 'star-empty'}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="book-detail-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-detail-page">
        <div className="container">
          <div className="error-message">
            <h2>{error}</h2>
            <button onClick={() => navigate('/books')} className="btn btn-primary">
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="book-detail">
          <div className="book-image-section">
            <img src={book.image} alt={book.title} className="book-image" />
          </div>

          <div className="book-info-section">
            <div className="book-header">
              <h1 className="book-title">{book.title}</h1>
              <p className="book-author">by {book.author}</p>
              
              <div className="book-rating">
                <div className="stars">
                  {renderStars(book.rating)}
                </div>
                <span className="rating-text">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="book-meta">
              <div className="meta-item">
                <BookOpen size={16} />
                <span>Category: {book.category}</span>
              </div>
              <div className="meta-item">
                <Package size={16} />
                <span>Condition: {book.condition}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>Published: {book.publishedYear}</span>
              </div>
              <div className="meta-item">
                <User size={16} />
                <span>Seller: {book.sellerName}</span>
              </div>
            </div>

            <div className="book-price">
              <div className="price-info">
                <span className="current-price">${book.price}</span>
                {book.originalPrice && (
                  <span className="original-price">${book.originalPrice}</span>
                )}
              </div>
              <div className="savings">
                {book.originalPrice && (
                  <span className="savings-amount">
                    Save ${(book.originalPrice - book.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="book-actions">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-large add-to-cart"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button className="btn btn-secondary btn-large wishlist">
                <Heart size={18} />
                Add to Wishlist
              </button>
            </div>

            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>

            <div className="book-details">
              <h3>Book Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>ISBN:</strong>
                  <span>{book.isbn}</span>
                </div>
                <div className="detail-item">
                  <strong>Published:</strong>
                  <span>{book.publishedYear}</span>
                </div>
                <div className="detail-item">
                  <strong>Category:</strong>
                  <span>{book.category}</span>
                </div>
                <div className="detail-item">
                  <strong>Condition:</strong>
                  <span>{book.condition}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;