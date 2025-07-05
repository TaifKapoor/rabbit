import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : { cartItems: [] } // ✅
}


const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                params: { userId, guestId }
            }
        )
        return response.data
    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})


export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId, quantity, size, color, guestId, userId
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({
    productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId, quantity, size, color, guestId, userId
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)


export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({
    productId, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: { productId, size, color, guestId, userId }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)


export const margeCart = createAsyncThunk("cart/margeCart", async ({ guestId, user }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
            { guestId, user },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { cartItems: [] }; // ✅ yahi line
            localStorage.removeItem("cart");
        }
    },
    extraReducers: (builder) => {
        builder

            // 🔁 Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })

            // ➕ Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })

            // ✏️ Update Quantity
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity"
            })

            // ❌ Remove
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart; 
                saveCartToStorage(action.payload.cart); 
            })

            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item"
            })

            // 🔀 Merge Cart
            .addCase(margeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(margeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(margeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart"
            });
    }
})


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;