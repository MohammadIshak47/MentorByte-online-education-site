import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CourseDescription = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
      
      <div className="relative">
        <motion.div 
          className={`text-gray-700 space-y-4 overflow-hidden ${!expanded ? 'max-h-64' : ''}`}
        >
          <p>
            Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp, the only course you need to learn to code with Python. With over 1,000,000 students and the highest course rating, this Python course is without a doubt the most comprehensive Python course available on Udemy.
          </p>
          <p>
            Even if you have zero programming experience, this course will take you from beginner to professional. Here's why:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>The course is taught by the lead instructor at the App Brewery, London's best in-person programming bootcamp.</li>
            <li>The course has been updated to be 2023 ready and you'll be learning the latest tools and technologies used at large companies such as Apple, Google, and Netflix.</li>
            <li>This course doesn't cut any corners, there are beautiful animated explanation videos and tens of real-world projects which you will get to build.</li>
            <li>The curriculum was developed over a period of 4 years, with comprehensive student testing and feedback.</li>
            <li>We've taught over 1,000,000 students how to code and many have gone on to change their lives by becoming professional developers or starting their own tech startup.</li>
          </ul>
          <p>
            You'll learn Python by building 100 projects in 100 days. You'll learn to build websites, games, apps, plus scraping and data science.
          </p>
          <p>
            By the end of this course, you will be fluently programming in Python and you'll be so good at Python that you can get a job or use the language professionally.
          </p>
          
          <div className={`${expanded ? '' : 'hidden'}`}>
            <h3 className="text-lg font-semibold mt-6 mb-2">Who this course is for:</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Beginners who have never programmed before.</li>
              <li>Programmers switching languages to Python.</li>
              <li>Intermediate Python programmers who want to level up their skills.</li>
            </ul>
          </div>
        </motion.div>
        
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>
      
      <motion.button
        className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>{expanded ? 'Show less' : 'Show more'}</span>
        <ChevronDown 
          className={`ml-1 w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
        />
      </motion.button>
    </motion.div>
  );
};

export default CourseDescription;