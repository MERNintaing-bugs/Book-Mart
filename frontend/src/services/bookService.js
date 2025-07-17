// Mock book data
const mockBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    condition: "Good",
    price: 12.99,
    originalPrice: 18.99,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A classic novel about racial injustice in the American South, told through the eyes of Scout Finch.",
    rating: 4.5,
    reviews: 1245,
    isbn: "9780061120084",
    publishedYear: 1960,
    sellerId: 1,
    sellerName: "John Doe"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    condition: "Excellent",
    price: 15.99,
    originalPrice: 22.99,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A dystopian novel about a totalitarian society where individuality is suppressed.",
    rating: 4.7,
    reviews: 2341,
    isbn: "9780451524935",
    publishedYear: 1949,
    sellerId: 2,
    sellerName: "Jane Smith"
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    condition: "Fair",
    price: 9.99,
    originalPrice: 16.99,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A tale of wealth, love, and the American Dream in the Jazz Age.",
    rating: 4.2,
    reviews: 987,
    isbn: "9780743273565",
    publishedYear: 1925,
    sellerId: 1,
    sellerName: "John Doe"
  },
  {
    id: 4,
    title: "Introduction to Psychology",
    author: "James W. Kalat",
    category: "Textbooks",
    condition: "Good",
    price: 89.99,
    originalPrice: 299.99,
    image: "https://images.pexels.com/photos/267586/pexels-photo-267586.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Comprehensive textbook covering fundamental concepts in psychology.",
    rating: 4.1,
    reviews: 234,
    isbn: "9781337565691",
    publishedYear: 2019,
    sellerId: 3,
    sellerName: "Mike Johnson"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    condition: "Good",
    price: 11.99,
    originalPrice: 17.99,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A coming-of-age story about teenage rebellion and alienation.",
    rating: 4.0,
    reviews: 1876,
    isbn: "9780316769174",
    publishedYear: 1951,
    sellerId: 2,
    sellerName: "Jane Smith"
  },
  {
    id: 6,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    condition: "Excellent",
    price: 19.99,
    originalPrice: 28.99,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A brief history of humankind from the Stone Age to the present.",
    rating: 4.6,
    reviews: 3456,
    isbn: "9780062316097",
    publishedYear: 2015,
    sellerId: 4,
    sellerName: "Sarah Wilson"
  },
  {
    id: 7,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    category: "Children",
    condition: "Good",
    price: 13.99,
    originalPrice: 19.99,
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "The first book in the beloved Harry Potter series.",
    rating: 4.8,
    reviews: 5432,
    isbn: "9780439708180",
    publishedYear: 1997,
    sellerId: 1,
    sellerName: "John Doe"
  },
  {
    id: 8,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    category: "Textbooks",
    condition: "Fair",
    price: 125.99,
    originalPrice: 389.99,
    image: "https://images.pexels.com/photos/267586/pexels-photo-267586.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Comprehensive calculus textbook for undergraduate students.",
    rating: 3.9,
    reviews: 567,
    isbn: "9781285741550",
    publishedYear: 2016,
    sellerId: 5,
    sellerName: "Tom Anderson"
  }
];

export const bookService = {
  // Get all books with optional filters
  getBooks: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredBooks = [...mockBooks];
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filters.category) {
          filteredBooks = filteredBooks.filter(book =>
            book.category.toLowerCase() === filters.category.toLowerCase()
          );
        }
        
        if (filters.condition) {
          filteredBooks = filteredBooks.filter(book =>
            book.condition.toLowerCase() === filters.condition.toLowerCase()
          );
        }
        
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          filteredBooks = filteredBooks.filter(book =>
            book.price >= min && book.price <= max
          );
        }
        
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price-low':
              filteredBooks.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              filteredBooks.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filteredBooks.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
              filteredBooks.sort((a, b) => b.publishedYear - a.publishedYear);
              break;
            default:
              break;
          }
        }
        
        resolve(filteredBooks);
      }, 500);
    });
  },

  // Get a single book by ID
  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = mockBooks.find(book => book.id === parseInt(id));
        if (book) {
          resolve(book);
        } else {
          reject(new Error('Book not found'));
        }
      }, 300);
    });
  },

  // Get featured books (for homepage)
  getFeaturedBooks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featuredBooks = mockBooks
          .filter(book => book.rating >= 4.5)
          .slice(0, 4);
        resolve(featuredBooks);
      }, 300);
    });
  },

  // Get books by category
  getBooksByCategory: (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categoryBooks = mockBooks.filter(book =>
          book.category.toLowerCase() === category.toLowerCase()
        );
        resolve(categoryBooks);
      }, 300);
    });
  },

  // Add a new book (mock)
  addBook: (bookData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBook = {
          id: mockBooks.length + 1,
          ...bookData,
          rating: 0,
          reviews: 0,
          publishedYear: new Date().getFullYear()
        };
        mockBooks.push(newBook);
        resolve(newBook);
      }, 500);
    });
  },

  // Get categories
  getCategories: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = [...new Set(mockBooks.map(book => book.category))];
        resolve(categories);
      }, 200);
    });
  }
};