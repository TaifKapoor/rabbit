import React from 'react'
import { FaTruck, FaUndo, FaLock, FaStar } from 'react-icons/fa';

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    description: "Enjoy free delivery on orders over ₹999.",
  },
  {
    icon: <FaUndo />,
    title: "7-Day Return",
    description: "Easy returns within 7 days of delivery.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payments",
    description: "Your payment is safe with 256-bit SSL.",
  },
  {
    icon: <FaStar />,
    title: "Top Quality",
    description: "Only the best fabrics and latest styles.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 py-20 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14">
        Why Shop With Us?
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:scale-105"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 text-2xl mb-6 mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
