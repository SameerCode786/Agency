
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
  
  const activeLinkStyle = "bg-white/10 text-cyan-400 border-white/10";
  const inactiveLinkStyle = "text-slate-300 border-transparent hover:text-white hover:bg-white/5";

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
          <div className="flex items-center bg-slate-950/90 backdrop-blur-2xl border border-white/15 rounded-full p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] max-w-full md:max-w-max">
            
            {/* Logo - Icon only on mobile to save space */}
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

            {/* Fixed Contact Button - Clean Gradient Style */}
            <Link to="/contact" className="ml-1 pr-1 flex-shrink-0">
               <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-blue-600 text-white px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tight shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
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
