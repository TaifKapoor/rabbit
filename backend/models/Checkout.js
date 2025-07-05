import mongoose from "mongoose";

// Ek checkout item ka sub-schema
const checkoutItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // ✅ yahan "User" nahi, "Product"
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
  size: String,
  color: String,
}, { _id: false });

// Full checkout schema
const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  checkoutItems: [checkoutItemSchema],

 shippingAddress: {
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String },
},


  paymentMethod: {
    type: String,
    enum: ["COD", "PayPal", "Stripe"],
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paymentStatus: {
    type: String,
    default: "Pending",
  },

  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },

  isFinalized: {
    type: Boolean,
    default: false,
  },

  paidAt: {
    type: Date,
  },

  finalizedAt: {
    type: Date,
  },
}, { timestamps: true });

export const Checkout = mongoose.model("Checkout", checkoutSchema);
