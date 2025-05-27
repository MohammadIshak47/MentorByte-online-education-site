import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, File, Play } from 'lucide-react';

const courseContentData = [
  {
    id: 1,
    title: "Day 1 - Beginner - Working with Variables in Python to Manage Data",
    lectures: 8,
    time: "1hr 07min",
    isPreview: true,
    items: [
      { title: "What to expect from this course", duration: "5:47", preview: true },
      { title: "Download the Course Resources", duration: "3:23", preview: false },
      { title: "Day 1 - Printing, Commenting, Debugging, String Manipulation", duration: "21:15", preview: false },
      { title: "Setting up the Environment", duration: "11:46", preview: false }
    ]
  },
  {
    id: 2,
    title: "Day 2 - Beginner - Control Flow and Logical Operators",
    lectures: 10,
    time: "1hr 25min",
    isPreview: false,
    items: [
      { title: "Conditional Statements", duration: "12:36", preview: false },
      { title: "Logical Operators", duration: "14:42", preview: false },
      { title: "Coding Exercise 1: Odd or Even", duration: "8:23", preview: false }
    ]
  },
  {
    id: 3,
    title: "Day 3 - Beginner - Dictionaries, Nesting and the Secret Auction",
    lectures: 8,
    time: "1hr 32min",
    isPreview: false,
    items: [
      { title: "Python Dictionaries", duration: "17:12", preview: false },
      { title: "Nesting Lists and Dictionaries", duration: "14:45", preview: false },
      { title: "The Secret Auction Project", duration: "26:38", preview: false }
    ]
  },
  {
    id: 4,
    title: "Day 4 - Beginner - Functions with Outputs",
    lectures: 6,
    time: "56min",
    isPreview: false,
    items: [
      { title: "Functions with Outputs", duration: "15:32", preview: false },
      { title: "Multiple Return Values", duration: "9:47", preview: false },
      { title: "Coding Exercise: Calculator", duration: "18:22", preview: false }
    ]
  }
];

const CourseContent = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalSections = courseContentData.length;
  const totalLectures = courseContentData.reduce((acc, section) => acc + section.lectures, 0);
  const totalTime = "5hr 00min"; // Calculated sum of all times

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Course content</h2>
        <div className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
          {expandedSections.length < totalSections ? 'Expand all sections' : 'Collapse all sections'}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div>{totalSections} sections • {totalLectures} lectures • {totalTime} total length</div>
        <div className="text-indigo-600 hover:text-indigo-800 cursor-pointer">View all sections</div>
      </div>
      
      <div className="space-y-4">
        {courseContentData.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <motion.div 
              className={`flex justify-between items-center p-4 cursor-pointer ${
                expandedSections.includes(section.id) ? 'bg-gray-50' : 'bg-white'
              }`}
              onClick={() => toggleSection(section.id)}
              whileHover={{ backgroundColor: expandedSections.includes(section.id) ? '#f3f4f6' : '#f9fafb' }}
            >
              <div className="flex items-center">
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 mr-2" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
                )}
                <span className="font-medium">{section.title}</span>
                {section.isPreview && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded">
                    Preview
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {section.lectures} lectures • {section.time}
              </div>
            </motion.div>
            
            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200"
                >
                  {section.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        {item.preview ? (
                          <Play className="w-4 h-4 text-indigo-600 mr-3" />
                        ) : (
                          <File className="w-4 h-4 text-gray-400 mr-3" />
                        )}
                        <span className="text-sm">
                          {item.title}
                          {item.preview && (
                            <span className="ml-2 text-xs text-indigo-600">
                              Preview
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseContent;