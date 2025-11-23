
import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { Link } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import ParticleBackground from '../components/ParticleBackground';
import { 
    CheckIcon, 
    CodeIcon, 
    MobileIcon, 
    WordPressIcon,
    SpeedIcon,
    WalletIcon,
    MaintenanceIcon,
    PhoneIcon,
    StarIcon,
    ReactIcon,
    JsIcon,
    ExpoIcon,
    SupabaseIcon,
    ArrowRightIcon
} from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; features: string[], price: string; index: number }> = ({ icon, title, desc, features, price, index }) => {
    return (
        <motion.div
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="mb-4 text-cyan-400">{icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-slate-100">{title}</h3>
            <p className="text-slate-400 mb-4 flex-grow">{desc}</p>
            <ul className="text-slate-300 space-y-2 mb-6 text-sm">
                {features.map(feature => <li key={feature}>• {feature}</li>)}
            </ul>
            <div className="mt-auto pt-4 border-t border-slate-800">
                <p className="text-slate-300 text-lg font-semibold">Starting at <span className="text-cyan-400">{price}</span></p>
            </div>
        </motion.div>
    );
};

const WhyChooseCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; }> = ({ icon, title, desc }) => (
    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center">
        <div className="text-cyan-400 w-12 h-12 mx-auto mb-4 flex items-center justify-center">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; }> = ({ quote, name, role }) => (
    <motion.div 
        className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
    >
        <div className="flex mb-4 text-yellow-400">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
        </div>
        <p className="text-slate-300 italic mb-6">"{quote}"</p>
        <div>
            <h4 className="font-bold text-white">{name}</h4>
            <p className="text-cyan-400 text-sm">{role}</p>
        </div>
    </motion.div>
);

interface ParallaxTextProps {
  children: string;
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
      <motion.div className="font-bold uppercase text-[15vw] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-transparent opacity-30 flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
}

const animatedHeadings = [
    "Digital Products",
    "Successful Businesses",
    "Revenue Streams",
    "Brand Stories",
    "Market Leaders"
];

// Data for the "How We Take Your Business to the Next Level" section
const coreServicesData = [
    {
        title: "Website Development",
        desc: "We design and develop modern, responsive, and high-performance websites that strengthen your brand and convert visitors into customers.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927887/website_g6erpv.mp4",
        colSpan: "lg:col-span-2"
    },
    {
        title: "SEO Optimization",
        desc: "We improve your search rankings with clean, strategic, and data-driven SEO—bringing you more visibility, more traffic, and more real business results.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927973/Seo_Search_h9ua0s.mp4",
        colSpan: "lg:col-span-1"
    },
    {
        title: "App Development",
        desc: "We create smooth, user-friendly, and scalable mobile applications that help your business reach customers anywhere, on any device.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927584/app_cwwxyt.mp4",
        colSpan: "lg:col-span-1"
    },
    {
        title: "Shopify Development",
        desc: "We build optimized Shopify stores with premium design, fast performance, and conversion-focused layouts that boost sales.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763928151/shopigy_pnq2kb.mp4",
        colSpan: "lg:col-span-1"
    },
    {
        title: "WordPress Customization",
        desc: "We upgrade, redesign, and fully customize WordPress sites—making them faster, cleaner, more secure, and perfectly aligned with your brand.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927832/wordpress_z7f2lk.mp4",
        colSpan: "lg:col-span-1"
    }
];

