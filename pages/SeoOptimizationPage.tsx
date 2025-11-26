
import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import PremiumButton from '../components/PremiumButton';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { useSeoContent } from '../hooks/useSeoContent';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { 
    CheckIcon, 
    ArrowRightIcon,
    DesignIcon,
    WalletIcon,
    TargetIcon,
    MobileIcon,
    WireframeGlobeIcon,
    StrategyIcon,
    SpeedIcon,
    CodeIcon,
    LightbulbIcon,
    MaintenanceIcon,
    SearchIcon,
    RocketIcon
} from '../components/Icons';

// --- Scroll Velocity Component ---
interface ParallaxTextProps {
    children?: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div 
                className="font-bold uppercase text-[12vw] leading-[0.85] flex whitespace-nowrap flex-nowrap" 
                style={{ x }}
            >
                <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
                <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
                <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
                <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
            </motion.div>
        </div>
    );
}

// --- Tools Marquee ---
// Using existing icons to represent SEO tools conceptually
const seoTools = [
    { name: 'Google Analytics', icon: <StrategyIcon className="w-12 h-12 text-orange-400" /> },
    { name: 'Search Console', icon: <SearchIcon className="w-12 h-12 text-blue-400" /> },
    { name: 'PageSpeed Insights', icon: <SpeedIcon className="w-12 h-12 text-green-400" /> },
    { name: 'Technical Audit', icon: <CodeIcon className="w-12 h-12 text-purple-400" /> },
    { name: 'Keyword Research', icon: <LightbulbIcon className="w-12 h-12 text-yellow-400" /> },
    { name: 'Content Strategy', icon: <DesignIcon className="w-12 h-12 text-red-400" /> },
    { name: 'Link Building', icon: <WireframeGlobeIcon className="w-12 h-12 text-cyan-400" /> },
    { name: 'Local SEO', icon: <MobileIcon className="w-12 h-12 text-pink-400" /> },
];

const ToolsMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-slate-900 py-12 border-y border-slate-800 mt-12">
             <div className="container mx-auto px-4 mb-8 text-center">
                 <h2 className="text-2xl font-bold text-white mb-2">Advanced SEO Tools & Strategy</h2>
                 <p className="text-slate-500">We leverage data-driven tools to maximize your visibility</p>
             </div>
             <motion.div 
                className="flex gap-16 min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             >
                 {[...seoTools, ...seoTools, ...seoTools].map((tool, i) => (
                     <div key={i} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                         {tool.icon}
                         <span className="text-slate-400 font-mono text-sm">{tool.name}</span>
                     </div>
                 ))}
             </motion.div>
        </div>
    );
}

const capabilities = [
    "Keyword Research",
    "On-Page Optimization",
    "Technical SEO",
    "Link Building",
    "Content Strategy",
    "Local SEO",
    "E-commerce SEO"
];

const faqs = [
    { q: "How long does it take to see SEO results?", a: "SEO is a long-term strategy. Typically, you can expect to see noticeable improvements in 3 to 6 months, but substantial results usually take 6 to 12 months depending on competition." },
    { q: "Do you guarantee #1 rankings?", a: "No ethical agency can guarantee a #1 ranking because Google's algorithm is constantly changing. However, we guarantee proven strategies, transparent reporting, and significant improvements in traffic and visibility." },
    { q: "What is the difference between SEO and PPC?", a: "SEO (Search Engine Optimization) focuses on earning organic traffic through high-quality content and technical optimization. PPC (Pay-Per-Click) involves paying for ads to appear at the top of results. SEO offers sustainable, long-term growth, while PPC offers immediate visibility." },
    { q: "Do I need SEO if I have a small business?", a: "Absolutely. Local SEO is powerful for small businesses. It helps customers in your area find you exactly when they need your services." },
    { q: "What does your monthly SEO service include?", a: "Our monthly plans typically include technical audits, content creation, keyword tracking, backlink acquisition, on-page optimization updates, and a detailed performance report." },
    { q: "Can you fix my website's speed?", a: "Yes. Site speed is a major ranking factor. We optimize images, code, and server response times to ensure your site loads lightning fast." },
    { q: "Do you do SEO for E-commerce sites?", a: "Yes, we specialize in E-commerce SEO for platforms like Shopify, WooCommerce, and custom builds, focusing on product optimization and category structure." },
    { q: "Is SEO a one-time cost?", a: "While technical setups can be one-time, SEO is an ongoing process. Competitors are always optimizing, and search algorithms change. Continuous effort keeps you ahead." },
];

