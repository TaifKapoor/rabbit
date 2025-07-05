import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    size: {
        type: String, // Optional: for clothing
    },
    color: {
        type: String, // Optional: for clothing
    }
}, {
    _id: false  // Because it's embedded inside Cart, we don't need separate _id for each item
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    guestId: {
        type: String
    },
    cartItems: [cartItemSchema],

    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true
});

export const Cart = mongoose.model('Cart', cartSchema);
