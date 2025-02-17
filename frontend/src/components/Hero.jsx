import React from "react";
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white-50 to-white-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Star size={16} className="text-blue-600" />
                <span className="text-sm font-medium">New Collection 2025</span>
              </div>

              {/* Main Content */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
                Discover Your Perfect Style
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Explore our latest arrivals featuring premium designs and exceptional quality. Find pieces that define your unique style.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-[0.98] active:scale-[0.97]"
                >
                  <ShoppingBag size={20} />
                  Shop Now
                </Link>
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors group"
                >
                  View Collection
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {[
                  { value: "50K+", label: "Happy Customers" },
                  { value: "500+", label: "Premium Products" },
                  { value: "100%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
              alt="Latest Collection"
              className="w-full h-[600px] object-cover object-center"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/20" />
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Summer Collection</h3>
                  <p className="text-blue-600 font-medium">Up to 40% Off</p>
                </div>
                <Link
                  to="/collection"
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;