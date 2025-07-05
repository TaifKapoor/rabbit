import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    discountPrice: {
        type: Number,
    },

    brand: {
        type: String,
        // required: true,
    },

    category: {
        type: String,
        // required: true,
    },

    sizes: {
        type: [String],
        required: true,
        default: [],
    },

    colors: {
        type: [String],
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    collection: {
        type: String,
        enum: ["Men", "Women", "Unisex"]
    },

    gender: {
        type: String,
        // required: true,
    },

    material: {
        type: String,
        // required: true,
    },

    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },

    images: [
        {
            url: {
                type: String,
                required: true,
            },
            altText: {
                type: String,
            }
        },
    ],

    isFeatured: {
        type: Boolean,
        default: false,
    },

    isPublished: {
        type: Boolean,
        default: false,
    },

    sku: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
    },

    rating: {
        type: Number,
        default: 0,
    },

    numReviews: {
        type: Number,
        default: 0,
    },

    tags: [String],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },

    metaTitle: {
        type: String,
    },

    metaDescription: {
        type: String,
    },

    metaKeywords: {
        type: String,
    },

    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },

    weight: Number
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
