import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { NavLink } from 'react-router-dom';

const CourseBuyingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    country: '',
    company: '',
    agreeTerms: false
  });
  const [promoCode, setPromoCode] = useState('');
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  // Three.js background animation
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { scene, camera, renderer };

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const applyPromoCode = () => {
    // Promo code logic would go here
    console.log('Applying promo code:', promoCode);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Steps */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-8 pb-12"
        >
          <div className="flex items-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= step ? '#6366f1' : '#374151',
                    scale: currentStep === step ? 1.1 : 1
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                >
                  {step}
                </motion.div>
                <span className="ml-2 text-sm font-medium text-gray-300">
                  {step === 1 ? 'ACCOUNT' : step === 2 ? 'PAYMENT' : 'REVIEW'}
                </span>
                {step < 3 && <div className="w-16 h-px bg-gray-600 ml-4" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="absolute top-32 left-8 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
        <NavLink to="/plans/basic" >
        ← Back to pricing
        </NavLink>
      
        </motion.button>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Section */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <h2 className="text-2xl font-bold">Account details</h2>
                      <div className="ml-auto">
                        <span className="text-sm text-gray-400">Already have an account? </span>
                        <button className="text-indigo-400 hover:text-indigo-300"> <NavLink to="/signin">Sign in</NavLink>  </button>
                      </div>
                    </div>

                    <motion.form 
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium mb-2">First name*</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium mb-2">Last name*</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium mb-2">Email*</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium mb-2">Confirm Email*</label>
                          <input
                            type="email"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium mb-2">Country of residence*</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select One</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            <option value="au">Australia</option>
                          </select>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium mb-2">Company name (optional)</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants} className="flex items-center">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 text-sm text-gray-300">
                          By checking here and continuing, I agree to the Pluralsight Terms of Use.
                        </label>
                      </motion.div>

                      <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleContinue}
                        type="button"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Continue
                      </motion.button>
                    </motion.form>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <h2 className="text-2xl font-bold">Payment</h2>
                    </div>
                    <div className="text-center py-12">
                      <p className="text-gray-400">Payment form would be implemented here</p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleContinue}
                        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Continue to Review
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <h2 className="text-2xl font-bold">Review and confirm</h2>
                      <div className="ml-auto flex items-center text-green-400">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Secure checkout
                      </div>
                    </div>
                    <div className="text-center py-12">
                      <p className="text-gray-400">Order confirmation would be displayed here</p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Complete Purchase
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 h-fit sticky top-8"
            >
              <h3 className="text-xl font-bold mb-6">Order summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Plan</span>
                  <span className="font-medium">Price</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Core Tech</span>
                  <span className="text-xl font-bold">$252</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Apply
                  </motion.button>
                </div>
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$252</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Estimated tax *</span>
                  <span>$0</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total due today</span>
                  <span>$252</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500 space-y-2">
                <p>* Pluralsight is required by law to collect transaction taxes such as sales tax, VAT, GST or other similar taxes on purchases in some jurisdictions. The actual tax amount will be calculated based on the applicable jurisdictional tax rates when your order is processed.</p>
                <p>** Excluding transaction taxes such as sales tax, VAT GST and other similar taxes</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBuyingPage;