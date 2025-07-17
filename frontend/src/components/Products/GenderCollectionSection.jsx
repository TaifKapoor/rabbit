import React from 'react';
import mensCollectionImage from '../../assets/mens-collection.webp';
import womensCollectionImage from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const GenderCollectionSection = () => {
  return (
    <section className="py-20 px-4 lg:px-0 bg-gradient-to-br">
      <div className="container mx-auto flex flex-col md:flex-row gap-10">

        {/* WOMEN SECTION */}
        <div className="relative flex-1 group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[500px] sm:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition duration-500"></div>

          {/* Text Content */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 backdrop-blur-sm bg-white/20 px-6 py-4 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-wide drop-shadow">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Shop Now <HiArrowRight />
            </Link>
          </div>
        </div>

        {/* MEN SECTION */}
        <div className="relative flex-1 group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[500px] sm:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition duration-500"></div>

          {/* Text Content */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 backdrop-blur-sm bg-white/20 px-6 py-4 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-wide drop-shadow">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Shop Now <HiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GenderCollectionSection;








// import React from 'react'
// import mensCollectionImage from '../../assets/mens-collection.webp'
// import womensCollectionImage from '../../assets/womens-collection.webp'
// import { Link } from 'react-router-dom'

// const GenderCollectionSection = () => {
//     return (
//         <section className='py-16 px-4 lg:px-0'>
//             <div className="container mx-auto flex flex-col md:flex-row gap-8">
//                 <div className="relative flex-1">
//                     <img src={womensCollectionImage} alt=""
//                         className='w-full h-[700px] object-cover' />
//                     <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-3">Women's Collection</h2>
//                         <Link to='/collections/all?gender=Women' className='text-gray-900 underline'>
//                             Shop Now
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Men's collection */}
//                 <div className="relative flex-1">
//                     <img src={mensCollectionImage} alt=""
//                         className='w-full h-[700px] object-cover' />
//                     <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-3">Men's collection</h2>
//                         <Link to='/collections/all?gender=Men' className='text-gray-900 underline'>
//                             Shop Now
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default GenderCollectionSection
