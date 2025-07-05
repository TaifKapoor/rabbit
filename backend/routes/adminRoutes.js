// routes/adminRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

const router = express.Router();

// ✅ Get all users (admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all orders (admin only)
router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email }); // ✅ use let instead of const

        if (user) {
           res.status(201).json({ message: "User already exists"}); 
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer", // default role
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" , user });
    } catch (error) {
        console.error("User creation error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// @desc    Admin updates a user by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Delete User - Admin Only
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne(); // ✅ recommended
    // ya: await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("❌ Delete error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
