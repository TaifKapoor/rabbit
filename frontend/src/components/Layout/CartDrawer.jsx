import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartContents from '../Cart/CartContents';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const userId = user && user._id ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 px-4">Your Cart</h2>
        {!cart || !Array.isArray(cart.cartItems) || cart.cartItems.length === 0 ? (
          <p className="px-4">
            Your Cart is empty. <Link to="/collections/all" className="text-blue-500">Shop Now</Link>
          </p>
        ) : (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        )}
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        {cart && Array.isArray(cart.cartItems) && cart.cartItems.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, taxes, and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;