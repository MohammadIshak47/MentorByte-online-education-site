import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize visibility animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Advanced particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Canvas configuration
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.background = 'transparent';
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // Particle class with enhanced properties
    class EnhancedParticle {
      constructor() {
        this.reset();
        this.age = Math.random() * 100;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 3 + 1;
        this.baseOpacity = Math.random() * 0.6 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.age += 0.5;

        // Boundary collision with smooth bounce
        if (this.x <= 0 || this.x >= canvas.width) {
          this.vx *= -0.8;
          this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y <= 0 || this.y >= canvas.height) {
          this.vy *= -0.8;
          this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        // Subtle gravitational pull toward center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceToCenter = Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2);
        
        if (distanceToCenter > 100) {
          this.vx += (centerX - this.x) * 0.0001;
          this.vy += (centerY - this.y) * 0.0001;
        }
      }

      draw() {
        const pulseOpacity = this.baseOpacity + Math.sin(this.age * this.pulseSpeed) * 0.3;
        
        // Main particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${pulseOpacity})`;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${pulseOpacity * 0.1})`;
        ctx.fill();
      }
    }

    // Initialize particle system
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new EnhancedParticle());
    }

    // Animation loop with optimizations
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connection networks
      particles.forEach((particle, i) => {
        particles.slice(i + 1, i + 6).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 0.15 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Update and render particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Course statistics data
  const courseStats = [
    { icon: "📚", number: "8,500+", label: "Tech Courses", color: "from-purple-400 to-violet-400" },
    { icon: "🎯", number: "500+", label: "Skill Assessments", color: "from-blue-400 to-cyan-400" },
    { icon: "🧪", number: "3,500+", label: "Hands-on Labs", color: "from-emerald-400 to-teal-400" },
    { icon: "🏆", number: "150+", label: "Certification Paths", color: "from-amber-400 to-orange-400" }
  ];

  // Student testimonials
  const testimonials = [
    "Transformed my career in just 6 months!",
    "Best tech education platform I've used",
    "Perfect for busy professionals"
  ];

  return (
    <>
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Animated Particle Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-radial from-indigo-900/10 via-transparent to-transparent" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content - 7 columns */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Main Headline */}
                <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tight">
                    <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      Master
                    </span>
                    <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent animate-glow">
                      Tomorrow's
                    </span>
                    <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      Tech Today
                    </span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mt-6">
                    Join over <span className="text-purple-400 font-semibold">1M+ professionals</span> who've 
                    accelerated their careers with cutting-edge tech skills. Stay ahead of the curve.
                  </p>
                </div>

                {/* Course Statistics */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                  {courseStats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Call-to-Action Buttons */}
                <div className={`flex flex-wrap gap-4 pt-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Start Learning Free
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  
                  <button className="px-8 py-4 border-2 border-gray-700 text-white font-bold rounded-full hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 hover:scale-105">
                    Browse Courses
                  </button>
                </div>

                {/* Social Proof */}
                <div className={`flex items-center space-x-6 pt-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 border-2 border-black flex items-center justify-center text-white text-sm font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-300">
                    <div className="flex text-yellow-400 text-sm mb-1">★★★★★</div>
                    <div className="text-sm">Trusted by 1M+ learners worldwide</div>
                  </div>
                </div>
              </div>

              {/* Right Content - 5 columns */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Featured Course Card */}
                <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl animate-float transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold animate-glow">
                      AI
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Complete AI & Machine Learning Bootcamp
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        Master Python, TensorFlow, and build real AI projects
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                            Advanced
                          </span>
                          <span>120+ hours</span>
                        </div>
                        <div className="text-purple-400 font-bold">$49/mo</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">68% Complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold py-3 rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 hover:scale-[1.02]">
                    Continue Learning
                  </button>
                </div>

                {/* Quick Stats */}
                <div className={`grid grid-cols-3 gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center hover:border-purple-500/30 transition-all duration-300">
                      <div className="text-yellow-400 text-xs mb-2">★★★★★</div>
                      <p className="text-gray-300 text-xs leading-relaxed">"{testimonial}"</p>
                    </div>
                  ))}
                </div>

                {/* Achievement Badges */}
                <div className={`flex justify-center space-x-6 pt-4 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {['🎓', '💼', '🚀'].map((emoji, index) => (
                    <div key={index} className="text-3xl hover:scale-125 transition-transform duration-300 cursor-pointer">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      </section>
    </>
  );
};

export default HeroSection;