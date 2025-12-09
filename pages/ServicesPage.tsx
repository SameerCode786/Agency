
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
    CheckIcon
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

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
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

// --- NEW 3D PROCESS CARD COMPONENT ---
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
    // Map scroll progress [0, 1] to a continuous step value [0, total - 1]
    const step = useTransform(scrollYProgress, [0, 1], [0, total - 1]);

    // TRANSFORMATION LOGIC
    // i is the card index (0, 1, 2)
    // When step == i, the card is in the center (Active).
    // When step < i (e.g., step 0, card 1), card is "future" -> Should be bottom-right, small.
    // When step > i (e.g., step 1, card 0), card is "past" -> Should be top-left, exiting.

    // Input Range relative to index:
    // [i - 1, i, i + 1] -> [Past, Active, Future]
    // We add buffer ranges for smoothness.
    
    // X Position:
    // Future (i+1): 60% (Right)
    // Active (i): 0% (Center)
    // Past (i-1): -60% (Left)
    const x = useTransform(step, 
        [i - 1, i, i + 1], 
        ['-80%', '0%', '80%'] 
    );

    // Y Position:
    // Future: 20% (Bottom)
    // Active: 0% (Center)
    // Past: -40% (Top)
    const y = useTransform(step,
        [i - 1, i, i + 1],
        ['-50%', '0%', '30%']
    );

    // Scale:
    // Future: 0.7
    // Active: 1.0
    // Past: 0.7
    const scale = useTransform(step,
        [i - 1, i, i + 1],
        [0.6, 1, 0.6]
    );

    // Opacity:
    // Future: 0.5 (Visible but dim)
    // Active: 1
    // Past: 0 (Fade out as it goes top left)
    const opacity = useTransform(step,
        [i - 0.8, i, i + 0.8],
        [0, 1, 0.4]
    );

    // Rotation: Adds 3D feel
    const rotateY = useTransform(step,
        [i - 1, i, i + 1],
        [15, 0, -15]
    );
    
    const rotateZ = useTransform(step,
        [i - 1, i, i + 1],
        [-5, 0, 5]
    );

    // Z-Index: Ensures active card is always on top visually
    const zIndex = useTransform(step, (currentStep) => {
        const distance = Math.abs(currentStep - i);
        return 100 - Math.round(distance * 10);
    });

    return (
        <motion.div 
            style={{ 
                x, 
                y, 
                scale, 
                opacity, 
                rotateY, 
                rotateZ,
                zIndex,
                position: 'absolute',
            }}
            className="w-full max-w-5xl px-4 md:px-0"
        >
            <div className="relative flex flex-col md:flex-row w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-black/50 origin-center h-[70vh] md:h-[60vh]">
                
                {/* 3D Depth Border Gradient */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" style={{ maskImage: 'linear-gradient(white, white), linear-gradient(white, white)', maskClip: 'content-box, border-box', maskComposite: 'xor' }}></div>

                {/* Colored Glow */}
                <div className={`absolute -top-40 -right-40 w-96 h-96 ${color} rounded-full blur-[150px] opacity-20 pointer-events-none`}></div>
                <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${color} rounded-full blur-[150px] opacity-10 pointer-events-none`}></div>

                {/* LEFT SIDE: ROTATING ICON */}
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-8 md:pb-0 md:pr-12 relative z-10">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6">
                        {/* Rotating Rings */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-slate-700/50 border-t-white/30 border-l-white/30"
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 rounded-full border border-slate-700/50 border-b-white/30 border-r-white/30"
                        />
                         <div className={`absolute inset-0 rounded-full ${color} opacity-20 blur-2xl animate-pulse`}></div>
                        
                        <div className="relative z-10 bg-slate-950 rounded-full p-6 border border-slate-700 shadow-xl">
                            {icon}
                        </div>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase text-center">{title}</h3>
                </div>

                {/* RIGHT SIDE: CONTENT */}
                <div className="w-full md:w-2/3 pt-8 md:pt-0 md:pl-12 flex flex-col justify-center relative z-10">
                    <h4 className="text-lg md:text-xl font-bold text-cyan-400 mb-6 font-mono tracking-wide">{subtitle}</h4>
                    <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-8">
                        {description}
                    </p>
                    
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
    )
}

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
        icon: <StrategyIcon className="w-12 h-12 text-cyan-400" />,
        color: "bg-cyan-500"
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
        icon: <DesignIcon className="w-12 h-12 text-purple-400" />,
        color: "bg-purple-500"
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
        icon: <CodeIcon className="w-12 h-12 text-blue-400" />,
        color: "bg-blue-500"
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
    tagline: string;
    statement: string;
    items: DeliveryItem[];
}

const deliveryContent: Record<DeliveryCategory, DeliverySection> = {
    WORDPRESS: {
        tagline: "The world's most popular CMS, optimized for performance.",
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
        tagline: "Building the foundation of your digital presence.",
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
        tagline: "E-commerce solutions that drive sales and retention.",
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
        tagline: "Native performance on iOS and Android devices.",
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
        tagline: "Visibility strategies that put you ahead of competitors.",
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

// Mapping technology names to their corresponding icons and colors
const techIcons: Record<string, { icon: React.ReactNode, color: string }> = {
    "JavaScript": { icon: <JsIcon className="w-full h-full" />, color: "#F7DF1E" },
    "Vue.js": { icon: <VueIcon className="w-full h-full" />, color: "#4FC08D" },
    "Nuxt.js": { icon: <NuxtIcon className="w-full h-full" />, color: "#00C58E" },
    "Laravel": { icon: <LaravelIcon className="w-full h-full" />, color: "#FF2D20" },
    "WordPress": { icon: <WordPressIcon className="w-full h-full" />, color: "#21759B" },
    "Opencart": { icon: <ShoppingCartIcon className="w-full h-full" />, color: "#26B4D6" },
    "Prismic": { icon: <CloudIcon className="w-full h-full" />, color: "#5163BA" },
    "PHP": { icon: <PhpIcon className="w-full h-full" />, color: "#777BB4" },
    "MySQL": { icon: <DatabaseIcon className="w-full h-full" />, color: "#4479A1" },
    "PostgreSQL": { icon: <DatabaseIcon className="w-full h-full" />, color: "#336791" },
    "Web3js": { icon: <CubeIcon className="w-full h-full" />, color: "#F16822" },
    "Three.js": { icon: <CubeIcon className="w-full h-full" />, color: "#FFFFFF" },
    "WebAR": { icon: <CubeIcon className="w-full h-full" />, color: "#22d3ee" },
    "REST API": { icon: <ApiIcon className="w-full h-full" />, color: "#8936ea" },
    "WebSocket": { icon: <ApiIcon className="w-full h-full" />, color: "#00C58E" },
    "Redis": { icon: <DatabaseIcon className="w-full h-full" />, color: "#DC382D" },
    "MongoDB": { icon: <DatabaseIcon className="w-full h-full" />, color: "#47A248" },
    "React Native": { icon: <ReactIcon className="w-full h-full" />, color: "#61DAFB" }
};


const ServicesPage: React.FC = () => {
    const { title, description } = useSeoContent('Services');
    const [activeDeliveryTab, setActiveDeliveryTab] = useState<DeliveryCategory>('WORDPRESS');
    const [hoveredTech, setHoveredTech] = useState("MySQL");

    // Refs for 3D Carousel Animation
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

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

       {/* NEW SECTION: 3D SCROLL CAROUSEL */}
       <section className="bg-slate-950 relative" ref={containerRef}>
            {/* The container needs to be very tall to allow scrolling through the stages */}
            <div className="h-[300vh] relative">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center perspective-1000">
                    
                    {/* Section Header (Fixed at top until scroll ends) */}
                    <div className="absolute top-10 md:top-20 text-center z-20 px-4">
                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How We Build Digital Experiences</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                                Proven digital process backed by strategy, creativity, and modern development.
                            </p>
                        </motion.div>
                    </div>

                    {/* 3D Cards Container */}
                    <div className="relative w-full h-full flex items-center justify-center perspective-1000 transform-style-3d">
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

       {/* NEW: WHAT WE DELIVER SECTION (BRAND TRANSFORMATION STYLE - HIGH CONTRAST) */}
       <section className="py-32 bg-slate-950 relative overflow-hidden border-t border-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">What We Deliver</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-sans">
                        High-Quality Digital Services
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Crafted by our in-house team—designed to elevate your brand, engage your users, and fuel long-term growth.
                    </p>
                    
                    {/* Navigation Tabs */}
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

                {/* Content Area - Split Layout Matching Reference */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
                    
                    {/* LEFT SIDE: BRAND CARD (High Contrast - White) */}
                    <div className="lg:col-span-6 sticky top-32 h-full">
                        <motion.div
                            key={activeDeliveryTab + "-card"}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl group min-h-[500px] flex flex-col hover:scale-[1.02] transition-transform duration-500"
                        >
                            {/* Card Content Structure */}
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                {/* Top Section: Title (Left) & Tagline (Right) */}
                                <div className="flex justify-between items-start gap-8">
                                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-slate-950 uppercase break-words hyphens-auto">
                                        {activeDeliveryTab}
                                    </h2>
                                    <p className="text-sm font-bold text-slate-500 max-w-[200px] text-right pt-1 leading-snug">
                                        {deliveryContent[activeDeliveryTab].tagline}
                                    </p>
                                </div>
                                
                                {/* Bottom Section: Large Statement pinned to bottom */}
                                <div className="mt-auto pt-24">
                                     <div className="h-1.5 w-16 bg-slate-900 mb-6"></div>
                                     <p className="text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight text-slate-900">
                                        {deliveryContent[activeDeliveryTab].statement}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: LIST (2 Column Grid, Transparent) */}
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
                    
                    {/* Left Side: Centered Icon Box */}
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
                                    {techIcons[hoveredTech]?.icon || techIcons["MySQL"].icon}
                                </motion.div>
                             </AnimatePresence>
                             
                             {/* Subtle Glow behind icon */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                             
                             <div className="absolute bottom-8 left-0 right-0 text-center">
                                <motion.div
                                    key={hoveredTech + "text"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 block">Technology</span>
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
