import React from 'react';
import { Video, FileText, PenTool, FileCheck, Award, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const CourseIncludes = () => {
  const courseIncludes = [
    { icon: <Video className="w-5 h-5" />, text: '65 hours on-demand video' },
    { icon: <PenTool className="w-5 h-5" />, text: '35 coding exercises' },
    { icon: <FileText className="w-5 h-5" />, text: '165 articles' },
    { icon: <FileCheck className="w-5 h-5" />, text: '125 downloadable resources' },
    { icon: <Monitor className="w-5 h-5" />, text: 'Access on mobile and TV' },
    { icon: <Award className="w-5 h-5" />, text: 'Certificate of completion' }
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">This course includes:</h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {courseIncludes.map((item, index) => (
          <motion.div 
            key={index}
            className="flex items-center"
            variants={itemVariant}
          >
            <div className="text-indigo-600 mr-3">
              {item.icon}
            </div>
            <span className="text-gray-700">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CourseIncludes;
