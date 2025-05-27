import React, { useEffect, useRef, useState, useCallback } from 'react';

// Mock NavLink component (replace with your router's NavLink)
const NavLink = ({ to, children, className, onClick }) => (
  <a href={to} className={className} onClick={onClick}>
    {children}
  </a>
);

// Icons (replace with your actual icons)
const Icons = {
  chevronDown: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  chevronRight: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  cart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  globe: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
};

// Configuration
const NAV_CONFIG = {
  explore: {
    label: 'Explore',
    items: {
      'Programming': ['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js', 'Django', 'Vue.js'],
      'Design': ['UI/UX', 'Graphic Design', 'Motion Graphics', '3D Modeling', 'Web Design', 'Mobile Design', 'Branding'],
      'Business': ['Marketing', 'Finance', 'Entrepreneurship', 'Management', 'Analytics', 'Strategy', 'Leadership'],
      'Data Science': ['Machine Learning', 'Data Analysis', 'Statistics', 'R Programming', 'Tableau', 'Power BI']
    }
  },
  plans: {
    label: 'Plans',
    items: ['Basic', 'Premium', 'Enterprise', 'Student', 'Team']
  },
  resources: {
    label: 'Resources',
    items: ['Blog', 'Help Center']
  },
  language: {
    label: 'Language',
    icon: Icons.globe,
    items: ['English', 'Español', 'Français', '中文', '日本語', 'Deutsch', 'Русский', 'Português']
  }
};

// Custom hook for dropdown management
const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);
  const submenuTimeoutRef = useRef(null);

  const openDropdown = useCallback((key) => {
    setActiveDropdown(key);
    setActiveSubmenu(null);
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
  }, []);

  const toggleDropdown = useCallback((key) => {
    if (activeDropdown === key) {
      closeDropdown();
    } else {
      openDropdown(key);
    }
  }, [activeDropdown, openDropdown, closeDropdown]);

  const openSubmenu = useCallback((key) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveSubmenu(key);
  }, []);

  const closeSubmenu = useCallback(() => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150);
  }, []);

  const cancelSubmenuClose = useCallback(() => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, [closeDropdown]);

  return {
    activeDropdown,
    activeSubmenu,
    dropdownRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    openSubmenu,
    closeSubmenu,
    cancelSubmenuClose
  };
};

// Enhanced NavLink component
const EnhancedNavLink = ({ to, children, className = '', onClick, isActive = false }) => {
  const baseClasses = 'relative transition-all duration-300 hover:text-cyan-400';
  const activeClasses = isActive ? 'text-cyan-400 font-semibold' : 'text-gray-200';
  
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      <div className="relative">
        {children}
        {isActive && (
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
        )}
      </div>
    </NavLink>
  );
};

