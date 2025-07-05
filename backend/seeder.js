import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Cart } from './models/Cart.js';
import { Product } from './models/Product.js';
import  products  from './data/products.js'; 


dotenv.config()

// Connect to mongoDB

mongoose.connect(process.env.MONGO_URI)

// Function to seed data

export const seedData = async () => {
    try {
        // Clear existing data

        await Product.deleteMany();
        await User.deleteMany()
        await Cart.deleteMany()

        // Create a default admin User
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        })

        // Assign the default user ID to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: userID}
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error Seeding the data", error)
        process.exit(1);
    }
}

seedData()