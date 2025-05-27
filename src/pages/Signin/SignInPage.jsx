import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = mountRef.current;
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setClearColor(0x000000, 1); // Changed to solid black
    container.appendChild(renderer.domElement);

    const geometries = [
      new THREE.TetrahedronGeometry(0.8),
      new THREE.OctahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.5),
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x00CED1, wireframe: true, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x4169E1, wireframe: true, transparent: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0xFFD700, wireframe: true, transparent: true, opacity: 0.2 }),
    ];

    const meshes = [];
    for (let i = 0; i < 6; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 8;
      mesh.position.y = (Math.random() - 0.5) * 8;
      mesh.position.z = (Math.random() - 0.5) * 8;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    camera.position.z = 8;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.003 + index * 0.0005;
        mesh.rotation.y += 0.004 + index * 0.0005;
        
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
        mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.003;
      });
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const [activeTab, setActiveTab] = useState('signin');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const socialButtons = [
    { name: 'Apple', color: 'bg-black hover:bg-gray-800', icon: '🍎' },
    { name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700', icon: '📘' },
    { name: 'Google', color: 'bg-white hover:bg-gray-50 text-gray-700 border', icon: '🔍' },
    { name: 'Microsoft', color: 'bg-gray-800 hover:bg-gray-900', icon: '🪟' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const leftSideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const rightSideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <motion.div 
        className="flex-1 bg-[#000000] relative overflow-hidden flex items-center justify-center" // Changed to solid black
        variants={leftSideVariants}
        initial="hidden"
        animate="visible"
      >
        <ThreeBackground />
        
        <div className="absolute top-20 left-10">
          <motion.div 
            className="w-1 h-32 bg-yellow-400"
            initial={{ height: 0 }}
            animate={{ height: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <motion.div 
          className="relative z-10 text-center px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="text-white text-6xl md:text-7xl font-bold mb-4 leading-tight">
              Start
            </div>
            <div className="text-white text-6xl md:text-7xl font-bold mb-4 leading-tight">
              learning
            </div>
            <div className="text-cyan-300 text-6xl md:text-7xl font-bold leading-tight">
              with Mentorbyte
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center space-x-8 mt-12"
            variants={itemVariants}
          >
            {['📚', '🎓', '💡', '🔬'].map((icon, index) => (
              <motion.div
                key={index}
                className="text-4xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {icon}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute top-8 left-8 text-white text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mentorbyte
        </motion.div>
      </motion.div>

      {/* Right Side - Sign In Form */}
      <motion.div 
        className="flex-1 bg-white flex items-center justify-center p-8"
        variants={rightSideVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          <motion.div 
            className="flex mb-8 border-b"
            variants={itemVariants}
          >
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-3 px-1 mr-8 text-lg font-medium transition-colors ${
                activeTab === 'register' 
                  ? 'text-gray-900 border-b-2 border-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('signin')}
              className={`pb-3 px-1 text-lg font-medium transition-colors ${
                activeTab === 'signin' 
                  ? 'text-gray-900 border-b-2 border-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign in
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <input
                    type="email"
                    placeholder="Username or email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>

                <motion.div className="relative" variants={itemVariants}>
                  <input
                    type={formData.showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {formData.showPassword ? '🙈' : '👁️'}
                  </button>
                </motion.div>

                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.button
                    className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign in
                  </motion.button>
                  <button className="text-gray-600 hover:text-gray-800 transition-colors">
                    Forgot password
                  </button>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <p className="text-gray-600 mb-4">Or sign in with:</p>
                  
                  <motion.button
                    className="w-full mb-4 p-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span>🏢</span>
                    <span>Company or school credentials</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3">
                    {socialButtons.map((social, index) => (
                      <motion.button
                        key={social.name}
                        className={`p-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${social.color}`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <span className="text-lg">{social.icon}</span>
                        <span className={social.name === 'Google' ? 'text-gray-700' : 'text-white'}>
                          {social.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Ready to Start Learning?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join millions of learners from around the world already learning on Mentorbyte!
                </p>
                <motion.button
                  className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Account
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;