
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SdlMonogram } from './Icons';

const navLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

interface StickyBottomNavProps {
  isVisible: boolean;
}

const StickyBottomNav: React.FC<StickyBottomNavProps> = ({ isVisible }) => {
  // Style for the active NavLink, matching the website's cyan theme
  const activeLinkStyle = {
    borderColor: '#22d3ee', // cyan-400
    color: '#67e8f9', // cyan-300
    background: 'rgba(34, 211, 238, 0.1)',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-lg border border-slate-700/60 rounded-full p-2 shadow-lg shadow-cyan-500/10">
            <Link to="/" className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
              <SdlMonogram className="h-7 w-7 text-cyan-400" />
            </Link>
            
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="px-6 py-2.5 rounded-full text-base font-medium text-slate-200 transition-all duration-300 border border-transparent hover:bg-slate-700/80"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className="px-6 py-2.5 rounded-full text-base font-bold bg-cyan-500 text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_15px_#22d3ee]"
            >
              Contact Us
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomNav;
