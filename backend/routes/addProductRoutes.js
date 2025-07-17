// 📁 routes/addProductRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { Product } from '../models/Product.js';

const router = express.Router();

// ✅ Setup Multer for file upload
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// ✅ Serve uploaded images statically
router.use("/images", express.static("upload/images"));

// ✅ Upload endpoint
router.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT || 9000}/api/addproduct/images/${req.file.filename}`
  });
});

// ✅ Add product endpoint
router.post('/', async (req, res) => {
  try {
    console.log("📥 Incoming product body:", req.body);

    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id,
      sku: `SKU${Date.now()}`,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      gender: req.body.gender,
      brand: req.body.brand,
      material: req.body.material,
      sizes: req.body.sizes,
      colors: req.body.colors,
      price: req.body.price,
      discountPrice: req.body.discountPrice,
      images: [{ url: req.body.image }],
      collection: req.body.collection || 'Default Collection',
      isPublished: true,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error("❌ AddProduct error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
