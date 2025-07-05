// src/redux/slices/checkoutSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// 📦 Order place karne ke liye thunk
export const createCheckout = createAsyncThunk(
  'checkout/createCheckout',
  async ({ checkoutItems, shippingAddress, paymentMethod, totalPrice }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      console.log("📌 Token from localStorage:", token); // Log 1: Token check
      if (!token) {
        return rejectWithValue({ message: "No token found, please log in" });
      }
      console.log("📌 Request Payload:", { checkoutItems, shippingAddress, paymentMethod, totalPrice }); // Log 2: Payload check
      console.log("📌 API URL:", `${import.meta.env.VITE_BACKEND_URL}/api/checkout`); // Log 3: API URL check
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, 
        { checkoutItems, shippingAddress, paymentMethod, totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("📌 API Response:", res.data); // Log 4: Success response
      return res.data;
    } catch (error) {
      console.error("📌 Checkout API Error:", error.response?.data || error.message); // Log 5: Error response
      return rejectWithValue(error.response?.data || { message: "Failed to create checkout" });
    }
  }
);



const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {} ,
  extraReducers: (builder) => {
    builder
      // 🛒 Place order
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message 
      })
  },
});


export default checkoutSlice.reducer;
