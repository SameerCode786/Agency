
import React from 'react';
import { motion } from 'framer-motion';
import { LoaderIcon } from './Icons';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Preloader: React.FC = () => {
  const text = "SameerCodes Studios — Where Creativity Meets Technology…";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-light text-slate-300 tracking-wider text-center"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <LoaderIcon className="h-12 w-12 text-cyan-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
