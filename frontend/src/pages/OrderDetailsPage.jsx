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







// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useParams } from 'react-router-dom'
// import { fetchOrderDetails } from '../redux/slices/oredrSlice'

// const OrderDetailsPage = () => {
//     const {id} = useParams()
//     // const [orderDetails, setOrderDetails] = useState(null)

//     const dispatch = useDispatch()
//     const { orderDetails, loading, error } = useSelector((state)=> state.orders)

//     useEffect(() => {
//         dispatch(fetchOrderDetails(id))
//     }, [dispatch, id])

//     if(loading) return <p>Loading...</p>
//     if(error) return <p>Error: {error}</p>

//   return (
//     <div className='max-w-7xl mx-auto p-4 sm:p-6'>
//       <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
//       {!orderDetails ? (<p>No Order details found</p>) : (
//         <div className="p-4 sm:p-6 rounded border">
//             {/* Order Info */}
//             <div className="flex flex-col sm:flex-row justify-between mb-8">
//                 <div>
//                     <h3 className="text-lg md:text-xl font-semibold">
//                         Order Id : #{orderDetails._id}
//                     </h3>
//                     <p className="text-gray-600">
//                         {new Date(orderDetails.createdAt).toLocaleDateString()}
//                     </p>
//                 </div>
//                 <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
//                     <span className={`${orderDetails.isPaid 
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
//                         {orderDetails.isPaid ? "Approved" : "Pending"}
//                     </span>
//                     <span className={`${orderDetails.isDeliverd
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
//                         {orderDetails.isDeliverd ? "Deliverd" : "Pending Delivery"}
//                     </span>
//                 </div>
//             </div>
//             {/* Customer, Payment, Shipping Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//                 <div>
//                     <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
//                     <p>Payment Method: {orderDetails.paymentMethod}</p>
//                     <p> Status: {orderDetails.isPaid ? "paid" : "Unpaid"}</p>
//                 </div>
//                 <div>
//                     <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
//                     <p>Shipping Method: {orderDetails.shippingMethod}</p>
//                     <p> Address: {" "} 
//                         {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
//                     </p>
//                 </div>
//             </div>

//             {/* Product List */}
//             <div className="overflow-x-auto">
//                 <h4 className="text-lg font-semibold mb-4">Products</h4>
//                 <table className="min-w-full text-gray-600 mb-4">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="py-2 px-4">Name</th>
//                             <th className="py-2 px-4">Unit Price</th>
//                             <th className="py-2 px-4">Quantity</th>
//                             <th className="py-2 px-4">Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orderDetails.orderItems.map((item) => (
//                             <tr key={item.productId} className="border-b">
//                                 <td className="py-2 px-4 flex items-center">
//                                     <img src={item.image} alt="" 
//                                     className='w-12 h-12 object-cover rounded-lg mr-4'/>
//                                     <Link tp={`/product/${item.productId}`} className='text-blue-500 hover:underline'>
//                                       {item.name}
//                                     </Link>
//                                 </td>
//                                 <td className="px-4 py-2">${item.price}</td>
//                                 <td className="px-4 py-2">{item.quantity}</td>
//                                 <td className="px-4 py-2">${item.price * item.quantity}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {/* Back to Order Links */}
//             <Link to='/my-orders' className='text-blue-500 hover:underline'>
//               Back to my Orders
//             </Link>
//         </div>
//       )}
//     </div>
//   )
// }

// export default OrderDetailsPage
