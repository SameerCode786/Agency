
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
    ReactIcon,
    ExpoIcon,
    JsIcon,
    SupabaseIcon,
    AtomIcon,
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

const techStack = [
    { name: 'React Native', icon: <ReactIcon className="w-12 h-12 text-cyan-400" /> },
    { name: 'Expo', icon: <ExpoIcon className="w-12 h-12 text-white" /> },
    { name: 'JavaScript', icon: <JsIcon className="w-12 h-12 text-yellow-400" /> },
    { name: 'Supabase', icon: <SupabaseIcon className="w-12 h-12 text-green-400" /> },
    { name: 'Redux', icon: <AtomIcon className="w-12 h-12 text-purple-400" /> },
    { name: 'iOS', icon: <MobileIcon className="w-12 h-12 text-gray-200" /> },
    { name: 'Android', icon: <MobileIcon className="w-12 h-12 text-green-500" /> },
];

const TechMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-slate-900 py-12 border-y border-slate-800 mt-12">
             <div className="container mx-auto px-4 mb-8 text-center">
                 <h2 className="text-2xl font-bold text-white mb-2">Powered by Modern Tech</h2>
                 <p className="text-slate-500">Building robust, scalable mobile experiences</p>
             </div>
             <motion.div 
                className="flex gap-16 min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             >
                 {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                     <div key={i} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                         {tech.icon}
                         <span className="text-slate-400 font-mono text-sm">{tech.name}</span>
                     </div>
                 ))}
             </motion.div>
        </div>
    );
}

const capabilities = [
    "iOS Development",
    "Android Development",
    "React Native",
    "Expo Solutions",
    "App UI/UX Design",
    "App Store Optimization",
    "Maintenance & Support"
];

const faqs = [
    { q: "Do you build apps for both iOS and Android?", a: "Yes! We use React Native to build cross-platform applications. This allows us to write code once and deploy it to both the Apple App Store and Google Play Store, saving you time and money." },
    { q: "How much does it cost to build an app?", a: "App costs vary based on complexity, features, and design. A simple app starts lower, while complex apps with custom backends cost more. We provide a detailed quote after understanding your requirements." },
    { q: "How long does it take to develop an app?", a: "A basic app can take 4-8 weeks, while more complex enterprise-level apps can take 3-6 months. We work in sprints to deliver features incrementally." },
    { q: "Will you help me upload the app to the App Stores?", a: "Absolutely. We handle the entire submission process for both the Apple App Store and Google Play Store, ensuring your app meets all guidelines for approval." },
    { q: "Do you provide support after the app is launched?", a: "Yes, we offer ongoing maintenance packages to ensure your app stays updated with the latest OS versions, fix bugs, and add new features as your business grows." },
    { q: "Can you update my existing app?", a: "Yes, we can audit your existing codebase and help with updates, bug fixes, or a complete redesign/rewrite depending on the state of the current app." },
];

const whatWeDoServices = [
    {
        title: "Cross-Platform Apps",
        desc: "One codebase for both iOS and Android using React Native for efficiency.",
        icon: <MobileIcon className="w-10 h-10 text-cyan-400" />
    },
    {
        title: "App Design (UI/UX)",
        desc: "Stunning, intuitive mobile interfaces designed for touch and engagement.",
        icon: <DesignIcon className="w-10 h-10 text-purple-400" />
    },
    {
        title: "Backend Development",
        desc: "Robust server-side logic and databases to power your app's features.",
        icon: <AtomIcon className="w-10 h-10 text-blue-400" />
    },
    {
        title: "App Strategy",
        desc: "Consulting on monetization, user acquisition, and product roadmap.",
        icon: <StrategyIcon className="w-10 h-10 text-yellow-400" />
    },
    {
        title: "Maintenance",
        desc: "Regular updates and monitoring to ensure peak performance.",
        icon: <RocketIcon className="w-10 h-10 text-green-400" />
    },
    {
        title: "API Integration",
        desc: "Connecting your app seamlessly with third-party services and data.",
        icon: <WireframeGlobeIcon className="w-10 h-10 text-red-400" />
    }
];

