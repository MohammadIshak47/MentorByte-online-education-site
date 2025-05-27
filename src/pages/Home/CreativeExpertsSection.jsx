import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  creators1, creators2, creators3, creators4, creators5,
  creators6, creators7, creators8, creators9, creators10
} from '../../assets/images';

const CreativeExpertsSection = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const canvasRef = useRef(null);

  // Creator data with imported images
  const allCreators = [
    { id: 1, name: 'Marques Brownlee', role: 'YouTuber & Tech Reviewer', expertise: 'Technology & Media', image: creators1 },
    { id: 2, name: 'Alicia Souza', role: 'Illustrator & eCommerce Expert', expertise: 'Digital Art & Business', image: creators2 },
    { id: 3, name: 'Aaron Draplin', role: 'Graphic Designer', expertise: 'Brand Design & Typography', image: creators3 },
    { id: 4, name: 'Amelie Satzger', role: 'Professional Photographer', expertise: 'Photography & Visual Arts', image: creators4 },
    { id: 5, name: 'Ali Abdaal', role: 'Doctor & Content Creator', expertise: 'Productivity & Education', image: creators5 },
    { id: 6, name: 'Denise Bayron', role: 'Fashion Designer', expertise: 'Fashion & Pattern Making', image: creators6 },
    { id: 7, name: 'Jessica Walsh', role: 'Creative Director', expertise: 'Creative Leadership', image: creators7 },
    { id: 8, name: 'Chris Do', role: 'CEO & Design Strategist', expertise: 'Business & Design', image: creators8 },
    { id: 9, name: 'Peter McKinnon', role: 'Photographer & Filmmaker', expertise: 'Photography & Video', image: creators9 },
    { id: 10, name: 'Sarah Andersen', role: 'Cartoonist & Author', expertise: 'Illustration & Storytelling', image: creators10 },
  ];

  // Enhanced Three.js background with floating geometric shapes
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.ConeGeometry(0.3, 0.6, 8),
      new THREE.OctahedronGeometry(0.4),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.3),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
      });
      
      scene.add(mesh);
    }

    // Add ambient particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      
      const hue = Math.random() * 0.3 + 0.6;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach(({ mesh, rotationSpeed }) => {
        mesh.rotation.x += rotationSpeed.x;
        mesh.rotation.y += rotationSpeed.y;
        mesh.rotation.z += rotationSpeed.z;
      });
      
      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0003;
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      shapes.forEach(({ mesh }) => scene.remove(mesh));
      scene.remove(particles);
      geometries.forEach(geo => geo.dispose());
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, allCreators.length));
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-6">
              <span className="text-blue-300 text-sm font-medium">World-Class Instructors</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              Learn from Creative
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Experts
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Master new skills with industry leaders who are passionate about sharing their expertise, 
              tools, and professional insights to accelerate your creative journey.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: '10+', label: 'Expert Instructors' },
              { number: '50K+', label: 'Students Taught' },
              { number: '100+', label: 'Hours of Content' },
              { number: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCreators.slice(0, visibleCount).map((creator, index) => (
              <div
                key={creator.id}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards',
                }}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {creator.name}
                      </h3>
                      <p className="text-blue-400 text-sm font-medium">{creator.role}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-gray-400 text-sm mb-4">{creator.expertise}</div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9 • 2.5k+ students
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < allCreators.length && (
            <div className="mt-16 text-center">
              <button
                onClick={handleLoadMore}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center">
                  Load More Experts
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CreativeExpertsSection;