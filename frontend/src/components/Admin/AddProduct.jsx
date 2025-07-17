import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  uploadProductImage,
  addNewProduct,
  resetAddProductState
} from '../../redux/slices/addProductSlice';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { imageUrl, loading, success, error } = useSelector((state) => state.addProduct);

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    gender: "",
    brand: "",
    material: "",
    sizes: [],
    colors: [],
    price: 0,
    discountPrice: 0,
    collection: "Men"
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updated = new Set(prev[field]);
      checked ? updated.add(value) : updated.delete(value);
      return { ...prev, [field]: Array.from(updated) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload an image!");
    dispatch(uploadProductImage(imageFile));
  };

  useEffect(() => {
    if (imageUrl) {
      const fullProduct = {
        ...formData,
        image: imageUrl,
        sku: `SKU-${Date.now()}`,
        isPublished: true,
      };
      dispatch(addNewProduct(fullProduct));
    }
  }, [imageUrl]);

  useEffect(() => {
    if (success) {
      alert("Product added successfully!");
      dispatch(fetchProductsByFilters({}));
      dispatch(resetAddProductState());
      navigate("/admin/products");
    }
    if (error) {
      alert("❌ " + error);
    }
  }, [success, error]);

  return (
    <div className="py-10 px-4 min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>

        <div>
          <label className="block mb-2">Product Image</label>
          <input type="file" accept="image/*" hidden id="imageUpload" onChange={handleImageChange} />
          <label htmlFor="imageUpload" className="cursor-pointer inline-block">
            <div className="w-28 h-28 border rounded-md overflow-hidden">
              <img src={previewUrl || 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png'} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </label>
        </div>

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full border px-4 py-2 rounded-md" />
        <textarea name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-4 py-2 rounded-md resize-none" />

        <select name="category" value={formData.category} onChange={handleChange} className="w-full border px-4 py-2 rounded-md">
          <option value="">Select Category</option>
          <option value="Shirts">Shirts</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Dresses">Dresses</option>
        </select>

        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border px-4 py-2 rounded-md">
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>

        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full border px-4 py-2 rounded-md" />
        <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="Material" className="w-full border px-4 py-2 rounded-md" />

        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <label key={size}>
              <input type="checkbox" value={size} checked={formData.sizes.includes(size)} onChange={(e) => handleCheckboxChange(e, "sizes")} />
              {size}
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          {['Red', 'Blue', 'Black', 'Green', 'White'].map((color) => (
            <label key={color}>
              <input type="checkbox" value={color} checked={formData.colors.includes(color)} onChange={(e) => handleCheckboxChange(e, "colors")} />
              {color}
            </label>
          ))}
        </div>

        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border px-4 py-2 rounded-md" />
        <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} placeholder="Discount Price" className="w-full border px-4 py-2 rounded-md" />

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">
          {loading ? "Adding..." : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { fetchProductsByFilters } from '../../redux/slices/productsSlice';



// const AddProduct = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [image, setImage] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState("");
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         category: "",
//         gender: "",
//         brand: "",
//         material: "",
//         sizes: [],
//         colors: [],
//         price: 0,
//         discountPrice: 0,
//         collection: "Default Collection", // ✅ added default collection field
//     });

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setPreviewUrl(URL.createObjectURL(file));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleCheckboxChange = (e, field) => {
//         const { value, checked } = e.target;
//         setFormData((prev) => {
//             const newSet = new Set(prev[field]);
//             checked ? newSet.add(value) : newSet.delete(value);
//             return { ...prev, [field]: Array.from(newSet) };
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (
//             !formData.name.trim() ||
//             !formData.description.trim() ||
//             !formData.category ||
//             !formData.gender ||
//             !formData.brand.trim() ||
//             !formData.material.trim() ||
//             formData.sizes.length === 0 ||
//             formData.colors.length === 0 ||
//             !formData.price ||
//             !formData.discountPrice ||
//             !image
//         ) {
//             alert("❌ Please fill all required fields");
//             return;
//         }

//         try {
//             const imageForm = new FormData();
//             imageForm.append("product", image);

//             const imgRes = await fetch("http://localhost:9000/api/addproduct/upload", {
//                 method: "POST",
//                 body: imageForm,
//             });

//             const imgData = await imgRes.json();
//             if (!imgData.success) {
//                 alert("❌ Image upload failed");
//                 return;
//             }

//             const product = {
//                 ...formData,
//                 image: imgData.image_url,
//                 sku: `SKU-${Date.now()}`,
//                 isPublished: true 
//             };

//             const productRes = await fetch("http://localhost:9000/api/addproduct", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(product),
//             });

//             const result = await productRes.json();

//             if (result.success) {
//                 alert("✅ Product added successfully");

//                 // ⬇️⬇️ Redux se updated products fetch karo
//                 dispatch(fetchProductsByFilters({}));

//                 setFormData({
//                     name: "",
//                     description: "",
//                     category: "",
//                     gender: "",
//                     brand: "",
//                     material: "",
//                     sizes: [],
//                     colors: [],
//                     price: 0,
//                     discountPrice: 0,
//                     collection: "Default Collection",
//                 });
//                 setImage(null);
//                 setPreviewUrl("");

//                 navigate("/admin/products");
//             } else {
//                 alert("❌ Failed to add product");
//             }
//         } catch (error) {
//             console.error("Submit error:", error);
//             alert("Something went wrong");
//         }
//     };

//     return (
//         <div className="py-10 px-4 min-h-screen bg-white">
//             <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Product</h2>

//                 <div>
//                     <label className="block text-sm font-semibold mb-2">Product Image</label>
//                     <label htmlFor="imageUpload" className="cursor-pointer inline-block">
//                         <input type="file" id="imageUpload" accept="image/*" hidden onChange={handleImageChange} />
//                         <div className="w-28 h-28 border rounded-md overflow-hidden">
//                             <img
//                                 src={previewUrl || 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png'}
//                                 alt="Preview"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                     </label>
//                 </div>

//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full border px-4 py-2 rounded-md" />

//                 <textarea name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-4 py-2 rounded-md resize-none" />

//                 <select name="category" value={formData.category} onChange={handleChange} className="w-full border px-4 py-2 rounded-md">
//                     <option value="">Select Category</option>
//                     <option value="Shirts">Shirts</option>
//                     <option value="T-Shirts">T-Shirts</option>
//                     <option value="Dresses">Dresses</option>
//                     <option value="Jeans">Jeans</option>
//                 </select>

//                 <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border px-4 py-2 rounded-md">
//                     <option value="">Select Gender</option>
//                     <option value="Men">Men</option>
//                     <option value="Women">Women</option>
//                     <option value="Kids">Kids</option>
//                 </select>

//                 <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full border px-4 py-2 rounded-md" />
//                 <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="Material" className="w-full border px-4 py-2 rounded-md" />

//                 <div className="flex gap-3">
//                     {['S', 'M', 'L', 'XL'].map((size) => (
//                         <label key={size}>
//                             <input type="checkbox" value={size} checked={formData.sizes.includes(size)} onChange={(e) => handleCheckboxChange(e, "sizes")} />
//                             {size}
//                         </label>
//                     ))}
//                 </div>

//                 <div className="flex gap-3">
//                     {['Red', 'Blue', 'Black', 'Green', 'White'].map((color) => (
//                         <label key={color}>
//                             <input type="checkbox" value={color} checked={formData.colors.includes(color)} onChange={(e) => handleCheckboxChange(e, "colors")} />
//                             {color}
//                         </label>
//                     ))}
//                 </div>

//                 <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border px-4 py-2 rounded-md" />
//                 <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} placeholder="Discount Price" className="w-full border px-4 py-2 rounded-md" />

//                 <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">
//                     ADD PRODUCT
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddProduct;