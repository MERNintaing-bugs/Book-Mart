const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', LoginSchema);
