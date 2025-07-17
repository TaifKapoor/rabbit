import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from './FilterSidebar';
import SortOption from './SortOption';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection: collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='flex flex-col lg:flex-row'>

            {/* ✅ Mobile Filter Button - Center Aligned */}
            {/* ✅ Mobile Filter Button - Center Aligned with gap */}
            <div className="block lg:hidden w-full bg-white py-3 px-4 sticky top-[84px] z-30 shadow-sm text-center">
                <button
                    onClick={toggleSidebar}
                    className="inline-flex items-center justify-center border px-4 py-2 text-sm font-medium rounded hover:bg-gray-100"
                >
                    <FaFilter className="mr-2" /> Filters
                </button>
            </div>


            {/* ✅ Sidebar for Desktop + Mobile Slide Drawer */}
            <div
                ref={sidebarRef}
                className={`fixed lg:static inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>

            {/* ✅ Product Section */}
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-8">All Collection</h2>

                {/* Sort Dropdown */}
                <SortOption />

                {/* Products Grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default CollectionPage;