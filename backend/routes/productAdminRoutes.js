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


export default router;
