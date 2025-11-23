
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

interface HeaderProps {
  isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ isVisible }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoUrl = "https://res.cloudinary.com/dow2sbjsp/image/upload/v1763314768/Sameer_en7cdu.png";

  const activeLinkStyle = {
    color: '#22d3ee',
    textShadow: '0 0 10px #22d3ee',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-cyan-500/20"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <Link to="/" className="flex items-center">
                <img src={logoUrl} alt="Sameer Digital Lab Logo" className="h-20 w-auto" />
              </Link>

              <nav className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    {link.name}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </NavLink>
                ))}
              </nav>
              
              <div className="hidden lg:block">
                <Link to="/contact">
                    <motion.button 
                        className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_#22d3ee]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Us
                    </motion.button>
                </Link>
              </div>

              <div className="lg:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-300 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
          {menuOpen && (
            <motion.div 
                className="lg:hidden bg-black/80 backdrop-blur-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center space-y-4 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-lg"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                    <motion.button 
                        className="mt-4 px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_#22d3ee]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Us
                    </motion.button>
                </Link>
              </nav>
            </motion.div>
          )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;