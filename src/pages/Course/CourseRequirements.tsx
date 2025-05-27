import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

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

const CourseRequirements = () => {
  const requirements = [
    "No programming experience needed - I'll teach you everything you need to know",
    "A Mac or PC computer with access to the internet",
    "No paid software required - I'll teach you how to use the free alternatives",
    "I'll walk you through, step-by-step how to get all the software installed and set up"
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
      
      <motion.ul 
        className="space-y-3 ml-6 list-disc text-gray-700"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {requirements.map((requirement, index) => (
          <motion.li 
            key={index}
            variants={item}
          >
            {requirement}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div 
        className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This course is designed for absolute beginners, so there are no pre-requisites. Just bring your enthusiasm and willingness to learn!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseRequirements;