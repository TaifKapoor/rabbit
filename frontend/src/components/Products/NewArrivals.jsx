import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState();
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNewArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const scrollLeft = container.scrollLeft;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < maxScrollLeft - 5); // -5 buffer for precision
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener('scroll', updateScrollButtons);
        }
    }, [newArrivals]);

    return (
        <section className="py-16 px-4 lg:px-10 relative">
            {/* Heading */}
            <div className="container mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600">
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion
                </p>
            </div>

            <div className="relative">
                {/* Left Scroll Button */}
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 left-8 sm:left-10 md:left-16 rounded-full shadow-md transition ${canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <FiChevronLeft className="text-2xl" />
                </button>

                {/* Right Scroll Button */}
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 right-8 sm:right-10 md:right-16 rounded-full shadow-md transition ${canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <FiChevronRight className="text-2xl" />
                </button>

                {/* Scrollable Items */}
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    className={`overflow-x-auto flex space-x-6 scroll-smooth px-8 sm:px-10 md:px-16 pb-6 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                >
                    {newArrivals.map((product) => (
                        <div key={product._id} className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] relative">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-[400px] object-cover rounded-lg"
                                draggable="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-4 rounded-b-lg">
                                <Link to={`/product/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;