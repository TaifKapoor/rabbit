import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 🔁 Get all products (admin)
export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchAdminProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ➕ Add new product (admin)
export const createProduct = createAsyncThunk(
  'adminProducts/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✏️ Update product (admin)
export const updateProductByAdmin = createAsyncThunk(
  'adminProducts/updateProductByAdmin',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ❌ Delete product (admin)
export const deleteProductByAdmin = createAsyncThunk(
  'adminProducts/deleteProductByAdmin',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔁 Fetch all products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message ;
      })

      // ➕ Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.successMessage = "Product added successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add product";
      })

      // ✏️ Update product
      .addCase(updateProductByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.products.findIndex(p => p._id === updated._id);
        if (index !== -1) state.products[index] = updated;
      })
      .addCase(updateProductByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update product";
      })

      // ❌ Delete product
      .addCase(deleteProductByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProductByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message ;
      });
  }
});


export default adminProductSlice.reducer;
