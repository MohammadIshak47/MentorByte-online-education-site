import React from 'react';
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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

const CourseTopics = () => {
  const topics = [
    'Python',
    'Programming Languages',
    'Development',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Automation'
  ];

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Explore related topics</h2>
      
      <motion.div 
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {topics.map((topic, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200"
          >
            {topic}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CourseTopics;