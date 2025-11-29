
import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { Link } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import ParticleBackground from '../components/ParticleBackground';
import PremiumButton from '../components/PremiumButton';
import { useCursor } from '../components/CustomCursor'; // Import hook
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
    ArrowRightIcon,
    FigmaIcon,
    DesignIcon,
    StrategyIcon,
    RocketIcon,
    TargetIcon
} from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';

// --- Types ---
interface ProjectData {
    title: string;
    category: string;
    description: string;
    image1: string;
    image2: string;
    tools: React.ReactNode[];
    role: string;
    timeline: string;
    fullImage: string;
}

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    features: string[];
    price: string;
    index: number;
}

const ServiceCard = ({ icon, title, desc, features, price, index }: ServiceCardProps) => {
    const { setCursorVariant, setCursorText } = useCursor();

    return (
        <motion.div
            className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col group cursor-none"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => {
                setCursorVariant('view-more');
                setCursorText('View More');
            }}
            onMouseLeave={() => {
                setCursorVariant('default');
                setCursorText('');
            }}
        >
            <div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">{icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-slate-100 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-slate-400 mb-4 flex-grow">{desc}</p>
            <ul className="text-slate-300 space-y-2 mb-6 text-sm">
                {features.map(feature => <li key={feature} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>{feature}</li>)}
            </ul>
            <div className="mt-auto pt-4 border-t border-slate-800 group-hover:border-cyan-500/20 transition-colors">
                <p className="text-slate-300 text-lg font-semibold">Starting at <span className="text-cyan-400">{price}</span></p>
            </div>
        </motion.div>
    );
};

