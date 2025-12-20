
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
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-lg border border-slate-700/60 rounded-full p-1.5 shadow-lg shadow-cyan-500/10 max-w-full overflow-visible">
            <Link to="/" className="flex-shrink-0 flex items-center justify-center px-2">
              <img src={logoUrl} alt="Sameer Digital Lab" className="h-8 w-auto"/>
            </Link>
            
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold text-slate-200 transition-all duration-300 border border-transparent hover:bg-slate-800 relative"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
              >
                {link.name}
                {link.badge && (
                  <span className="absolute -top-2.5 -right-1 bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)] tracking-tighter uppercase whitespace-nowrap">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <Link to="/contact" className="ml-1">
               <PremiumButton icon={false} className="!px-4 !py-2 !text-xs">Contact</PremiumButton>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomNav;
