import express from "express";
import { Order } from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all orders - Admin only
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update order delivery status - Admin only
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name")

    if (order) {
      order.status = req.body.status || order.status

      order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    }
    else{
        res.status(404).json({ message: "Order not found" });
    }

  } catch (error) {
    console.error("❌ Delivery update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete an order - Admin only
// routes/adminOrderRoutes.js या admin/orders.js में:
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id); // safer option
    res.status(200).json({ message: "Order deleted successfully" });

  } catch (error) {
    console.error("❌ Order delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
