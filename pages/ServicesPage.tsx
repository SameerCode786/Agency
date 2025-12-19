
import React, { useState, useRef, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import PremiumButton from '../components/PremiumButton';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame, MotionValue } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { 
    CodeIcon, 
    DesignIcon, 
    StrategyIcon,
    ArrowRightIcon,
    WalletIcon,
    WordPressIcon,
    SearchIcon,
    ReactIcon,
    JsIcon,
    VueIcon,
    NuxtIcon,
    LaravelIcon,
    PhpIcon,
    DatabaseIcon,
    CubeIcon,
    ApiIcon,
    ShoppingCartIcon,
    CloudIcon,
    CheckIcon,
    HtmlIcon,
    CssIcon,
    SupabaseIcon
} from '../components/Icons';
import { Link } from 'react-router-dom';
import { useSeoContent } from '../hooks/useSeoContent';

// --- Mouse Following Gradient & 3D Tilt Hook ---
const useHeroInteractions = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor tracking
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX: smoothX, mouseY: smoothY };
};

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
        if (velocityFactor.get() < 0) directionFactor.current = -1;
        else if (velocityFactor.get() > 0) directionFactor.current = 1;
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div 
                className="font-bold uppercase text-[10vw] md:text-[7vw] leading-[0.85] flex whitespace-nowrap flex-nowrap text-slate-800" 
                style={{ x }}
            >
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
            </motion.div>
        </div>
    );
}

// --- 3D PROCESS CARD COMPONENT ---
interface ProcessCardProps {
    i: number;
    title: string;
    subtitle: string;
    description: string;
    points: string[];
    icon: React.ReactNode;
    scrollYProgress: MotionValue<number>;
    total: number;
    color: string;
}

