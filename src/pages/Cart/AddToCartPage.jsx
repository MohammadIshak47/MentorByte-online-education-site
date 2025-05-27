import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ShoppingCart, User, BookOpen, Play, Clock, Star, Trash2, Plus, Minus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AddToCartPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      price: 89.99,
      originalPrice: 129.99,
      duration: "12 hours",
      rating: 4.8,
      students: 15420,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      quantity: 1
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Chen",
      price: 119.99,
      originalPrice: 179.99,
      duration: "18 hours",
      rating: 4.9,
      students: 23150,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      quantity: 2
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      price: 74.99,
      originalPrice: 99.99,
      duration: "8 hours",
      rating: 4.7,
      students: 8930,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop",
      quantity: 1
    }
  ]);

  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);

  // Three.js 3D Cart Animation
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create 3D Cart
    const cartGroup = new THREE.Group();
    
    // Cart body
    const cartGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.8);
    const cartMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1,
      transparent: true,
      opacity: 0.8
    });
    const cartMesh = new THREE.Mesh(cartGeometry, cartMaterial);
    cartGroup.add(cartMesh);

    // Cart wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 12);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x374151 });
    
    const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel1.position.set(-0.3, -0.4, 0.3);
    wheel1.rotation.z = Math.PI / 2;
    cartGroup.add(wheel1);

    const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel2.position.set(0.3, -0.4, 0.3);
    wheel2.rotation.z = Math.PI / 2;
    cartGroup.add(wheel2);

    // Items in cart
    const itemGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const itemMaterial = new THREE.MeshPhongMaterial({ color: 0xf59e0b });
    
    for (let i = 0; i < 3; i++) {
      const item = new THREE.Mesh(itemGeometry, itemMaterial);
      item.position.set(
        (Math.random() - 0.5) * 0.4,
        0.1 + i * 0.15,
        (Math.random() - 0.5) * 0.4
      );
      cartGroup.add(item);
    }

    scene.add(cartGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.set(0, 0, 3);
    sceneRef.current = { scene, camera, renderer, cartGroup };

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (cartGroup) {
        cartGroup.rotation.y += 0.01;
        cartGroup.position.y = Math.sin(Date.now() * 0.002) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Your Learning Cart
          </h1>
          <p className="text-gray-400 text-lg">
            Invest in your future with our premium courses
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            // Not Logged In State
            <motion.div
              key="not-logged-in"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-8">
                <div ref={mountRef} className="w-48 h-48" />
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-md mx-auto bg-gray-900 rounded-2xl p-8 border border-gray-800"
              >
                <User className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
                <p className="text-gray-400 mb-8">
                  Sign in to access your cart and continue your learning journey
                </p>
                
                <div className="space-y-4 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all mb-4"
                >
                  Sign In to Cart
                </motion.button>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <a href="#" className="hover:text-indigo-400 transition-colors">Forgot Password?</a>
                  <span>•</span>
                  <a href="#" className="hover:text-indigo-400 transition-colors">Create Account</a>
                </div>
              </motion.div>
            </motion.div>
          ) : cartItems.length === 0 ? (
            // Empty Cart State
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-8">
                <div ref={mountRef} className="w-48 h-48" />
              </div>
              
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-300 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-8">
                Discover amazing courses and start learning today!
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                Browse Courses
              </motion.button>
            </motion.div>
          ) : (
            // Cart with Items
            <motion.div
              key="cart-items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full md:w-32 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">by {item.instructor}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {item.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {item.students.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-indigo-400">
                              ${item.price}
                            </span>
                            <span className="text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-gray-700 rounded"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="px-2 font-medium">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-gray-700 rounded"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.1, color: "#ef4444" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-fit"
              >
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Items ({getTotalItems()})</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discount</span>
                    <span className="font-medium text-green-400">-$25.00</span>
                  </div>
                  <hr className="border-gray-700" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-400">${(getTotalPrice() - 25).toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all mb-4"
                >
                <NavLink to="/plans/basic/course"> Proceed to Checkout</NavLink>
                 
                </motion.button>
                
                <p className="text-xs text-gray-500 text-center">
                  30-day money-back guarantee
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddToCartPage;