import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-card-link">
        <img
          src={book.image}
          alt={book.title}
          className="book-card-image"
          loading="lazy"
        />
        <div className="book-card-title">{book.title}</div>
        <div className="book-card-author">
          <User size={12} /> {book.author}
        </div>
        <div className="book-card-rating">
          {renderStars(book.rating)}
          <span className="book-card-rating-text">{book.rating}</span>
        </div>
        <div className="book-card-price">
          <span className="book-card-current-price">${book.price}</span>
          {book.originalPrice && (
            <span className="book-card-original-price">${book.originalPrice}</span>
          )}
        </div>
      </Link>
      {user && (
        <button
          className="btn btn-primary book-card-addcart"
          onClick={() => addToCart(book)}
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      )}
    </div>
  );
};

export default BookCard;