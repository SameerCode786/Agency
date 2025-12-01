
import React, { useState, useRef, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import PremiumButton from '../components/PremiumButton';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { 
    CodeIcon, 
    MobileIcon, 
    DesignIcon, 
    SpeedIcon, 
    MaintenanceIcon, 
    StrategyIcon,
    ArrowRightIcon,
    WalletIcon,
    WordPressIcon,
    TargetIcon,
    RocketIcon,
    SearchIcon,
    ReactIcon,
    TailwindIcon,
    AtomIcon,
    CheckIcon,
    LayersIcon
} from '../components/Icons';
import { Link } from 'react-router-dom';
import { useSeoContent } from '../hooks/useSeoContent';

// --- Magnetic Particle Background Component ---
const MagneticParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        
        // Mouse state
        const mouse = { x: 0, y: 0, isActive: false };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.isActive = true;
        };
        
        const handleMouseLeave = () => {
            mouse.isActive = false;
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            size: number;
            color: string;
            vx: number;
            vy: number;
            friction: number;
            ease: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.originX = this.x;
                this.originY = this.y;
                this.size = Math.random() * 2 + 0.5;
                const colors = ['#22d3ee', '#818cf8', '#a78bfa', '#34d399'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.vx = 0;
                this.vy = 0;
                this.friction = 0.95; // Damping
                this.ease = 0.05; // Speed returning to origin
            }

            update() {
                // Distance from mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 300; // Radius of interaction

                if (mouse.isActive && distance < forceDistance) {
                    // Attraction force (negative for attraction, positive for repulsion)
                    // We want attraction: particles move TOWARDS mouse
                    const force = (forceDistance - distance) / forceDistance;
                    const angle = Math.atan2(dy, dx);
                    
                    // Move towards mouse
                    const moveX = Math.cos(angle) * force * 5; 
                    const moveY = Math.sin(angle) * force * 5;

                    this.vx += moveX;
                    this.vy += moveY;
                }

                // Return to origin (spring effect)
                this.vx += (this.originX - this.x) * this.ease;
                this.vy += (this.originY - this.y) * this.ease;

                // Friction
                this.vx *= this.friction;
                this.vy *= this.friction;

                // Update position
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 8000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connecting lines if close enough
            // (Optional: can be expensive with many particles, keeping it simple for attraction demo)
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas(); // Initial setup
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
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

const services = [
  {
    icon: <CodeIcon className="h-12 w-12 text-cyan-400" />,
    title: 'Web Development',
    description: 'Custom, high-performance websites built with React, Next.js, and modern technologies. We create digital experiences that convert.',
    link: '/web-development',
    color: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: <SearchIcon className="h-12 w-12 text-[#8936ea]" />,
    title: 'SEO Optimization',
    description: 'Data-driven SEO strategies to dominate search results. We help your business get found by the people who matter most.',
    link: '/seo-optimization',
    color: 'border-[#8936ea]/30',
    glow: 'shadow-[#8936ea]/20',
    gradient: 'from-[#8936ea] to-pink-600'
  },
  {
    icon: <MobileIcon className="h-12 w-12 text-blue-400" />,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Scalable, secure, and user-centric mobile solutions.',
    link: '/app-development',
    color: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    icon: <WalletIcon className="h-12 w-12 text-green-400" />,
    title: 'Shopify Solutions',
    description: 'High-converting e-commerce stores. From custom themes to complex integrations, we build engines for revenue.',
    link: '/shopify-development',
    color: 'border-green-500/30',
    glow: 'shadow-green-500/20',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: <WordPressIcon className="h-12 w-12 text-indigo-400" />,
    title: 'WordPress Dev',
    description: 'Flexible and manageable CMS solutions. Custom themes and plugins that give you full control over your content.',
    link: '/wordpress-customization',
    color: 'border-indigo-500/30',
    glow: 'shadow-indigo-500/20',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    icon: <DesignIcon className="h-12 w-12 text-pink-400" />,
    title: 'UI/UX Design',
    description: 'User-centric design that blends aesthetics with functionality. We craft interfaces that users love to interact with.',
    link: '/services', // Generic link or specific if available
    color: 'border-pink-500/30',
    glow: 'shadow-pink-500/20',
    gradient: 'from-pink-500 to-rose-600'
  },
];

const buildProcess = [
    {
        title: "STRATEGY",
        subtitle: "Clear direction. Smart decisions. Strong foundations.",
        description: "We dive deep into your business, audience, and goals to shape a strategy that works. From brand clarity to product planning, everything we do is intentional and aligned with long-term growth.",
        points: [
            "Market & competitor research",
            "User & brand analysis",
            "Product & digital roadmaps",
            "Clear planning before design starts"
        ],
        icon: <StrategyIcon className="w-10 h-10 text-cyan-400" />,
        borderColor: "hover:border-cyan-500/50",
        shadowColor: "hover:shadow-cyan-500/20"
    },
    {
        title: "DESIGN",
        subtitle: "Design that feels good—looks great—and works everywhere.",
        description: "We create digital experiences that are clean, modern, and user-focused. Every layout, color, and interaction is crafted to make your brand stand out.",
        points: [
            "UX flows + wireframes",
            "UI design + visual identity",
            "Design systems for consistency",
            "Intuitive, friendly user journeys"
        ],
        icon: <DesignIcon className="w-10 h-10 text-purple-400" />,
        borderColor: "hover:border-purple-500/50",
        shadowColor: "hover:shadow-purple-500/20"
    },
    {
        title: "DEVELOPMENT",
        subtitle: "Fast, secure, scalable websites built with modern technology.",
        description: "We transform designs into high-performance websites and digital products using industry-leading tools and coding standards.",
        points: [
            "Custom websites",
            "Mobile-friendly interfaces",
            "Clean, scalable code",
            "Speed, SEO & security optimized"
        ],
        icon: <CodeIcon className="w-10 h-10 text-blue-400" />,
        borderColor: "hover:border-blue-500/50",
        shadowColor: "hover:shadow-blue-500/20"
    }
];

// --- DELIVERY CONTENT DATA ---
type DeliveryCategory = 'WORDPRESS' | 'WEB DEVELOPMENT' | 'SHOPIFY' | 'APP DEVELOPMENT' | 'SEO';

interface DeliveryItem {
    id: string;
    title: string;
    description: string;
}

interface DeliverySection {
    subtitle: string;
    items: DeliveryItem[];
}

const deliveryContent: Record<DeliveryCategory, DeliverySection> = {
    WORDPRESS: {
        subtitle: "Custom WordPress solutions crafted with speed, security, and scalability in mind.",
        items: [
            { id: "01", title: "WordPress Development", description: "Custom, fast, and secure WordPress websites developed with clean, scalable code." },
            { id: "02", title: "Theme Customization", description: "Pixel-perfect customization for Elementor, Gutenberg, and any premium theme." },
            { id: "03", title: "WooCommerce", description: "High-conversion eCommerce stores built for smooth shopping experiences." },
            { id: "04", title: "Website Optimization", description: "Speed, security & performance tuning to improve rankings and conversions." },
            { id: "05", title: "Maintenance & Support", description: "Ongoing updates, fixes, and improvements handled by our expert team." },
        ]
    },
    "WEB DEVELOPMENT": {
        subtitle: "Modern, responsive, and scalable websites that meet the highest industry standards.",
        items: [
            { id: "01", title: "Custom Web Development", description: "Fully custom websites built using modern frameworks & clean architecture." },
            { id: "02", title: "Frontend Development", description: "HTML, CSS, JavaScript, React, Tailwind — crafted to perfection." },
            { id: "03", title: "Backend Development", description: "Secure, optimized backend (Node.js, PHP, Supabase, Firebase)." },
            { id: "04", title: "Performance Engineering", description: "Speed, SEO & Core Web Vitals improvements for better rankings." },
            { id: "05", title: "API Integration", description: "Third-party integrations for payment systems, CRMs, maps, and more." },
        ]
    },
    SHOPIFY: {
        subtitle: "Powerful eCommerce stores built for sales, speed, and branding.",
        items: [
            { id: "01", title: "Shopify Store Setup", description: "Complete store setup, theme installation & layout customization." },
            { id: "02", title: "Shopify Custom Theme", description: "Unique and conversion-focused theme development for your brand." },
            { id: "03", title: "App Integration", description: "Adding upsells, subscriptions, tracking, reviews & automations." },
            { id: "04", title: "Shopify Speed Optimization", description: "Faster load times, better UX, higher conversions." },
            { id: "05", title: "Shopify Support", description: "Monthly support, updates & growth-focused improvements." },
        ]
    },
    "APP DEVELOPMENT": {
        subtitle: "Cross-platform apps designed for seamless user experience across iOS & Android.",
        items: [
            { id: "01", title: "Mobile App Development", description: "React Native apps with clean UI and smooth functionality." },
            { id: "02", title: "UI/UX for Mobile", description: "User-friendly, intuitive interfaces designed for engagement." },
            { id: "03", title: "API & Backend System", description: "Secure backend architecture with real-time data syncing." },
            { id: "04", title: "App Optimization", description: "Improved performance, reduced load time, optimized UI flows." },
            { id: "05", title: "Post-Launch Support", description: "Bug fixing, updates, new feature rollouts." },
        ]
    },
    SEO: {
        subtitle: "Data-driven SEO strategies designed to grow your visibility and traffic.",
        items: [
            { id: "01", title: "On-Page SEO", description: "Titles, headings, URLs, meta tags, schema — fully optimized." },
            { id: "02", title: "Technical SEO", description: "Fix crawling, indexing, speed & structure issues." },
            { id: "03", title: "Content Strategy", description: "Keyword-rich blog planning & content that ranks." },
            { id: "04", title: "Local SEO", description: "Google Business Profile optimization for local clients." },
            { id: "05", title: "Monthly SEO Growth", description: "Ongoing SEO improvements to beat competitors & increase traffic." },
        ]
    }
};

// --- EXPERTISE SECTION DATA ---
const expertiseRows = [
    ["JavaScript", "Vue.js", "Nuxt.js"],
    ["Laravel", "WordPress"],
    ["Opencart", "Prismic", "PHP"],
    ["MySQL", "PostgreSQL"],
    ["Web3js", "Three.js", "WebAR"],
    ["REST API", "WebSocket"],
    ["Redis", "MongoDB", "React Native"]
];

const techImages: Record<string, string> = {
    "JavaScript": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop",
    "Vue.js": "https://images.unsplash.com/photo-1607799275518-dbebb27725dc?q=80&w=1000&auto=format&fit=crop",
    "Nuxt.js": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop",
    "Laravel": "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1000&auto=format&fit=crop",
    "WordPress": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
    "Opencart": "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    "Prismic": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    "PHP": "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1000&auto=format&fit=crop",
    "MySQL": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop", 
    "PostgreSQL": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop",
    "Web3js": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    "Three.js": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    "WebAR": "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1000&auto=format&fit=crop",
    "REST API": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop",
    "WebSocket": "https://images.unsplash.com/photo-1558494949-efc02570fbc9?q=80&w=1000&auto=format&fit=crop",
    "Redis": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop",
    "MongoDB": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop",
    "React Native": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
};


const ServicesPage: React.FC = () => {
    const { title, description } = useSeoContent('Services');
    const [activeDeliveryTab, setActiveDeliveryTab] = useState<DeliveryCategory>('WORDPRESS');
    const [hoveredTech, setHoveredTech] = useState("MySQL");

    return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
       
       {/* HERO SECTION */}
       <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-950 overflow-hidden min-h-screen flex items-center justify-center">
            
            {/* Custom Magnetic Particle Background */}
            <MagneticParticles />
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90 pointer-events-none z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-400 mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">Premium Digital Agency</span>
                    </motion.div>

                    {/* H1 Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                        We Build Modern Websites & Apps That <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                            Grow Your Business
                        </span>
                    </h1>
                    
                    {/* Subheading */}
                    <h2 className="text-lg md:text-2xl text-slate-200 font-medium mb-8 max-w-3xl mx-auto">
                        Fast, clean, responsive, and powered by the latest web & mobile technologies — designed to make your brand stand out.
                    </h2>

                    {/* Paragraph */}
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        We design and develop high-performance websites and mobile applications that look stunning and convert visitors into customers. From front-end design to full backend systems, we deliver scalable digital solutions built for speed, security, and real business results.
                    </p>

                    {/* Trust Checkmarks Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 mb-12 max-w-3xl mx-auto text-sm md:text-base font-medium text-slate-300">
                         {['Custom Design', 'SEO-Ready Structure', 'Optimized Performance', 'Latest Tech Stack', 'iOS & Android', 'Zoom/Slack Support'].map((item, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="flex items-center justify-center md:justify-start gap-3"
                            >
                                <div className="bg-cyan-500/20 p-1 rounded-full text-cyan-400 flex-shrink-0">
                                    <CheckIcon className="w-3 h-3 md:w-4 md:h-4" />
                                </div>
                                <span className="whitespace-nowrap">{item}</span>
                            </motion.div>
                         ))}
                    </div>

                    {/* Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link to="/contact">
                            <PremiumButton className="px-10 py-4 text-lg w-full sm:w-auto">Get a Free Quote</PremiumButton>
                        </Link>
                        <Link to="/portfolio">
                            <button className="px-10 py-4 rounded-full border border-slate-700 text-white font-bold hover:bg-slate-800 hover:border-cyan-500/50 transition-all w-full sm:w-auto flex items-center justify-center gap-2 group">
                                View Our Work
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Scroll to Explore</span>
                    <ArrowRightIcon className="w-5 h-5 rotate-90 opacity-60" />
                </div>
            </motion.div>
       </section>

       {/* SCROLL VELOCITY TEXT */}
       <section className="bg-slate-950 border-y border-slate-900 py-16 overflow-hidden">
            <ParallaxText baseVelocity={2}>DESIGN • DEVELOPMENT • STRATEGY • GROWTH • </ParallaxText>
       </section>

       {/* NEW SECTION: HOW WE BUILD */}
       <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How We Build Digital Experiences That Perform</h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        At Sameer Digital Lab, every project starts with a proven digital process — backed by strategy, creativity, and modern development. We don’t guess. We research, plan, test, and deliver solutions that actually move your business forward.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {buildProcess.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className={`group bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:bg-slate-900/80 transition-all duration-500 ${item.borderColor} ${item.shadowColor} hover:shadow-2xl hover:-translate-y-2`}
                        >
                            <div className="mb-6 p-4 bg-slate-950 border border-slate-800 rounded-2xl w-fit shadow-lg">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{item.title}</h3>
                            <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">{item.subtitle}</h4>
                            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                                {item.description}
                            </p>
                            <ul className="space-y-3">
                                {item.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                        <div className="mt-0.5 text-cyan-400">
                                            <CheckIcon className="w-4 h-4" />
                                        </div>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
       </section>

       {/* NEW: WHAT WE DELIVER SECTION (PREMIUM SHAPE-STYLE) */}
       <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
           {/* Futuristic Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">What We Deliver</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">High-Quality Digital Services</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Crafted by our in-house team—designed to elevate your brand, engage your users, and fuel long-term growth.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {Object.keys(deliveryContent).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveDeliveryTab(tab as DeliveryCategory)}
                            className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border ${
                                activeDeliveryTab === tab
                                    ? 'bg-slate-100 text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDeliveryTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-900/30 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50"></div>
                            
                            <div className="mb-10 text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {activeDeliveryTab} Solutions
                                </h3>
                                <p className="text-slate-300 text-lg">
                                    {deliveryContent[activeDeliveryTab].subtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {deliveryContent[activeDeliveryTab].items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/50"
                                    >
                                        <div className="text-5xl font-black text-slate-800 group-hover:text-slate-700 transition-colors select-none font-mono">
                                            {item.id}
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="md:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                            <ArrowRightIcon className="w-6 h-6 text-cyan-500 -rotate-45" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
       </section>

       {/* NEW: OUR EXPERTISE SECTION */}
       <section className="py-24 bg-black relative overflow-hidden">
            {/* Linear Layers (Animated Lines) */}
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
                    
                    {/* Left Side: Dynamic Image Card */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="mb-6">
                            <h2 className="text-white text-3xl font-bold font-sans tracking-tight">Our Expertise</h2>
                        </div>
                        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-800 bg-slate-900">
                             <AnimatePresence mode="wait">
                                <motion.img 
                                    key={hoveredTech}
                                    src={techImages[hoveredTech] || techImages["MySQL"]}
                                    alt={hoveredTech}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                             </AnimatePresence>
                             {/* Gradient Overlay */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             
                             <div className="absolute bottom-8 left-8 right-8">
                                <motion.div
                                    key={hoveredTech + "text"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10"
                                >
                                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 block">Technology</span>
                                    <h3 className="text-white text-2xl font-bold">{hoveredTech}</h3>
                                </motion.div>
                             </div>
                        </div>
                    </div>

                    {/* Right Side: Interactive List */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="flex flex-col gap-2 md:gap-4 select-none">
                            {expertiseRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex flex-wrap items-center gap-x-2 md:gap-x-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    {row.map((tech, techIndex) => (
                                        <React.Fragment key={tech}>
                                            <motion.span
                                                onMouseEnter={() => setHoveredTech(tech)}
                                                className={`cursor-pointer transition-colors duration-300 ${
                                                    hoveredTech === tech 
                                                    ? 'text-white' 
                                                    : 'text-slate-800 hover:text-slate-600'
                                                }`}
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
