import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Upload Image
export const uploadProductImage = createAsyncThunk(
  'addProduct/uploadImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('product', file);

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addproduct/upload`, formData);
      return res.data.image_url;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Image upload failed");
    }
  }
);

// ✅ Add Product
export const addNewProduct = createAsyncThunk(
  'addProduct/addNew',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addproduct`, productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Product creation failed");
    }
  }
);

// ✅ Slice
const addProductSlice = createSlice({
  name: 'addProduct',
  initialState: {
    imageUrl: "",
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    resetAddProductState: (state) => {
      state.imageUrl = "";
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProductImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetAddProductState } = addProductSlice.actions;
export default addProductSlice.reducer;
