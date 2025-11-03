// ...existing code...

// Add Book to AddBookPage collection (POST)
// ...existing code...
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Login = require('./models/Login');
const Book = require('./models/Book');
const Cart = require('./models/cart');


const app = express();


const AddBookPage = require('./models/AddBookPage');

// Configure CORS to allow frontend origin. Set FRONTEND_URL in Render environment variables.
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
if (FRONTEND_URL === '*') {
    app.use(cors());
} else {
    app.use(cors({ origin: FRONTEND_URL }));
}
app.use(express.json());

// Root route - helpful for deployment platforms (Render) and quick checks
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Book-Mart API is running' });
});

// Universal filter for AddBookPage collection
app.get('/api/addbookpage', async (req, res) => {
    try {
        // Build a dynamic query from all query params
        const query = {};
        for (const key in req.query) {
            if (req.query[key]) {
                query[key] = req.query[key];
            }
        }
        const books = await AddBookPage.find(query);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Universal filter for Book collection
app.get('/api/books', async (req, res) => {
    try {
        const query = {};
        for (const key in req.query) {
            if (req.query[key]) {
                query[key] = req.query[key];
            }
        }
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Book to AddBookPage collection
app.post('/api/addbookpage', async (req, res) => {
    try {
        const addBook = new AddBookPage(req.body);
        await addBook.save();
        res.status(201).json(addBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add Book (Book collection)
app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update book (only by seller)
app.put('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        if (req.body.sellerId !== String(book.sellerId)) {
            return res.status(403).json({ error: 'Unauthorized: Only the seller can update this book' });
        }
        Object.assign(book, req.body);
        await book.save();
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete book (only by seller)
app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        if (req.body.sellerId !== String(book.sellerId)) {
            return res.status(403).json({ error: 'Unauthorized: Only the seller can delete this book' });
        }
        await book.deleteOne();
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Register route
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Let the User model pre-save middleware hash the password
        const user = await User.create({ username, email, password });
        res.status(201).json({ success: true, user: { id: user._id, username, email } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);
        const user = await User.findOne({ email });
        console.log('User found:', !!user);
        if (!user) return res.status(400).json({ success: false, error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });

        // Store login event
        await Login.create({ userId: user._id, email: user.email });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            user: { id: user._id, username: user.username, email: user.email },
            token
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Cart routes (Cart model only)
app.post('/api/cart/add', async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: quantity > 0 ? [{ bookId, quantity }] : [] });
        } else {
            const itemIndex = cart.items.findIndex(item => String(item.bookId) === String(bookId));
            if (itemIndex > -1) {
                if (quantity === 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = quantity;
                }
            } else if (quantity > 0) {
                cart.items.push({ bookId, quantity });
            }
        }
        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('items.bookId');
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health check (useful for Render and load balancers)
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Use environment variables where available (Render provides PORT and you should set MONGO_URI)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kakashibharath4427:TSLoTIuV6S9EoIP3@bookstest.iabxetl.mongodb.net/?retryWrites=true&w=majority&appName=bookstest';

async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ db connected');

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        // Exit so the platform (Render) can restart the service or report failure
        process.exit(1);
    }
}

// Graceful handling of unexpected errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

startServer();
