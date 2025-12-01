
import React, { useRef, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
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
import PremiumButton from '../components/PremiumButton';

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

const ServicesPage: React.FC = () => {
    const { title, description } = useSeoContent('Services');

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
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                        We Build Modern Websites That <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                            Grow Your Business
                        </span>
                    </h1>
                    
                    {/* Subheading */}
                    <h2 className="text-lg md:text-2xl text-slate-200 font-medium mb-8 max-w-3xl mx-auto">
                        Fast, clean, responsive, and powered by the latest web technologies — designed to make your brand stand out.
                    </h2>

                    {/* Paragraph */}
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        We design and develop high-performance websites that look stunning and convert visitors into customers. From front-end design to full backend systems, we deliver scalable digital solutions built for speed, security, and real business results.
                    </p>

                    {/* Trust Checkmarks Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 mb-12 max-w-3xl mx-auto text-sm md:text-base font-medium text-slate-300">
                         {['Custom Design', 'SEO-Ready Structure', 'Optimized Performance', 'Latest Tech Stack', 'Fully Editable CMS', 'Zoom/Slack Support'].map((item, i) => (
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

       {/* MAIN SERVICES GRID */}
       <section className="py-32 bg-slate-950 relative z-10 border-t border-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Services</h2>
                     <p className="text-slate-400">Everything you need to grow your digital presence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link to={service.link} key={index} className="block group">
                            <motion.div
                                className={`h-full bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border ${service.color} hover:bg-slate-900/80 transition-all duration-500 flex flex-col relative overflow-hidden group-hover:shadow-2xl ${service.glow}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className="mb-8 p-4 bg-slate-950 rounded-2xl w-fit border border-slate-800 group-hover:scale-110 transition-transform duration-500 relative z-10">
                                    {service.icon}
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8 flex-grow relative z-10">
                                    {service.description}
                                </p>

                                <div className="mt-auto relative z-10 flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    Explore Service <ArrowRightIcon className="w-5 h-5" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
       </section>

       {/* THE PROCESS SECTION (Keep existing but simplified if needed, or leave as detailed breakdown) */}
       <section className="py-32 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <AnimatedHeading text="Our Detailed Workflow" className="text-4xl md:text-5xl font-bold mb-6" />
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        We follow a structured approach to ensure every project is delivered on time, within budget, and to the highest standard.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
                        {[
                            { step: '01', title: 'Discovery', desc: 'We analyze your goals, audience, and competition.' },
                            { step: '02', title: 'Design', desc: 'We craft intuitive and stunning visual experiences.' },
                            { step: '03', title: 'Develop', desc: 'We build with clean, scalable, and secure code.' },
                            { step: '04', title: 'Launch', desc: 'We deploy, optimize, and help you grow.' }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center hover:border-cyan-500/50 transition-colors duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl font-bold text-cyan-400 mx-auto mb-6 shadow-lg shadow-cyan-900/20">
                                    {item.step}
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                                <p className="text-slate-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
       </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-slate-950 relative z-10">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to Elevate Your Brand?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
                        Let's discuss your project and find the perfect solution for your business goals.
                    </p>
                    <div className="relative z-10">
                        <Link to="/contact">
                            <PremiumButton className="text-lg px-12 py-5">Schedule a Call</PremiumButton>
                        </Link>
                    </div>
                </div>
            </div>
      </section>

    </PageWrapper>
  );
};

export default ServicesPage;
