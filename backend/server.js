import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import multer from 'multer'
// import path from 'path'
import { connectDb } from './config/db.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productAdminRoutes from './routes/productAdminRoutes.js';
import adminOrderRoutes from './routes/adminOrderRoutes.js';
import addProductRoutes from './routes/addProductRoutes.js';
import { Product } from './models/Product.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to DB
connectDb();

// ✅ Sample route
app.get('/', (req, res) => {
  res.send("To kese ho app log - me Taufik");
});


// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({ storage: storage });

// Creating Upload Endpoint for image
// app.use("/images", express.static("upload/images"))
// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${PORT}/images/${req.file.filename}`
//     });
// });


// app.post('/addproduct', async (req, res) => {
//   try {
//     console.log("📥 Incoming product body:", req.body);

//     let products = await Product.find({});
//     let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

//     const product = new Product({
//       id,
//       sku: `SKU${Date.now()}`,  // ✅ Add this
//       name: req.body.name,
//       description: req.body.description,
//       category: req.body.category,
//       gender: req.body.gender,
//       brand: req.body.brand,
//       material: req.body.material,
//       sizes: req.body.sizes,
//       colors: req.body.colors,
//       price: req.body.price,
//       images: [{ url: req.body.image }], 
//       discountPrice: req.body.discountPrice,
//     });

//     await product.save();
//     res.json({ success: true, name: req.body.name });

//   } catch (err) {
//     console.error("❌ AddProduct error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });



// ✅ All API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", subscriberRoutes);
app.use('/api/addproduct', addProductRoutes);


// ✅ Admin API Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ✅ Server Start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});