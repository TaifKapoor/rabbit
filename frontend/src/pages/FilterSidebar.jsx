import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChisStyle"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseInt(params.minPrice || 0),
      maxPrice: parseInt(params.maxPrice || 100),
    });

    setPriceRange([0, parseInt(params.maxPrice || 100)]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilter = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }

    setFilters(newFilter);
    console.log(newFilter)

    updateURLparams(newFilter)
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = {...filters, minPrice: 0,  maxPrice : newPrice}
    setFilters(filters);
    updateURLparams(newFilters)
  };

  const updateURLparams = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
        if(Array.isArray(newFilter[key])  && newFilter[key].length > 0){
            params.append(key, newFilter[key].join(","))
        }
        else if(newFilter[key]){
            params.append(key, newFilter[key])
        }
    });
    
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }


  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input type="radio" 
            name="category" 
            value={category} 
            onChange={handleFilterChange} 
            checked={filters.category === category}
            className="mr-2" />
            <span className='text-gray-700'>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input type="radio" 
            name="gender" 
            value={gender} 
            onChange={handleFilterChange} 
            checked={filters.gender === gender}
            className="mr-2" />
            <span>{gender}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <label key={color}>
              <input type="radio" 
              name="color" 
              value={color} 
              onChange={handleFilterChange} 
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`} />
              <div
                className="w-8 h-8 rounded-full border cursor-pointer hover:scale-105"
                style={{ backgroundColor: color.toLowerCase() }}
              ></div>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input type="checkbox" 
            name="size" 
            value={size} 
            onChange={handleFilterChange} 
            checked={filters.size.includes(size)}
            className="mr-2" />
            <span>{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input type="checkbox" 
            name="material" 
            value={material} 
            onChange={handleFilterChange} 
            checked={filters.material.includes(material)}
            className="mr-2" />
            <span>{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input type="checkbox" 
            name="brand" 
            value={brand} 
            onChange={handleFilterChange} 
            checked={filters.brand.includes(brand)}
            className="mr-2" />
            <span>{brand}</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
























// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'

// const FilterSidebar = () => {

//     const [searchParams, setSearchParams] = useSearchParams()
//     const [filters, setFilters] = useState({
//         category: "",
//         gender: "",
//         color: "",
//         size: [],
//         material: [],
//         brand: [],
//         minPrice: 0,
//         maxPrice: 100,
//     });

//     const [priceRange, setPriceRange] = useState([0, 100])

//     const categories = ["Top Wear", "Bottom Wear"]

//     const colors = [
//         "Red",
//         "Blue",
//         "Black",
//         "Green",
//         "Yellow",
//         "Gray",
//         "White",
//         "Pink",
//         "Beige",
//         "Navy"
//     ]

//     const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

//     const materials = [
//         "Cotton",
//         "Wool",
//         "Denim",
//         "Polyester",
//         "Silk",
//         "Linen",
//         "Viscose",
//         "Fleece"
//     ]

//     const brands = [
//         "Urban Threads",
//         "Modern Fit",
//         "Street Style",
//         "Beach Breeze",
//         "Fashionista",
//         "ChisStyle"
//     ]

//     const genders = ["Men", "Women"]

//     useEffect(() => {
//         const params = Object.fromEntries([...searchParams])

//         setFilters({
//             category: params.category || "",
//             gender: params.gender || "",
//             color: params.color || "",
//             size: params.size ? params.size.split(",") : [],
//             material: params.material ? params.material.split(",") : [],
//             brand: params.brand ? params.brand.split(",") : [],
//             minPrice: params.minPrice || 0,
//             maxPrice: params.maxPrice || 100,
//         })
//         setPriceRange([0, params.maxPrice || 100])
//     }, [searchParams])

//     const handleFilterChange = (e) => {
//         const {name, value, checked, type} = e.target;
//         console.log({name, value, checked, type})

//         let newFilter = {...filters }

//         if(type === "checkbox"){
//             if(checked){
//                 newFilter[name] = [...( newFilter[name] || []), value];
//             }
//             else{
//                 newFilter[name] = newFilter[name].filter((item) => item !== value)
//             }
//         } else{
//             newFilter[name] = value
//         }
//         setFilters(newFilter)
//         console.log(newFilter)
//     }

//   return (
//     <div className='p-4'>
//       <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

//       {/* Category Filter */}    
//       <div className="mb-6">
//         <label  className="block text-gray-600 font-medium mb-2">Category</label>
//         {categories.map((category) => (
//             <div key={category} className='flex items-center mb-1'>
//                 <input type="radio" 
//                 name='category' 
//                 value={category}
//                 onChange={handleFilterChange}
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
//                 <span className="text-gray-700">{category}</span>
//             </div>
//         ))}
//       </div>

//       {/* Gender Filter */}    
//       <div className="mb-6">
//         <label  className="block text-gray-600 font-medium mb-2">Gneder</label>
//         {genders.map((gender) => (
//             <div key={gender} className='flex items-center mb-1'>
//                 <input type="radio" 
//                 name='gender' 
//                 value={gender}
//                 onChange={handleFilterChange}
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
//                 <span className="text-gray-700">{gender}</span>
//             </div>
//         ))}
//       </div>

//       {/* Colors Filter */}
//       <div className="mb-6">
//         <label  className="block text-gray-600 font-medium mb-2">Color</label>
//         <div className="flex flex-wrap gap-2">
//             {colors.map((color) => (
//                 <button key={color}
//                 name='color'
//                 value={color}
//                 onClick={handleFilterChange}
//                 className='w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105'
//                 style={{backgroundColor: color.toLowerCase()}}>
//                 </button>
//             ))}
//         </div>
//       </div>
      
//       {/* Size Filter */}
//       <div className="mb-6">
//         <label  className="block text-gray-600 font-medium mb-2">Size</label>
//         {sizes.map((size) => (
//             <div key={size} className='flex items-center mb-1'>
//                 <input type="checkbox" 
//                 name='size'
//                 value={size}
//                 onChange={handleFilterChange} 
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
//                 <span className="text-gray-700">{size}</span>
//             </div>
//         ))}
//       </div>

//       {/* Material Filter */}
//       <div className="mb-6">
//         <label  className="block text-gray-600 font-medium mb-2">Material</label>
//         {materials.map((material) => (
//             <div key={material} className='flex items-center mb-1'>
//                 <input type="checkbox" 
//                 name='material' 
//                 value={material}
//                 onChange={handleFilterChange}
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
//                 <span className="text-gray-700">{material}</span>
//             </div>
//         ))}
//       </div>

//       {/* Brand Filter */}
//       <div className="mb-6">
//         <label  className="block text-gray-600 font-medium mb-2">Brand</label>
//         {brands.map((brand) => (
//             <div key={brand} className='flex items-center mb-1'>
//                 <input type="checkbox" 
//                 name='brand'
//                 value={brand}
//                 onChange={handleFilterChange} 
//                 className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
//                 <span className="text-gray-700">{brand}</span>
//             </div>
//         ))}
//       </div>

//         {/* Price Range Filter */}
//       <div className="mb-8">
//         <label  className="block text-gray-600 font-medium mb-2">Price Range</label>
//         <input type="range" 
//         name='priceRange'
//         min={0}
//         max={100}
//         className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
//         <div className="flex justify-between text-gray-600 mt-2">
//             <span>$0</span>
//             <span>${priceRange[1]}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FilterSidebar
