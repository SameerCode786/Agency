
import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const logoUrl = "https://res.cloudinary.com/dow2sbjsp/image/upload/v1763314768/Sameer_en7cdu.png";
  return (
    <footer className="bg-black border-t border-cyan-500/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <img src={logoUrl} alt="Sameer Digital Lab Logo" className="h-24 w-auto mb-6" />
            <p className="text-gray-400 text-sm">
              Crafting premium digital experiences that innovate and inspire.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"><TwitterIcon className="h-7 w-7" /></a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"><GithubIcon className="h-7 w-7" /></a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"><LinkedinIcon className="h-7 w-7" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Portfolio</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@sameercodes.online</li>
              <li>Phone: +91 XXXXX XXXXX</li>
              <li>Location: Cyberspace</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates on tech, design, and innovation.</p>
            <form className="flex">
              <input type="email" placeholder="Your Email" className="w-full bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button type="submit" className="bg-cyan-500 text-black px-4 rounded-r-md font-semibold hover:bg-cyan-400 transition-colors duration-300">
                Go
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sameer Digital Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;