import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const CourseExercises = () => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Coding Exercises</h2>
      
      <div className="flex items-start">
        <div className="flex-1">
          <p className="text-gray-700 mb-4">
            This course includes 35 coding exercises that will help you apply what you learn in real-world projects. 
            Practice makes perfect when it comes to programming!
          </p>
          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
            <span>See a demo</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="ml-6 flex-shrink-0">
          <div className="bg-gray-900 rounded-lg shadow-lg p-4 w-64 h-48 flex items-center justify-center">
            <Code className="w-12 h-12 text-green-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseExercises;