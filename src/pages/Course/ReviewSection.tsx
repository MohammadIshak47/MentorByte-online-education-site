import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';

// Review data
const reviews = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "",
    rating: 5,
    date: "November 15, 2023",
    content: "This course is absolutely incredible! I started with zero programming knowledge and now I can build my own Python applications. The 100 days structure keeps you motivated and the projects are fun and engaging. Highly recommend to anyone looking to learn Python.",
    helpful: 243,
    unhelpful: 12
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "",
    rating: 4,
    date: "October 3, 2023",
    content: "Great course overall. The instructor explains concepts clearly and the projects help reinforce what you learn. My only complaint is that some of the later days assume knowledge that wasn't covered thoroughly. Still, I've learned a ton and feel confident in my Python skills now.",
    helpful: 189,
    unhelpful: 21
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "",
    rating: 5,
    date: "December 8, 2023",
    content: "Angela is an amazing instructor! Her teaching style is engaging and she breaks down complex concepts into easy-to-understand chunks. The course is comprehensive and covers everything from the basics to advanced topics. The projects are practical and relevant. I'm so glad I chose this course to learn Python.",
    helpful: 317,
    unhelpful: 5
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "",
    rating: 5,
    date: "September 20, 2023",
    content: "I've tried multiple Python courses before but this is by far the best one. The 100 days format is genius because it gives you a clear goal each day and keeps you motivated. The projects range from simple to complex, allowing you to build a solid foundation before tackling more difficult challenges. Worth every penny!",
    helpful: 156,
    unhelpful: 8
  }
];

// Rating distribution
const ratingDistribution = [
  { stars: 5, percentage: 76 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 4 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 }
];

const ReviewSection = () => {
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleLoadMore = () => {
    setVisibleReviews(reviews.length);
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Student Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating overview */}
        <div className="lg:col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="text-5xl font-bold text-gray-900">4.7</div>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <Star className="w-5 h-5 text-amber-500 fill-current opacity-70" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Course Rating</div>
          </div>
          
          {/* Rating distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center">
                <div className="flex items-center w-20">
                  <span className="text-sm font-medium text-gray-600">{stars}</span>
                  <Star className="w-4 h-4 ml-1 text-amber-500 fill-current" />
                </div>
                <div className="flex-grow mx-3">
                  <div className="h-2 rounded-full bg-gray-200">
                    <motion.div 
                      className="h-2 rounded-full bg-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </div>
                </div>
                <div className="w-10 text-right">
                  <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reviews */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', '5 stars', '4 stars', '3 stars', '2 stars', '1 star'].map(filter => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Review list */}
          <div className="space-y-6">
            {reviews.slice(0, visibleReviews).map(review => (
              <motion.div 
                key={review.id}
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center text-indigo-700 font-medium mr-4">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{review.name}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < review.rating 
                              ? 'text-amber-500 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <button className="flex items-center hover:text-indigo-600">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                      <div className="flex items-center">
                        <button className="flex items-center hover:text-indigo-600">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          <span>Not helpful ({review.unhelpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Load more button */}
          {visibleReviews < reviews.length && (
            <motion.button
              className="mt-6 w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoadMore}
            >
              <span>Load more reviews</span>
              <ChevronDown className="ml-1 w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewSection;