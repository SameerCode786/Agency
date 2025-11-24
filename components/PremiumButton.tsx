
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from './Icons';

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: boolean;
  className?: string;
  width?: 'full' | 'auto';
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  onClick, 
  icon = true, 
  className = "",
  width = 'auto' 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-10 py-4 font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 hover:shadow-cyan-500/30 ${width === 'full' ? 'w-full' : 'inline-block'} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
        <div className="relative flex items-center justify-center gap-2 z-10">
          <span className="relative overflow-hidden h-6 flex items-center">
             <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                {children}
             </span>
             <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-white">
                {children}
             </span>
          </span>
          {icon && (
            <motion.div 
                className="ml-1"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <ArrowRightIcon className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
    </motion.button>
  );
};

export default PremiumButton;
