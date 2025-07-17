import React, { useEffect, useState } from 'react';
import bg from '../../assets/bg.jpeg';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const Hero = () => {
  const text = 'Vacation Ready';
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 120 : 100;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? text.substring(0, displayText.length - 1)
        : text.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === text) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div className="overflow-hidden">
        <img
          src={bg}
          alt="Vacation Background"
          className="w-full h-[600px] md:h-[650px] lg:h-[922px] object-cover transition duration-1000 ease-in-out transform hover:scale-105"
        />
      </div>

      {/* Gradient Overlay + Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 flex items-center justify-center px-6 pt-24 sm:pt-0">
        {/* 👆 yahan pt-24 add kiya gaya hai mobile ke liye */}
        <div className="text-center max-w-3xl text-white animate-fade-in-slow">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight uppercase leading-tight mb-6 drop-shadow-lg">
            {displayText}
            <span className="ml-1 border-r-2 border-white animate-pulse"></span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 tracking-wide leading-relaxed">
            Discover our exclusive collection of vacation-ready outfits – stylish, breathable, and delivered worldwide at lightning speed.
          </p>

          <Link
            to="/collections/all"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white font-semibold rounded-full text-base md:text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Shop Now <HiArrowRight className="text-xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
