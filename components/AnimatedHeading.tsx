
import React from 'react';
// Fix: Import the 'Variants' type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, className }) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: i * 0.04 },
    }),
  };

  // Fix: Explicitly typing `child` with `Variants` solves the type error.
  // TypeScript was inferring the `type` property in `transition` as a generic `string`,
  // but framer-motion expects a specific literal type (e.g., 'spring', 'tween').
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={`overflow-hidden flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className="mr-2"
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedHeading;
