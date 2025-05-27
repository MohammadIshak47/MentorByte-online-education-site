// Enhanced SkillsSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  professor1,
  professor2,
  professor3,
  professor4,
  professor5,
  professor6,
} from '../../assets/images';

// Configuration constants
const CATEGORIES = [
  'Data Science',
  'IT Certifications', 
  'Leadership',
  'Web Development',
  'Communication',
  'Business Analytics & Intelligence',
];

const SKILL_TAGS = [
  { name: 'Communication Skills', learners: '3M+ learners' },
  { name: 'Presentation Skills', learners: '2M+ learners' },
  { name: 'Public Speaking', learners: '3M+ learners' },
  { name: 'Writing', learners: '1M+ learners' },
  { name: 'PowerPoint', learners: '2M+ learners' },
  { name: 'Business Communication', learners: '423,900+ learners' },
  { name: 'Business Writing', learners: '290,900+ learners' },
];

// Course data
const INITIAL_COURSES = [
  {
    id: 1,
    title: 'The Complete Communication Skills Master Class for Life',
    instructor: 'TJ Walker',
    rating: 4.4,
    reviews: 31391,
    price: 9.99,
    originalPrice: 74.99,
    isBestseller: true,
    image: professor1,
    duration: '12.5 hours',
    level: 'All Levels'
  },
  {
    id: 2,
    title: 'Communication Skills for Beginners',
    instructor: 'TJ Walker',
    rating: 4.6,
    reviews: 7559,
    price: 9.99,
    originalPrice: 74.99,
    isBestseller: false,
    image: professor5,
    duration: '8 hours',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Effective Communications Skills for Business (Updated 2025)',
    instructor: 'David Inman FRICS CEnv',
    rating: 4.3,
    reviews: 3904,
    price: 9.99,
    originalPrice: 19.99,
    isBestseller: false,
    image: professor6,
    duration: '6.5 hours',
    level: 'Intermediate'
  },
  {
    id: 4,
    title: 'Public Relations: Media Crisis Communications',
    instructor: 'TJ Walker, Media Training Worldwide',
    rating: 4.5,
    reviews: 3520,
    price: 9.99,
    originalPrice: 74.99,
    isBestseller: true,
    image: professor2,
    duration: '10 hours',
    level: 'Advanced'
  },
];

const ADDITIONAL_COURSES = [
  {
    id: 5,
    title: 'Advanced Business Communication Strategies',
    instructor: 'Sarah Johnson, PhD',
    rating: 4.7,
    reviews: 5238,
    price: 12.99,
    originalPrice: 89.99,
    isBestseller: true,
    image: professor3,
    duration: '15 hours',
    level: 'Advanced'
  },
  {
    id: 6,
    title: 'Professional Email Writing & Communication',
    instructor: 'Michael Brown',
    rating: 4.4,
    reviews: 2891,
    price: 9.99,
    originalPrice: 59.99,
    isBestseller: false,
    image: professor4,
    duration: '5 hours',
    level: 'Beginner'
  },
  {
    id: 7,
    title: 'Negotiation Skills: Become a Master Communicator',
    instructor: 'Lisa Taylor',
    rating: 4.8,
    reviews: 4125,
    price: 14.99,
    originalPrice: 94.99,
    isBestseller: true,
    image: professor5,
    duration: '18 hours',
    level: 'Advanced'
  },
  {
    id: 8,
    title: 'Cross-Cultural Communication in the Workplace',
    instructor: 'Alex Chen',
    rating: 4.5,
    reviews: 1876,
    price: 11.99,
    originalPrice: 69.99,
    isBestseller: false,
    image: professor6,
    duration: '7.5 hours',
    level: 'Intermediate'
  },
];

// Utility functions
const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const calculateDiscount = (original, current) => {
  return Math.round(((original - current) / original) * 100);
};

// Components
const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-yellow-400 text-sm">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`star-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        <span className="text-white ml-1 font-medium">{rating}</span>
      </div>
      <span className="text-gray-400 text-sm">({formatNumber(reviews)})</span>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const discount = calculateDiscount(course.originalPrice, course.price);
  
  return (
    <motion.div
      className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isBestseller && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              BESTSELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Course meta info */}
        <div className="absolute bottom-3 left-3 text-white text-xs flex gap-3">
          <span className="bg-black/50 px-2 py-1 rounded">{course.duration}</span>
          <span className="bg-black/50 px-2 py-1 rounded">{course.level}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 h-14 group-hover:text-cyan-400 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3">
          By <span className="text-gray-300">{course.instructor}</span>
        </p>
        
        <StarRating rating={course.rating} reviews={course.reviews} />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold text-xl">
              ${course.price}
            </span>
            {course.originalPrice > course.price && (
              <span className="text-gray-500 line-through text-sm">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        >
          Enroll Now
        </motion.button>
      </div>
    </motion.div>
  );
};

const ParticleBackground = ({ canvasRef }) => {
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.4,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return null;
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Communication');
  const [visibleCourses, setVisibleCourses] = useState(INITIAL_COURSES);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const canvasRef = useRef(null);

  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVisibleCourses(prev => [...prev, ...ADDITIONAL_COURSES]);
    setShowLoadMore(false);
    setIsLoading(false);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Reset courses when category changes
    setVisibleCourses(INITIAL_COURSES);
    setShowLoadMore(true);
  };

  return (
    <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      {/* Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <ParticleBackground canvasRef={canvasRef} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-1" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Master Every Skill
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Unlock your potential with expert-led courses designed to accelerate your career and transform your future
          </motion.p>

          {/* Skill Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {SKILL_TAGS.slice(0, 5).map((skill, index) => (
              <span
                key={skill.name}
                className="bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-full text-sm text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
              >
                {skill.name} • {skill.learners}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Category Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`relative px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1
                },
              },
            }}
          >
            {visibleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {showLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.button
              onClick={handleLoadMore}
              disabled={isLoading}
              className={`group relative overflow-hidden px-12 py-4 bg-transparent rounded-full border-2 border-cyan-400 text-cyan-400 font-bold text-lg transition-all duration-300 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-cyan-400/20'
              }`}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading More Courses...
                  </>
                ) : (
                  'Discover More Courses'
                )}
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;