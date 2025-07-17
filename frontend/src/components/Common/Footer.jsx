import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-tr from-gray-950 via-gray-900 to-black text-gray-300 pt-16 pb-10 backdrop-blur-md shadow-2xl border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 tracking-wide">Stay Connected</h2>
          <p className="text-sm mb-4 text-gray-400">Join our newsletter for exclusive offers & the latest drops.</p>
          <form className="flex items-center mt-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 p-3 text-sm bg-gray-800 text-white border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold px-5 py-3 text-sm rounded-r-md hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Shop Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 tracking-wide">Shop</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="#" className="hover:text-white transition">Men's Collection</Link></li>
            <li><Link to="#" className="hover:text-white transition">Women's Collection</Link></li>
            <li><Link to="#" className="hover:text-white transition">New Arrivals</Link></li>
            <li><Link to="#" className="hover:text-white transition">Accessories</Link></li>
          </ul>
        </div>

        {/* Help & Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 tracking-wide">Customer Service</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="#" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="#" className="hover:text-white transition">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 tracking-wide">Get in Touch</h2>
          <p className="text-sm text-gray-400 mb-3">Support available 24/7</p>
          <p className="text-sm mb-4">
            <FiPhoneCall className="inline-block mr-2 text-white" />
            +91 98765 43210
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-white transition text-xl"><TbBrandMeta /></a>
            <a href="#" className="hover:text-white transition text-xl"><IoLogoInstagram /></a>
            <a href="#" className="hover:text-white transition text-xl"><RiTwitterXLine /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-16 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        &copy; 2025 <span className="text-white font-semibold">CompileTab</span>. Crafted with ♥ in India.
      </div>
    </footer>
  );
};

export default Footer;

