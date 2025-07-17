import express from 'express';
import { Product } from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET all products (admin view)
router.get('/', protect, admin, async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products);
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ POST - Add new product (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("❌ Add error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});


export default router;
