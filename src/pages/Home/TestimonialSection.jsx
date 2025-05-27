import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  creators2,
  creators3,
  creators10
} from '../../assets/images';

const testimonials = [
  {
    id: 1,
    name: 'Joshua Lange',
    title: 'Research Scientist',
    location: 'Stockholm, Sweden',
    quote: `I've gained a valuable skill set that looks great on my CV. It helps make my current job more efficient and life easier.`,
    image: creators2,
  },
  {
    id: 2,
    name: 'Shabana Khatau',
    title: 'Systems and Applications Advisor',
    location: 'London, England',
    quote: `Anyone who asks me where to start, I direct them to Codecademy. Don’t waste time elsewhere.`,
    image: creators10,
  },
  {
    id: 3,
    name: 'Jimmy Soto',
    title: 'SOC Security Specialist',
    location: 'Washington, DC - Baltimore',
    quote: `Codecademy's gamified experience made learning enjoyable. It helped me pivot into cybersecurity from a different field.`,
    image: creators3,
  },
];

const TestimonialSection = () => {
  const threeJsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!threeJsRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      threeJsRef.current.clientWidth / threeJsRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

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

    const gridHelper = new THREE.GridHelper(20, 20, 0x0066ff, 0x001a33);
    gridHelper.position.y = -5;
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 2);
    scene.add(directionalLight);

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
      gridHelper.rotation.z += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(gridHelper);
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const quoteMarkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, delay: 0.2 },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden px-4 py-20">
      {/* ThreeJS Canvas */}
      <canvas ref={threeJsRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Real Success Stories
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover how learners from around the globe are building their careers through online education.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="rounded-xl overflow-hidden bg-gray-900 bg-opacity-70 border border-gray-800 shadow-lg backdrop-blur-sm flex flex-col transition-transform hover:-translate-y-2"
              variants={cardVariants}
            >
              <div className="relative h-64">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <motion.div className="absolute top-5 left-5" variants={quoteMarkVariants}>
                <div className="text-4xl text-yellow-400 font-bold">“</div>
              </motion.div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <p className="text-gray-200 italic mb-6">
                  {testimonial.quote}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-blue-400">{testimonial.title}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