// Dropdown Menu Component with Enhanced Submenu Support
const DropdownMenu = ({ 
  menuKey, 
  config, 
  activeDropdown, 
  activeSubmenu, 
  onToggle, 
  onSubmenuOpen, 
  onSubmenuClose,
  onSubmenuStay,
  onClose 
}) => {
  const isOpen = activeDropdown === menuKey;
  const hasSubmenus = typeof config.items === 'object' && !Array.isArray(config.items);

  return (
    <div className="relative group" onMouseLeave={onSubmenuClose}>
      <button
        onClick={() => onToggle(menuKey)}
        onMouseEnter={() => onToggle(menuKey)}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-200 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300 font-medium"
      >
        {config.icon && <span className="mr-1">{config.icon}</span>}
        <span>{config.label}</span>
        <div
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          {Icons.chevronDown}
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 overflow-visible z-[60] opacity-0 animate-[fadeInScale_0.2s_ease-out_forwards]">
          <div className="py-2">
            {hasSubmenus ? (
              // Render submenus for complex dropdowns
              Object.entries(config.items).map(([category, items]) => (
                <div
                  key={category}
                  className="relative group/submenu"
                  onMouseEnter={() => onSubmenuOpen(category)}
                  onMouseLeave={onSubmenuClose}
                >
                  <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-200 hover:bg-slate-700/60 hover:text-cyan-400 cursor-pointer transition-all duration-200">
                    <span className="font-medium">{category}</span>
                    <div className="text-gray-400">
                      {Icons.chevronRight}
                    </div>
                  </div>

                  {activeSubmenu === category && (
                    <div 
                      className="absolute left-full top-0 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden z-[70] opacity-0 animate-[fadeInSlide_0.2s_ease-out_forwards]"
                      onMouseEnter={onSubmenuStay}
                      onMouseLeave={onSubmenuClose}
                      style={{ 
                        marginLeft: '4px',
                        minWidth: '256px'
                      }}
                    >
                      <div className="py-2 max-h-80 overflow-y-auto">
                        <div className="px-4 py-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-700/50 mb-1">
                          {category}
                        </div>
                        {items.map((item, index) => (
                          <EnhancedNavLink
                            key={item}
                            to={`/explore/${category.toLowerCase()}/${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            onClick={onClose}
                            className="block px-4 py-2.5 text-sm hover:bg-slate-700/60 rounded-lg mx-2 transition-all duration-200 group/item"
                          >
                            <div className="flex items-center justify-between">
                              <span className="group-hover/item:text-cyan-400 transition-colors">
                                {item}
                              </span>
                              <div className="opacity-0 group-hover/item:opacity-100 transition-opacity text-xs text-gray-400">
                                →
                              </div>
                            </div>
                          </EnhancedNavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Render simple dropdown items
              config.items.map((item) => (
                <EnhancedNavLink
                  key={item}
                  to={menuKey === 'language' ? '#' : `/${menuKey}/${item.toLowerCase()}`}
                  onClick={() => {
                    if (menuKey === 'language') {
                      console.log(`Language changed to: ${item}`);
                    }
                    onClose();
                  }}
                  className="block px-4 py-2.5 text-sm hover:bg-slate-700/60 rounded-lg mx-2 transition-all duration-200"
                >
                  {item}
                </EnhancedNavLink>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Search Component
const SearchBar = ({ className = '' }) => (
  <div className={`relative ${className}`}>
    <input
      type="text"
      placeholder="Search courses..."
      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-700/60 border border-slate-600/50 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
    />
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      {Icons.search}
    </div>
  </div>
);

// Cart Component
const CartButton = () => (
  <EnhancedNavLink to="/cart">
    <div className="relative p-2.5 rounded-full bg-slate-700/60 hover:bg-slate-700 text-gray-200 transition-all duration-300 hover:scale-110">
      {Icons.cart}
      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white">
        2
      </span>
    </div>
  </EnhancedNavLink>
);

// Enhanced Mobile Menu Component with Improved Submenu Dropdowns
const MobileMenu = ({ 
  isOpen, 
  onClose, 
  activeDropdown, 
  activeSubmenu, 
  onToggleDropdown, 
  onToggleSubmenu 
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 animate-[slideDown_0.3s_ease-out]">
      <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
        {/* Mobile Search */}
        <div className="animate-[fadeInUp_0.3s_ease-out_0.1s_both]">
          <SearchBar />
        </div>

        {/* Mobile Navigation Items */}
        {Object.entries(NAV_CONFIG).map(([key, config], index) => (
          <div key={key} className={`animate-[fadeInUp_0.3s_ease-out_${0.2 + index * 0.1}s_both]`}>
            <button
              onClick={() => onToggleDropdown(key)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-200 hover:bg-slate-700/60 rounded-lg transition-all duration-200 border border-slate-700/30"
            >
              <div className="flex items-center space-x-3">
                {config.icon && <span className="text-cyan-400">{config.icon}</span>}
                <span className="font-medium text-base">{config.label}</span>
              </div>
              <div className={`transition-transform duration-300 text-gray-400 ${activeDropdown === key ? 'rotate-180' : 'rotate-0'}`}>
                {Icons.chevronDown}
              </div>
            </button>

            {activeDropdown === key && (
              <div className="mt-2 bg-slate-700/30 rounded-lg border border-slate-600/30 animate-[slideDown_0.3s_ease-out]">
                {typeof config.items === 'object' && !Array.isArray(config.items) ? (
                  // Handle submenus with enhanced styling
                  <div className="p-2 space-y-1">
                    {Object.entries(config.items).map(([category, items]) => (
                      <div key={category} className="border-b border-slate-600/30 last:border-b-0 pb-2 last:pb-0">
                        <button
                          onClick={() => onToggleSubmenu(category)}
                          className="flex items-center justify-between w-full py-3 px-3 text-gray-300 hover:text-cyan-400 hover:bg-slate-600/40 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
                            <span className="font-medium">{category}</span>
                            <span className="text-xs bg-slate-600 px-2 py-1 rounded-full text-gray-300">
                              {items.length}
                            </span>
                          </div>
                          <div className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === category ? 'rotate-180' : 'rotate-0'}`}>
                            {Icons.chevronDown}
                          </div>
                        </button>

                        {activeSubmenu === category && (
                          <div className="mt-2 ml-4 space-y-1 animate-[slideDown_0.2s_ease-out] bg-slate-800/50 rounded-lg p-2 border-l-2 border-cyan-400/30">
                            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 px-2">
                              {category} Courses
                            </div>
                            {items.map((item, itemIndex) => (
                              <EnhancedNavLink
                                key={item}
                                to={`/explore/${category.toLowerCase()}/${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                onClick={onClose}
                                className="block py-2.5 px-3 text-sm hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-cyan-400 transition-colors"></span>
                                    <span>{item}</span>
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-cyan-400">
                                    →
                                  </div>
                                </div>
                              </EnhancedNavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Handle simple items with enhanced styling
                  <div className="p-2 space-y-1">
                    {config.items.map((item, itemIndex) => (
                      <EnhancedNavLink
                        key={item}
                        to={key === 'language' ? '#' : `/${key}/${item.toLowerCase()}`}
                        onClick={() => {
                          if (key === 'language') {
                            console.log(`Language changed to: ${item}`);
                          }
                          onClose();
                        }}
                        className="flex items-center space-x-3 py-3 px-3 text-sm hover:text-cyan-400 hover:bg-slate-600/40 rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-cyan-400 transition-colors"></div>
                        <span>{item}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-cyan-400 ml-auto">
                          →
                        </div>
                      </EnhancedNavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Mobile Cart */}
        <div className={`animate-[fadeInUp_0.3s_ease-out_${0.6}s_both]`}>
          <EnhancedNavLink
            to="/cart"
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/60 rounded-lg border border-slate-700/30 transition-all duration-200"
          >
            <div className="text-cyan-400">{Icons.cart}</div>
            <span className="font-medium">Shopping Cart</span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center ml-auto text-white">
              2
            </span>
          </EnhancedNavLink>
        </div>

        {/* Mobile Auth Buttons */}
        <div className={`flex flex-col space-y-3 pt-4 border-t border-slate-700 animate-[fadeInUp_0.3s_ease-out_0.7s_both]`}>
          <EnhancedNavLink
            to="/signin"
            onClick={onClose}
            className="text-center px-4 py-3 hover:bg-slate-700/60 rounded-lg font-medium transition-all duration-200 border border-slate-700/30"
          >
            Sign In
          </EnhancedNavLink>
          <EnhancedNavLink
            to="/signup"
            onClick={onClose}
            className="text-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-medium shadow-lg shadow-blue-500/20 transition-all duration-200"
          >
            Sign Up Free
          </EnhancedNavLink>
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  
  const {
    activeDropdown,
    activeSubmenu,
    dropdownRef,
    toggleDropdown,
    openSubmenu,
    closeSubmenu,
    cancelSubmenuClose,
    closeDropdown
  } = useDropdown();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileDropdown(null);
    setMobileSubmenu(null);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdown(mobileDropdown === key ? null : key);
    setMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (key) => {
    setMobileSubmenu(mobileSubmenu === key ? null : key);
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-5px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes fadeInSlide {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              max-height: 500px;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <div>
              <NavLink to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform duration-300">
                  M
                </div>
                <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  MentorByte
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div 
              ref={dropdownRef}
              className="hidden md:flex items-center space-x-1"
            >
              {Object.entries(NAV_CONFIG).map(([key, config]) => (
                <DropdownMenu
                  key={key}
                  menuKey={key}
                  config={config}
                  activeDropdown={activeDropdown}
                  activeSubmenu={activeSubmenu}
                  onToggle={toggleDropdown}
                  onSubmenuOpen={openSubmenu}
                  onSubmenuClose={closeSubmenu}
                  onSubmenuStay={cancelSubmenuClose}
                  onClose={closeDropdown}
                />
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchBar className="w-48 lg:w-64" />
              <CartButton />
              
              <div className="flex items-center space-x-3 border-l border-slate-700 pl-4 ml-4">
                <EnhancedNavLink
                  to="/signin"
                  className="px-4 py-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                >
                  Sign In
                </EnhancedNavLink>
                
                <div className="hover:scale-105 transition-transform duration-300">
                  <EnhancedNavLink
                    to="/signup"
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full text-white font-medium shadow-lg shadow-blue-500/25 transition-all duration-200"
                  >
                    Sign Up Free
                  </EnhancedNavLink>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-slate-700/60 transition-all duration-200"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {mobileMenuOpen ? Icons.close : Icons.menu}
              </div>
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={toggleMobileMenu}
          activeDropdown={mobileDropdown}
          activeSubmenu={mobileSubmenu}
          onToggleDropdown={toggleMobileDropdown}
          onToggleSubmenu={toggleMobileSubmenu}
        />
      </header>
    </>
  );
};

export default Navbar;