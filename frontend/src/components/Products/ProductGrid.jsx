import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {

  console.log("📦 Products received in ProductGrid:", products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className='block'>
          <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:border-white group overflow-hidden relative">
            

            <div className="w-full h-80 overflow-hidden">
              <img
                src={product.image || product.images?.[0]?.url || "/fallback.jpg"}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-in-out"
              />
            </div>

            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-black transition duration-300">{product.name}</h3>
              
              <p className="text-sm font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                ${product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