const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % animatedHeadings.length);
        }, 3000); // Change heading every 3 seconds
        return () => clearInterval(interval);
    }, []);
    
    // Background Video URL
    const backgroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557012/ABOUT_Agensi_Pekerjaan_Nusamas_Sdn_Bhd_ypmqnb.mp4";
    
    // Foreground Feature Video URL
    const foregroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557903/Website_Background_Videos_Download_The_BEST_Free_4k_Stock_Video_io7gxb.mp4";

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* 1. Video Background */}
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        
        {/* 2. Dark Overlay for readability - Maximum Darkness (95%) */}
        <div className="absolute inset-0 bg-black/95 z-0"></div>

        {/* 3. Particle/Constellation Animation */}
        <ParticleBackground />

        {/* 4. Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 z-20 relative w-full h-full flex items-center py-24 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
                
                {/* Left Side: Text Content - Exactly 50% on large screens */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                        },
                    }}
                    className="w-full lg:w-1/2 text-left"
                >
                    {/* Subheading with Shake Animation - Pill Style - Reduced MB to 3 for tighter spacing */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 mb-3 backdrop-blur-sm shadow-lg shadow-cyan-500/10"
                    >
                        <motion.div
                            animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                        >
                            <StarIcon className="w-4 h-4 text-cyan-300" />
                        </motion.div>
                        <span className="font-bold tracking-widest uppercase text-[14px]">
                            Web & Mobile App Development Agency
                        </span>
                    </motion.div>

                    {/* Main Heading Font Size: 42px (Responsive scale) - Reduced MB to 2 */}
                    <motion.h1 
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="text-[42px] sm:text-[48px] lg:text-[56px] font-bold text-slate-50 tracking-tight mb-2 drop-shadow-2xl leading-[1.1]"
                    >
                        Transform Your Ideas Into <br />
                        {/* Adjusted height and min-width to match new 42px+ font size */}
                        <div className="inline-block relative h-[55px] sm:h-[65px] lg:h-[75px] w-full min-w-[320px] mt-2 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentHeadingIndex}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 absolute inset-0 block whitespace-nowrap"
                                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    {animatedHeadings[currentHeadingIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.h1>

                    {/* Paragraph Font Size: 16px - MB-6 */}
                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="text-[16px] text-slate-300 mb-8 max-w-lg leading-relaxed font-light border-l-4 border-cyan-500/30 pl-6"
                    >
                        We turn your vision into reality with cutting-edge web and mobile applications. 
                        Our expertise in React Native, WordPress, and modern frameworks ensures your digital presence stands out. 
                        We don't just build software - we create solutions that drive growth, engage users, and deliver tangible business results.
                    </motion.p>

                    {/* Unified Button Container - Single Pill Design */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="inline-flex items-center bg-white p-1.5 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                    >
                        <Link to="/contact">
                            <motion.button 
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.95 }} 
                                className="px-8 py-3.5 bg-slate-950 text-white rounded-full font-semibold text-base flex items-center gap-2 shadow-md transition-all duration-300"
                            >
                                <StarIcon className="w-4 h-4 text-cyan-400" />
                                Start Your Project
                            </motion.button>
                        </Link>
                        <Link to="/portfolio">
                            <motion.button 
                                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }} 
                                whileTap={{ scale: 0.95 }} 
                                className="px-8 py-3.5 text-slate-900 font-bold text-base rounded-full transition-all duration-300"
                            >
                                View Our Work
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Side: Foreground Video with Orbiting Icons - Exactly 50% on large screens */}
                <motion.div 
                    className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                     {/* Orbiting Icons Container - Sized relative to the video container below */}
                     <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                        
                        {/* Orbiting Rings - Closer to the center */}
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                            {/* Inner Ring (Clockwise) - Size 70% to be larger than video (50%) */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[70%] h-[70%] border border-cyan-500/10 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <ReactIcon className="w-6 h-6 text-cyan-400" />
                                    </motion.div>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <SupabaseIcon className="w-6 h-6 text-green-400" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Outer Ring (Counter-Clockwise) - Size 100% */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[100%] h-[100%] border border-purple-500/10 rounded-full border-dashed"
                            >
                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                        <JsIcon className="w-6 h-6 text-yellow-400" />
                                    </motion.div>
                                </div>
                                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                        <ExpoIcon className="w-6 h-6 text-white" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Video Element - Explicit smaller size (50%) to allow rings (70%, 100%) to be seen around it */}
                        <div className="w-[50%] h-[50%] z-20 flex justify-center items-center overflow-hidden rounded-full">
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover mix-blend-screen transform scale-110"
                            >
                                <source src={foregroundVideoUrl} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-cyan-400/70 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest opacity-70">Scroll</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </motion.div>
      </section>

      {/* DIGITAL PROCESS SECTION */}
      <section className="py-24 bg-black text-white border-b border-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
            {/* Top Row: Heading & Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-bold leading-tight"
                    >
                        It all starts with our <br />
                        <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">DIGITAL PROCESS.</span>
                    </motion.h2>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg leading-relaxed mb-8"
                    >
                        Every project begins with a strong digital process. At Sameer Digital Lab, we don’t rely on guesswork — we deliver results through clear strategy, in-depth research, and proven methods. For every website, we understand user needs, explore innovative solutions, and test every feature before final delivery to ensure you receive a top-performing website.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="px-8 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold tracking-widest uppercase"
                    >
                        Find Out More
                    </motion.button>
                </div>
            </div>

            {/* Bottom Row: 3 Steps with VIDEO Animations - Removed Borders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1: Discover */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center text-center group"
                >
                    <div className="mb-6 p-0 rounded-full transition-colors duration-500 overflow-hidden w-32 h-32 flex items-center justify-center bg-black relative">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1763708206/discover-animation_tnruml.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-widest">DISCOVER</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We discover your goals, brand identity, and user needs so we can build the right strategy from day one.
                    </p>
                </motion.div>

                {/* Step 2: Explore */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center text-center group"
                >
                     <div className="mb-6 p-0 rounded-full transition-colors duration-500 overflow-hidden w-32 h-32 flex items-center justify-center bg-black relative">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1763708273/explore-animation_hteza3.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-widest">EXPLORE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We explore modern design ideas and powerful technical solutions to create a website that is fast, modern, and impactful.
                    </p>
                </motion.div>

                {/* Step 3: Experience */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center text-center group"
                >
                     <div className="mb-6 p-0 rounded-full transition-colors duration-500 overflow-hidden w-32 h-32 flex items-center justify-center bg-black relative">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1763708320/experiment-animation_pnda4i.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-widest">EXPERIENCE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We deliver a high-performance experience—a website that loads fast, ranks higher, and grows your business.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* HOW WE TAKE YOUR BUSINESS TO THE NEXT LEVEL (NEW SECTION) */}
      <section className="py-24 bg-slate-950 relative z-10 overflow-hidden">
        {/* Parallax HIRE US Text */}
        <div className="mb-16 opacity-10 pointer-events-none">
            <ParallaxText baseVelocity={5}>HIRE US</ParallaxText>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Redesigned Section Header - Modern Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-20 border-b border-slate-800 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Our Expertise</span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                        How we take your business to the next level
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-start"
                >
                    <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                        We are a results-driven digital agency, and our mission is simple — to build fast, modern, and high-performing digital experiences that help your business grow. Through powerful design, smart technology, and proven optimization, we create solutions that bring real impact.
                    </p>
                    <Link to="/services">
                        <button className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-colors duration-300">
                            See all services
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            </div>

            <div className="text-left mb-8">
                 <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Our Core Services</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreServicesData.map((service, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`group relative overflow-hidden rounded-2xl h-[400px] border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 ${service.colSpan || ''}`}
                    >
                        {/* Background Video */}
                        <div className="absolute inset-0 z-0">
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            >
                                <source src={service.video} type="video/mp4" />
                            </video>
                        </div>

                        {/* Dark Overlay - Lightens on Hover */}
                        <div className="absolute inset-0 bg-black/85 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>

                        {/* Content */}
                        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                <p className="text-slate-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <AnimatedHeading text="Our Expert Services" className="text-4xl md:text-5xl font-bold mb-4" />
                <p className="text-slate-400 text-lg mb-16">We provide end-to-end digital solutions tailored to your business needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard 
                    index={0}
                    icon={<CodeIcon className="h-10 w-10"/>} 
                    title="Website Development"
                    desc="Custom websites built with HTML5, CSS3, JavaScript - Fast, responsive, and SEO-optimized."
                    features={['Business Websites', 'E-commerce Stores', 'Landing Pages']}
                    price="₹8,999"
                />
                <ServiceCard
                    index={1} 
                    icon={<MobileIcon className="h-10 w-10"/>} 
                    title="Mobile App Development"
                    desc="Cross-platform mobile apps using React Native & Expo - One code for iOS & Android."
                    features={['Business Apps', 'E-commerce Apps', 'Custom Solutions']}
                    price="₹15,999"
                />
                <ServiceCard 
                    index={2}
                    icon={<WordPressIcon className="h-10 w-10"/>} 
                    title="WordPress Solutions"
                    desc="Professional WordPress websites with custom themes & plugins."
                    features={['WordPress Development', 'WooCommerce Stores', 'Website Maintenance']}
                    price="₹6,999"
                />
            </div>
        </div>
      </section>
      
      {/* Special Offers Section */}
      <section className="py-24 sm:py-32 bg-gray-900/40 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
              <AnimatedHeading text="🚀 Limited Time Offers" className="text-4xl md:text-5xl font-bold mb-16" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div initial={{opacity:0, x:-50}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{duration:0.7}} className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 p-8 rounded-2xl border border-purple-400/30 flex flex-col text-center">
                  <span className="font-bold bg-yellow-400 text-black px-3 py-1 rounded-full self-center mb-4">[HOT]</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Website + Mobile App Package</h3>
                  <p className="text-slate-300 mb-4">Get both website and mobile app at <span className="text-yellow-300 font-bold">30% discount</span></p>
                  <p className="text-slate-400 line-through text-lg">Original Price: ₹35,000</p>
                  <p className="text-cyan-300 text-3xl font-bold">Discount Price: ₹24,500 Only</p>
              </motion.div>
              <motion.div initial={{opacity:0, x:50}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{duration:0.7, delay: 0.2}} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 flex flex-col text-center">
                  <span className="font-bold bg-green-400 text-black px-3 py-1 rounded-full self-center mb-4">[NEW]</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Free SEO for 3 Months</h3>
                  <p className="text-slate-300 mb-4">Get any website project and receive FREE SEO services for 3 months</p>
                  <p className="text-green-400 text-3xl font-bold">Value: ₹9,000 FREE</p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
       <section className="py-24 sm:py-32 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <AnimatedHeading text="Why Choose Sameer Digital Lab?" className="text-4xl md:text-5xl font-bold mb-16" />
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.2 }}
            >
                <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<SpeedIcon className="w-10 h-10"/>} title="⚡ Fast Delivery" desc="Websites in 5-7 days, apps in 2-3 weeks" />
                </motion.div>
                 <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<WalletIcon className="w-10 h-10"/>} title="💰 Budget-Friendly" desc="Quality work at competitive Indian market prices" />
                </motion.div>
                 <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<MaintenanceIcon className="w-10 h-10"/>} title="🔧 Post-Launch Support" desc="15 days free support on every project" />
                </motion.div>
                 <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<PhoneIcon className="w-10 h-10"/>} title="📞 Direct Communication" desc="Work directly with the developer - No middlemen" />
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32 bg-gray-900/40 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
              <AnimatedHeading text="What Our Clients Say" className="text-4xl md:text-5xl font-bold mb-16" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <TestimonialCard 
              quote="Sameer delivered our website in just 6 days! The quality exceeded our expectations. Highly recommended!"
              name="Raj Sharma, Mumbai"
              role="Business Owner"
            />
            <TestimonialCard 
              quote="The mobile app developed by SameerCodes Studios helped us increase our sales by 40%. Great work!"
              name="Priya Patel, Delhi"
              role="Startup Founder"
            />
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-24 sm:py-32 bg-white relative z-10">
        <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Ready to Transform Your Business?</h2>
              <p className="max-w-2xl mx-auto text-slate-600 text-lg mb-8">Get a FREE website/app consultation and project estimate.</p>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-slate-700 font-semibold">
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-600"/> No Advance Payment</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-600"/> 100% Satisfaction</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-600"/> Money-Back Guarantee</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/contact">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-slate-900 text-white font-bold rounded-full text-xl shadow-lg shadow-slate-900/30 transition-all duration-300">
                          Start Your Project Today
                      </motion.button>
                  </Link>
                  <a href="tel:+910000000000">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-green-500 text-white font-bold rounded-full text-xl shadow-lg shadow-green-500/30 transition-all duration-300">
                          Call Now: +91 XXXXX XXXXX
                      </motion.button>
                  </a>
              </div>
              <p className="mt-6 text-slate-500">Or email us at: <a href="mailto:support@sameercodes.online" className="text-slate-800 font-semibold hover:underline">support@sameercodes.online</a></p>
            </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
