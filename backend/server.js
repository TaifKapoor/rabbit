import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import subscriberRoutes from './routes/subscriberRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import productAdminRoutes from './routes/productAdminRoutes.js'
import adminOrderRoutes from './routes/adminOrderRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

// ✅ MIDDLEWARE - MUST BE BEFORE ROUTES
app.use(cors());
app.use(express.json()); // <<=== ये line route से पहले होनी चाहिए
app.use(express.urlencoded({ extended: true }));

// ✅ Connect DB
connectDb();

// ✅ Sample route
app.get('/', (req, res) => {
  res.send("To Kese h app log me taufik");
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);

// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ✅ Server Start
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
