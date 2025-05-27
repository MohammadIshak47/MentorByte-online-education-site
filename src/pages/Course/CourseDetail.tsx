import React from 'react';
import CourseHeader from './CourseHeader';

import CoursePricing from './CoursePricing';
import CourseHighlights from './CourseHighlights';
import CourseTopics from './CourseTopics';
import CourseIncludes from './CourseIncludes';
import CourseCompanies from './CourseCompanies';
import CourseExercises from './CourseExercises';
import CourseContent from './CourseContent';
import CourseRequirements from './CourseRequirements';
import CourseDescription from './CourseDescription';
import ReviewSection from './ReviewSection';
import ThreeJsBackground from './ThreeJsBackground';
import { motion } from 'framer-motion';

const CourseDetail = () => {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <ThreeJsBackground />
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2/3 width on desktop */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CourseHeader />
              <CourseHighlights />
              <CourseTopics />
              <CourseIncludes />
              <CourseCompanies />
              <CourseExercises />
              <CourseContent />
              <CourseRequirements />
              <CourseDescription />
              <ReviewSection />
            </motion.div>
            
            {/* Sidebar - 1/3 width on desktop, fixed on scroll */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-6">
                <CoursePricing />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;