const AppDevelopmentPage: React.FC = () => {
    const { title, description } = useSeoContent('App Development');
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
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

                <div className="container mx-auto relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center w-full max-w-6xl"
                    >
                        {/* Pill Badge */}
                        <div className="inline-flex items-center justify-center px-6 py-2 mb-8 rounded-full border border-blue-500/30 bg-slate-900/50 backdrop-blur-md">
                            <span className="text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase">
                                Cutting-Edge Mobile Solutions
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-16 tracking-tight leading-none">
                            App <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Development</span>
                        </h1>
                        
                        {/* Two Column Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
                            
                            {/* Card 1: User-Centric Design */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 group">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">User-Centric Design</h3>
                                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                                    We believe great apps start with the user. Our design process ensures your application is intuitive, engaging, and solves real problems for your customers, leading to higher retention rates.
                                </p>
                            </div>

                            {/* Card 2: Performance First */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 group">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Performance First</h3>
                                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                                    Speed and stability are non-negotiable. We build high-performance mobile apps using React Native that feel native, load fast, and work seamlessly across all devices and network conditions.
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
                         className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden group shadow-2xl shadow-blue-500/10"
                     >
                         <img 
                             src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop" 
                             alt="Mobile App Development" 
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
                                We turn innovative ideas into successful mobile apps that live in your customers' pockets.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link to="/contact">
                                <PremiumButton icon={true}>Start Your App</PremiumButton>
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
                                className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col"
                            >
                                <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-blue-500/20">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
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
                             <button className="inline-flex items-center gap-2 text-white border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors text-lg font-medium group">
                                Get a Free Consultation
                                <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                             </button>
                        </Link>
                    </div>
                </div>
            </section>

             {/* SCROLLING TEXT */}
             <section className="py-12 bg-slate-950 overflow-hidden border-t border-slate-900">
                <ParallaxText baseVelocity={3}>Build. Launch. Grow.</ParallaxText>
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
                                <div className="h-px w-12 bg-blue-500"></div>
                                <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Technology & Innovation</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
                                We Engineer With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Speed, Scale,</span> and Stability
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed mb-8">
                                Mobile apps require a different approach than web. We focus on touch interactions, offline capabilities, and device-specific features to create truly native experiences.
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed mb-10">
                                Whether it's a social platform, e-commerce app, or business tool, we leverage the best frameworks to ensure your app scales effortlessly as your user base grows.
                            </p>
                            
                            <div className="flex gap-4">
                                <Link to="/portfolio">
                                    <PremiumButton icon={true}>See Our Apps</PremiumButton>
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-95 blur-lg opacity-60"></div>
                            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop" 
                                    alt="App Coding" 
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-950/20"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                <TechMarquee />
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
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold tracking-widest uppercase mb-6 border border-blue-500/20">
                                    Partnerships
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    Who We Work With
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                    From visionary startups launching their first MVP to established enterprises needing digital transformation, we build apps that drive results.
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
                                <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
                                    Our App Capabilities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {capabilities.map((cap, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors group"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
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
                                        Have more questions about app development? Get in touch directly.
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
                                            <span className="text-xl md:text-2xl font-medium text-slate-200 group-hover:text-blue-400 transition-colors pr-8">
                                                {faq.q}
                                            </span>
                                            <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''} text-blue-400 flex-shrink-0 bg-slate-900 p-2 rounded-full`}>
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
                     <h2 className="text-4xl font-bold text-white mb-6">Ready to build your app?</h2>
                     <Link to="/contact">
                        <PremiumButton className="text-lg px-12 py-4">Let's Talk Apps</PremiumButton>
                     </Link>
                 </div>
             </section>

        </PageWrapper>
    );
};

export default AppDevelopmentPage;
