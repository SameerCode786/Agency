import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { Link, useLocation } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import ParticleBackground from '../components/ParticleBackground';
import PremiumButton from '../components/PremiumButton';
import { useCursor } from '../components/CustomCursor'; 
import { 
    ReactIcon,
    JsIcon,
    ArrowRightIcon,
    FigmaIcon,
    CodeIcon,
    CssIcon,
    DatabaseIcon,
    ApiIcon,
    HtmlIcon,
    StarIcon
} from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';
import { ALL_PROJECTS, ProjectData, getToolIcon } from '../data/projectsData';

// --- REVIEWS & FAQ DATA ---
const reviewsData = [
    {
        name: "David M.",
        role: "Project Lead",
        quote: "Sameer Digital Lab is a very quick study and is very creative across many different skill sets which we used for this project. I would highly recommend them to anyone needing premium services. It was a joy to work with, detailed oriented and always able to make excellent recommendations.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442737/mantwo_dwcstk.png" 
    },
    {
        name: "James T.",
        role: "CEO, TechFlow",
        quote: "Sameer Digital Lab did an awesome job. They were proactive with communication, gave additional tips on SEO, and completed the task as expected. Great choice if you're looking to get your SEO up and running.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442767/manthree_ol3l4l.png" 
    },
    {
        name: "Sarah Jenkins",
        role: "Marketing Director",
        quote: "The team at Sameer Digital Lab transformed our online presence. Their design sense is impeccable, and the development quality is top-notch. Our conversion rates have doubled since the launch.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442822/women_y9wmlf.png" 
    },
    {
        name: "Michael R.",
        role: "Founder, StartupX",
        quote: "I was impressed by the speed and efficiency. Sameer Digital Lab delivered a complex React application ahead of schedule without compromising on quality. Highly recommended for scalable solutions.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442792/man_wrn6b3.png" 
    }
];

const faqCategories = ['General', 'Process', 'Other'];

const faqData: Record<string, {q: string, a: string}[]> = {
    'General': [
        { q: "How long does a website project usually take to complete?", a: "It depends on the scope. A brochure site might take 2-4 weeks, while complex e-commerce or web apps can take 8-12 weeks." },
        { q: "How much does a website cost?", a: "Pricing is tailored to requirements. We offer packages starting from reasonable rates for startups up to enterprise-level custom development." },
        { q: "How easy is it for me to change content myself?", a: "Very easy. We build with CMS solutions like WordPress or headless CMS that allow you to edit text and images without coding." },
        { q: "Can I create PPC landing pages myself?", a: "Yes, we can set up templates that allow you to spin up new landing pages for campaigns quickly." },
        { q: "We have a limited budget, will you still work with us?", a: "We try to accommodate various budgets by offering phased approaches or specific packages." },
        { q: "Do you outsource any work?", a: "No, all our core development and design is handled in-house to ensure quality and communication." }
    ],
    'Process': [
        { q: "How many meetings can we have?", a: "As many as needed, though we value your time. We typically have a kickoff, weekly updates, and milestone reviews." },
        { q: "Do we have a dedicated project manager?", a: "Yes, every project is assigned a lead point of contact to ensure smooth communication." },
        { q: "What are your payment terms?", a: "Standard terms are 50% deposit and 50% on completion, though we can discuss milestones for larger projects." },
        { q: "We’re not based in Manchester, does that matter?", a: "We work with clients all over the UK..... all over the world in fact. So location does not matter, we will guide you through the process and communicate clearly at certain stages via Email, and sometimes Zoom. If available, we are happy to have F2F meetings." }
    ],
    'Other': [
        { q: "What services do you offer?", a: "We offer Web Development, Mobile App Development, SEO, UI/UX Design, and Digital Strategy." }
    ]
};

