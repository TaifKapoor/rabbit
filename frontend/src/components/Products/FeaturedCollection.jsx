import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  const text = "Effortless fashion for your everyday moments";
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? text.substring(0, displayText.length - 1)
        : text.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === text) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  return (
    <section className="py-20 px-4 lg:px-0 bg-gradient-to-br from-[#fefcfb] to-[#f2f4f5]">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl overflow-hidden shadow-xl">

        {/* Left Text Content */}
        <div className="lg:w-1/2 p-8 sm:p-12 text-center lg:text-left bg-white/70 backdrop-blur-md">
          <p className="text-xl font-semibold text-[#2fe7ff] uppercase tracking-widest mb-3 animate-fade-in">
            Comfort & Style
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2fe7ff] mb-6 leading-tight animate-fade-in">
            {displayText}
            <span className="border-r-2 border-gray-800 animate-pulse ml-1"></span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in delay-200">
            Step into comfort and style with apparel crafted for all-day wear — whether you're working, relaxing, or on the move.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition animate-fade-in delay-300"
          >
            Explore Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full h-full">
          <div className="overflow-hidden group">
            <img
              src={featured}
              alt="Featured Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 lg:rounded-tr-3xl lg:rounded-br-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
