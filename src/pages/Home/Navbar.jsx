import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { arrowdown, dropicon, rightarrow, searchIcon, addtocarticon, toggle } from '../../assets/icons';

// Three.js background component
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 160, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 160);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const torusGeometry = new THREE.TorusGeometry(1.6, 0.2, 16, 50);

    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);

    scene.add(sphere);
    scene.add(torus);

    const handleResize = () => {
      camera.aspect = window.innerWidth / 160;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 160);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.002;
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      sphereGeometry.dispose();
      torusGeometry.dispose();
      sphereMaterial.dispose();
      torusMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-40 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

// Enhanced NavLink component with active state styling
const CustomNavLink = ({ to, children, className = "", onClick = null, isExternal = false }) => {
  const baseClasses = "transition-colors duration-200";
  const hoverClasses = "hover:text-cyan-400";
  const activeClasses = "text-cyan-400 font-semibold";
  const inactiveClasses = "text-gray-200";

  if (isExternal) {
    return (
      <motion.a
        href={to}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        className={`${baseClasses} ${hoverClasses} ${inactiveClasses} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${hoverClasses} ${
          isActive ? activeClasses : inactiveClasses
        } ${className}`
      }
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={isActive ? "relative" : ""}
        >
          {children}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

// Reusable Dropdown Menu component
const DropdownMenu = ({ menuKey, items, dropdownState, setDropdownState, dropdownRef }) => {
  const isOpen = dropdownState.main === menuKey;
  
  const handleToggle = () => {
    setDropdownState((prev) => ({
      main: prev.main === menuKey ? null : menuKey,
      sub: null,
    }));
  };

  const handleSubToggle = (submenu) => {
    setDropdownState((prev) => ({
      ...prev,
      sub: prev.sub === submenu ? null : submenu,
    }));
  };

  const closeDropdown = () => {
    setDropdownState({ main: null, sub: null });
  };

  return (
    <div ref={isOpen ? dropdownRef : null} className="relative">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-1 text-gray-200 hover:text-cyan-400 transition-colors capitalize font-medium"
      >
        <span>{menuKey === 'language' ? '🌐 Language' : menuKey}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4"
        >
          {dropicon}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 overflow-hidden z-20"
          >
            <div className="py-1">
              {menuKey === 'explore' ? (
                items.main.map((item) => (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => handleSubToggle(item)}
                    onMouseLeave={() => handleSubToggle(null)}
                  >
                    <CustomNavLink
                      to={`/explore/${item.toLowerCase()}`}
                      onClick={closeDropdown}
                      className=" flex items-center justify-between px-4 py-3 text-sm   w-full"
                    >
                      {item} 
                      <span className="w-4 h-4">{rightarrow}</span>
                    </CustomNavLink>

                    <AnimatePresence>
                      {dropdownState.sub === item && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-full top-0 mt-0 w-56 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 overflow-hidden z-20"
                        >
                          <div className="py-1">
                            {items.submenus[item].map((subItem) => (
                              <CustomNavLink
                                key={subItem}
                                to={`/explore/${item.toLowerCase()}/${subItem.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                onClick={closeDropdown}
                                className="block px-4 py-3 text-sm w-full"
                              >
                                {subItem}
                              </CustomNavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              ) : menuKey === 'plans' ? (
                items.map((item) => (
                  <CustomNavLink
                    key={item}
                    to={`/plans/${item.toLowerCase()}`}
                    onClick={closeDropdown}
                    className="block px-4 py-3 text-sm w-full"
                  >
                    {item}
                  </CustomNavLink>
                ))
              ) : menuKey === 'language' ? (
                items.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      // Handle language change logic here
                      console.log(`Language changed to: ${item}`);
                      closeDropdown();
                    }}
                    whileHover={{ backgroundColor: '#374151' }}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-200 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </motion.button>
                ))
              ) : (
                items.map((item) => (
                  <CustomNavLink
                    key={item}
                    to={`/${menuKey}/${item.toLowerCase()}`}
                    onClick={closeDropdown}
                    className="block px-4 py-3 text-sm w-full"
                  >
                    {item}
                  </CustomNavLink>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Mobile Menu component
const MobileMenu = ({ 
  dropdownItems, 
  dropdownState, 
  setDropdownState, 
  toggleMobileMenu, 
  mobileMenuVariants, 
  mobileItemVariants 
}) => {
  const handleToggle = (menu) => {
    setDropdownState((prev) => ({
      main: prev.main === menu ? null : menu,
      sub: null,
    }));
  };

  const handleSubToggle = (submenu) => {
    setDropdownState((prev) => ({
      ...prev,
      sub: prev.sub === submenu ? null : submenu,
    }));
  };

  const closeMobileMenu = () => {
    setDropdownState({ main: null, sub: null });
    toggleMobileMenu();
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={mobileMenuVariants}
      className="md:hidden bg-slate-800 overflow-hidden"
    >
      <div className="px-4 pt-2 pb-6 space-y-4">
        <motion.div variants={mobileItemVariants} className="relative mt-3">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-700/60 border border-slate-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <span className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {searchIcon}
          </span>
        </motion.div>

        {Object.keys(dropdownItems).map((key) => (
          <motion.div key={key} variants={mobileItemVariants}>
            <button
              onClick={() => handleToggle(key)}
              className="flex items-center justify-between w-full px-2 py-3 text-gray-200 hover:bg-slate-700/60 rounded-md"
            >
              <span className="font-medium capitalize">
                {key === 'language' ? '🌐 Language' : key}
              </span>
              <motion.div
                animate={{ rotate: dropdownState.main === key ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {arrowdown}
              </motion.div>
            </button>

            <AnimatePresence>
              {dropdownState.main === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 mt-1 border-l-2 border-slate-700 pl-4"
                >
                  {key === 'explore' ? (
                    dropdownItems[key].main.map((item) => (
                      <div key={item}>
                        <button
                          onClick={() => handleSubToggle(item)}
                          className="flex items-center justify-between w-full py-2 text-gray-300 hover:text-cyan-400"
                        >
                          {item}
                          <motion.div
                            animate={{ rotate: dropdownState.sub === item ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-4 h-4"
                          >
                            {dropicon}
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {dropdownState.sub === item && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 border-l-2 border-slate-600 pl-4"
                            >
                              {dropdownItems[key].submenus[item].map((subItem) => (
                                <CustomNavLink
                                  key={subItem}
                                  to={`/explore/${item.toLowerCase()}/${subItem.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                  onClick={closeMobileMenu}
                                  className="block py-2"
                                >
                                  <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                  >
                                    {subItem}
                                  </motion.div>
                                </CustomNavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))
                  ) : key === 'plans' ? (
                    dropdownItems[key].map((item) => (
                      <CustomNavLink
                        key={item}
                        to={`/plans/${item.toLowerCase()}`}
                        onClick={closeMobileMenu}
                        className="block py-2"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {item}
                        </motion.div>
                      </CustomNavLink>
                    ))
                  ) : key === 'language' ? (
                    dropdownItems[key].map((item) => (
                      <motion.button
                        key={item}
                        onClick={() => {
                          // Handle language change logic here
                          console.log(`Language changed to: ${item}`);
                          closeMobileMenu();
                        }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className="block w-full text-left py-2 text-gray-300 hover:text-cyan-400"
                      >
                        {item}
                      </motion.button>
                    ))
                  ) : (
                    dropdownItems[key].map((item) => (
                      <CustomNavLink
                        key={item}
                        to={`/${key}/${item.toLowerCase()}`}
                        onClick={closeMobileMenu}
                        className="block py-2"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {item}
                        </motion.div>
                      </CustomNavLink>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.div variants={mobileItemVariants}>
          <CustomNavLink
            to="/cart"
            onClick={closeMobileMenu}
            className="flex items-center space-x-3 px-2 py-3 hover:bg-slate-700/60 rounded-md w-full"
          >
            <addtocarticon className="h-5 w-5" />
            <span className="font-medium">Cart</span>
            <span className="bg-cyan-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto">
              2
            </span>
          </CustomNavLink>
        </motion.div>

        <motion.div variants={mobileItemVariants} className="flex flex-col space-y-3 pt-2">
          <CustomNavLink
            to="/signin"
            onClick={closeMobileMenu}
            className="block px-2 py-3 text-center hover:bg-slate-700/60 rounded-md font-medium"
          >
            Sign In
          </CustomNavLink>
          <CustomNavLink
            to="/signup"
            onClick={closeMobileMenu}
            className="block px-2 py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white font-medium shadow-lg shadow-blue-500/20"
          >
            Sign Up Free
          </CustomNavLink>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Navbar component
const Navbar = () => {
  const [dropdownState, setDropdownState] = useState({ main: null, sub: null });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownState({ main: null, sub: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setDropdownState({ main: null, sub: null });
  };

  const dropdownItems = {
    explore: {
      main: ['Programming', 'Design', 'Business'],
      submenus: {
        Programming: ['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js'],
        Design: ['UI/UX', 'Graphic Design', 'Motion Graphics', '3D Modeling', 'Web Design', 'Mobile Design'],
        Business: ['Marketing', 'Finance', 'Entrepreneurship', 'Management', 'Analytics', 'Strategy'],
      },
    },
    plans: ['Basic', 'Premium', 'Enterprise', 'Student'],
    language: ['English', 'Español', 'Français', '中文', '日本語', 'Deutsch', 'Русский'],
  };

  const navbarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.3, when: 'afterChildren' } },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.4, when: 'beforeChildren', staggerChildren: 0.1 } },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      <ThreeBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          className="flex items-center justify-between py-6"
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center space-x-2">
            <NavLink to="/" className="flex items-center space-x-2 text-3xl md:text-4xl font-extrabold">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="bg-gradient-to-br from-cyan-400 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              >
                M
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Mentor
              </span>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div variants={itemVariants} className="hidden md:flex md:items-center md:space-x-8">
            {Object.keys(dropdownItems).map((key) => (
              <DropdownMenu
                key={key}
                menuKey={key}
                items={dropdownItems[key]}
                dropdownState={dropdownState}
                setDropdownState={setDropdownState}
                dropdownRef={dropdownRef}
              />
            ))}
          </motion.div>

          {/* Right Section - Search, Cart, Auth */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 rounded-full bg-slate-700/60 border border-slate-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-48 lg:w-64 transition-all"
              />
              <span className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {searchIcon}
              </span>
            </div>

            <CustomNavLink to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-full bg-slate-700/60 hover:bg-slate-700 text-gray-200"
              >
                <addtocarticon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </motion.div>
            </CustomNavLink>

            <div className="flex items-center space-x-3">
              <CustomNavLink
                to="/signin"
                className="font-medium"
              >
                Sign In
              </CustomNavLink>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CustomNavLink
                  to="/signup"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-5 py-2 rounded-full text-white font-medium shadow-lg shadow-blue-500/20"
                >
                  Sign Up Free
                </CustomNavLink>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={itemVariants}
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-200 hover:bg-slate-700/60"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="h-6 w-6"
            >
              {toggle}
            </motion.div>
          </motion.button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            dropdownItems={dropdownItems}
            dropdownState={dropdownState}
            setDropdownState={setDropdownState}
            toggleMobileMenu={toggleMobileMenu}
            mobileMenuVariants={mobileMenuVariants}
            mobileItemVariants={mobileItemVariants}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;