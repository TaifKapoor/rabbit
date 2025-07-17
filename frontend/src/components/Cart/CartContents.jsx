import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice'

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity, guestId, userId, size, color }))
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }))
  }

  return (
    <div className="space-y-6">
      {cart.cartItems.map((product, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
        >
          {/* Image + Info */}
          <div className="flex items-start gap-4 w-full md:w-2/3">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-28 object-cover rounded-lg border"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: <span className="font-medium">{product.size}</span> | Color: <span className="font-medium">{product.color}</span>
              </p>
              <p className="text-sm text-gray-500">₹ {product.price.toLocaleString()}</p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-3 bg-gray-100 rounded-md w-max px-2">
                <button
                  onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                  className="w-8 h-8 text-xl font-bold text-gray-600 hover:text-black transition"
                >
                  -
                </button>
                <span className="mx-3 text-base font-medium">{product.quantity}</span>
                <button
                  onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                  className="w-8 h-8 text-xl font-bold text-gray-600 hover:text-black transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price + Delete */}
          <div className="flex items-center gap-6 md:flex-col md:items-end">
            <div className="text-lg font-semibold text-gray-800">
              ₹ {(product.price * product.quantity).toLocaleString()}
            </div>
            <button
              onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
              className="text-red-500 hover:text-red-600 transition"
              title="Remove item"
            >
              <RiDeleteBin3Line className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents