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

app.use(cors());
app.use(express.json());

// Add Book to AddBookPage collection
app.get('/api/addbookpage', async (req, res) => {
    try {
        const books = await AddBookPage.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/addbookpage', async (req, res) => {
    try {
        const addBook = new AddBookPage(req.body);
        await addBook.save();
        res.status(201).json(addBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// ...existing code...
// Register route
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ success: true, user: { id: user._id, username, email } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
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

// Add Book (already exists)
app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

mongoose.connect('mongodb+srv://kakashibharath4427:TSLoTIuV6S9EoIP3@bookstest.iabxetl.mongodb.net/?retryWrites=true&w=majority&appName=bookstest')
// Add book to cart (Cart model)
app.post('/api/cart/add', async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [{ bookId, quantity: quantity || 1 }] });
        } else {
            const itemIndex = cart.items.findIndex(item => String(item.bookId) === String(bookId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ bookId, quantity: quantity || 1 });
            }
        }
        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's cart (Cart model)
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
// Add book to cart
app.post('/api/cart/add', async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check if book already in cart
        const cartItem = user.cart.find(item => String(item.bookId) === String(bookId));
        if (cartItem) {
            cartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ bookId, quantity: quantity || 1 });
        }
        await user.save();
        res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's cart
app.get('/api/cart', async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId).populate('cart.bookId');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
mongoose.connect('mongodb+srv://kakashibharath4427:TSLoTIuV6S9EoIP3@bookstest.iabxetl.mongodb.net/?retryWrites=true&w=majority&appName=bookstest')
    .then(() => console.log('✅ db connected'))
    .catch(err => console.log('❌ DB connection error:', err));
const port = 5000;
app.listen(port, () => {
    console.log('server is running on http://localhost:' + port);
});
