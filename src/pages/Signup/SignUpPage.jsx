import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    mountRef.current?.appendChild(renderer.domElement);

    const geometries = [
      new THREE.TetrahedronGeometry(1),
      new THREE.OctahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0x8B5CF6, wireframe: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0x06B6D4, wireframe: true, opacity: 0.3 }),
    ];

    const meshes = Array.from({ length: 8 }).map(() => {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      return mesh;
    });

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.002 + i * 0.0005;
        mesh.rotation.y += 0.002 + i * 0.0005;
        mesh.position.y += Math.sin(time + i) * 0.005;
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
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

const SignUpPage = () => {
  const [selectedType, setSelectedType] = useState('learner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    month: '',
    year: '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const userTypes = [
    { id: 'learner', title: 'Learner', icon: '🎓', color: 'bg-blue-500' },
    { id: 'teacher', title: 'Teacher', icon: '👨‍🏫', color: 'bg-purple-500' },
    { id: 'parent', title: 'Parent', icon: '👪', color: 'bg-green-500' },
  ];

  const handleInputChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <ThreeBackground />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -150, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Sign Up Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white">Sign Up</h1>
            <p className="text-gray-300 mt-2">Join Khan Academy for free as a</p>
          </motion.div>

          {/* User Types */}
          <motion.div className="grid grid-cols-3 gap-4 mb-6" variants={itemVariants}>
            {userTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl transition-all duration-300 border-2 text-center ${
                  selectedType === type.id
                    ? `${type.color} border-white text-white shadow-lg`
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <div className="text-xl mb-1">{type.icon}</div>
                <div className="text-sm font-medium">{type.title}</div>
              </motion.button>
            ))}
          </motion.div>

          {/* Form Inputs */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {['name', 'email', 'password'].map((field) => (
              <motion.input
                key={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ))}

            <div>
              <label className="block text-sm text-white mb-2">Date of Birth</label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
            >
              Create Account
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
