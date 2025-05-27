import React from 'react';
import { Play, Star, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseHeader = () => {
  return (
    <motion.div 
      className="bg-indigo-900 text-white rounded-lg overflow-hidden mb-8 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Course preview image with play button overlay */}
        <div className="relative aspect-video w-full bg-indigo-800 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="text-indigo-700 w-8 h-8 ml-1" />
            </motion.div>
          </motion.div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-md text-sm">
            Preview this course
          </div>
        </div>

        {/* Course info */}
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            100 Days of Code: The Complete Python Pro Bootcamp
          </h1>
          
          <p className="text-indigo-200 mb-4">
            Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center text-amber-400">
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4 mr-1" />
              <span className="text-sm font-medium text-white">(4.7)</span>
            </div>
            <span className="text-indigo-200 text-sm">1,079,979 students</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-200">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>Created by Dr. Angela Yu, Developer and Lead Instructor</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>English, Spanish, French [CC]</span>
            </div>
            <div>Last updated 9/2023</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseHeader;