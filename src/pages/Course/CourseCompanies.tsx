import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const CourseCompanies = () => {
  const companies = [
    'Accenture',
    'Volkswagen',
    'PayPal',
    'EventBrite'
  ];

  return (
    <motion.div 
      className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center mb-4">
        <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-bold text-gray-900">Top companies offer this course to their employees</h2>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">
        This course was selected for our collection of top-rated courses trusted by businesses worldwide.
      </p>
      
      <motion.div 
        className="flex flex-wrap items-center justify-between gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {companies.map((company, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="text-gray-500 font-medium"
          >
            {company}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CourseCompanies;