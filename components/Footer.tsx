
import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
    GithubIcon, 
    TwitterIcon, 
    LinkedinIcon, 
    StarIcon, 
    ArrowRightIcon, 
    FacebookIcon, 
    WireframeGlobeIcon,
    YoutubeIcon,
    InstagramIcon
} from './Icons';

const Footer: React.FC = () => {
    const logoUrl = "https://res.cloudinary.com/dow2sbjsp/image/upload/v1763314768/Sameer_en7cdu.png";
    const location = useLocation();
    const navigate = useNavigate();

    // 3D Perspective Control for the Mission Card
    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);
    const mouseXSpring = useSpring(cardX, { stiffness: 120, damping: 20 });
    const mouseYSpring = useSpring(cardY, { stiffness: 120, damping: 20 });
    
    // Rotation & Tilt Parallax Values
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        cardX.set((e.clientX - rect.left) / rect.width - 0.5);
        cardY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        cardX.set(0);
        cardY.set(0);
    };

    const handleScrollToReviews = () => {
        if (location.pathname === '/') {
            document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/', { state: { scrollTo: 'reviews' } });
        }
    };

    const navData = {
        'Learn': [
            { name: 'About', path: '/about' },
            { name: 'Blog', path: '/blog' },
            { name: 'Explore', path: '/services' }
        ],
        'Explore': [
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/portfolio', badge: 'NEW' },
            { name: 'Services', path: '/services' },
            { name: 'Contact', path: '/contact' }
        ],
        'Our Services': [
            { name: 'Website Development', path: '/web-development' },
            { name: 'SEO Optimization', path: '/seo-optimization' },
            { name: 'App Development', path: '/app-development' },
            { name: 'Shopify Development', path: '/shopify-development' },
            { name: 'WordPress Customization', path: '/wordpress-customization' }
        ]
    };

    return (
        <footer className="bg-[#020617] relative overflow-hidden font-sans pt-32">
            
            {/* --- 1. DIGITAL CORE BACKGROUND --- */}
            <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[180px] opacity-60"></div>
                
                {/* Central Processor Animation */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                        animate={{ 
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.95, 1, 0.95]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[500px] h-[500px] bg-slate-900/20 border border-white/5 rounded-[5rem] backdrop-blur-3xl relative"
                    >
                        <div className="absolute inset-12 border border-cyan-500/10 rounded-[4rem]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500/10 rounded shadow-[0_0_80px_rgba(249,115,22,0.3)] blur-[6px] animate-pulse"></div>
                        
                        {/* Animated Circuit Traces */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
                            <div key={rot} style={{ transform: `rotate(${rot}deg)` }} className="absolute top-1/2 left-1/2 w-full h-px origin-left">
                                <motion.div 
                                    animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: rot/90 }}
                                    className="w-40 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* --- 2. DEEP 3D ACTION CARD (Sized down as requested) --- */}
            <div className="container mx-auto px-4 relative z-30">
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                        rotateX, 
                        rotateY, 
                        transformStyle: "preserve-3d" 
                    }}
                    className="relative max-w-5xl mx-auto perspective-2000 group cursor-default -mb-24 md:-mb-32"
                >
                    <div className="bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-[#020617] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between shadow-[0_80px_150px_-40px_rgba(0,0,0,1)] backdrop-blur-3xl overflow-hidden">
                        
                        {/* Glass Grain Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        
                        {/* Floating Glows */}
                        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-cyan-400/10 rounded-full blur-[140px] group-hover:bg-cyan-400/20 transition-colors duration-1000"></div>

                        {/* Text Layer */}
                        <motion.div 
                            className="relative z-10 md:w-3/5" 
                            style={{ transform: "translateZ(80px)" }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black tracking-[0.4em] uppercase mb-8 shadow-inner">
                                Infrastructure Lab
                            </span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-10 leading-[0.9] tracking-tighter drop-shadow-2xl">
                                Experience <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-indigo-400">Digital Mastery.</span>
                            </h3>
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(34, 211, 238, 0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-black px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl flex items-center gap-3"
                                >
                                    Start a Mission
                                    <ArrowRightIcon className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Globe Layer */}
                        <motion.div 
                            className="md:w-2/5 flex justify-end relative mt-8 md:mt-0" 
                            style={{ transform: "translateZ(150px)" }}
                        >
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 text-cyan-400/20 group-hover:text-cyan-400/50 transition-colors duration-1000 filter drop-shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                            >
                                <WireframeGlobeIcon className="w-full h-full stroke-[0.25]" />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* --- 3. FULL-WIDTH ARCHITECTURAL BOX --- */}
            <div className="w-full bg-[#010413] border-t border-white/5 relative z-10 pt-48 md:pt-64 pb-16">
                
                {/* 100% Width Kinetic Social Bar */}
                <div className="w-full grid grid-cols-1 md:grid-cols-4 border-b border-white/5">
                    {[
                        { name: 'Facebook', color: 'hover:bg-blue-600', path: '#' },
                        { name: 'Twitter', color: 'hover:bg-cyan-400', path: '#' },
                        { name: 'LinkedIn', color: 'hover:bg-indigo-700', path: '#' },
                        { name: 'Instagram', color: 'hover:bg-pink-600', path: '#' }
                    ].map((social) => (
                        <a 
                            key={social.name} 
                            href={social.path}
                            className={`group flex items-center justify-between p-14 border-r border-white/5 last:border-r-0 relative overflow-hidden transition-all duration-700 ${social.color}`}
                        >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.05] transition-colors"></div>
                            <div className="relative z-10">
                                <span className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 group-hover:text-white/60 transition-colors">Digital Social</span>
                                <span className="text-white text-3xl font-black tracking-tight group-hover:tracking-[0.1em] transition-all duration-500">{social.name}</span>
                            </div>
                            <div className="relative z-10">
                                <ArrowRightIcon className="w-12 h-12 text-white/5 group-hover:text-white group-hover:translate-x-6 transition-all duration-700" />
                            </div>
                        </a>
                    ))}
                </div>

                {/* Main Navigation (Architectural Grid) */}
                <div className="w-full px-8 md:px-16 lg:px-32 mt-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-28">
                        
                        {/* Brand Engine */}
                        <div className="space-y-12">
                            <Link to="/" className="group inline-block">
                                <img src={logoUrl} alt="Logo" className="h-16 w-auto transition-all duration-700 group-hover:scale-110 group-hover:brightness-125" />
                            </Link>
                            <div className="space-y-6">
                                <p className="text-slate-400 text-base leading-relaxed max-w-xs font-medium">
                                    Engineering high-performance digital ecosystems. Sameer Digital Lab architectures excellence for global market leaders.
                                </p>
                                {/* Social icons removed from here as requested */}
                            </div>
                        </div>

                        {/* Navigation Columns with Schematic Dividers */}
                        {Object.entries(navData).map(([category, links]) => (
                            <div key={category} className="space-y-12 lg:pl-12 lg:border-l border-white/5">
                                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]"></span>
                                    {category}
                                </h4>
                                <ul className="space-y-6">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link 
                                                to={link.path} 
                                                className="text-slate-500 hover:text-white transition-all duration-300 text-lg font-bold flex items-center gap-4 group/link"
                                            >
                                                <div className="w-6 h-[1px] bg-slate-800 group-hover/link:w-12 group-hover/link:bg-cyan-400 transition-all duration-500"></div>
                                                <span className="group-hover/link:translate-x-2 transition-transform duration-500">{link.name}</span>
                                                {link.badge && (
                                                    <span className="bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] animate-pulse ml-1">
                                                        {link.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Technical Bar */}
                    <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="flex flex-wrap justify-center gap-12 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
                            <span>© 2024 Sameer Digital Lab</span>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Architecture</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Security Protocol</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Legal Framework</a>
                        </div>
                        
                        <div 
                            onClick={handleScrollToReviews}
                            className="flex items-center gap-4 px-8 py-3.5 rounded-2xl bg-[#0a0f1d] border border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-2xl"
                        >
                            <div className="flex text-yellow-500 gap-1">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3 h-3 fill-current" />)}
                            </div>
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">Engineering Success</span>
                        </div>
                    </div>
                </div>

                {/* Perspective Horizon Underlay */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/[0.015] to-transparent pointer-events-none"></div>
            </div>
        </footer>
    );
};

export default Footer;
