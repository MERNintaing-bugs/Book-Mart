import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Users, 
  Shield, 
  Star, 
  TrendingUp,
  Award,
  Truck,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react';
import { bookService } from '../services/bookService';
import BookCard from '../components/BookCard';
import './HomePage.css';

const HomePage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      const books = await bookService.getFeaturedBooks();
      setFeaturedBooks(books);
    } catch (error) {
      console.error('Error loading featured books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { 
      name: 'Fiction', 
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=compress&w=400',
      count: '2,500+ books',
      path: '/books?category=fiction'
    },
    { 
      name: 'Non-Fiction', 
      image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=compress&w=400',
      count: '1,800+ books',
      path: '/books?category=non-fiction'
    },
    { 
      name: 'Textbooks', 
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&w=400',
      count: '3,200+ books',
      path: '/books?category=textbooks'
    },
    { 
      name: 'Children', 
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=400',
      count: '1,200+ books',
      path: '/books?category=children'
    }
  ];

  const features = [
    {
      icon: <Truck size={24} />, title: 'Free Shipping', description: 'Free shipping on orders over $50'
    },
    {
      icon: <Shield size={24} />, title: 'Secure Payment', description: '100% secure payment processing'
    },
    {
      icon: <Clock size={24} />, title: '24/7 Support', description: 'Round the clock customer support'
    },
    {
      icon: <Award size={24} />, title: 'Quality Guarantee', description: 'Satisfaction guaranteed or money back'
    }
  ];

  const deals = [
    {
      title: 'Up to 70% Off',
      subtitle: 'Textbooks',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&w=400',
      link: '/books?category=textbooks&sort=price-low'
    },
    {
      title: 'Buy 2 Get 1 Free',
      subtitle: 'Fiction Books',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=compress&w=400',
      link: '/books?category=fiction&deal=buy2get1'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Latest Books',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=compress&w=400',
      link: '/books?sort=newest'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Books" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-banner-content">
          <h1 className="hero-title">
            Find Your Next <span className="hero-title-highlight">Great Read</span>
          </h1>
          <p className="hero-subtitle">Discover thousands of used books at unbeatable prices. From bestsellers to rare finds, we have something for every reader.</p>
          <form className="hero-search-floating" onSubmit={handleSearch}>
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search for books, authors, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hero-search-button">Search</button>
          </form>
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="hero-stat-number">50,000+</span>
              <span className="hero-stat-label">Books Available</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">15,000+</span>
              <span className="hero-stat-label">Happy Customers</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">98.5%</span>
              <span className="hero-stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        {/* Features Section */}
        <section className="features-section">
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div className="feature-item" key={idx}>
                <div className="feature-icon">{feature.icon}</div>
                <div>
                  <div className="feature-title">{feature.title}</div>
                  <div className="feature-description">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <div className="section-title">Shop by Category</div>
            <div className="section-subtitle">Explore our vast collection of books across different genres</div>
          </div>
          <div className="categories-grid">
            {categories.map((category, idx) => (
              <Link to={category.path} className="category-card" key={idx}>
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <div className="category-name">{category.name}</div>
                  <div className="category-count">{category.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Deals Section */}
        <section className="deals-section">
          <div className="section-header">
            <div className="section-title">Today's Deals</div>
            <Link to="/deals" className="section-link">View all deals <ArrowRight size={16} /></Link>
          </div>
          <div className="deals-grid">
            {deals.map((deal, idx) => (
              <Link to={deal.link} className="deal-card" key={idx}>
                <div className="deal-image">
                  <img src={deal.image} alt={deal.title} />
                </div>
                <div className="deal-content">
                  <div className="deal-title">{deal.title}</div>
                  <div className="deal-subtitle">{deal.subtitle}</div>
                  <div className="deal-cta">Shop now</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Featured Books Section */}
        <section className="featured-section">
          <div className="section-header">
            <div className="section-title">Featured Books</div>
            <div className="section-subtitle">Handpicked selections from our bestselling collection</div>
          </div>
          {loading ? (
            <div className="loading-state">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <p>Loading featured books...</p>
            </div>
          ) : (
            <div className="featured-books-grid">
              {featuredBooks.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
            </div>
          )}
          <div className="section-footer">
            <Link to="/books" className="section-link">
              View All Books <ArrowRight size={18} />
            </Link>
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <div>
              <div className="newsletter-title">Stay Updated</div>
              <div className="newsletter-subtitle">Get notified about new arrivals, special deals, and exclusive offers</div>
            </div>
            <form className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <input type="email" className="newsletter-input" placeholder="Enter your email address" />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </div>
            </form>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section className="why-choose-section">
          <div className="why-choose-content">
            <div>
              <div className="section-title">Why Choose BookMart?</div>
              <div className="why-choose-features">
                <div className="why-choose-feature">
                  <BookOpen size={24} />
                  <div>
                    <h4>Vast Collection</h4>
                    <p>Over 50,000 books across all genres and categories</p>
                  </div>
                </div>
                <div className="why-choose-feature">
                  <DollarSign size={24} />
                  <div>
                    <h4>Best Prices</h4>
                    <p>Up to 70% off retail prices on quality used books</p>
                  </div>
                </div>
                <div className="why-choose-feature">
                  <Users size={24} />
                  <div>
                    <h4>Trusted Community</h4>
                    <p>Join thousands of satisfied book lovers worldwide</p>
                  </div>
                </div>
                <div className="why-choose-feature">
                  <Star size={24} />
                  <div>
                    <h4>Quality Guaranteed</h4>
                    <p>Every book is carefully inspected and rated</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="section-link">Learn More About Us</Link>
            </div>
            <div className="why-choose-image">
              <img 
                src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Why choose us"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;