import express from 'express';
import { Product } from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';


const router = express.Router();

// ✅ Create a new product
router.post('/', protect, admin, async (req, res) => {
    try {
        console.log("📥 Incoming Request Body:", req.body); // 🔍 Debug line

        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            tags,
            dimensions,
            weight,
            sku,
            category
        } = req.body;

        if (!name || !price || !brand || !category || !sku) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (name, price, brand, category, sku)"
            });
        }

        const product = new Product({
            ...req.body,
            user: req.user._id,
            isPublished: true // Har new product ke liye isPublished true set karo
        });

        // const product = new Product({
        //     name,
        //     description,
        //     price,
        //     discountPrice,
        //     countInStock,
        //     brand,
        //     sizes,
        //     colors,
        //     collection,
        //     material,
        //     gender,
        //     images,
        //     isFeatured,
        //     isPublished,
        //     tags,
        //     dimensions,
        //     weight,
        //     sku,
        //     category,
        //     user: req.user._id,
        // });

        const createdProduct = await product.save();
        console.log("✅ Product created successfully:", createdProduct);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: createdProduct,
        });
    } catch (error) {
        console.error("❌ Product creation error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


// ✅ Update product by ID
// router.put('/:id', protect, admin, async (req, res) => {
//     try {
//         const {
//             name,
//             description,
//             price,
//             discountPrice,
//             countInStock,
//             brand,
//             sizes,
//             colors,
//             collection,
//             material,
//             gender,
//             images,
//             isFeatured,
//             isPublished,
//             tags,
//             dimensions,
//             weight,
//             sku,
//             category
//         } = req.body;

//         if (!name || !description || !price || !countInStock || !sku || !sizes?.length || !colors?.length) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields (name, description, price, countInStock, sku, sizes, colors)"
//             });
//         }

//         const product = await Product.findById(req.params.id);
//         if (product) {
//             product.name = name || product.name;
//             product.description = description || product.description;
//             product.price = price || product.price;
//             product.discountPrice = discountPrice || product.discountPrice;
//             product.countInStock = countInStock || product.countInStock;
//             product.brand = brand || product.brand;
//             product.sizes = sizes || product.sizes;
//             product.colors = colors || product.colors;
//             product.collection = collection || product.collection;
//             product.material = material || product.material;
//             product.gender = gender || product.gender;
//             product.images = images || product.images;
//             if (typeof isFeatured !== 'undefined') product.isFeatured = isFeatured;
//             if (typeof isPublished !== 'undefined') product.isPublished = isPublished;
//             product.tags = tags || product.tags;
//             product.dimensions = dimensions || product.dimensions;
//             product.weight = weight || product.weight;
//             product.sku = sku || product.sku;
//             product.category = category || product.category;

//             const updatedProduct = await product.save();
//             res.status(200).json(updatedProduct);
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//     } catch (error) {
//         console.error("❌ Product creation error:", error);
//         res.status(500).json({ success: false, message: "Server Error", error: error.message });
//     }
// });



router.put('/:id', protect, admin, async (req, res) => {
    console.log("Received req.body:", req.body);
    try {

        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or undefined"
            });
        }

        const {
           name,
            description,
            price,
            discountPrice,
            countInStock,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            category,
            ...rest 
        } = req.body;

        // Required फील्ड्स की जांच
        if (!name || !description || price == null || countInStock == null || 
            !sku || !sizes?.length || !colors?.length) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, description, price, countInStock, sku, sizes, or colors"
            });
        }

        // Images की वैलिडेशन
        if (images && Array.isArray(images)) {
            for (const img of images) {
                if (!img.url) {
                    return res.status(400).json({
                        success: false,
                        message: "Each image must have a valid URL"
                    });
                }
            }
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // फील्ड्स अपडेट करें
        product.name = name;
        product.description = description;
        product.price = Number(price); // सुनिश्चित करें कि price नंबर है
        product.countInStock = Number(countInStock); // सुनिश्चित करें कि countInStock नंबर है
        product.sizes = sizes;
        product.colors = colors;
        product.sku = sku;
        product.discountPrice = rest.discountPrice || product.discountPrice;
        product.brand = rest.brand || product.brand;
        product.category = rest.category || product.category;
        product.collection = rest.collection || product.collection;
        product.material = rest.material || product.material;
        product.gender = rest.gender || product.gender;
        product.images = images || product.images;
        product.isFeatured = typeof rest.isFeatured !== 'undefined' ? rest.isFeatured : product.isFeatured;
        product.isPublished = typeof rest.isPublished !== 'undefined' ? rest.isPublished : product.isPublished;
        product.tags = rest.tags || product.tags;
        product.dimensions = rest.dimensions || product.dimensions;
        product.weight = rest.weight || product.weight;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("❌ Product update error:", error.message, error.stack);
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
});


// ✅ DELETE a product by ID
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await product.deleteOne();

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("❌ Delete error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});



router.get('/', async (req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit
        } = req.query;

        let query = {};
        let sort = {}; // ✅ sort को define करना जरूरी है
        query.isPublished = true;

        // ✅ Filter Logic
        if (collection && collection.toLowerCase() !== "all") {
            query.collection = collection;
        }

        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }

        if (brand) {
            query.brand = { $in: brand.split(",") };
        }

        if (size) {
            query.sizes = { $in: size.split(",") }; // ✅ 'sizes' not 'size'
        }

        if (color) {
            query.colors = { $in: color.split(",") };
        }

        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice); // ✅ $gte not just gte
            if (maxPrice) query.price.$lte = Number(maxPrice); // ✅ $lte
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // ✅ Sort Logic
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc':
                    sort = { price: 1 };
                    break;
                case 'priceDesc':
                    sort = { price: -1 };
                    break;
                case 'popularity':
                    sort = { rating: -1 };
                    break;
                default:
                    sort = {};
            }
        }

        // ✅ Fetch products with filters and limit
        const products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);

        res.json({ success: true, products });
    } catch (error) {
        console.error("❌ Error fetching products:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Get Api Producta best Seller
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller)
        }
        else {
            res.status(404).json({ message: " No best seller Found" })
        }
    } catch (error) {
        console.error("❌ Server Error ", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
})


// Get Api Producta new arrivals
router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createAt: -1 }).limit(8);
        res.json(newArrivals)

    } catch (error) {
        console.error("❌ Server Error ", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
})



// ✅ Similar products route with fallback
router.get("/:id/similar", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        let similarProducts = await Product.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category,
        }).limit(4);

        // 🧠 Fallback: agar similar products 0 aaye, toh random 4 products do
        if (similarProducts.length === 0) {
            similarProducts = await Product.find({ _id: { $ne: id } }).limit(4);
        }

        res.json(similarProducts);
    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});



// ✅ Get single product by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        console.error("❌ Error fetching product:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
