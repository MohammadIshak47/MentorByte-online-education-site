import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { NavLink } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { amazon, googleplay, playstore, appstore } from '../assets/icons';

const Footer = () => {
  return (
    <footer className="relative bg-[#141E32] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 z-10 relative">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <NavLink to="/" className="block mb-6">
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              MentorByte
            </span>
          </NavLink>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-gray-300 font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Articles</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
            <li><a href="#" className="hover:underline">Gifts</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-gray-300 font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Diversity & Inclusion</a></li>
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-gray-300 font-semibold mb-4">Social</h3>
          <div className="flex space-x-4 text-xl">
            <FaTwitter className="hover:text-coral-red cursor-pointer" />
            <FaInstagram className="hover:text-coral-red cursor-pointer" />
            <FaFacebookF className="hover:text-coral-red cursor-pointer" />
            <FaYoutube className="hover:text-coral-red cursor-pointer" />
            <FaLinkedin className="hover:text-coral-red cursor-pointer" />
          </div>
        </div>

        {/* Downloads */}
        <div>
          <h3 className="text-gray-300 font-semibold mb-4 text-lg">Download</h3>
          <div className="space-y-3">
            <img src={amazon} alt="Amazon Appstore" className="w-36 h-12 object-contain transition-transform hover:scale-105 hover:drop-shadow-md" />
            <img src={googleplay} alt="Google Play" className="w-36 h-12 object-contain transition-transform hover:scale-105 hover:drop-shadow-md" />
            <img src={appstore} alt="App Store" className="w-36 h-12 object-contain transition-transform hover:scale-105 hover:drop-shadow-md" />
            <img src={playstore} alt="Play Store" className="w-36 h-12 object-contain transition-transform hover:scale-105 hover:drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 text-sm text-center text-gray-300 z-10 relative"
      >
        &copy; 2025 MentorByte. All rights reserved. | Secured with SSL 🔒
      </motion.div>

      {/* 3D Background using Three.js */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 z-0">
        <Canvas>
          <ambientLight />
          <mesh rotation={[0.5, 0.5, 0]}>
            <dodecahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="coral" wireframe />
          </mesh>
        </Canvas>
      </div>
    </footer>
  );
};

export default Footer;