const latestBlogs = [
    {
        id: 102,
        title: "Scaling Your Shopify Store in 2025",
        category: "Technology",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop",
        link: "/blog/102",
        excerpt: "Discover the technical strategies high-growth brands use to turn visitors into loyal customers on Shopify."
    },
    {
        id: 101,
        title: "Why Technical SEO is the Missing Piece",
        category: "Design",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        link: "/blog/101",
        excerpt: "Is your beautiful website invisible to Google? Hidden technical barriers could be killing your rankings."
    },
    {
        id: 3,
        title: "The Future of Web Development in 2024",
        category: "Business",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
        link: "/blog",
        excerpt: "Exploring how AI and next-gen frameworks are reshaping the way we build for the web."
    },
    {
        id: 4,
        title: "AI in Creative Agencies",
        category: "Technology",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
        link: "/blog",
        excerpt: "How generative AI is helping agencies speed up content creation while maintaining high quality."
    }
];

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

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
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
                className="bg-slate-900 border border-slate-700 w-full max-w-7xl h-[90vh] md:h-[85vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-cyan-500/20 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-slate-800/80 rounded-full text-white hover:bg-red-500/80 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto custom-scrollbar border-r border-slate-800 flex flex-col">
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
                    </div>

                    {project.goals && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-white mb-3">Project Goals</h3>
                            <ul className="space-y-2">
                                {project.goals.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-400 text-sm md:text-base">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"></div>
                                        <span>{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool, idx) => (
                                <div key={idx} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md text-sm border border-slate-700 flex items-center gap-2">
                                    {getToolIcon(tool, "w-4 h-4")}
                                    <span className="capitalize">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                            <PremiumButton width="full" icon={true}>View Project</PremiumButton>
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 h-full bg-slate-950 relative overflow-hidden group">
                    <div className="absolute inset-0 w-full h-full">
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

const heroToolsOrbit = [
    { name: 'JavaScript', icon: <JsIcon className="w-5 h-5 text-yellow-400" /> },
    { name: 'React Native', icon: <ReactIcon className="w-5 h-5 text-cyan-400" /> },
    { name: 'MongoDB', icon: <DatabaseIcon className="w-5 h-5 text-green-500" /> },
    { name: 'Express JS', icon: <ApiIcon className="w-5 h-5 text-white" /> },
    { name: 'HTML', icon: <HtmlIcon className="w-5 h-5 text-orange-500" /> },
    { name: 'CSS', icon: <CssIcon className="w-5 h-5 text-blue-500" /> },
    { name: 'Node JS', icon: <CodeIcon className="w-5 h-5 text-green-600" /> },
    { name: 'Figma', icon: <FigmaIcon className="w-5 h-5 text-purple-400" /> },
];

const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
    const { setCursorVariant, setCursorText } = useCursor();
    const workContainerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    // Carousel Ref for Blog Section
    const blogCarouselRef = useRef<HTMLDivElement>(null);

    const scrollBlog = (direction: 'left' | 'right') => {
        if (blogCarouselRef.current) {
            const { scrollLeft, clientWidth } = blogCarouselRef.current;
            const scrollAmount = clientWidth * 0.8;
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            blogCarouselRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    const reviewsContainerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'reviews' | 'faqs'>('reviews');
    const [activeFaqCategory, setActiveFaqCategory] = useState('General');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const location = useLocation();
    
    useEffect(() => {
        if (location.state && (location.state as any).scrollTo === 'reviews') {
            const element = document.getElementById('reviews');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const { scrollYProgress: reviewsScrollProgress } = useScroll({
        target: reviewsContainerRef,
        offset: ["start start", "end end"]
    });

    const containerWidth = useTransform(reviewsScrollProgress, [0, 0.3], ["85%", "100%"]);
    const containerRadius = useTransform(reviewsScrollProgress, [0, 0.3], ["40px", "0px"]);

    const [reviewIndex, setReviewIndex] = useState(0);
    const reviewsPerPage = 2;

    const nextReview = () => {
        setReviewIndex((prev) => (prev + reviewsPerPage) % reviewsData.length);
    };

    const prevReview = () => {
        setReviewIndex((prev) => (prev - reviewsPerPage + reviewsData.length) % reviewsData.length);
    };

    const currentReviews = reviewsData.slice(reviewIndex, reviewIndex + reviewsPerPage);

    const { scrollYProgress } = useScroll({
        target: workContainerRef,
        offset: ["start end", "end start"]
    });
    
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
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/95 z-0"></div>
        <ParticleBackground />
        {/* Adjusted padding for symmetry and better bottom clearance */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative w-full h-full flex items-center pt-32 pb-32 md:pt-40 md:pb-40">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
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
                    <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 mb-3 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
                        <span className="font-bold tracking-widest uppercase text-[14px]">Web & Mobile App Development Agency</span>
                    </motion.div>
                    <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}} className="text-[42px] sm:text-[48px] lg:text-[56px] font-bold text-slate-50 tracking-tight mb-2 drop-shadow-2xl leading-[1.1]">
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
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}} className="text-[16px] text-slate-300 mb-8 max-w-lg leading-relaxed font-light border-l-4 border-cyan-500/30 pl-6">
                        We turn your vision into reality with cutting-edge web and mobile applications. Our expertise in React Native, WordPress, and modern frameworks ensures your digital presence stands out. 
                    </motion.p>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}} className="flex items-center">
                        {/* Redesigned Button Container to fix mobile/tablet squashing and overlap issues */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:p-1 sm:rounded-full sm:border sm:border-slate-800 sm:bg-slate-900/40 sm:backdrop-blur-md w-full sm:w-auto">
                            <Link to="/contact" className="w-full sm:w-auto">
                                <PremiumButton className="!m-0 !w-full sm:!w-auto !py-4 sm:!py-4 whitespace-nowrap">Start Your Project</PremiumButton>
                            </Link>
                            <Link to="/portfolio" className="w-full sm:w-auto text-center">
                                <span className="block sm:inline-block px-8 py-4 text-slate-300 font-bold hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap text-sm sm:text-base">View Our Work</span>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}>
                     <div className="relative w-[450px] h-[450px] flex items-center justify-center">
                        
                        {/* OUTER ORBIT (Clockwise - Cyan Path) */}
                        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                            {/* Visible Path Line 1 */}
                            <div className="absolute w-[95%] h-[95%] border border-cyan-500/15 rounded-full"></div>
                            
                            <motion.div 
                                animate={{ rotate: 360 }} 
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                                className="absolute w-[95%] h-[95%] rounded-full"
                            >
                                {heroToolsOrbit.slice(0, 4).map((tool, idx) => {
                                    const angle = (idx / 4) * 360;
                                    return (
                                        <div 
                                            key={tool.name}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            style={{ 
                                                transform: `rotate(${angle}deg) translate(210px) rotate(-${angle}deg)` 
                                            }}
                                        >
                                            <div className="bg-slate-950/80 backdrop-blur-md p-2 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20 group hover:border-cyan-400 transition-colors">
                                                <motion.div 
                                                    animate={{ rotate: -360 }} 
                                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                    className="w-8 h-8 flex items-center justify-center"
                                                >
                                                    {tool.icon}
                                                </motion.div>
                                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-cyan-950/90 text-cyan-300 text-[10px] font-bold px-2 py-1 rounded border border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {tool.name}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* INNER ORBIT (Counter-Clockwise - Purple Path) */}
                        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                            {/* Visible Path Line 2 */}
                            <div className="absolute w-[72%] h-[72%] border border-purple-500/15 rounded-full"></div>

                            <motion.div 
                                animate={{ rotate: -360 }} 
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
                                className="absolute w-[72%] h-[72%] rounded-full"
                            >
                                {heroToolsOrbit.slice(4, 8).map((tool, idx) => {
                                    const angle = (idx / 4) * 360;
                                    return (
                                        <div 
                                            key={tool.name}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            style={{ 
                                                transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)` 
                                            }}
                                        >
                                            <div className="bg-slate-950/80 backdrop-blur-md p-2 rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/20 group hover:border-purple-400 transition-colors">
                                                <motion.div 
                                                    animate={{ rotate: 360 }} 
                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
                                                    className="w-8 h-8 flex items-center justify-center"
                                                >
                                                    {tool.icon}
                                                </motion.div>
                                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-purple-950/90 text-purple-300 text-[10px] font-bold px-2 py-1 rounded border border-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {tool.name}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                        
                        {/* Static Core Orbit */}
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] h-[60%] border border-cyan-500/5 rounded-full">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <ReactIcon className="w-5 h-5 text-cyan-400" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Central Earth globe */}
                        <div className="w-[50%] h-[50%] z-20 flex justify-center items-center overflow-hidden rounded-full shadow-[0_0_60px_rgba(34,211,238,0.15)] border border-white/10">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover mix-blend-screen transform scale-110">
                                <source src={foregroundVideoUrl} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* DIGITAL PROCESS SECTION */}
      <section className="py-24 bg-slate-950 text-white border-b border-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-bold leading-tight">
                        It all starts with our <br />
                        <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">DIGITAL PROCESS.</span>
                    </motion.h2>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-slate-400 text-lg leading-relaxed mb-8">
                        Every project begins with a strong digital process. At Sameer Digital Lab, we don’t rely on guesswork — we deliver results through clear strategy, in-depth research, and proven methods.
                    </motion.p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center group">
                    <div className="mb-6 p-0 rounded-full transition-colors duration-500 overflow-hidden w-32 h-32 flex items-center justify-center bg-black relative">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1763708206/discover-animation_tnruml.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">DISCOVER</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">We discover your goals, brand identity, and user needs so we can build the right strategy from day one.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center group">
                     <div className="mb-6 p-0 rounded-full transition-colors duration-500 overflow-hidden w-32 h-32 flex items-center justify-center bg-black relative">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1763708273/explore-animation_hteza3.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">EXPLORE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">We explore modern design ideas and powerful technical solutions to create a website that is fast and modern.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center group">
                     <div className="mb-6 p-0 rounded-full transition-colors duration-500 overflow-hidden w-32 h-32 flex items-center justify-center bg-black relative">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1763708320/experiment-animation_pnda4i.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">EXPERIENCE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">We deliver a high-performance experience—a website that loads fast, ranks higher, and grows your business.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section className="py-24 bg-slate-950 relative z-10 overflow-hidden">
        <div className="mb-16 opacity-30 pointer-events-none">
            <ParallaxText baseVelocity={5}>HIRE US</ParallaxText>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20 border-b border-slate-800 pb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Our Expertise</span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">How we take your business to the next level</h2>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-start">
                    <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">We are a results-driven digital agency, and our mission is simple — to build fast, modern, and high-performing digital experiences.</p>
                    <Link to="/services"><PremiumButton>See all services</PremiumButton></Link>
                </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreServicesData.map((service, index) => (
                    <Link to={service.link} key={index} className={`group relative overflow-hidden rounded-2xl h-[400px] border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 cursor-none ${service.colSpan || ''}`} onMouseEnter={() => { setCursorVariant('view-more'); setCursorText('Explore'); }} onMouseLeave={() => { setCursorVariant('default'); setCursorText(''); }}>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="h-full w-full relative">
                            <div className="absolute inset-0 z-0">
                                <video autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                                    <source src={service.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute inset-0 bg-slate-950/90 group-hover:bg-slate-950/40 transition-colors duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{service.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION */}
      <section className="relative py-32 bg-slate-950 overflow-hidden" ref={workContainerRef}>
        <motion.div style={{ x: parallaxX }} className="absolute top-40 left-0 text-[18vw] font-black text-white/[0.03] whitespace-nowrap leading-none select-none pointer-events-none z-0">Our Work</motion.div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Projects</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Selected Work</h2>
                    <p className="text-slate-400 max-w-xl text-lg">Craft meets conversion. Here are a few recent projects that pushed boundaries.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <Link to="/portfolio">
                        <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                            View All Work <ArrowRightIcon className="w-5 h-5"/>
                        </button>
                    </Link>
                </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 
                  IMPORTANT: ID 7 is 'Jadu Ki Kaat'. 
                  Filtering it out from Home Page only as requested. 
                  Showing only first 6 projects to maintain the desired grid structure.
                */}
                {ALL_PROJECTS.filter(project => project.id !== 7).slice(0, 6).map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="relative group rounded-2xl p-[2px] overflow-hidden">
                        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,#0f172a_0%,#0f172a_40%,#22d3ee_50%,#0f172a_60%,#0f172a_90%,#8936ea_100%)] animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-full bg-slate-950 rounded-xl overflow-hidden flex flex-col">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                                <img src={project.image1} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-100 group-hover:opacity-0" />
                                <img src={project.image2} alt={`${project.title} hover`} className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60"></div>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                     <div>
                                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                     </div>
                                      <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors group/link whitespace-nowrap" title="Visit Live Website">
                                            <span className="text-xs font-bold uppercase tracking-wider">Visit Live</span>
                                            <ArrowRightIcon className="w-5 h-5 -rotate-45" />
                                     </a>
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3 flex-grow">{project.description}</p>
                                <div className="mt-auto pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                    <button onClick={() => setSelectedProject(project)} className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/50 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-cyan-500/5 flex items-center gap-2 group/btn">
                                        View Project
                                        <ArrowRightIcon className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="flex items-center gap-3">
                                        {project.tools.map((tool, tIndex) => (
                                            <div key={tIndex} className="text-slate-400 hover:text-white transition-colors p-1.5 bg-slate-900 rounded-md border border-slate-800 shadow-sm">
                                                {getToolIcon(tool)}
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

      {/* REVIEWS & FAQS SECTION */}
      <section ref={reviewsContainerRef} id="reviews" className="relative h-[130vh] bg-slate-950">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
            <motion.div style={{ width: containerWidth, borderRadius: containerRadius }} className="bg-slate-900 border-y border-slate-800/50 shadow-2xl overflow-hidden relative z-10 w-[85%] rounded-[40px] max-w-[1920px]">
                 <div className="container mx-auto px-6 py-12 md:p-16 lg:p-20 relative z-10">
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                         <div className="lg:col-span-4 flex flex-col justify-center">
                             <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 w-fit">Client Success & Insights</span>
                             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Say & Ask</span></h2>
                             <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">We pride ourselves on transparent communication and exceptional results.</p>
                             <div className="inline-flex bg-black p-1.5 rounded-full border border-slate-800 relative w-full sm:w-auto">
                                 <motion.div className="absolute top-1.5 bottom-1.5 bg-cyan-500 rounded-full" initial={false} animate={{ left: activeTab === 'reviews' ? '6px' : '50%', width: 'calc(50% - 6px)' }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                 <button onClick={() => setActiveTab('reviews')} className={`relative z-10 px-8 py-4 rounded-full text-sm font-bold transition-colors duration-300 flex-1 sm:w-48 text-center uppercase tracking-wider ${activeTab === 'reviews' ? 'text-black' : 'text-slate-400 hover:text-white'}`}>Client Reviews</button>
                                 <button onClick={() => setActiveTab('faqs')} className={`relative z-10 px-8 py-4 rounded-full text-sm font-bold transition-colors duration-300 flex-1 sm:w-48 text-center uppercase tracking-wider ${activeTab === 'faqs' ? 'text-black' : 'text-slate-400 hover:text-white'}`}>Common Questions</button>
                             </div>
                         </div>
                         <div className="lg:col-span-8 min-h-[500px] flex items-center">
                             <AnimatePresence mode="wait">
                                 {activeTab === 'reviews' ? (
                                     <motion.div key="reviews" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full h-full flex flex-col justify-center">
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                             {currentReviews.map((review, i) => (
                                                 <motion.div key={review.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-slate-800 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 relative flex flex-col h-full">
                                                     <div className="flex items-center gap-4 mb-6">
                                                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                                                            <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                                         </div>
                                                         <div>
                                                             <h4 className="font-bold text-white text-base">{review.name}</h4>
                                                             <p className="text-cyan-400 text-xs uppercase tracking-wider font-bold">{review.role}</p>
                                                         </div>
                                                     </div>
                                                     <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">"{review.quote}"</p>
                                                     <div className="flex gap-1 text-yellow-400">{[...Array(review.stars)].map((_, idx) => <StarIcon key={idx} className="w-4 h-4 fill-current" />)}</div>
                                                 </motion.div>
                                             ))}
                                         </div>
                                         <div className="flex justify-center gap-4">
                                             <button onClick={prevReview} className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900 text-white flex items-center justify-center hover:bg-cyan-500 transition-all"><ArrowRightIcon className="w-5 h-5 rotate-180" /></button>
                                             <button onClick={nextReview} className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900 text-white flex items-center justify-center hover:bg-cyan-500 transition-all"><ArrowRightIcon className="w-5 h-5" /></button>
                                         </div>
                                     </motion.div>
                                 ) : (
                                     <motion.div key="faqs" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full flex flex-col h-full justify-center">
                                         <div className="flex border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar gap-8">
                                             {faqCategories.map((cat) => (
                                                 <button key={cat} onClick={() => { setActiveFaqCategory(cat); setActiveFaq(null); }} className={`pb-4 text-sm font-bold whitespace-nowrap transition-all relative uppercase tracking-wider ${activeFaqCategory === cat ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
                                                     {cat}
                                                     {activeFaqCategory === cat && <motion.div layoutId="faqTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />}
                                                 </button>
                                             ))}
                                         </div>
                                         <div className="space-y-2">
                                            {faqData[activeFaqCategory].map((faq, i) => (
                                                <div key={i} className={`bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${activeFaq === i ? 'bg-slate-800 border-slate-700' : ''}`}>
                                                    <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full text-left py-4 px-6 flex justify-between items-center hover:text-cyan-400 transition-colors group">
                                                        <span className={`text-base font-bold transition-colors duration-300 ${activeFaq === i ? 'text-cyan-400' : 'text-slate-200'}`}>{faq.q}</span>
                                                        <span className={`transform transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
                                                    </button>
                                                    <AnimatePresence>
                                                        {activeFaq === i && (
                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                                <div className="pt-0 pb-6 px-6 text-slate-400 text-sm leading-relaxed">{faq.a}</div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                         </div>
                                     </motion.div>
                                 )}
                             </AnimatePresence>
                         </div>
                     </div>
                 </div>
            </motion.div>
        </div>
      </section>

      {/* FINAL BLOG SECTION: ROW CAROUSEL LAYOUT */}
      <section 
        className="py-32 bg-slate-950 relative border-t border-slate-900 group/blog overflow-hidden cursor-none"
        onMouseEnter={() => { setCursorVariant('view-more'); setCursorText('View'); }}
        onMouseLeave={() => { setCursorVariant('default'); setCursorText(''); }}
      >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Column: Heading, Button & Controls */}
                  <div className="lg:col-span-4 flex flex-col lg:h-full lg:sticky lg:top-32">
                      <div className="mb-12">
                          <div className="flex items-center gap-2 mb-6">
                              <span className="w-2 h-2 rounded-full bg-white"></span>
                              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Blog</span>
                          </div>
                          <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] tracking-tighter mb-10">
                              Expert Insights & <br /> 
                              <span className="text-slate-400">Digital Thinking</span>
                          </h2>
                          <Link to="/blog">
                               <PremiumButton icon={true} className="!px-10 !py-5 shadow-xl">
                                   View all blogs
                               </PremiumButton>
                          </Link>
                      </div>
                      
                      {/* Carousel Navigation Buttons */}
                      <div className="flex gap-4 mt-auto">
                          <button 
                            onClick={() => scrollBlog('left')}
                            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95"
                          >
                              <ArrowRightIcon className="w-6 h-6 rotate-180" />
                          </button>
                          <button 
                            onClick={() => scrollBlog('right')}
                            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95"
                          >
                              <ArrowRightIcon className="w-6 h-6" />
                          </button>
                      </div>
                  </div>

                  {/* Right Column: Horizontal Scrolling Carousel */}
                  <div className="lg:col-span-8 w-full overflow-visible">
                      <div 
                        ref={blogCarouselRef}
                        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pr-[20%] md:pr-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                          {latestBlogs.map((blog, index) => (
                              <Link to={blog.link} key={blog.id} className="min-w-[85%] md:min-w-[42%] lg:min-w-[38%] snap-start group cursor-none">
                                  <motion.div
                                      initial={{ opacity: 0, x: 100 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: index * 0.1 }}
                                      className="flex flex-col h-full"
                                  >
                                      {/* Image Card: Mimicking image with large border radius */}
                                      <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] mb-6 bg-slate-900 shadow-2xl">
                                          <img 
                                              src={blog.image} 
                                              alt={blog.title} 
                                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                      </div>
                                      
                                      {/* Meta */}
                                      <div className="flex items-center gap-2 mb-4 px-4">
                                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{blog.readTime || '5 min read'}</span>
                                      </div>

                                      {/* Content */}
                                      <div className="px-4">
                                          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                                              {blog.title}
                                          </h3>
                                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                                              {blog.excerpt}
                                          </p>
                                      </div>
                                  </motion.div>
                              </Link>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </PageWrapper>
  );
};

export default HomePage;