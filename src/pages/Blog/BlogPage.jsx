import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Clock, User, ArrowRight, Tag, TrendingUp, BookOpen, Play, ChevronRight, Filter, Eye, MessageCircle, Heart, Share2 } from 'lucide-react';
import * as THREE from 'three';
import { NavLink } from 'react-router-dom';
import { creators4,creators6,python2,python3 } from '../../assets/images';
// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Python Libraries Every Data Scientist Should Know",
    excerpt: "Discover the most powerful Python libraries that will accelerate your data science journey and boost your productivity.",
    author: "Dr. Sarah Chen",
    authorImage: creators4,
    publishDate: "2024-05-20",
    readTime: "8 min read",
    category: "Data Science",
    image: python2,
    tags: ["Python", "Data Science", "Libraries", "Machine Learning"],
    views: "12.5k",
    comments: 89,
    likes: 324,
    featured: true
  },
  {
    id: 2,
    title: "The Complete Guide to React Hooks in 2024",
    excerpt: "Master React Hooks with practical examples and best practices that will transform your React development workflow.",
    author: "Mike Rodriguez",
    authorImage:creators6,
    publishDate: "2024-05-18",
    readTime: "12 min read",
    category: "Web Development",
    image: python2,
    tags: ["React", "JavaScript", "Hooks", "Frontend"],
    views: "8.2k",
    comments: 156,
    likes: 267,
    featured: false
  },
  {
    id: 3,
    title: "Machine Learning Career Path: From Beginner to Expert",
    excerpt: "A comprehensive roadmap to building a successful career in machine learning, including skills, projects, and opportunities.",
    author: "Dr. James Kim",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-05-15",
    readTime: "15 min read",
    category: "Career Advice",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    tags: ["Machine Learning", "Career", "AI", "Skills"],
    views: "15.7k",
    comments: 203,
    likes: 445,
    featured: true
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Node.js",
    excerpt: "Learn advanced Node.js patterns and architectures for creating high-performance, scalable web applications.",
    author: "Anna Thompson",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-05-12",
    readTime: "10 min read",
    category: "Backend Development",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    tags: ["Node.js", "Backend", "Scalability", "Architecture"],
    views: "6.8k",
    comments: 94,
    likes: 178,
    featured: false
  },
  {
    id: 5,
    title: "The Future of AI in Education: Trends and Predictions",
    excerpt: "Explore how artificial intelligence is revolutionizing education and what the future holds for learners and educators.",
    author: "Prof. Lisa Wang",
    authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-05-10",
    readTime: "7 min read",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    tags: ["AI", "Education", "Future", "Technology"],
    views: "11.3k",
    comments: 127,
    likes: 298,
    featured: false
  },
  {
    id: 6,
    title: "Cybersecurity Best Practices for Developers",
    excerpt: "Essential security practices every developer should implement to protect applications and user data from cyber threats.",
    author: "Robert Chen",
    authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-05-08",
    readTime: "11 min read",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    tags: ["Security", "Development", "Best Practices", "Cybersecurity"],
    views: "9.1k",
    comments: 73,
    likes: 189,
    featured: false
  }
];

const categories = ["All", "Data Science", "Web Development", "Career Advice", "Backend Development", "EdTech", "Cybersecurity"];

const ThreeJSBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = Math.random() > 0.5 
        ? new THREE.BoxGeometry(0.5, 0.5, 0.5)
        : new THREE.SphereGeometry(0.3, 8, 6);
      
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.5),
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.001;
        shape.rotation.y += 0.015 + index * 0.001;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
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
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

const BlogCard = ({ post, index, isLarge = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)',
        transition: 'all 0.3s ease-out'
      }}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-80' : 'h-48'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
              <TrendingUp size={14} />
              Featured
            </span>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white/80 text-sm">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            <span>{post.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={14} />
            <span>{post.likes}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-10 h-10 rounded-full border-2 border-gray-600"
          />
          <div className="flex-1">
            <p className="text-white font-medium text-sm">{post.author}</p>
            <div className="flex items-center gap-3 text-gray-400 text-xs">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 ${
          isLarge ? 'text-2xl leading-tight' : 'text-lg'
        }`}>
          {post.title}
        </h3>

        <p className={`text-gray-400 mb-4 ${isLarge ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, isLarge ? 4 : 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md hover:bg-gray-700/50 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors group">
         <NavLink to='/resources/blog/blogdetailpage'>Read More</NavLink>
          
          <ArrowRight 
            size={16} 
            className="transform transition-transform duration-300 group-hover:translate-x-1" 
          />
        </button>
      </div>
    </div>
  );
};

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ThreeJSBackground />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border-b border-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-6"
                style={{
                  animation: 'fadeInUp 0.8s ease-out'
                }}
              >
                <BookOpen size={20} className="text-blue-400" />
                <span className="text-blue-400 font-medium">Knowledge Hub</span>
              </div>
              
              <h1 
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
                style={{
                  animation: 'fadeInUp 1s ease-out 0.2s both'
                }}
              >
                Learn & Grow
              </h1>
              
              <p 
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                style={{
                  animation: 'fadeInUp 1s ease-out 0.4s both'
                }}
              >
                Discover insights, tutorials, and expert advice to accelerate your learning journey in technology, data science, and beyond
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-gray-600/50 transition-all duration-300"
              >
                <Filter size={20} />
                <span>Categories</span>
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="flex flex-wrap lg:flex-nowrap gap-3">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:border-gray-600/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-400">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && selectedCategory === 'All' && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="text-yellow-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    index={index}
                    isLarge={index === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Posts Grid */}
          <div>
            {(selectedCategory !== 'All' || featuredPosts.length === 0) && (
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-blue-500" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                </h2>
              </div>
            )}
            
            {filteredPosts.length > 0 ? (
                <NavLink to='/resources/blog/blogdetailpage'>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === 'All' ? regularPosts : filteredPosts).map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
              </NavLink>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search terms or browse different categories</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;