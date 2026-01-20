import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ArrowRightIcon } from './Icons';
import PremiumButton from './PremiumButton';

interface MobileOffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Web Development', path: '/web-development' },
  { name: 'WordPress', path: '/wordpress-customization' },
  { name: 'Shopify', path: '/shopify-development' },
  { name: 'App Development', path: '/app-development' },
  { name: 'SEO', path: '/seo-optimization' },
  { name: 'Blogs', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const MobileOffCanvasMenu: React.FC<MobileOffCanvasMenuProps> = ({ isOpen, onClose }) => {
  
  // Body scroll lock
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
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />

          {/* Side Panel */}
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 z-[101] w-[85%] max-w-sm bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col lg:hidden"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                LAB MENU.
              </span>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-8 px-6 no-scrollbar">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => `
                        flex items-center justify-between py-4 text-lg font-bold transition-all duration-300 group
                        ${isActive ? 'text-cyan-400 pl-4 border-l-2 border-cyan-400' : 'text-slate-400 hover:text-white hover:pl-2'}
                      `}
                    >
                      {item.name}
                      <ArrowRightIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer / CTA Section */}
            <div className="p-8 bg-slate-900/50 border-t border-white/5 space-y-4">
              <Link to="/contact" onClick={onClose} className="block w-full">
                <PremiumButton width="full" icon={true} className="!py-4 shadow-xl shadow-cyan-500/10">
                  Free Consultation
                </PremiumButton>
              </Link>
              <Link 
                to="/portfolio" 
                onClick={onClose}
                className="block w-full text-center py-3 text-sm font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileOffCanvasMenu;