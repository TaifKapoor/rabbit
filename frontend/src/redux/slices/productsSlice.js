// src/redux/slices/ProductsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 📦 Async thunk to fetch products from backend
export const fetchProductsByFilters = createAsyncThunk(
    'products/fetchByFilters',
    async ({
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
    }) => {
        const query = new URLSearchParams();
        if (collection) query.append("collection", collection)
        if (size) query.append("size", size)
        if (color) query.append("color", color)
        if (gender) query.append("gender", gender)
        if (minPrice) query.append("minPrice", minPrice)
        if (maxPrice) query.append("maxPrice", maxPrice)
        if (sortBy) query.append("sortBy", sortBy)
        if (search) query.append("search", search)
        if (category) query.append("category", category)
        if (material) query.append("material", material)
        if (brand) query.append("brand", brand)
        if (limit) query.append("limit", limit)

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)
        return response.data
    }
);

export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
    return response.data
})

// ✏️ Update product (admin)
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                throw new Error("No user token found. Please log in.");
            }
            console.log("Sending data to server:", productData);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
                productData,
                config
            );
            return res.data;
        } catch (error) {
            console.error("Update product error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// 📌 Similar products fetch karne ke liye thunk
export const fetchSimilarProducts = createAsyncThunk(
    'products/fetchSimilarProducts',
    async ({ productId }) => {     // ✅ यहाँ productId लिया है
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/similar`   // ✅ OK
        );
        return res.data;
    }
);



const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null,
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        }
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "",
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // 🎯 fetchProductsByFilters
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload.products) ? action.payload.products : [];
            })
            .addCase(fetchProductsByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 📦 fetchProductDetails
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 🛠 updateProduct
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex((product) => product._id === updatedProduct._id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }

            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});


export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
