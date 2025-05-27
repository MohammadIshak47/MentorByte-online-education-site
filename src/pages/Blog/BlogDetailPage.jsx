import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Clock, User, Eye, MessageCircle, Heart, Share2, BookOpen, Tag, ChevronRight, Play, Download, Link, Twitter, Facebook, Linkedin, Copy, Check, Star, TrendingUp, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// Mock blog post data
const blogPost = {
  id: 1,
  title: "10 Essential Python Libraries Every Data Scientist Should Know",
  subtitle: "Discover the most powerful Python libraries that will accelerate your data science journey and boost your productivity in 2024",
  content: `
    <p>Data science has become one of the most sought-after fields in technology, and Python has emerged as the lingua franca for data scientists worldwide. The ecosystem of Python libraries for data science is vast and continuously evolving, making it essential to stay updated with the most powerful and relevant tools.</p>

    <p>In this comprehensive guide, we'll explore the 10 essential Python libraries that every data scientist should master to excel in their career and deliver impactful results.</p>

    <h2>1. NumPy - The Foundation of Scientific Computing</h2>
    <p>NumPy (Numerical Python) is the cornerstone of the Python data science ecosystem. It provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on these arrays efficiently.</p>

    <h3>Key Features:</h3>
    <ul>
      <li>N-dimensional array objects with broadcasting capabilities</li>
      <li>Mathematical functions for linear algebra, Fourier transforms</li>
      <li>Tools for integrating with C/C++ and Fortran code</li>
      <li>High-performance computing capabilities</li>
    </ul>

    <h2>2. Pandas - Data Manipulation Made Easy</h2>
    <p>Pandas is built on top of NumPy and provides high-level data structures and tools for data analysis. It's particularly well-suited for working with structured data like CSV files, Excel spreadsheets, and SQL databases.</p>

    <h3>Why Pandas is Essential:</h3>
    <ul>
      <li>DataFrame and Series objects for efficient data handling</li>
      <li>Data cleaning and transformation capabilities</li>
      <li>Built-in data visualization features</li>
      <li>Seamless integration with other libraries</li>
    </ul>

    <h2>3. Matplotlib - Comprehensive Data Visualization</h2>
    <p>Matplotlib is the most widely used plotting library in Python. It provides a MATLAB-like interface for creating static, animated, and interactive visualizations.</p>

    <h2>4. Seaborn - Statistical Data Visualization</h2>
    <p>Built on top of Matplotlib, Seaborn provides a high-level interface for drawing attractive and informative statistical graphics. It works seamlessly with pandas data structures.</p>

    <h2>5. Scikit-learn - Machine Learning Made Simple</h2>
    <p>Scikit-learn is the go-to library for machine learning in Python. It provides simple and efficient tools for data mining and data analysis, built on NumPy, SciPy, and matplotlib.</p>

    <h3>Core Capabilities:</h3>
    <ul>
      <li>Classification, regression, and clustering algorithms</li>
      <li>Model selection and evaluation tools</li>
      <li>Data preprocessing utilities</li>
      <li>Dimensionality reduction techniques</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Mastering these Python libraries will provide you with a solid foundation for tackling complex data science challenges. Start with NumPy and Pandas for data manipulation, then progressively learn visualization and machine learning libraries based on your project needs.</p>

    <p>Remember, the key to becoming proficient with these tools is consistent practice and working on real-world projects. Consider contributing to open-source projects or participating in data science competitions to sharpen your skills.</p>
  `,
  author: "Dr. Sarah Chen",
  authorBio: "Data Science Lead at TechCorp with 8+ years of experience in machine learning and AI. PhD in Computer Science from Stanford University.",
  authorImage: "https://images.unsplash.com/photo-1494790108755-2616b2de8c8b?w=100&h=100&fit=crop&crop=face",
  publishDate: "2024-05-20",
  readTime: "8 min read",
  category: "Data Science",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  tags: ["Python", "Data Science", "Libraries", "Machine Learning", "NumPy", "Pandas"],
  views: "12.5k",
  comments: 89,
  likes: 324,
  shares: 67,
  featured: true
};