const whatWeDoServices = [
    {
        title: "Keyword Research",
        desc: "Identifying high-value search terms that your potential customers are actually using.",
        icon: <LightbulbIcon className="w-10 h-10 text-yellow-400" />
    },
    {
        title: "On-Page SEO",
        desc: "Optimizing content, meta tags, and internal linking structure for maximum relevance.",
        icon: <CodeIcon className="w-10 h-10 text-blue-400" />
    },
    {
        title: "Technical SEO",
        desc: "Improving site architecture, speed, and mobile-friendliness for better crawling.",
        icon: <SpeedIcon className="w-10 h-10 text-green-400" />
    },
    {
        title: "Content Strategy",
        desc: "Creating valuable, authority-building content that ranks and converts.",
        icon: <DesignIcon className="w-10 h-10 text-purple-400" />
    },
    {
        title: "Link Building",
        desc: "Acquiring high-quality backlinks to boost your domain authority and trust.",
        icon: <WireframeGlobeIcon className="w-10 h-10 text-cyan-400" />
    },
    {
        title: "Local SEO",
        desc: "Dominating local search results to drive foot traffic and local leads.",
        icon: <TargetIcon className="w-10 h-10 text-red-400" />
    }
];

const SeoOptimizationPage: React.FC = () => {
    const { title, description } = useSeoContent('SEO Optimization');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const techSectionRef = useRef<HTMLDivElement>(null);
    const whoWeWorkWithRef = useRef<HTMLDivElement>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const scrollToWhoWeWorkWith = () => {
        whoWeWorkWithRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <PageWrapper>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            {/* HERO SECTION */}
            <section className="relative pt-40 pb-24 bg-slate-950 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex flex-col justify-center">
                
                {/* Particle Background Animation */}
                <ParticleBackground />
                <div className="absolute inset-0 bg-slate-950/80 pointer-events-none z-0"></div>

                {/* Background Blobs (for color depth) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

                <div className="container mx-auto relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center w-full max-w-6xl"
                    >
                        {/* Pill Badge */}
                        <div className="inline-flex items-center justify-center px-6 py-2 mb-8 rounded-full border border-green-500/30 bg-slate-900/50 backdrop-blur-md">
                            <span className="text-green-400 text-xs md:text-sm font-bold tracking-widest uppercase">
                                Dominate Search Results & Drive Traffic
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-16 tracking-tight leading-none">
                            SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Optimization</span>
                        </h1>
                        
                        {/* Two Column Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
                            
                            {/* Card 1: Data-Driven Strategy */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-green-500/30 hover:bg-slate-900/60 transition-all duration-300 group">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Data-Driven Strategy</h3>
                                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                                    We don't guess. We analyze data, competitors, and market trends to build a strategy that targets the right audience and maximizes ROI. Our approach ensures every keyword and link serves a purpose.
                                </p>
                            </div>

                            {/* Card 2: Sustainable Growth */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 group">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Sustainable Growth</h3>
                                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                                    SEO isn't a quick fix; it's a long-term investment. We focus on ethical, white-hat techniques that build lasting authority, consistent traffic, and higher rankings that withstand algorithm updates.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

             {/* VISUAL SECTION */}
             <section className="py-12 bg-slate-950">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                         className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden group shadow-2xl shadow-green-900/20"
                     >
                         <img 
                             src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                             alt="SEO Analytics" 
                             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
                         
                         <button 
                             onClick={scrollToWhoWeWorkWith}
                             className="absolute top-8 left-8 bg-[#111] text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-black transition-all duration-300 border border-white/10 shadow-xl group/btn z-20"
                         >
                             <span className="text-sm font-medium">Discover more</span>
                             <ArrowRightIcon className="w-4 h-4 transform -rotate-45 text-gray-400 group-hover/btn:text-white transition-colors" />
                         </button>
                     </motion.div>
                 </div>
            </section>

            {/* WHAT WE DO */}
            <section className="py-24 bg-slate-950 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">What We Do</h2>
                            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                                We elevate your brand's online presence, ensuring you're found by the people who matter most—your future customers.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link to="/contact">
                                <PremiumButton icon={true}>Start Ranking Higher</PremiumButton>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {whatWeDoServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-green-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-300 flex flex-col"
                            >
                                <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-green-500/20">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed mb-6 flex-grow">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/contact">
                             <button className="inline-flex items-center gap-2 text-white border-b border-green-500 pb-1 hover:text-green-400 transition-colors text-lg font-medium group">
                                Get a Free SEO Audit
                                <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                             </button>
                        </Link>
                    </div>
                </div>
            </section>

             {/* SCROLLING TEXT */}
             <section className="py-12 bg-slate-950 overflow-hidden border-t border-slate-900">
                <ParallaxText baseVelocity={3}>Be found first.</ParallaxText>
             </section>

            {/* PRECISION & STRATEGY */}
            <section ref={techSectionRef} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Content Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                             <div className="mb-6 flex items-center gap-3">
                                <div className="h-px w-12 bg-green-500"></div>
                                <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Optimization & Results</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
                                We Optimize With <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Precision, Analysis,</span> and Proven Methods
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed mb-8">
                                SEO is more than just keywords. It's about creating a seamless user experience, technically perfect code, and authoritative content that search engines love.
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed mb-10">
                                We track, measure, and refine constantly. No black-hat tricks, just solid engineering and marketing principles that deliver consistent growth for your business.
                            </p>
                            
                            <div className="flex gap-4">
                                <Link to="/portfolio">
                                    <PremiumButton icon={true}>View Case Studies</PremiumButton>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative h-full min-h-[500px] w-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-2xl transform rotate-3 scale-95 blur-lg opacity-60"></div>
                            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Data Analysis" 
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-950/20"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                <ToolsMarquee />
            </section>

             {/* PARTNERSHIPS & CAPABILITIES */}
             <section ref={whoWeWorkWithRef} className="py-24 bg-slate-900 relative border-t border-slate-800">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* Left Column: Who We Work With */}
                        <div className="flex flex-col justify-start">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-green-500/10 text-green-400 text-sm font-bold tracking-widest uppercase mb-6 border border-green-500/20">
                                    Partnerships
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    Who We Work With
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                    We work with local businesses wanting more foot traffic, e-commerce stores seeking sales, and enterprises needing global visibility.
                                </p>
                                <Link to="/contact">
                                    <PremiumButton className="px-8 py-3">Get in touch</PremiumButton>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Column: Capabilities */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-green-500 pl-4">
                                    Our SEO Capabilities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {capabilities.map((cap, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors group"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform"></div>
                                            <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{cap}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                    </div>
                 </div>
            </section>

            {/* FAQs - Sticky Layout */}
            <section className="py-32 bg-slate-950 relative border-t border-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 relative">
                        
                        {/* Sticky Sidebar - Left */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-32">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                        The answers to your questions.
                                    </h2>
                                    <p className="text-slate-400 text-lg mb-10 max-w-sm">
                                        Can't find what you're looking for? Get in touch directly with our team.
                                    </p>
                                    <Link to="/contact">
                                        <PremiumButton className="px-10 py-4">Get in touch</PremiumButton>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Scrollable FAQs - Right */}
                        <div className="lg:w-2/3">
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-800"
                                    >
                                        <button 
                                            onClick={() => toggleFaq(index)}
                                            className="w-full text-left py-8 flex justify-between items-center focus:outline-none group"
                                        >
                                            <span className="text-xl md:text-2xl font-medium text-slate-200 group-hover:text-green-400 transition-colors pr-8">
                                                {faq.q}
                                            </span>
                                            <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''} text-green-400 flex-shrink-0 bg-slate-900 p-2 rounded-full`}>
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {activeFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-8 text-slate-400 text-lg leading-relaxed whitespace-pre-line max-w-3xl">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
             <section className="py-24 bg-slate-900 border-t border-slate-800 text-center">
                 <div className="container mx-auto px-4">
                     <h2 className="text-4xl font-bold text-white mb-6">Ready to rank higher?</h2>
                     <Link to="/contact">
                        <PremiumButton className="text-lg px-12 py-4">Let's Talk SEO</PremiumButton>
                     </Link>
                 </div>
             </section>

        </PageWrapper>
    );
};

export default SeoOptimizationPage;
