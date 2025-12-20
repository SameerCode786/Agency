
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from './PremiumButton';

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
  
  const activeLinkStyle = {
    borderColor: '#22d3ee', // cyan-500
    color: '#67e8f9', // cyan-300
    background: 'rgba(34, 211, 238, 0.1)',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 inset-x-0 flex justify-center z-40 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center gap-1.5 md:gap-2 bg-slate-950/80 backdrop-blur-lg border border-slate-700/60 rounded-full p-2 shadow-lg shadow-cyan-500/10">
            <Link to="/" className="flex-shrink-0 flex items-center justify-center px-2">
              <img src={logoUrl} alt="Sameer Digital Lab" className="h-10 w-auto"/>
            </Link>
            
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="px-3 md:px-6 py-2.5 rounded-full text-xs md:text-base font-medium text-slate-200 transition-all duration-300 border border-transparent hover:bg-slate-800 flex items-center relative group"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
              >
                <span className="relative">
                    {link.name}
                    {link.badge && (
                        <motion.span 
                            initial={{ scale: 0.9, y: 0 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="absolute -top-5 -right-5 flex items-center justify-center px-1.5 py-0.5 text-[7px] md:text-[8px] font-black leading-none text-white rounded-full bg-gradient-to-br from-purple-500/90 to-indigo-600/90 backdrop-blur-md border border-white/20 shadow-lg min-w-[15px] h-3.5"
                        >
                            {link.badge}
                        </motion.span>
                    )}
                </span>
              </NavLink>
            ))}

            <Link to="/contact" className="ml-1">
               <PremiumButton icon={false} className="!px-4 md:!px-5 !py-2 md:!py-2.5 text-[10px] md:text-sm">Contact</PremiumButton>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomNav;