// Related posts
const relatedPosts = [
  {
    id: 2,
    title: "Advanced Pandas Techniques for Data Analysis",
    excerpt: "Master advanced pandas operations that will make your data analysis workflow more efficient and powerful.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    readTime: "6 min read",
    category: "Data Science"
  },
  {
    id: 3,
    title: "Machine Learning Project Structure Best Practices",
    excerpt: "Learn how to structure your ML projects for better maintainability and collaboration.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop",
    readTime: "5 min read",
    category: "Machine Learning"
  },
  {
    id: 4,
    title: "Data Visualization with Python: Beyond the Basics",
    excerpt: "Create stunning and informative visualizations using advanced matplotlib and seaborn techniques.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    readTime: "7 min read",
    category: "Data Visualization"
  }
];

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
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.2,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes = [];
    for (let i = 0; i < 12; i++) {
      const geometry = Math.random() > 0.6 
        ? new THREE.BoxGeometry(0.8, 0.8, 0.8)
        : new THREE.SphereGeometry(0.5, 8, 6);
      
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.55, 0.8, 0.6),
        transparent: true,
        opacity: 0.2,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.0005;
        shape.rotation.y += 0.008 + index * 0.0005;
        shape.position.y += Math.sin(Date.now() * 0.0008 + index) * 0.003;
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

const ShareButton = ({ platform, icon: Icon, url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center w-12 h-12 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-full transition-all duration-300 hover:scale-110 hover:border-blue-500/50"
    >
      {copied ? <Check size={18} className="text-green-400" /> : <Icon size={18} className="text-gray-300" />}
    </button>
  );
};

const TableOfContents = ({ content }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Extract headings from content
  const headings = content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g) || [];
  const tocItems = headings.map((heading, index) => {
    const level = heading.match(/<h([2-3])/)[1];
    const text = heading.replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { level, text, id, index };
  });

  return (
    <div className="hidden xl:block fixed left-8 top-1/2 transform -translate-y-1/2 z-20">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 max-w-xs">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={16} />
          Table of Contents
        </h3>
        <nav>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-sm transition-colors duration-200 ${
                    item.level === '2' ? 'font-medium' : 'ml-4 text-gray-400'
                  } hover:text-blue-400`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const BlogDetailPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(blogPost.likes);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ThreeJSBackground />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-40">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 hover:text-white hover:border-gray-600/50 transition-all duration-300">
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back to Blog</span>
        </button>
      </div>

      {/* Share Menu */}
      <div className="fixed top-6 right-6 z-40">
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 hover:text-white hover:border-gray-600/50 transition-all duration-300"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute right-0 mt-2 p-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <div className="flex gap-3">
                <ShareButton 
                  platform="twitter" 
                  icon={Twitter} 
                  url={`https://twitter.com/intent/tweet?text=${blogPost.title}&url=${shareUrl}`}
                />
                <ShareButton 
                  platform="facebook" 
                  icon={Facebook} 
                  url={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                />
                <ShareButton 
                  platform="linkedin" 
                  icon={Linkedin} 
                  url={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                />
                <ShareButton 
                  platform="copy" 
                  icon={Link} 
                  url={shareUrl}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents content={blogPost.content} />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-6">
              <Tag size={16} className="text-blue-400" />
              <span className="text-blue-400 font-medium">{blogPost.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {blogPost.subtitle}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <img
                  src={blogPost.authorImage}
                  alt={blogPost.author}
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(blogPost.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{blogPost.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  <span>{blogPost.comments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Floating Action Buttons */}
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 hover:scale-110 ${
                isLiked 
                  ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                  : 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-red-500/50'
              }`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
            </button>
            <div className="text-center text-sm text-gray-400">{likes}</div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-white font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {blogPost.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 hover:border-blue-400/50 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={blogPost.authorImage}
                alt={blogPost.author}
                className="w-24 h-24 rounded-2xl border-2 border-gray-600"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{blogPost.author}</h3>
                <p className="text-gray-400 mb-4">{blogPost.authorBio}</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  Follow Author
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-blue-500" size={24} />
              <h2 className="text-3xl font-bold text-white">Related Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                      <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;