import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    id: 1,
    question: 'What is MentorByte?',
    answer:
      ' MentorByte is an online learning platform that offers thousands of creative classes taught by industry professionals and experts. Join millions of learners exploring creativity and building skills through our comprehensive library of courses.',
  },
  {
    id: 2,
    question: 'What is included in my  MentorByte membership?',
    answer:
      'Unlimited access to our full library of classes. Learn at your own pace, save classes for later, join community discussions, download content for offline use, and get access to premium workshops and exclusive content.',
  },
  {
    id: 3,
    question: 'What can I learn from  MentorByte?',
    answer:
      'Explore an extensive range of subjects including graphic design, UI/UX design, photography, web development, animation, creative writing, leadership skills, digital marketing, illustration, and many more creative disciplines.',
  },
  {
    id: 4,
    question: 'What happens after my trial is over?',
    answer:
      'You\'ll be automatically enrolled in your chosen subscription plan. You can cancel anytime before the trial ends to avoid any charges. We\'ll send you reminders before your trial expires so you can make an informed decision.',
  },
  {
    id: 5,
    question: 'Can I teach on  MentorByte?',
    answer:
      'Absolutely!  MentorByte welcomes teachers from all backgrounds and skill levels. You can easily create and publish classes, build your teaching portfolio, engage with students, and earn revenue based on member engagement and class performance.',
  },
];

const FAQSection = () => {
  const [openItem, setOpenItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const threeJsRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  useEffect(() => {
    if (!threeJsRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      threeJsRef.current.clientWidth / threeJsRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: threeJsRef.current,
    });
    renderer.setSize(
      threeJsRef.current.clientWidth,
      threeJsRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);

    // Enhanced particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 15 - 5;

      // Color variations
      const color = new THREE.Color();
      const hue = Math.random() * 0.1 + 0.6; // Blue to purple range
      color.setHSL(hue, 0.8, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      sizes[i / 3] = Math.random() * 0.05 + 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Floating geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(0.3),
      new THREE.OctahedronGeometry(0.25),
      new THREE.IcosahedronGeometry(0.2),
    ];

    const shapes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5),
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6666ff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff66ff, 0.5, 100);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!threeJsRef.current) return;
      camera.aspect = threeJsRef.current.clientWidth / threeJsRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        threeJsRef.current.clientWidth,
        threeJsRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += 0.0008;
      particles.rotation.y += 0.001;

      // Animate geometric shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
      });

      // Mouse interaction effect
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { delay: 0.1 }
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      },
    },
  };

  const iconVariants = {
    rotate: {
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black py-12 sm:py-16 lg:py-24 px-4 text-white">
      <canvas ref={threeJsRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Support Center</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Everything you need to know about our platform and services
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4 sm:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`group relative bg-black/80 backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500 ${
                openItem === item.id 
                  ? 'border-blue-400/60 shadow-blue-500/20' 
                  : hoveredItem === item.id
                  ? 'border-purple-400/40 shadow-purple-500/10'
                  : 'border-gray-600/30 hover:border-gray-500/50'
              }`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glowing effect for active item */}
              {openItem === item.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <button
                onClick={() => toggleItem(item.id)}
                className="flex justify-between items-start w-full text-left group"
                aria-expanded={openItem === item.id}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <motion.div
                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                      openItem === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white'
                    }`}
                    whileHover="rotate"
                    variants={iconVariants}
                  >
                    {index + 1}
                  </motion.div>
                  
                  <span className={`text-lg sm:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-300 ${
                    openItem === item.id 
                      ? 'text-blue-300' 
                      : 'text-white group-hover:text-blue-300'
                  }`}>
                    {item.question}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-300 ${
                    openItem === item.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
                  }`} />
                </motion.div>
              </button>

              <AnimatePresence mode="wait">
                {openItem === item.id && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="mt-6 pl-12 sm:pl-14 pr-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="w-full h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50 mb-4" />
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Still have questions? We're here to help!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;