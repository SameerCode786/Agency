import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({ children, className = '' }) => {
  return (
    <motion.section
      className={`min-h-screen w-full flex flex-col items-center justify-center py-24 sm:py-32 ${className}`}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
};

export default ScrollRevealSection;
