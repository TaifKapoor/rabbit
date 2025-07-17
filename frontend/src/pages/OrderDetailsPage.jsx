import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderDetails } from '../redux/slices/oredrSlice'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { orderDetails, loading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrderDetails(id))
  }, [dispatch, id])

  if (loading) return <p className="text-center py-8 text-gray-600">Loading...</p>
  if (error) return <p className="text-center py-8 text-red-500">Error: {error}</p>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">Order Details</h2>

      {!orderDetails ? (
        <p className="text-gray-500 text-center">No Order details found</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md border p-4 sm:p-6 space-y-8">

          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Order ID: #{orderDetails._id.slice(0, 8)}...
              </h3>
              <p className="text-gray-500 text-sm">
                {new Date(orderDetails.createdAt).toLocaleDateString()}{" "}
                {new Date(orderDetails.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end space-y-2">
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  orderDetails.isDeliverd
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {orderDetails.isDeliverd ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Info</h4>
              <p className="text-sm text-gray-600">Method: {orderDetails.paymentMethod}</p>
              <p className="text-sm text-gray-600">Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Shipping Info</h4>
              <p className="text-sm text-gray-600">Method: {orderDetails.shippingMethod}</p>
              <p className="text-sm text-gray-600">
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Ordered Products</h4>
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50">
                <tr className="text-gray-700">
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Unit Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId}>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4">₹{item.price}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4 font-medium">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Link
              to="/my-orders"
              className="inline-block text-blue-600 hover:underline text-sm"
            >
              ← Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetailsPage
