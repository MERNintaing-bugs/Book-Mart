const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AddBookPage',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
