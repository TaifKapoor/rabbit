import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const Home = () => {

  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSellerProducts, setBestSellerProducts] = useState(null)

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8
      })
    )

    const fetchBestSeller = async () => {
      try {
        console.log("👉 URL: ", `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setBestSellerProducts(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {
        bestSellerProducts ? (
          <ProductDetails productId={bestSellerProducts._id} />
        ) :
          (
            <p className='text-center'>Loading best seller product...</p>
          )
      }


      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wear for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home
