import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight, Play, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { work } from '../../assets/images';

// Configuration constants
const PRICING_PLANS = [
  {
    name: 'Basic',
    price: 10,
    period: 'month',
    billingNote: 'billed annually',
    features: ['Access to all courses', 'Mobile learning', 'Basic support', '30-day guarantee'],
    popular: false,
    color: 'from-gray-600 to-gray-700'
  },
  {
    name: 'Pro',
    price: 25,
    period: 'month',
    billingNote: 'billed annually',
    features: ['Everything in Basic', 'Certificates', 'Priority support', 'Offline downloads', 'Live sessions'],
    popular: true,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Enterprise',
    price: 50,
    period: 'month',
    billingNote: 'billed annually',
    features: ['Everything in Pro', 'Team management', 'Custom branding', 'Analytics dashboard', 'Dedicated support'],
    popular: false,
    color: 'from-purple-600 to-pink-600'
  }
];

const STATS = [
  { icon: Users, value: '50K+', label: 'Active Learners' },
  { icon: Award, value: '500+', label: 'Expert Instructors' },
  { icon: Clock, value: '10K+', label: 'Hours of Content' },
  { icon: CheckCircle, value: '95%', label: 'Success Rate' }
];

// Components
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

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
      velocities[i] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation with floating effect
    const animate = () => {
      requestAnimationFrame(animate);
      
      const positions = particlesMesh.geometry.attributes.position.array;
      const velocities = particlesMesh.geometry.attributes.velocity.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1] * 0.5;
        positions[i + 2] += velocities[i + 2] * 0.3;
        
        // Reset particles that go too far
        if (Math.abs(positions[i]) > 12) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 12) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 12) velocities[i + 2] *= -1;
      }
      
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

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

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center group"
    >
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
        <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
        <div className="text-gray-400 text-sm">{stat.label}</div>
      </div>
    </motion.div>
  );
};

const PricingCard = ({ plan, index, isPopular = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={`relative bg-gray-900/60 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
        isPopular 
          ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20 scale-105' 
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-full text-sm font-bold">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-black text-white">${plan.price}</span>
          <span className="text-gray-400">/{plan.period}</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">{plan.billingNote}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          isPopular
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25'
            : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
        }`}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

const StartClassSection = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <ParticleBackground canvasRef={canvasRef} />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60 z-1" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-black/40 to-transparent z-2" />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-6">
              🚀 START YOUR JOURNEY
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight"
          >
            Transform Your Future
            <span className="block text-cyan-400">Start Learning Today</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of learners who are advancing their careers with our expert-led courses.
            Choose the perfect plan for your learning journey.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16"
          >
            <motion.button
              className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-5 h-5" />
                Start Learning Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="group px-10 py-4 bg-transparent border-2 border-gray-600 text-white font-bold text-lg rounded-xl hover:border-cyan-400 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3 group-hover:text-cyan-400 transition-colors">
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {STATS.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Flexible pricing options designed to grow with your learning goals
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full p-1">
              {['individual', 'team'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'individual' ? 'Individual' : 'Team & Enterprise'}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={index}
                isPopular={plan.popular}
              />
            ))}
          </div>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-3xl overflow-hidden max-w-6xl mx-auto shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={work}
                alt="Professional learning environment"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
                  FOR TEAMS & ENTERPRISES
                </span>

                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  Elevate Your Team's Potential
                </h3>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Empower your organization with cutting-edge learning solutions. 
                  Get advanced analytics, custom branding, and dedicated support to accelerate your team's growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Sales
                  </motion.button>

                  <motion.button
                    className="group flex items-center gap-3 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Learn More 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-2" />
    </section>
  );
};

export default StartClassSection;