import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CourseHighlights = () => {
  const highlights = [
    "You will master the Python programming language by building 100 unique projects over 100 days",
    "You will learn automation, game, app and web development, data science and machine learning all using Python",
    "You will be able to program in Python professionally",
    "You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib",
    "Create a portfolio of 100 Python projects to apply for developer jobs",
    "You will be able to build fully-fledged websites and web apps with Python",
    "You will learn how to use Python for data science and machine learning",
    "Build games like Blackjack, Pong and Snake using Python",
    "Build GUIs and Desktop applications with Python"
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
      
      <motion.ul 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {highlights.map((highlight, index) => (
          <motion.li 
            key={index} 
            className="flex items-start"
            variants={item}
          >
            <div className="flex-shrink-0 mt-1">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600">
                <Check className="w-3 h-3" />
              </span>
            </div>
            <span className="ml-3 text-gray-700">{highlight}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default CourseHighlights;