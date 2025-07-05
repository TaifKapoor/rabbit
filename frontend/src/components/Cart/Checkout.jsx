import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from "axios";

// import { createCheckout } from '../redux/slices/checkoutSlice'
// import { useNavigate } from 'react-router-dom';


const Checkout = () => {

  const dispatch = useDispatch()
  const { cart, loading, error } = useSelector((state) => state.cart)
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      navigate("/")
    }
  }, [cart, navigate])


  const [checkoutId, setCheckoutId] = useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  })

 const handleCreateCheckout = async(e) => {
  e.preventDefault()
  if (cart && cart.cartItems.length > 0) {
    const res = await dispatch(
      createCheckout({
        checkoutItems: cart.cartItems.map(item => ({
          productId: item.productId || item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        shippingAddress,
        paymentMethod: "PayPal", // ✅ Capital L
        totalPrice: cart.totalPrice
      })
    );
    if (res.payload && res.payload._id) {
      setCheckoutId(res.payload._id)
    }
  }
}


const handlePaymentSuccess = async (details) => {
  try {
    console.log("✅ Payment details from PayPal:", details);
    console.log("🟢 Checkout ID:", checkoutId);

    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
      {
        paymentStatus: "paid",
        paymentDetails: details,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (response.status === 200) {
      await handleFinalizeCheckout(checkoutId);
    } else {
      console.error("❌ Payment update failed:", response);
    }
  } catch (error) {
    console.error("❌ Error in handlePaymentSuccess:", error);
  }
};



  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      navigate("/order-confirmation")
    } catch (error) {
      console.error(error)
    }
  }

  if(loading) return <p>Loading Cart ...</p>
  if(error) return <p>Error : {error}</p>
  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return <p>Your Cart is empty</p>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
      {/* Left Section */}

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className='block text-gray-700'>Email</label>
            <input type="email"
              value={user? user.email : ""}
              className='w-full p-2 border rounded'
              disabled />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className='block text-gray-700'>First Name</label>
              <input type="text"
                value={shippingAddress.firstName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                className='w-full p-2 border rounded'
                required />
            </div>
            <div>
              <label className='block text-gray-700'>Last Name</label>
              <input type="text"
                value={shippingAddress.lastName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                className='w-full p-2 border rounded'
                required />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input type="text" value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className='block text-gray-700'>City</label>
              <input type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className='w-full p-2 border rounded'
                required />
            </div>
            <div>
              <label className='block text-gray-700'>Postal Code</label>
              <input type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                className='w-full p-2 border rounded'
                required />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input type="text" value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input type="tel" value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button type='submit'
                className='w-full bg-black text-white py-3 rounded'
              >Continue to Payment</button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PayPalButton amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment Failed. Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border py-4 mb-4">
          {cart.cartItems.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-start">
                <img src={product.image} alt="" className='w-20 h-24 object-cover mr-4' />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size : {product.size}</p>
                  <p className="text-gray-500">Color : {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
