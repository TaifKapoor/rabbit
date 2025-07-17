import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterLine } from 'react-icons/ri';

const Topbar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white text-sm fixed top-0 w-full z-40 h-[36px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Left Icons */}
        <div className="hidden md:flex space-x-4 items-center">
          <a href="#" className="hover:text-gray-200 transition">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <RiTwitterLine className="h-5 w-5" />
          </a>
        </div>

        {/* Center Text */}
        <div className="text-center flex-1 md:flex-none truncate">
          <span className="block text-xs sm:text-sm font-medium tracking-wide">
            We Ship Worldwide — Fast & Reliable Delivery
          </span>
        </div>

        {/* Right Contact */}
        <div className="hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-200 transition font-medium">
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>

  );
};

export default Topbar;
