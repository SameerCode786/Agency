
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
  // Style for the active NavLink, inspired by the "Creator" button in the image
  const activeLinkStyle = {
    borderColor: '#facc15', // yellow-400
    color: '#fde047', // yellow-300
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
          <div className="flex items-center gap-1.5 bg-gray-900/60 backdrop-blur-lg border border-slate-700/50 rounded-full p-1.5 shadow-lg shadow-yellow-500/10">
            <Link to="/" className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
              <SdlMonogram className="h-6 w-6 text-cyan-400" />
            </Link>
            
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 transition-all duration-300 border border-slate-700 bg-slate-800/50 hover:bg-slate-700/80"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className="px-5 py-2 rounded-full text-sm font-bold bg-yellow-400 text-black transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_15px_#facc15]"
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