interface WhyChooseCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const WhyChooseCard = ({ icon, title, desc }: WhyChooseCardProps) => (
    <div className="bg-slate-900/30 p-6 rounded-lg border border-slate-800 text-center hover:bg-slate-900/50 transition-colors hover:border-cyan-500/30">
        <div className="text-cyan-400 w-12 h-12 mx-auto mb-4 flex items-center justify-center">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </div>
);

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => (
    <motion.div 
        className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
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

// --- PROJECT MODAL COMPONENT ---
interface ProjectModalProps {
    project: ProjectData;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-cyan-500/20 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-slate-800/80 rounded-full text-white hover:bg-red-500/80 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* LEFT SIDE: DETAILS */}
                <div className="w-full md:w-5/12 p-8 md:p-10 overflow-y-auto custom-scrollbar border-r border-slate-800 flex flex-col">
                    <div className="mb-6">
                         <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                            {project.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8 border-y border-slate-800 py-6">
                        <div>
                            <span className="block text-slate-500 text-xs uppercase tracking-widest mb-1">Role</span>
                            <span className="text-slate-200 font-semibold">{project.role}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500 text-xs uppercase tracking-widest mb-1">Timeline</span>
                            <span className="text-slate-200 font-semibold">{project.timeline}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Project Overview</h3>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            {project.description}
                        </p>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base mt-4">
                            We focused on creating a seamless user experience that balances aesthetic appeal with high-performance functionality. The goal was to drive conversions while telling a compelling brand story.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool, idx) => (
                                <div key={idx} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md text-sm border border-slate-700">
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <Link to="/contact">
                            <PremiumButton width="full" icon={true}>Visit Live Site</PremiumButton>
                        </Link>
                    </div>
                </div>

                {/* RIGHT SIDE: SCROLLING IMAGE */}
                <div className="w-full md:w-7/12 h-full bg-slate-950 relative overflow-hidden group">
                    <div className="absolute inset-0 w-full h-full">
                         {/* CSS Animation for Auto Scrolling */}
                         <style>{`
                            @keyframes scroll-image {
                                0% { transform: translateY(0); }
                                100% { transform: translateY(calc(-100% + 100vh)); } 
                            }
                            .animate-scroll-image {
                                animation: scroll-image 15s linear infinite alternate;
                            }
                            .animate-scroll-image:hover {
                                animation-play-state: paused;
                            }
                         `}</style>
                        <img 
                            src={project.fullImage} 
                            alt={`${project.title} Full Page`} 
                            className="w-full h-auto object-cover animate-scroll-image"
                        />
                    </div>
                    
                    {/* Overlay hint */}
                    <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white text-xs font-bold pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        Scrolling Preview
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const animatedHeadings = [
    "Digital Products",
    "Successful Businesses",
    "Revenue Streams",
    "Brand Stories",
    "Market Leaders"
];

const coreServicesData = [
    {
        title: "Website Development",
        desc: "We design and develop modern, responsive, and high-performance websites that strengthen your brand and convert visitors into customers.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927887/website_g6erpv.mp4",
        colSpan: "lg:col-span-2",
        link: "/web-development"
    },
    {
        title: "SEO Optimization",
        desc: "We improve your search rankings with clean, strategic, and data-driven SEO—bringing you more visibility, more traffic, and more real business results.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927973/Seo_Search_h9ua0s.mp4",
        colSpan: "lg:col-span-1",
        link: "/seo-optimization"
    },
    {
        title: "App Development",
        desc: "We create smooth, user-friendly, and scalable mobile applications that help your business reach customers anywhere, on any device.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927584/app_cwwxyt.mp4",
        colSpan: "lg:col-span-1",
        link: "/app-development"
    },
    {
        title: "Shopify Development",
        desc: "We build optimized Shopify stores with premium design, fast performance, and conversion-focused layouts that boost sales.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763928151/shopigy_pnq2kb.mp4",
        colSpan: "lg:col-span-1",
        link: "/shopify-development"
    },
    {
        title: "WordPress Customization",
        desc: "We upgrade, redesign, and fully customize WordPress sites—making them faster, cleaner, and perfectly aligned with your brand.",
        video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927832/wordpress_z7f2lk.mp4",
        colSpan: "lg:col-span-1",
        link: "/wordpress-customization"
    }
];

// Mock Projects Data
const selectedProjects: ProjectData[] = [
    {
        title: "Elegantnast",
        category: "Luxury Beauty Brand",
        description: "Created a multilingual luxury website for Elegantnast, focusing on elegance and premium brand aesthetics.",
        image1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2070&auto=format&fit=crop",
        tools: [<WordPressIcon className="w-5 h-5 text-blue-400" />, <FigmaIcon className="w-5 h-5 text-purple-400" />, <JsIcon className="w-5 h-5 text-yellow-400" />],
        role: "Lead Developer & Designer",
        timeline: "6 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764387541/ittefaq_xlwtfu.jpg"
    },
    {
        title: "Macrostate Landing Page",
        category: "SaaS Landing Page",
        description: "I designed and developed a high-converting solution landing page for MacroState in Webflow, showcasing their UniFi Door Access solutions.",
        image1: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        tools: [<ReactIcon className="w-5 h-5 text-cyan-400" />, <FigmaIcon className="w-5 h-5 text-purple-400" />, <JsIcon className="w-5 h-5 text-yellow-400" />],
        role: "Frontend Developer",
        timeline: "3 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764387541/ittefaq_xlwtfu.jpg"
    },
    {
        title: "MAJER Sales – Conversion",
        category: "Corporate Website",
        description: "High converting landing page for MAJER Sales — licensing the 'Automakler-System' (auto brokerage system) for partners in Germany.",
        image1: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        tools: [<WordPressIcon className="w-5 h-5 text-blue-400" />, <ReactIcon className="w-5 h-5 text-cyan-400" />, <JsIcon className="w-5 h-5 text-yellow-400" />],
        role: "Full Stack Developer",
        timeline: "5 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764387541/ittefaq_xlwtfu.jpg"
    },
    {
        title: "GWP's Aerospace",
        category: "Industrial / Aerospace",
        description: "For this project, I partnered with Brafton to establish the digital presence of a company specializing in Aluminum Wing Skins.",
        image1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2106&auto=format&fit=crop",
        tools: [<ReactIcon className="w-5 h-5 text-cyan-400" />, <ExpoIcon className="w-5 h-5 text-white" />, <SupabaseIcon className="w-5 h-5 text-green-400" />],
        role: "Lead Developer",
        timeline: "8 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764387541/ittefaq_xlwtfu.jpg"
    },
    {
        title: "NeonFlux E-Com",
        category: "E-Commerce",
        description: "A futuristic fashion e-commerce store built with Shopify Hydrogen. Blazing fast speeds and immersive product interactions.",
        image1: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2074&auto=format&fit=crop",
        tools: [<ReactIcon className="w-5 h-5 text-blue-400" />, <JsIcon className="w-5 h-5 text-yellow-400" />, <FigmaIcon className="w-5 h-5 text-purple-400" />],
        role: "Shopify Developer",
        timeline: "4 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764387541/ittefaq_xlwtfu.jpg"
    },
    {
        title: "Zenith Health App",
        category: "Mobile Application",
        description: "Cross-platform mobile app for tracking mindfulness and meditation stats, integrated with Apple Health and Google Fit.",
        image1: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2074&auto=format&fit=crop",
        tools: [<ReactIcon className="w-5 h-5 text-cyan-400" />, <ExpoIcon className="w-5 h-5 text-white" />, <SupabaseIcon className="w-5 h-5 text-green-400" />],
        role: "Mobile App Developer",
        timeline: "10 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764387541/ittefaq_xlwtfu.jpg"
    }
];

const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
    const { setCursorVariant, setCursorText } = useCursor(); // Use cursor hook
    const workContainerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    const { scrollYProgress } = useScroll({
        target: workContainerRef,
        offset: ["start end", "end start"]
    });
    
    // Parallax effect for "Our Work" text
    const parallaxX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % animatedHeadings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    const backgroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557012/ABOUT_Agensi_Pekerjaan_Nusamas_Sdn_Bhd_ypmqnb.mp4";
    const foregroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557903/Website_Background_Videos_Download_The_BEST_Free_4k_Stock_Video_io7gxb.mp4";

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-slate-950/95 z-0"></div>

        <ParticleBackground />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative w-full h-full flex items-center py-24 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
                
                {/* Left Side */}
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
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 mb-3 backdrop-blur-sm shadow-lg shadow-cyan-500/10"
                    >
                        <span className="font-bold tracking-widest uppercase text-[14px]">
                            Web & Mobile App Development Agency
                        </span>
                    </motion.div>

                    <motion.h1 
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="text-[42px] sm:text-[48px] lg:text-[56px] font-bold text-slate-50 tracking-tight mb-2 drop-shadow-2xl leading-[1.1]"
                    >
                        Transform Your Ideas Into <br />
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

                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="text-[16px] text-slate-300 mb-8 max-w-lg leading-relaxed font-light border-l-4 border-cyan-500/30 pl-6"
                    >
                        We turn your vision into reality with cutting-edge web and mobile applications. 
                        Our expertise in React Native, WordPress, and modern frameworks ensures your digital presence stands out. 
                        We don't just build software - we create solutions that drive growth, engage users, and deliver tangible business results.
                    </motion.p>

                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="flex items-center"
                    >
                        <div className="inline-flex items-center p-1 rounded-full border border-slate-700 bg-slate-900/40 backdrop-blur-sm">
                            <Link to="/contact">
                                <PremiumButton className="!m-0">Start Your Project</PremiumButton>
                            </Link>
                            <Link to="/portfolio">
                                <span className="px-6 py-4 text-slate-300 font-bold hover:text-white transition-colors duration-300 cursor-pointer">
                                    View Our Work
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side: Foreground Video */}
                <motion.div 
                    className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                     <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[70%] h-[70%] border border-cyan-500/10 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <ReactIcon className="w-6 h-6 text-cyan-400" />
                                    </motion.div>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <SupabaseIcon className="w-6 h-6 text-green-400" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[100%] h-[100%] border border-purple-500/10 rounded-full border-dashed"
                            >
                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-full border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                        <JsIcon className="w-6 h-6 text-yellow-400" />
                                    </motion.div>
                                </div>
                                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-full border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                        <ExpoIcon className="w-6 h-6 text-white" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

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
      <section className="py-24 bg-slate-950 text-white border-b border-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-bold leading-tight"
                    >
                        It all starts with our <br />
                        <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">DIGITAL PROCESS.</span>
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
                    <motion.div
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.4 }}
                    >
                        <Link to="/about">
                            <PremiumButton icon={false} className="border border-white/30 !bg-none hover:bg-white hover:text-black hover:from-white hover:to-white">
                                Find Out More
                            </PremiumButton>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Steps with staggered animation */}
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
                    <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">DISCOVER</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We discover your goals, brand identity, and user needs so we can build the right strategy from day one.
                    </p>
                </motion.div>

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
                    <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">EXPLORE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We explore modern design ideas and powerful technical solutions to create a website that is fast, modern, and impactful.
                    </p>
                </motion.div>

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
                    <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">EXPERIENCE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We deliver a high-performance experience—a website that loads fast, ranks higher, and grows your business.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* HOW WE TAKE YOUR BUSINESS TO THE NEXT LEVEL */}
      <section className="py-24 bg-slate-950 relative z-10 overflow-hidden">
        <div className="mb-16 opacity-30 pointer-events-none">
            <ParallaxText baseVelocity={5}>HIRE US</ParallaxText>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                        <PremiumButton>See all services</PremiumButton>
                    </Link>
                </motion.div>
            </div>

            <div className="text-left mb-8">
                 <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Our Core Services</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreServicesData.map((service, index) => (
                    <Link 
                        to={service.link}
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl h-[400px] border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 ${service.colSpan || ''}`}
                        onMouseEnter={() => {
                            setCursorVariant('view-more');
                            setCursorText('View More');
                        }}
                        onMouseLeave={() => {
                            setCursorVariant('default');
                            setCursorText('');
                        }}
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full w-full relative"
                        >
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
                            <div className="absolute inset-0 bg-slate-950/90 group-hover:bg-slate-950/40 transition-colors duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* CLOSING SECTION: Text Left, Button Right */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center"
            >
                <div className="lg:col-span-2">
                    <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-light">
                        "In a digital world full of competition, we create the advantage. Our solutions turn your ideas into high-performing digital experiences—experiences that inspire trust, drive engagement, and push your business forward with real results."
                    </p>
                </div>
                <div className="flex lg:justify-end">
                    <Link to="/contact">
                        <PremiumButton className="text-lg px-12 py-5">Start a Project</PremiumButton>
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>

      {/* NEW SELECTED WORK SECTION */}
      <section className="relative py-32 bg-slate-950 overflow-hidden" ref={workContainerRef}>
        {/* Parallax Background Text - Moved down to be behind content */}
        <motion.div 
            style={{ x: parallaxX }}
            className="absolute top-40 left-0 text-[18vw] font-black text-white/[0.03] whitespace-nowrap leading-none select-none pointer-events-none z-0"
        >
            Our Work
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Projects</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Selected Work</h2>
                    <p className="text-slate-400 max-w-xl text-lg">
                        Craft meets conversion. Here are a few recent projects that pushed boundaries.
                    </p>
                </motion.div>
                
                <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                >
                    <Link to="/portfolio">
                        <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                            View All Work <ArrowRightIcon className="w-5 h-5"/>
                        </button>
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative group rounded-2xl p-[2px] overflow-hidden" 
                    >
                         {/* Animated Rotating Border (Cyan + Purple) */}
                        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,#0f172a_0%,#0f172a_40%,#22d3ee_50%,#0f172a_60%,#0f172a_90%,#8936ea_100%)] animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        
                         {/* Inner Card */}
                        <div className="relative h-full bg-slate-950 rounded-xl overflow-hidden flex flex-col">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                                {/* Base Image */}
                                <img 
                                    src={project.image1} 
                                    alt={project.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                                />
                                {/* Hover Image */}
                                <img 
                                    src={project.image2} 
                                    alt={`${project.title} hover`} 
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105"
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Content Below */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                     <div>
                                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                     </div>
                                      <Link to="/portfolio" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                            <ArrowRightIcon className="w-6 h-6 -rotate-45" />
                                     </Link>
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3 flex-grow">
                                    {project.description}
                                </p>
                                
                                 {/* Footer: Button & Tech Stack */}
                                <div className="mt-auto pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                    <button 
                                        onClick={() => setSelectedProject(project)}
                                        className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/50 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-cyan-500/5 flex items-center gap-2 group/btn"
                                    >
                                        View Project
                                        <ArrowRightIcon className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="flex items-center gap-3">
                                        {project.tools.map((tool, tIndex) => (
                                            <div key={tIndex} className="text-slate-400 hover:text-white transition-colors p-1.5 bg-slate-900 rounded-md border border-slate-800 shadow-sm hover:border-purple-500/30">
                                                {tool}
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                <AnimatedHeading text="Precision-Engineered Digital Services" className="text-4xl md:text-5xl font-bold mb-4" />
                <p className="text-slate-400 text-lg mb-16">
                    We combine technical mastery with creative brilliance to build digital products that set you apart. From complex enterprise platforms to stunning brand identities, we deliver solutions that perform as beautifully as they look.
                </p>
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
            <div className="mt-16 text-center">
                <Link to="/services">
                    <PremiumButton>View All Services</PremiumButton>
                </Link>
            </div>
        </div>
      </section>
      
      {/* Special Offers Section */}
      <section className="py-24 sm:py-32 bg-slate-950 relative z-10 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
              <AnimatedHeading text="🚀 Limited Time Offers" className="text-4xl md:text-5xl font-bold mb-16" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div initial={{opacity:0, x:-50}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{duration:0.7}} className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-8 rounded-2xl border border-purple-500/30 flex flex-col text-center">
                  <span className="font-bold bg-yellow-400 text-black px-3 py-1 rounded-full self-center mb-4">[HOT]</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Website + Mobile App Package</h3>
                  <p className="text-slate-300 mb-4">Get both website and mobile app at <span className="text-yellow-300 font-bold">30% discount</span></p>
                  <p className="text-slate-400 line-through text-lg">Original Price: ₹35,000</p>
                  <p className="text-purple-300 text-3xl font-bold">Discount Price: ₹24,500 Only</p>
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
      <section className="py-24 sm:py-32 bg-slate-950 relative z-10 border-t border-slate-900">
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
      <section className="py-24 sm:py-32 bg-slate-950 relative z-10 border-t border-slate-900">
        <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-8">Get a FREE website/app consultation and project estimate.</p>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-slate-400 font-semibold">
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500"/> No Advance Payment</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500"/> 100% Satisfaction</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500"/> Money-Back Guarantee</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/contact">
                      <PremiumButton className="px-10 py-4 text-lg">Start Your Project Today</PremiumButton>
                  </Link>
                  <a href="tel:+910000000000">
                      <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        className="px-10 py-4 bg-transparent border border-green-500 text-green-400 font-bold rounded-full text-xl shadow-lg shadow-green-500/10 transition-all duration-300 hover:bg-green-500 hover:text-white"
                      >
                          Call Now
                      </motion.button>
                  </a>
              </div>
              <p className="mt-6 text-slate-500">Or email us at: <a href="mailto:support@sameercodes.online" className="text-cyan-400 font-semibold hover:underline">support@sameercodes.online</a></p>
            </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
