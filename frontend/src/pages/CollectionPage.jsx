import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import FilterSidebar from './FilterSidebar'
import SortOption from './SortOption'
import ProductGrid from '../components/Products/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'

const CollectionPage = () => {
    const { collection } = useParams()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.products)
    const queryParams = Object.fromEntries([...searchParams])

    // const [products, setProducts] = useState([])
    const sidebarRef = useRef(null)
    const [isSidebarOpen, SetIsSidebarOpen] = useState(false)

    useEffect(() => {
        console.log("👉 Final Query Sent:", { collection: collection, ...queryParams });
        dispatch(fetchProductsByFilters({ collection: collection, ...queryParams }))
    }, [dispatch, collection, searchParams])

    const toggleSidebar = () => {
        SetIsSidebarOpen(!isSidebarOpen)
    }

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            SetIsSidebarOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    console.log("🛒 Products from Redux:", products);
    console.log("⏳ Loading:", loading);
    console.log("❌ Error:", error);


    return (
        <div className='flex flex-col lg:flex-row'>
            {/* Mobile Filter Button */}
            <button onClick={toggleSidebar}
                className="lg:hidden border p-2 flex justify-center items-center">
                <FaFilter className='mr-2' /> Filters
            </button>

            {/* Filter Sidebar */}

            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                {/* Sort Option */}

                <SortOption />

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage
