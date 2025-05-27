import { CheckCircle, Award, Users, BookOpen, Star } from 'lucide-react';

const AchievementsSection = () => {
  const statsData = [
    { 
      value: '25K+', 
      label: 'Creative Classes', 
      icon: BookOpen,
      description: 'Expert-led courses',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      value: '600K+', 
      label: 'Active Members', 
      icon: Users,
      description: 'Growing community',
      color: 'from-green-400 to-emerald-500'
    },
    { 
      value: '8K+', 
      label: 'Expert Teachers', 
      icon: Award,
      description: 'Industry professionals',
      color: 'from-purple-400 to-violet-500'
    },
    { 
      value: '4.9', 
      label: 'App Store Rating', 
      icon: Star,
      description: '★★★★★ Reviews',
      color: 'from-yellow-400 to-orange-500'
    },
  ];
  
  const features = [
    {
      title: 'Comprehensive Learning Paths',
      description: 'Thousands of creative classes from beginner to professional level',
      icon: '🎯'
    },
    {
      title: 'Industry Expert Instructors',
      description: 'Learn from creative professionals and industry leaders',
      icon: '👨‍🏫'
    },
    {
      title: 'Structured Learning Journey',
      description: 'Guided paths designed to help you achieve your creative goals',
      icon: '🗺️'
    },
    {
      title: 'Achievement Recognition',
      description: 'Earn certificates and celebrate your learning milestones',
      icon: '🏆'
    },
  ];

  // Generate random dots for animation
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
  
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Simple Animated Dots Background */}
      <div className="absolute inset-0 z-0">
        {/* Pure black background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated dots */}
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
        
        {/* Floating dots with movement */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`floating-${i}`}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i % 3} ${15 + Math.random() * 10}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              
              {/* Left Column - Heading & Stats Preview */}
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 mb-6">
                  <span className="text-yellow-300 text-sm font-medium">Proven Excellence</span>
                </div>
                
                <div>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                    <span className="bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                      Creative
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Learning
                    </span>
                    <br />
                    <span className="text-white">
                      Made Easy
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                    Join millions of learners mastering creative skills with our award-winning platform. 
                    Transform your passion into expertise with world-class instruction.
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6">
                  {statsData.slice(0, 2).map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-4 p-6 bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInRight 0.8s ease-out forwards',
                    }}
                  >
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Trusted by Creative Professionals Worldwide
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our numbers speak for themselves - join a thriving community of creators
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      animation: 'fadeInUp 0.8s ease-out forwards',
                    }}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Value */}
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-white font-semibold mb-1">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <div className="text-gray-400 text-sm">
                      {stat.description}
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full font-semibold text-black overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25">
                  <span className="relative z-10 flex items-center">
                    Start Learning Today
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-yellow-500 hover:text-yellow-300 transition-all duration-300">
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
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
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(-10px); }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(-15px); }
          66% { transform: translateY(-10px) translateX(20px); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          20% { transform: translateY(-15px) translateX(8px); }
          40% { transform: translateY(-35px) translateX(-12px); }
          60% { transform: translateY(-25px) translateX(15px); }
          80% { transform: translateY(-5px) translateX(-8px); }
        }
      `}</style>
    </div>
  );
};

export default AchievementsSection;