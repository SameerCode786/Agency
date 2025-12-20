
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from './PremiumButton';

const navLinks = [
  { name: 'Services', path: '/services', badge: '5' },
  { name: 'Work', path: '/portfolio', badge: 'NEW 4' },
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
    color: '#22d3ee', // cyan-400
    textShadow: '0 0 10px #22d3ee',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-cyan-500/10"
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

              <nav className="hidden lg:flex items-center space-x-12">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium relative group flex items-center"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    <span className="relative">
                        {link.name}
                        {link.badge && (
                            <motion.span 
                                initial={{ scale: 0.8, opacity: 0, y: 5 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className={`absolute -top-6 ${link.name === 'Work' ? '-right-10' : '-right-5'} px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter text-white rounded-full bg-gradient-to-br from-purple-600/90 to-indigo-700/90 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.3)] min-w-[18px] text-center flex items-center justify-center h-4.5 z-10 whitespace-nowrap`}
                            >
                                {link.badge}
                            </motion.span>
                        )}
                    </span>
                    <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </NavLink>
                ))}
              </nav>
              
              <div className="hidden lg:block">
                <Link to="/contact">
                    <PremiumButton icon={false} className="!px-6 !py-2">Contact Us</PremiumButton>
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
                className="lg:hidden bg-slate-950/95 backdrop-blur-lg border-b border-cyan-500/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center space-y-6 py-10">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-lg flex items-center gap-2 relative"
                    style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  >
                    {link.name}
                    {link.badge && (
                        <span className="absolute -top-3 -right-6 px-1.5 py-0.5 text-[8px] font-bold text-white rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-white/10">
                            {link.badge}
                        </span>
                    )}
                  </NavLink>
                ))}
                <div className="mt-4">
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>
                        <PremiumButton>Contact Us</PremiumButton>
                    </Link>
                </div>
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
