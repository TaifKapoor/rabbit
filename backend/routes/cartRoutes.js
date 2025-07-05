import express from 'express';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId })
    }
    else if (guestId) {
        return await Cart.findOne({ userId })
    }
    return null;
}

// POST /api/cart

router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product Not Found" });

        let cart = await Cart.findOne(userId ? { user: userId } : { guestId });

        // If the cart exists, update it
        if (cart) {
            const productIndex = cart.cartItems.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                cart.cartItems[productIndex].quantity += quantity;
            } else {
                cart.cartItems.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            cart.totalPrice = cart.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create new cart
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                cartItems: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("❌ Product creation error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


// PUT /api/cart
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, userId, guestId } = req.body;

    try {
        // Get cart by user or guest
        const cart = await Cart.findOne(userId ? { user: userId } : { guestId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find product in cart
        const productIndex = cart.cartItems.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.size === size &&
                item.color === color
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity > 0) {
            cart.cartItems[productIndex].quantity = quantity;
        } else {
            cart.cartItems.splice(productIndex, 1); // remove the item
        }

        // Recalculate total price
        cart.totalPrice = cart.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        );

        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        console.error("❌ Cart update error:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


// DELETE /api/cart
router.delete("/", async (req, res) => {
    const { productId, size, color, userId, guestId } = req.body;

    try {
        // Find the cart based on userId or guestId
        const cart = await Cart.findOne(userId ? { user: userId } : { guestId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the index of the item to delete
        const productIndex = cart.cartItems.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.size === size &&
                item.color === color
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove item from cart
        cart.cartItems.splice(productIndex, 1);

        // Recalculate total price
        cart.totalPrice = cart.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        );

        await cart.save();
        res.status(200).json({ success: true, message: "Item removed", cart });

    } catch (error) {
        console.error("❌ Cart delete error:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


router.get('/', async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await Cart.findOne(
            userId ? { user: userId } : { guestId }
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error("❌ Get cart error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});


// 🛒 Merge Guest Cart into Logged-in User Cart
router.post('/merge', async (req, res) => {
    const { guestId } = req.body;

    try {

        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (!guestCart) {
            return res.status(404).json({ success: false, message: 'Guest cart not found' });
        }

        if (userCart) {
            // Merge guest items into user cart
            guestCart.cartItems.forEach(guestItem => {
                const existingIndex = userCart.cartItems.findIndex(
                    (item) =>
                        item.productId.toString() === guestItem.productId.toString() &&
                        item.size === guestItem.size &&
                        item.color === guestItem.color
                );

                if (existingIndex > -1) {
                    // Item already in user cart, increase quantity
                    userCart.cartItems[existingIndex].quantity += guestItem.quantity;
                } else {
                    userCart.cartItems.push(guestItem);
                }
            });

            // Recalculate total price
            userCart.totalPrice = userCart.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            );

            await userCart.save();
            try {
                await Cart.findOneAndDelete({guestId});
            } catch (error) {
                console.error("Error deleting guest cart:", error)
            }

            return res.status(200).json({
                success: true,
                message: "Guest cart merged into user cart",
                cart: userCart
            });
        } else {
            // Assign guest cart to user
            guestCart.user = req.user._id ;
            guestCart.guestId = undefined;
            await guestCart.save();

            return res.status(200).json({
                success: true,
                message: "Guest cart assigned to user",
                cart: guestCart
            });
        }
    } catch (error) {
        console.error("❌ Merge cart error:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


export default router;