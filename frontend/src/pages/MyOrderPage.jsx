import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/oredrSlice';

const MyOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p className="text-center py-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">My Orders</h2>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-700 text-left">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt="Order"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">
                    #{order._id.slice(0, 8)}...
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()} <br className="sm:hidden" />
                    <span className="hidden sm:inline">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.orderItems.length}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-semibold">
                    ₹{order.totalPrice}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;