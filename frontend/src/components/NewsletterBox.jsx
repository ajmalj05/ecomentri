import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Existing submit handler logic
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-blue-50 p-3 rounded-full">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-3">
        Get 20% off your first order
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Join our newsletter and discover new styles, sales, and exclusive offers before anyone else.
      </p>

      <form onSubmit={onSubmitHandler} className="max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </form>
    </div>
  );
};

export default NewsletterBox;