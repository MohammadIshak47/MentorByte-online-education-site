import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, Award, Shield, Gift } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const CoursePricing = () => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="p-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">$9.99</span>
          <span className="ml-2 line-through text-gray-500">$89.99</span>
          <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded text-sm font-semibold">89% off</span>
        </div>
        
        <p className="mt-2 text-red-600 text-sm flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>9 hours left at this price!</span>
        </p>

        <motion.button
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <NavLink to="/cart"> Add to cart</NavLink>
         
        </motion.button>

        <motion.button
          className="mt-3 w-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-4 rounded-md font-medium transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy now
        </motion.button>

        <p className="mt-3 text-center text-sm text-gray-500">30-Day Money-Back Guarantee</p>

        <div className="mt-6">
          <h3 className="font-bold text-gray-900 mb-3">This course includes:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Clock className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
              <span>65 hours on-demand video</span>
            </li>
            <li className="flex items-start">
              <Award className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
              <span>Certificate of completion</span>
            </li>
            <li className="flex items-start">
              <Shield className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
              <span>Full lifetime access</span>
            </li>
            <li className="flex items-start">
              <Gift className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
              <span>Access on mobile and TV</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">Apply Coupon</h3>
          <div className="flex">
            <input 
              type="text" 
              placeholder="Enter coupon" 
              className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors duration-200">
              Apply
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-3 px-4 rounded-md font-medium transition-colors duration-200">
            Try Personal Plan for free
          </button>
          <p className="mt-2 text-xs text-center text-gray-500">
            Starting at $16.58 per month after free trial
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursePricing;