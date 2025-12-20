
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Services', path: '/services', badge: '5' },
  { name: 'Work', path: '/portfolio', badge: 'NEW 4' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

interface StickyBottomNavProps {
  isVisible: boolean;
}

const StickyBottomNav: React.FC<StickyBottomNavProps> = ({ isVisible }) => {
  const logoUrl = "https://res.cloudinary.com/dow2sbjsp/image/upload/v1763314768/Sameer_en7cdu.png";
  
  // Updated Active Style: Cyan glow
  const activeLinkStyle = "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]";
  // Updated Inactive Style: Light blue transparent hover
  const inactiveLinkStyle = "text-slate-200 border-transparent hover:text-cyan-300 hover:bg-cyan-400/20";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 inset-x-0 flex justify-center z-[70] px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          {/* Container with Blue/Purple Linear Gradient Shades and Glassmorphism */}
          <div className="flex items-center bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] max-w-full md:max-w-max transition-all duration-500 hover:border-white/20">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center justify-center pl-3 pr-2 md:pr-4 group border-r border-white/10">
              <img src={logoUrl} alt="Logo" className="h-6 md:h-7 w-auto transition-transform group-hover:scale-110"/>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-0.5 md:gap-1 px-1">
                {navLinks.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => `
                        px-3 md:px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tighter transition-all duration-300 border relative flex items-center justify-center
                        ${isActive ? activeLinkStyle : inactiveLinkStyle}
                    `}
                >
                    {link.name}
                    
                    {/* Dynamic Badges */}
                    {link.badge && (
                    <span className={`absolute -top-2.5 -right-0.5 bg-indigo-600 text-white text-[8px] font-black shadow-[0_0_12px_rgba(79,70,229,0.7)] flex items-center justify-center uppercase tracking-tighter z-10
                        ${link.badge.includes('NEW') 
                            ? 'px-2 py-0.5 rounded-full min-w-[34px] border border-indigo-400/30' 
                            : 'w-4 h-4 rounded-full border border-indigo-400/30'}
                    `}>
                        {link.badge}
                    </span>
                    )}
                </NavLink>
                ))}
            </div>

            {/* Contact Button */}
            <Link to="/contact" className="ml-1 pr-1 flex-shrink-0">
               <button className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-cyan-500 hover:to-blue-600 text-white px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tight shadow-lg shadow-indigo-500/20 active:scale-95 transition-all backdrop-blur-sm">
                 Contact
               </button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomNav;
