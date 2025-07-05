import express from 'express';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { Checkout } from "../models/Checkout.js"
import { Order } from "../models/Order.js"
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", protect, async (req, res) => {
  console.log("📦 Checkout request received:", req.body);

    const {
        checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    } = req.body;

    // 🔒 Validation: Check if cart items exist
    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout." });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id, // 🔐 user id from JWT
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,  // 🔁 typo fix: should be isPaid not ispaid
        });

        console.log(`✅ Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("❌ Checkout Error:", error.message);
        console.log("📛 Full error object:", error);
        res.status(500).json({
            success: false,
            message: "Checkout failed",
            error: error.message,
        });
    }
});


// @route   PUT /api/checkout/:id
// @access  Private (requires user to be logged in)
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body || {};
    console.log("📦 Body Received:", req.body);

    if (!paymentStatus) {
    return res.status(400).json({ message: "Missing payment status" });
  }
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        // ✅ Update fields if provided in request body
        if (paymentStatus == "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout)
        }
        else{
            res.status(400).json({ message: "Invalid Payment Status" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
});



// ✅ Finalize a checkout
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid  && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        paidAt: checkout.paidAt,
        paymentDetails: checkout.paymentDetails,
        isPaid: true,
        isDelivered: false,
        paymentStatus: "Paid"
      })
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      await Cart.findOneAndDelete({user: checkout.user})
      res.status(200).json( finalOrder );
    }

    else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized." });
    }
    
    else{
        return res.status(400).json({ message: "Checkout is Not Paid" });
    }

  } catch (error) {
    console.error("Finalize error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;