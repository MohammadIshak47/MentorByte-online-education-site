import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Search, Filter, ChevronDown, Star, Clock, Users, Play, BookOpen, Code, Database, Brain, Zap } from 'lucide-react';
import { python1, python2, python3, python4, python5, python6 } from '../../assets/images';
const Course = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const mountRef = useRef(null);

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "CS50's Introduction to Artificial Intelligence with Python",
      provider: "HarvardX",
      image: python1,
      rating: 4.8,
      students: 125000,
      duration: "8 weeks",
      level: "Intermediate",
      subject: "Artificial Intelligence",
      skills: ["Python", "Machine Learning", "Neural Networks"],
      description: "Learn the fundamentals of AI and machine learning using Python",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "AI for Everyone: Master the Basics",
      provider: "IBM",
      image: python2,
      rating: 4.6,
      students: 89000,
      duration: "6 weeks",
      level: "Beginner",
      subject: "Artificial Intelligence",
      skills: ["AI Fundamentals", "Business Applications"],
      description: "Understand AI concepts and their real-world applications",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 3,
      title: "Introduction to Data Science with Python",
      provider: "HarvardX",
      image: python3,
      rating: 4.7,
      students: 156000,
      duration: "10 weeks",
      level: "Beginner",
      subject: "Data Science",
      skills: ["Python", "Statistics", "Data Visualization"],
      description: "Master data analysis and visualization with Python",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "Introduction to Generative AI",
      provider: "IBM",
      image: python4,
      rating: 4.5,
      students: 67000,
      duration: "4 weeks",
      level: "Intermediate",
      subject: "Artificial Intelligence",
      skills: ["Generative AI", "GPT", "Neural Networks"],
      description: "Explore the world of generative artificial intelligence",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 5,
      title: "AI Applications and Prompt Engineering",
      provider: "edX",
      image: python5,
      rating: 4.4,
      students: 45000,
      duration: "5 weeks",
      level: "Advanced",
      subject: "Artificial Intelligence",
      skills: ["Prompt Engineering", "AI Applications", "ChatGPT"],
      description: "Master the art of AI prompt engineering and applications",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 6,
      title: "Machine Learning Fundamentals",
      provider: "MIT",
      image: python6,
      rating: 4.9,
      students: 198000,
      duration: "12 weeks",
      level: "Intermediate",
      subject: "Machine Learning",
      skills: ["Python", "Algorithms", "Statistics"],
      description: "Deep dive into machine learning algorithms and applications",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const subjects = ["All Subjects", "Artificial Intelligence", "Data Science", "Machine Learning", "Computer Science"];
  const skills = ["All Skills", "Python", "Machine Learning", "Neural Networks", "AI Fundamentals", "Statistics"];

  // Three.js background animation
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.6
    });

    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      particles.push(particle);
      scene.add(particle);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.forEach((particle, i) => {
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
        particle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = !selectedSubject || selectedSubject === 'All Subjects' || course.subject === selectedSubject;
    const matchesSkill = !selectedSkill || selectedSkill === 'All Skills' || course.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSubject && matchesSkill;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90 z-10" />
      
      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-8"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Discover Courses
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our collection of cutting-edge courses in AI, Data Science, and Technology
            </motion.p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, providers, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center mb-6">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-8 p-6 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Skills</label>
                      <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {skills.map(skill => (
                          <option key={skill} value={skill}>{skill}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.header>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="container mx-auto px-6 mb-8"
        >
          <p className="text-gray-400 text-center">
            <span className="text-2xl font-bold text-blue-400">{filteredCourses.length}</span> courses found
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="container mx-auto px-6 pb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  layout
                  className="group relative"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500">
                    {/* Course Image */}
                    <div className={`h-48 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Play className="w-6 h-6 text-white ml-1" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium">{course.provider}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700/50 text-xs rounded-lg text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Enroll Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Enroll Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-300">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;