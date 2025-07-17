const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Login = require('./models/Login');

const app = express();

app.use(cors());
app.use(express.json());

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

mongoose.connect('mongodb+srv://fakestore:Shaik123@cluster0.5ff7uok.mongodb.net/bookmart?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('✅ db connected'))
    .catch(err => console.log('❌ DB connection error:', err));
const port = 5000;
app.listen(port, () => {
    console.log('server is running on http://localhost:' + port);
});