const ThreeDProcessCard: React.FC<ProcessCardProps> = ({ i, title, subtitle, description, points, icon, scrollYProgress, total, color }) => {
    const step = useTransform(scrollYProgress, [0, 1], [0, total]);
    const x = useTransform(step, [i - 1, i, i + 1], ['120%', '0%', '-120%']);
    const y = useTransform(step, [i - 1, i, i + 1], ['60%', '0%', '-60%']);
    const scale = useTransform(step, [i - 1, i, i + 1], [0.7, 1, 0.7]);
    const opacity = useTransform(step, [i - 0.6, i - 0.4, i, i + 0.4, i + 0.6], [0, 1, 1, 1, 0]);
    const rotateY = useTransform(step, [i - 1, i, i + 1], [45, 0, -45]);
    const rotateZ = useTransform(step, [i - 1, i, i + 1], [5, 0, -5]);
    const zIndex = useTransform(step, (currentStep) => 100 - Math.round(Math.abs(currentStep - i) * 10));

    return (
        <motion.div 
            style={{ x, y, scale, opacity, rotateY, rotateZ, zIndex, position: 'absolute', perspective: '1500px' }}
            className="w-full max-w-5xl px-4 md:px-0 flex items-center justify-center pointer-events-none"
        >
            <div className="relative flex flex-col md:flex-row w-full bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-black/80 origin-center h-[60vh] md:h-[55vh] pointer-events-auto transform-gpu">
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" style={{ maskImage: 'linear-gradient(white, white), linear-gradient(white, white)', maskClip: 'content-box, border-box', maskComposite: 'xor' }}></div>
                <div className={`absolute -top-40 -right-40 w-96 h-96 ${color} rounded-full blur-[150px] opacity-20 pointer-events-none`}></div>
                <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${color} rounded-full blur-[150px] opacity-10 pointer-events-none`}></div>
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-8 md:pb-0 md:pr-12 relative z-10">
                    <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center mb-6">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-slate-700/50 border-t-white/30 border-l-white/30" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-slate-700/50 border-b-white/30 border-r-white/30" />
                        <div className={`absolute inset-0 rounded-full ${color} opacity-20 blur-2xl animate-pulse`}></div>
                        <div className="relative z-10 bg-slate-950 rounded-full p-5 md:p-6 border border-slate-700 shadow-xl">{icon}</div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase text-center">{title}</h3>
                </div>
                <div className="w-full md:w-2/3 pt-8 md:pt-0 md:pl-12 flex flex-col justify-center relative z-10">
                    <h4 className="text-lg md:text-xl font-bold text-cyan-400 mb-6 font-mono tracking-wide">{subtitle}</h4>
                    <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-8">{description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {points.map((point, idx) => (
                             <div key={idx} className="flex items-start gap-3">
                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${color}`}></div>
                                <span className="text-slate-400 text-xs md:text-sm font-medium">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const buildProcess = [
    {
        title: "STRATEGY",
        subtitle: "Clear direction. Smart decisions. Strong foundations.",
        description: "We dive deep into your business, audience, and goals to shape a strategy that works. From brand clarity to product planning, everything we do is intentional and aligned with long-term growth.",
        points: ["Market & competitor research", "User & brand analysis", "Product & digital roadmaps", "Clear planning before design starts"],
        icon: <StrategyIcon className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />,
        color: "bg-cyan-500"
    },
    {
        title: "DESIGN",
        subtitle: "Design that feels good—looks great—and works everywhere.",
        description: "We create digital experiences that are clean, modern, and user-focused. Every layout, color, and interaction is crafted to make your brand stand out.",
        points: ["UX flows + wireframes", "UI design + visual identity", "Design systems for consistency", "Intuitive, friendly user journeys"],
        icon: <DesignIcon className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />,
        color: "bg-purple-500"
    },
    {
        title: "DEVELOPMENT",
        subtitle: "Fast, secure, scalable websites built with modern technology.",
        description: "We transform designs into high-performance websites and digital products using industry-leading tools and coding standards.",
        points: ["Custom websites", "Mobile-friendly interfaces", "Clean, scalable code", "Speed, SEO & security optimized"],
        icon: <CodeIcon className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />,
        color: "bg-blue-500"
    }
];

// --- DELIVERY CONTENT DATA ---
type DeliveryCategory = 'WORDPRESS' | 'WEB DEVELOPMENT' | 'SHOPIFY' | 'APP DEVELOPMENT' | 'SEO';
interface DeliveryItem { id: string; title: string; description: string; }
interface DeliverySection { statement: string; items: DeliveryItem[]; }

const deliveryContent: Record<DeliveryCategory, DeliverySection> = {
    WORDPRESS: {
        statement: "Custom WordPress solutions crafted with speed, security, and scalability in mind.",
        items: [
            { id: "01", title: "WordPress Development", description: "Custom, fast, and secure WordPress websites developed with clean, scalable code." },
            { id: "02", title: "Theme Customization", description: "Pixel-perfect customization for Elementor, Gutenberg, and any premium theme." },
            { id: "03", title: "WooCommerce", description: "High-conversion eCommerce stores built for smooth shopping experiences." },
            { id: "04", title: "Website Optimization", description: "Speed, security & performance tuning to improve rankings and conversions." },
            { id: "05", title: "Maintenance & Support", description: "Ongoing updates, fixes, and improvements handled by our expert team." },
        ]
    },
    "WEB DEVELOPMENT": {
        statement: "Modern, responsive, and scalable websites that meet the highest industry standards.",
        items: [
            { id: "01", title: "Custom Web Development", description: "Fully custom websites built using modern frameworks & clean architecture." },
            { id: "02", title: "Frontend Development", description: "HTML, CSS, JavaScript, React, Tailwind — crafted to perfection." },
            { id: "03", title: "Backend Development", description: "Secure, optimized backend (Node.js, PHP, Supabase, Firebase)." },
            { id: "04", title: "Performance Engineering", description: "Speed, SEO & Core Web Vitals improvements for better rankings." },
            { id: "05", title: "API Integration", description: "Third-party integrations for payment systems, CRMs, maps, and more." },
        ]
    },
    SHOPIFY: {
        statement: "Powerful eCommerce stores built for sales, speed, and branding.",
        items: [
            { id: "01", title: "Shopify Store Setup", description: "Complete store setup, theme installation & layout customization." },
            { id: "02", title: "Shopify Custom Theme", description: "Unique and conversion-focused theme development for your brand." },
            { id: "03", title: "App Integration", description: "Adding upsells, subscriptions, tracking, reviews & automations." },
            { id: "04", title: "Shopify Speed Optimization", description: "Faster load times, better UX, higher conversions." },
            { id: "05", title: "Shopify Support", description: "Monthly support, updates & growth-focused improvements." },
        ]
    },
    "APP DEVELOPMENT": {
        statement: "Cross-platform apps designed for seamless user experience across iOS & Android.",
        items: [
            { id: "01", title: "Mobile App Development", description: "React Native apps with clean UI and smooth functionality." },
            { id: "02", title: "UI/UX for Mobile", description: "User-friendly, intuitive interfaces designed for engagement." },
            { id: "03", title: "API & Backend System", description: "Secure backend architecture with real-time data syncing." },
            { id: "04", title: "App Optimization", description: "Improved performance, reduced load time, optimized UI flows." },
            { id: "05", title: "Post-Launch Support", description: "Bug fixing, updates, new feature rollouts." },
        ]
    },
    SEO: {
        statement: "Data-driven SEO strategies designed to grow your visibility and traffic.",
        items: [
            { id: "01", title: "On-Page SEO", description: "Titles, headings, URLs, meta tags, schema — fully optimized." },
            { id: "02", title: "Technical SEO", description: "Fix crawling, indexing, speed & structure issues." },
            { id: "03", title: "Content Strategy", description: "Keyword-rich blog planning & content that ranks." },
            { id: "04", title: "Local SEO", description: "Google Business Profile optimization for local clients." },
            { id: "05", title: "Monthly SEO Growth", description: "Ongoing SEO improvements to beat competitors & increase traffic." },
        ]
    }
};

const expertiseRows = [["HTML", "CSS", "JavaScript"], ["React.js", "React Native"], ["WordPress", "WooCommerce"], ["Node.js", "Express.js"], ["MongoDB", "Supabase"]];
const techIcons: Record<string, { icon: React.ReactNode, color: string }> = {
    "HTML": { icon: <HtmlIcon className="w-full h-full" />, color: "#E34F26" },
    "CSS": { icon: <CssIcon className="w-full h-full" />, color: "#1572B6" },
    "JavaScript": { icon: <JsIcon className="w-full h-full" />, color: "#F7DF1E" },
    "React.js": { icon: <ReactIcon className="w-full h-full" />, color: "#61DAFB" },
    "React Native": { icon: <ReactIcon className="w-full h-full" />, color: "#61DAFB" },
    "WordPress": { icon: <WordPressIcon className="w-full h-full" />, color: "#21759B" },
    "WooCommerce": { icon: <ShoppingCartIcon className="w-full h-full" />, color: "#96588A" },
    "Node.js": { icon: <CodeIcon className="w-full h-full" />, color: "#339933" },
    "Express.js": { icon: <ApiIcon className="w-full h-full" />, color: "#ffffff" },
    "MongoDB": { icon: <DatabaseIcon className="w-full h-full" />, color: "#47A248" },
    "Supabase": { icon: <SupabaseIcon className="w-full h-full" />, color: "#3ECF8E" }
};


const ServicesPage: React.FC = () => {
    const { title, description } = useSeoContent('Services');
    const [activeDeliveryTab, setActiveDeliveryTab] = useState<DeliveryCategory>('WORDPRESS');
    const [hoveredTech, setHoveredTech] = useState("React.js");
    
    // --- New Hero Interactions ---
    const { mouseX, mouseY } = useHeroInteractions();

    // 3D Tilt calculation for Hero Content
    const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);
    const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-10, 10]);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

    return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
       
       {/* REDESIGNED HERO SECTION: 4D ASYMMETRIC LAYOUT */}
       <section className="relative pt-32 pb-20 lg:pt-0 lg:pb-0 bg-slate-950 overflow-hidden h-screen min-h-[800px] flex items-center">
            
            {/* 1. Multi-Layered Fluid Gradient Background (Cursor Tracking) */}
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(circle 800px at ${x}px ${y}px, rgba(34, 211, 238, 0.2), transparent 80%)`
                    )
                }}
            />
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-color-dodge"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 70%)`
                    )
                }}
            />
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(circle 1200px at ${x}px ${y}px, rgba(59, 130, 246, 0.1), transparent 90%)`
                    )
                }}
            />

            {/* 2. Content Container with 3D Tilt */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                    {/* Left: Heading & Badge (Spatial Depth) */}
                    <div className="lg:col-span-8 lg:translate-z-50" style={{ transform: "translateZ(50px)" }}>
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/60 border border-white/10 text-white mb-8 backdrop-blur-xl shadow-2xl"
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                            <span className="text-xs font-black tracking-[0.3em] uppercase">Services / 2025</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-8 leading-[0.8] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            Modern<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-400 to-purple-600">
                                Digital Lab
                            </span>
                        </h1>

                        <div className="flex flex-wrap gap-4 mt-12">
                             {['Design', 'Strategy', 'Development', 'Growth'].map((word, i) => (
                                <motion.span 
                                    key={word}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="text-lg md:text-2xl font-serif italic text-slate-500 hover:text-white transition-colors cursor-default"
                                >
                                    {word} {i < 3 ? '—' : ''}
                                </motion.span>
                             ))}
                        </div>
                    </div>

                    {/* Right: Description & CTAs (Floating Depth) */}
                    <div className="lg:col-span-4 lg:mt-32" style={{ transform: "translateZ(30px)" }}>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[3rem] shadow-2xl relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <p className="text-slate-300 text-lg leading-relaxed mb-10 relative z-10 font-medium">
                                We turn your vision into reality with cutting-edge web and mobile applications. 
                                Our expertise in modern frameworks ensures your digital presence stands out.
                            </p>

                            <div className="flex flex-col gap-4 relative z-10">
                                <Link to="/contact">
                                    <PremiumButton width="full" className="!py-5 shadow-cyan-500/20">Get a Quote</PremiumButton>
                                </Link>
                                <Link to="/portfolio" className="group/link">
                                    <button className="w-full py-5 rounded-full border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3">
                                        View Work
                                        <ArrowRightIcon className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                        
                        {/* Decorative floating stats */}
                        <div className="mt-8 flex justify-between px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>High Performance</span>
                            <span>Scale 2025</span>
                            <span>Clean Code</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Minimal Scroll Indicator */}
            <motion.div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
            >
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
            </motion.div>
       </section>

       <section className="bg-slate-950 border-y border-slate-900 py-16 overflow-hidden">
            <ParallaxText baseVelocity={2}>DESIGN • DEVELOPMENT • STRATEGY • GROWTH • </ParallaxText>
       </section>

       <section className="py-24 bg-slate-950 relative z-20">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">How We Build Digital Experiences That Perform</h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        At Sameer Digital Lab, every project starts with a proven digital process—backed by strategy, creativity, and modern development. We research, plan, test, and deliver solutions that move your business forward.
                    </p>
                </motion.div>
           </div>
       </section>

       <section className="bg-slate-950 relative z-10" ref={containerRef}>
            <div className="h-[300vh] relative">
                <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center perspective-1000 transform-style-3d">
                        {buildProcess.map((item, index) => (
                            <ThreeDProcessCard 
                                key={index} 
                                i={index} 
                                {...item} 
                                scrollYProgress={scrollYProgress}
                                total={buildProcess.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
       </section>

       {/* WHAT WE DELIVER SECTION */}
       <section className="py-32 bg-slate-950 relative z-30 border-t border-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                <div className="text-center mb-20">
                    <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">What We Deliver</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-sans">
                        High-Quality Digital Services
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Crafted by our in-house team—designed to elevate your brand, engage your users, and fuel long-term growth.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {Object.keys(deliveryContent).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveDeliveryTab(tab as DeliveryCategory)}
                                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider transition-all duration-300 border uppercase ${
                                    activeDeliveryTab === tab
                                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                        : 'bg-transparent text-slate-400 border-slate-700 hover:text-white hover:border-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
                    <div className="lg:col-span-6 lg:sticky lg:top-32">
                        <motion.div
                            key={activeDeliveryTab + "-card"}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl group flex flex-col h-full hover:scale-[1.01] transition-transform duration-500"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-slate-950 uppercase break-words hyphens-auto pr-4">
                                        {activeDeliveryTab}
                                    </h2>
                                </div>
                                <div className="h-1.5 w-16 bg-slate-950 mb-6"></div>
                            </div>
                            <div className="mt-auto pt-24">
                                 <p className="text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight text-slate-900">
                                    {deliveryContent[activeDeliveryTab].statement}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-6 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDeliveryTab + "-list"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full"
                            >
                                {deliveryContent[activeDeliveryTab].items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group flex flex-col items-start border-l-2 border-slate-800 pl-6 hover:border-cyan-500 transition-colors duration-300"
                                    >
                                        <span className="text-4xl font-light text-slate-600 mb-2 font-mono group-hover:text-cyan-400 transition-colors duration-300">
                                            {item.id}
                                        </span>
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
       </section>

       {/* OUR EXPERTISE SECTION */}
       <section className="py-24 bg-black relative overflow-hidden z-30">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
                <motion.div 
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(34,211,238,0.05),transparent)] z-0"
                ></motion.div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="mb-6">
                            <h2 className="text-white text-3xl font-bold font-sans tracking-tight">Our Expertise</h2>
                        </div>
                        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-800 bg-slate-900 flex items-center justify-center p-12">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={hoveredTech}
                                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ color: techIcons[hoveredTech]?.color || '#ffffff' }}
                                >
                                    {techIcons[hoveredTech]?.icon || techIcons["React.js"].icon}
                                </motion.div>
                             </AnimatePresence>
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                             <div className="absolute bottom-8 left-0 right-0 text-center">
                                <motion.div key={hoveredTech + "text"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 block">Technology</span>
                                    <h3 className="text-white text-2xl font-bold">{hoveredTech}</h3>
                                </motion.div>
                             </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="flex flex-col gap-2 md:gap-4 select-none">
                            {expertiseRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex flex-wrap items-center gap-x-2 md:gap-x-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    {row.map((tech, techIndex) => (
                                        <React.Fragment key={tech}>
                                            <motion.span
                                                onMouseEnter={() => setHoveredTech(tech)}
                                                className={`cursor-pointer transition-colors duration-300 ${hoveredTech === tech ? 'text-white' : 'text-slate-800 hover:text-slate-600'}`}
                                                whileHover={{ scale: 1.05, x: 10 }}
                                            >
                                                {tech}
                                            </motion.span>
                                            {techIndex < row.length - 1 && (
                                                <span className="text-cyan-500/50 text-2xl md:text-4xl">/</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="mt-16 pt-8 border-t border-slate-900">
                             <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
                                The developers at Sameer Digital Lab demonstrate their competency in a number of programming languages, frameworks, libraries and sophisticated tools in order to adapt to varying project parameters.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
       </section>
    </PageWrapper>
  );
};

export default ServicesPage;
