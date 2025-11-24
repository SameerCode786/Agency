
import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, TwitterIcon, LinkedinIcon, StarIcon } from './Icons';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const logoUrl = "https://res.cloudinary.com/dow2sbjsp/image/upload/v1763314768/Sameer_en7cdu.png";

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[100px] right-0 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Reviews */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
              Do you like <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">what you see?</span>
            </h2>
            
            <Link to="/contact">
                <button className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold text-lg hover:bg-cyan-50 transition-colors duration-300 mb-8 flex items-center gap-2">
                    Start a project 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </Link>

            {/* Google Review Badge Simulation */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
                <div className="bg-white p-2 rounded-full">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
                <div>
                    <div className="flex text-yellow-400 text-xs mb-1">
                        <StarIcon className="w-4 h-4 fill-current" />
                        <StarIcon className="w-4 h-4 fill-current" />
                        <StarIcon className="w-4 h-4 fill-current" />
                        <StarIcon className="w-4 h-4 fill-current" />
                        <StarIcon className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-white text-xs font-bold">5.0 <span className="text-slate-400 font-normal">from 69 reviews</span></p>
                </div>
            </div>
          </div>

          {/* Column 2: Learn */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Learn</h3>
            <ul className="space-y-3">
              {['About', 'Culture', 'Testimonials', 'Processes', 'FAQs', 'Branding FAQs', 'Blog'].map((item) => (
                <li key={item}>
                    <Link 
                        to={item === 'About' ? '/about' : item === 'Blog' ? '/blog' : '#'} 
                        className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                        {item}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Explore</h3>
            <ul className="space-y-3">
                <li><Link to="/" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Home</Link></li>
                <li>
                    <Link to="/portfolio" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2">
                        Work <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                    </Link>
                </li>
                <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Services</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Careers</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Sectors</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Hex Test</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Our Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Our Services</h3>
            <ul className="space-y-3">
                {['Website Development', 'SEO Optimization', 'App Development', 'Shopify Development', 'WordPress'].map((service) => (
                     <li key={service}>
                        <Link to="/services" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                            {service}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Contact & Copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-2">
                 <Link to="/" className="mb-2 block">
                    <img src={logoUrl} alt="Sameer Digital Lab" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                 </Link>
                 <p className="text-slate-500 text-xs">&copy; {new Date().getFullYear()} Sameer Digital Lab. All rights reserved.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-slate-400">
                <div>
                    <p className="text-white font-bold mb-1">Get in touch</p>
                    <p className="mb-1 hover:text-cyan-400 transition-colors"><a href="tel:01942894596">01942 894 596</a></p>
                    <p className="hover:text-cyan-400 transition-colors"><a href="mailto:hello@madebyshape.co.uk">hello@sameerdigitallab.com</a></p>
                </div>
                 <div>
                    <p className="text-white font-bold mb-1">Location</p>
                    <p>Cyberspace, Global</p>
                    <p>Planet Earth</p>
                </div>
            </div>
            
             <div className="flex gap-4">
                <motion.a href="#" whileHover={{ y: -3, color: '#fff' }} className="text-slate-500 transition-colors"><TwitterIcon className="h-5 w-5"/></motion.a>
                <motion.a href="#" whileHover={{ y: -3, color: '#fff' }} className="text-slate-500 transition-colors"><GithubIcon className="h-5 w-5"/></motion.a>
                <motion.a href="#" whileHover={{ y: -3, color: '#fff' }} className="text-slate-500 transition-colors"><LinkedinIcon className="h-5 w-5"/></motion.a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
