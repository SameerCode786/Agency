import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StylizedCta = () => {
  return (
    <div className="bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative py-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
        >
          <Link to="/contact" className="inline-block">
            <h2 className="stylized-text text-5xl sm:text-7xl lg:text-9xl font-light uppercase tracking-widest relative text-cyan-400">
              Digital Developer
            </h2>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default StylizedCta;
