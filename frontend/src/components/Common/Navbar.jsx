import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiMenu } from 'react-icons/hi';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.cartItems?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-[36px] w-full z-50 transition duration-300 ${scrolled ? 'bg-gray-700 text-white shadow-md' : 'bg-white text-black'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="text-2xl font-bold">
            Novakart
          </Link>

          <div className="hidden md:flex space-x-6">
            {['Men', 'Women', 'Top Wear', 'Bottom Wear'].map((item) => (
              <Link
                key={item}
                to={`/collections/all?${item === 'Men' || item === 'Women' ? `gender=${item}` : `category=${item}`}`}
                className="relative text-sm font-medium uppercase group"
              >
                <span className={`transition ${scrolled ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
                  {item}
                </span>
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all group-hover:w-full ${scrolled ? 'bg-white' : 'bg-black'
                    }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user && user.role === 'admin' && (
              <Link to="/admin" className="bg-gray-400 text-white px-2 py-1 rounded text-sm hover:bg-gray-800">
                Admin
              </Link>
            )}
            <Link to="/profile">
              <HiOutlineUser className="h-6 w-6  transition" />
            </Link>
            <button onClick={toggleCartDrawer} className="relative">
              <HiOutlineShoppingBag className="h-6 w-6 transition" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="hidden sm:block overflow-hidden">
              <SearchBar />
            </div>

            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiMenu className="h-6 w-6 hover:text-white transition" />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Nav Backdrop */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={toggleNavDrawer}
        />
      )}

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 left-0 w-2/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            {['Men', 'Women', 'Top Wear', 'Bottom Wear'].map((item) => (
              <Link
                key={item}
                to={`/collections/all?${item === 'Men' || item === 'Women' ? `gender=${item}` : `category=${item}`}`}
                onClick={toggleNavDrawer}
                className="block text-gray-700 hover:text-black"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;