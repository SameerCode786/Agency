
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GithubIcon, TwitterIcon, LinkedinIcon, StarIcon } from './Icons';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const logoUrl = "https://res.cloudinary.com/dow2sbjsp/image/upload/v1763314768/Sameer_en7cdu.png";
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToReviews = () => {
    if (location.pathname === '/') {
        const element = document.getElementById('reviews');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        navigate('/', { state: { scrollTo: 'reviews' } });
    }
  };

  const serviceLinks = [
      { name: 'Website Development', path: '/web-development' },
      { name: 'SEO Optimization', path: '/seo-optimization' },
      { name: 'App Development', path: '/app-development' },
      { name: 'Shopify Development', path: '/shopify-development' },
      { name: 'WordPress Customization', path: '/wordpress-customization' },
  ];

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

            {/* Client Testimonials Badge */}
            <div 
                onClick={handleScrollToReviews}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm cursor-pointer hover:border-cyan-500/50 transition-all duration-300 group"
            >
                <div className="bg-slate-800 p-2 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                     {/* User Group Icon */}
                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
                    <p className="text-white text-xs font-bold group-hover:text-cyan-400 transition-colors">Client Testimonials</p>
                </div>
            </div>
          </div>

          {/* Column 2: Learn */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Learn</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">About</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Blog</Link></li>
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
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Our Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Our Services</h3>
            <ul className="space-y-3">
                {serviceLinks.map((service) => (
                     <li key={service.name}>
                        <Link to={service.path} className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                            {service.name}
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
                    <p className="hover:text-cyan-400 transition-colors"><a href="mailto:hello@sameerdigitallab.com">hello@sameerdigitallab.com</a></p>
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
