import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { NavLink } from "react-router-dom";
const CoursePlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef();

  // Three.js background animation setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.3,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const plans = [
    {
      id: "core-tech",
      title: "Core Tech",
      price: 21,
      description:
        "Start your learning journey with a strong foundation in the basics and access to over 3,900 courses.",
      features: [
        "Course topics:",
        "• Software development",
        "• IT Operations",
        "• Product & UX",
        "• Business skills",
        "Skill assessments, learning paths, certification prep, hands-on labs",
      ],
      isPopular: false,
    },
    {
      id: "complete",
      title: "Complete",
      price: 39,
      description:
        "Build expertise across all tech domains with unlimited access to over 6,500 courses.",
      features: [
        "Course topics:",
        "• Software development",
        "• IT Operations",
        "• Product & UX",
        "• Business skills",
        "Skill assessments, learning paths, certification prep, hands-on labs, and sandboxes",
        "Expanded course libraries:",
        "AI, data, cloud, and security",
      ],
      isPopular: true,
    },
    {
      id: "ai-plus",
      title: "AI+",
      price: 24.5,
      description:
        "Prepare for the future with hands-on AI learning from the experts.",
      features: ["Includes Core Tech"],
      isPopular: false,
    },
    {
      id: "cloud-plus",
      title: "Cloud+",
      price: 24.5,
      description:
        "Advance your cloud career with access to all A Cloud Guru courses.",
      features: ["Includes Core Tech"],
      isPopular: false,
    },
    {
      id: "data-plus",
      title: "Data+",
      price: 24.5,
      description:
        "Become a specialist with access to over 1,400 data science courses.",
      features: ["Includes Core Tech"],
      isPopular: false,
    },
    {
      id: "security-plus",
      title: "Security+",
      price: 24.5,
      description:
        "Learn the skills to keep up with tomorrow's cybersecurity threats.",
      features: ["Includes Core Tech"],
      isPopular: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Three.js Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-32 h-32 sm:w-72 sm:h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-5 sm:top-40 sm:right-20 w-32 h-32 sm:w-72 sm:h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text leading-tight">
            Achieve your career goals faster
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Start with the basics, the whole package, or a deeper dive into a
            preferred tech topic
          </p>
        </motion.div>

        {/* Plan Toggle */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1 sm:p-2 border border-white/20">
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedPlan === "yearly"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Yearly{" "}
              <span className="text-xs sm:text-sm bg-green-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ml-1 sm:ml-2">
                Save 30%
              </span>
            </button>
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedPlan === "monthly"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </motion.div>

        {/* Course Plans Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Core Tech Plan */}
          <motion.div
            className="sm:col-span-1"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard("core-tech")}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 h-full relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Core Tech
                </h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  Start your learning journey with a strong foundation in the
                  basics and access to over 3,900 courses.
                </p>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      $21
                    </span>
                    <span className="text-gray-400 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">📅 Billed yearly</p>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                    <div className="text-gray-300">
                      <p className="mb-1 sm:mb-2 text-sm sm:text-base">Course topics:</p>
                      <ul className="text-xs sm:text-sm space-y-1 ml-2 sm:ml-4">
                        <li>• Software development</li>
                        <li>• IT Operations</li>
                        <li>• Product & UX</li>
                        <li>• Business skills</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Skill assessments, learning paths, certification prep,
                      hands-on labs
                    </p>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}

                >
                 <NavLink
    to="/plans/basic/course"
    
  >
    Buy now
  </NavLink>
                </motion.button>

                <div className="flex flex-col sm:flex-row justify-between mt-3 sm:mt-4 text-xs sm:text-sm gap-2 sm:gap-0">
                  <button className="text-purple-400 hover:text-purple-300 underline">
                    Try 10 days free*
                  </button>
                  <button className="text-purple-400 hover:text-purple-300 underline">
                    Plan details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Complete Plan */}
          <motion.div
            className="sm:col-span-1 relative"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard("complete")}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="absolute -top-2 sm:-top-4 right-2 sm:right-4 z-20">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                Best value
              </span>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-purple-500/50 h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl sm:rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Complete</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  Build expertise across all tech domains with unlimited access
                  to over 6,500 courses.
                </p>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">$39</span>
                    <span className="text-gray-400 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">📅 Billed yearly</p>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                    <div className="text-gray-300">
                      <p className="mb-1 sm:mb-2 text-sm sm:text-base">Course topics:</p>
                      <ul className="text-xs sm:text-sm space-y-1 ml-2 sm:ml-4">
                        <li>• Software development</li>
                        <li>• IT Operations</li>
                        <li>• Product & UX</li>
                        <li>• Business skills</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Skill assessments, learning paths, certification prep,
                      hands-on labs, and sandboxes
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      <p>Expanded course libraries:</p>
                      <p className="ml-2 sm:ml-4">AI, data, cloud, and security</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy now
                </motion.button>

                <div className="flex flex-col sm:flex-row justify-between mt-3 sm:mt-4 text-xs sm:text-sm gap-2 sm:gap-0">
                  <button className="text-purple-400 hover:text-purple-300 underline">
                    Try 10 days free*
                  </button>
                  <button className="text-purple-400 hover:text-purple-300 underline">
                    Plan details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Specialty Plans */}
          {["AI+", "Cloud+", "Data+", "Security+"].map((planName, index) => (
            <motion.div
              key={planName}
              className="sm:col-span-1"
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(planName.toLowerCase())}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 h-full relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    {planName}
                  </h3>
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    {planName === "AI+" &&
                      "Prepare for the future with hands-on AI learning from the experts."}
                    {planName === "Cloud+" &&
                      "Advance your cloud career with access to all A Cloud Guru courses."}
                    {planName === "Data+" &&
                      "Become a specialist with access to over 1,400 data science courses."}
                    {planName === "Security+" &&
                      "Learn the skills to keep up with tomorrow's cybersecurity threats."}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        $24.50
                      </span>
                      <span className="text-gray-400 ml-2 text-sm sm:text-base">/month</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">📅 Billed yearly</p>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <p className="text-purple-400 font-medium text-sm sm:text-base">
                      Includes Core Tech
                    </p>
                  </div>

                  <motion.button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Buy now
                  </motion.button>

                  <div className="flex flex-col sm:flex-row justify-between mt-3 sm:mt-4 text-xs sm:text-sm gap-2 sm:gap-0">
                    <button className="text-purple-400 hover:text-purple-300 underline">
                      Try 10 days free*
                    </button>
                    <button className="text-purple-400 hover:text-purple-300 underline">
                      Plan details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">
            *Free trial excludes lab and sandbox features.
          </p>
          <motion.button
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Compare plans and features ⌄
          </motion.button>
        </motion.div>

        {/* Chat Support */}
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 border border-white/30 cursor-pointer hover:bg-white/30 transition-all duration-300 group">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">?</span>
            </div>
            <div className="absolute bottom-12 sm:bottom-16 right-0 bg-black/90 backdrop-blur-md text-white p-2 sm:p-3 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Have a question about plans or pricing?
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursePlansPage;