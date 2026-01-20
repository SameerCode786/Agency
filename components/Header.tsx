import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from './PremiumButton';
import { MenuIcon } from './Icons';
import MobileOffCanvasMenu from './MobileOffCanvasMenu';

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
    <>
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

                <nav className="hidden lg:flex items-center space-x-10">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium relative group py-2"
                      style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                    >
                      {link.name}
                      {link.badge && (
                        <span className="absolute -top-3 -right-4 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.6)] flex items-center justify-center min-w-[18px] tracking-tighter uppercase whitespace-nowrap">
                          {link.badge}
                        </span>
                      )}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </NavLink>
                  ))}
                </nav>
                
                <div className="hidden lg:block">
                  <Link to="/contact">
                      <PremiumButton icon={false} className="!px-6 !py-2">Contact Us</PremiumButton>
                  </Link>
                </div>

                {/* Mobile Hamburger Trigger */}
                <div className="lg:hidden flex items-center gap-4">
                  <button 
                    onClick={() => setMenuOpen(true)} 
                    className="p-2 bg-white/5 rounded-xl text-cyan-400 border border-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Open navigation menu"
                  >
                    <MenuIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Premium Off-Canvas Mobile Menu */}
      <MobileOffCanvasMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;