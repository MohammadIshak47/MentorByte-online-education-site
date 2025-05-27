import React, { useState, useRef, useEffect } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, ChevronDown, Play, Users, Award, Clock, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import * as THREE from 'three';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  // Three.js setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.4),
      new THREE.IcosahedronGeometry(0.3),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true }),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 8;
      mesh.position.z = (Math.random() - 0.5) * 5;
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatAmplitude: Math.random() * 0.5 + 0.2,
      };
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 8;

    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        shape.position.y += Math.sin(Date.now() * shape.userData.floatSpeed + index) * shape.userData.floatAmplitude * 0.01;
      });
      
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { scene, camera, renderer, shapes };

    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
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

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "New to our platform? Start here for the basics",
      articles: 12,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Play,
      title: "Course Management",
      description: "Learn how to create, manage and optimize your courses",
      articles: 18,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Student Engagement",
      description: "Tools and tips for engaging with your students",
      articles: 15,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Award,
      title: "Certificates & Badges",
      description: "Set up completion certificates and achievement badges",
      articles: 8,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Clock,
      title: "Account & Billing",
      description: "Manage your subscription and billing information",
      articles: 10,
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and their solutions",
      articles: 22,
      color: "from-red-500 to-red-600"
    }
  ];

  const faqs = [
    {
      question: "How do I create my first course?",
      answer: "Creating your first course is easy! Navigate to your instructor dashboard, click 'Create Course', and follow our step-by-step course creation wizard. You'll be guided through adding course content, setting pricing, and publishing your course."
    },
    {
      question: "What video formats are supported?",
      answer: "We support MP4, MOV, AVI, and WebM video formats. For best quality and compatibility, we recommend uploading MP4 files with H.264 encoding. Videos are automatically optimized for different devices and connection speeds."
    },
    {
      question: "How do students access my courses?",
      answer: "Once students enroll in your course, they can access it through their student dashboard. They'll receive email notifications about new content and can learn on any device - desktop, tablet, or mobile."
    },
    {
      question: "Can I offer certificates to students?",
      answer: "Yes! You can create custom completion certificates for your courses. Students automatically receive certificates when they complete all required lessons and pass any assessments you've set up."
    },
    {
      question: "How do I get paid for my courses?",
      answer: "Payments are processed monthly. You'll receive your earnings via PayPal, bank transfer, or other supported payment methods. You can track your earnings in real-time through your instructor dashboard."
    }
  ];

  const popularArticles = [
    "Setting up your instructor profile",
    "Best practices for course thumbnails",
    "How to engage students with quizzes",
    "Pricing strategies for online courses",
    "Using analytics to improve your courses"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="absolute inset-0 opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/80" />
      
      {/* Content */}
      <div className="relative z-10">
        

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Find answers to your questions, browse our guides, or get in touch with our support team
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.articles} articles
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-lg group-hover:text-blue-300 transition-colors">
                      {article}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still need help?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-400 text-sm mb-4">Chat with our support team in real-time</p>
                <span className="text-blue-400 text-sm font-medium">Available 24/7</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <Mail className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-gray-400 text-sm mb-4">Send us a detailed message</p>
                <span className="text-purple-400 text-sm font-medium">Response within 4 hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <Phone className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-400 text-sm mb-4">Speak directly with our team</p>
                <span className="text-green-400 text-sm font-medium">Mon-Fri 9AM-6PM</span>
              </div>
            </div>
          </div>
        </section>

       
      </div>
    </div>
  );
};

export default HelpCenter;