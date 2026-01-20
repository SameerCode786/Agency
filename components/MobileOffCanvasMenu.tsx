import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ArrowRightIcon } from './Icons';
import PremiumButton from './PremiumButton';

// Exact same structure as Header.tsx
const navLinks = [
  { name: 'Services', path: '/services', badge: '5' },
  { name: 'Work', path: '/portfolio', badge: 'NEW 4' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

interface MobileOffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileOffCanvasMenu: React.FC<MobileOffCanvasMenuProps> = ({ isOpen, onClose }) => {
  
  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const panelVariants = {
    closed: { 
      x: '100%', 
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    },
    open: { 
      x: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40, 
        staggerChildren: 0.07, 
        delayChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md lg:hidden"
          />

          {/* Off-Canvas Panel */}
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 z-[101] w-[80%] max-w-sm bg-slate-950 border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col lg:hidden"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-xl font-black tracking-tighter text-white">
                SAMEER<span className="text-cyan-400">CODES.</span>
              </span>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links (Mirrored from Desktop) */}
            <nav className="flex-1 overflow-y-auto py-10 px-8 no-scrollbar">
              <div className="flex flex-col space-y-6">
                {navLinks.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => `
                        flex items-center justify-between text-2xl font-bold transition-all duration-300 group
                        ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}
                      `}
                    >
                      <span className="flex items-center gap-3">
                        {item.name}
                        {item.badge && (
                          <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ArrowRightIcon className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Panel Footer (CTA Button Mirrored from Desktop) */}
            <div className="p-8 bg-slate-900/30 border-t border-white/5">
              <motion.div variants={itemVariants}>
                <Link to="/contact" onClick={onClose}>
                  <PremiumButton width="full" icon={true} className="!py-5 !text-base shadow-2xl shadow-cyan-500/10">
                    Contact Us
                  </PremiumButton>
                </Link>
              </motion.div>
              <motion.p variants={itemVariants} className="mt-8 text-center text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                Digital Agency Lab
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileOffCanvasMenu;