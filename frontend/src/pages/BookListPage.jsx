import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import { bookService } from '../services/bookService';
import BookCard from '../components/BookCard';
import './BookListPage.css';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    priceRange: [0, 500],
    sortBy: 'newest'
  });
  const location = useLocation();

  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';
    
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      category: categoryQuery
    }));
  }, [location.search]);

  useEffect(() => {
    loadBooks();
  }, [filters]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const booksData = await bookService.getBooks(filters);
      setBooks(booksData);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBooks();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      condition: '',
      priceRange: [0, 500],
      sortBy: 'newest'
    });
  };

  const categories = ['Fiction', 'Non-Fiction', 'Textbooks', 'Children'];
  const conditions = ['Excellent', 'Good', 'Fair'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="book-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Books</h1>
          <div className="header-controls">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary filter-toggle"
            >
              <Filter size={16} />
              Filters
            </button>
            <div className="view-controls">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-filter">
              <div className="search-group">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="search-input"
                />
              </div>
            </form>

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Condition</label>
              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="filter-select"
              >
                <option value="">All Conditions</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition.toLowerCase()}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="price-slider"
                />
                <div className="price-values">
                  <span>$0</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="books-content">
            <div className="results-header">
              <span className="results-count">
                {books.length} book{books.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : books.length > 0 ? (
              <div className={`books-grid ${viewMode}`}>
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No books found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListPage;