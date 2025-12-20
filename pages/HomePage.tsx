
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
    WordPressIcon, 
    StarIcon,
    ReactIcon,
    JsIcon,
    ExpoIcon,
    SupabaseIcon,
    ArrowRightIcon,
    FigmaIcon,
    CodeIcon,
    TailwindIcon,
    CssIcon,
    ElementorIcon,
    ShoppingCartIcon,
    DatabaseIcon,
    ApiIcon,
    HtmlIcon
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
    goals?: string[]; 
    link?: string; 
}

const reviewsData = [
    {
        name: "David M.",
        role: "Project Lead",
        quote: "Sameer Digital Lab is a very quick study and is very creative across many different skill sets which we used for this project. I would highly recommend them to anyone needing premium services.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442737/mantwo_dwcstk.png" 
    },
    {
        name: "James T.",
        role: "CEO, TechFlow",
        quote: "Sameer Digital Lab did an awesome job. They were proactive with communication, gave additional tips on SEO, and completed the task as expected.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442767/manthree_ol3l4l.png" 
    },
    {
        name: "Sarah Jenkins",
        role: "Marketing Director",
        quote: "The team at Sameer Digital Lab transformed our online presence. Their design sense is impeccable, and the development quality is top-notch.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442822/women_y9wmlf.png" 
    },
    {
        name: "Michael R.",
        role: "Founder, StartupX",
        quote: "I was impressed by the speed and efficiency. Sameer Digital Lab delivered a complex React application ahead of schedule.",
        stars: 5,
        image: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1764442792/man_wrn6b3.png" 
    }
];

const faqCategories = ['General', 'Process', 'Other'];
const faqData: Record<string, {q: string, a: string}[]> = {
    'General': [
        { q: "How long does a website project usually take to complete?", a: "It depends on the scope. A brochure site might take 2-4 weeks, while complex e-commerce or web apps can take 8-12 weeks." },
        { q: "How much does a website cost?", a: "Pricing is tailored to requirements. We offer packages starting from reasonable rates for startups up to enterprise-level custom development." }
    ],
    'Process': [
        { q: "How many meetings can we have?", a: "As many as needed, though we value your time. We typically have a kickoff, weekly updates, and milestone reviews." }
    ],
    'Other': [
        { q: "What services do you offer?", a: "We offer Web Development, Mobile App Development, SEO, UI/UX Design, and Digital Strategy." }
    ]
};

const latestBlogs = [
    { id: 102, title: "Scaling Your Shopify Store in 2025", category: "Technology", readTime: "8 min read", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop", link: "/blog/102", excerpt: "Strategies high-growth brands use to turn visitors into loyal customers on Shopify." },
    { id: 101, title: "Why Technical SEO is the Missing Piece", category: "Design", readTime: "6 min read", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", link: "/blog/101", excerpt: "Is your beautiful website invisible to Google? Hidden technical barriers could be killing your rankings." }
];

interface ParallaxTextProps { children?: React.ReactNode; baseVelocity: number; }

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
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
      <motion.div className="font-bold uppercase text-[12vw] leading-[0.85] flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
        <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
        <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
        <span className="block mr-12 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>{children} </span>
      </motion.div>
    </div>
  );
}

interface ProjectModalProps { project: ProjectData; onClose: () => void; }

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm" onClick={onClose}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="bg-slate-900 border border-slate-700 w-full max-w-7xl h-[90vh] md:h-[85vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-slate-800/80 rounded-full text-white hover:bg-red-500/80 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto custom-scrollbar border-r border-slate-800 flex flex-col">
                    <div className="mb-6">
                         <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">{project.category}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-8 border-y border-slate-800 py-6">
                        <div><span className="block text-slate-500 text-xs uppercase tracking-widest mb-1">Role</span><span className="text-slate-200 font-semibold">{project.role}</span></div>
                        <div><span className="block text-slate-500 text-xs uppercase tracking-widest mb-1">Timeline</span><span className="text-slate-200 font-semibold">{project.timeline}</span></div>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Project Overview</h3>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">{project.description}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool, idx) => <div key={idx} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md text-sm border border-slate-700">{tool}</div>)}
                        </div>
                    </div>
                    <div className="mt-auto">
                        <a href={project.link || "#"} target="_blank" rel="noopener noreferrer"><PremiumButton width="full" icon={true}>View Project</PremiumButton></a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-full bg-slate-950 relative overflow-hidden group">
                    <div className="absolute inset-0 w-full h-full">
                         <style>{`
                            @keyframes scroll-image { 0% { transform: translateY(0); } 100% { transform: translateY(calc(-100% + 100vh)); } }
                            .animate-scroll-image { animation: scroll-image 15s linear infinite alternate; }
                            .animate-scroll-image:hover { animation-play-state: paused; }
                         `}</style>
                        <img src={project.fullImage} alt={project.title} className="w-full h-auto object-cover animate-scroll-image" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const animatedHeadings = ["Digital Products", "Successful Businesses", "Revenue Streams", "Brand Stories", "Market Leaders"];

const coreServicesData = [
    { title: "Website Development", desc: "Modern, responsive, and high-performance websites.", video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927887/website_g6erpv.mp4", colSpan: "lg:col-span-2", link: "/web-development" },
    { title: "SEO Optimization", desc: "Improve search rankings with data-driven SEO.", video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927973/Seo_Search_h9ua0s.mp4", colSpan: "lg:col-span-1", link: "/seo-optimization" },
    { title: "App Development", desc: "Scalable mobile applications for any device.", video: "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763927584/app_cwwxyt.mp4", colSpan: "lg:col-span-1", link: "/app-development" }
];

const selectedProjects: ProjectData[] = [
    {
        title: "Weversity.org",
        category: "EdTech",
        description: "Transformative free learning platform.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765470774/weversity_portfolio_gmnt44.jpg",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765470774/weversity_portfolio_gmnt44.jpg",
        tools: [<WordPressIcon className="w-5 h-5" />, <ElementorIcon className="w-5 h-5" />],
        role: "Developer",
        timeline: "4 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765470870/screencapture-weversity-org-2025-11-30-22_34_09_xfle0e.png",
        link: "https://weversity.org/"
    }
];

// Set 1: To orbit on the Inner Path (Radius 175px)
const orbitSetInner = [
    { name: 'JavaScript', icon: <JsIcon className="w-5 h-5 text-yellow-400" /> },
    { name: 'React Native', icon: <ReactIcon className="w-5 h-5 text-cyan-400" /> },
    { name: 'MongoDB', icon: <DatabaseIcon className="w-5 h-5 text-green-500" /> },
    { name: 'Express JS', icon: <ApiIcon className="w-5 h-5 text-white" /> },
];

// Set 2: To orbit on the Outer Path (Radius 240px)
const orbitSetOuter = [
    { name: 'HTML', icon: <HtmlIcon className="w-5 h-5 text-orange-500" /> },
    { name: 'CSS', icon: <CssIcon className="w-5 h-5 text-blue-500" /> },
    { name: 'Node JS', icon: <CodeIcon className="w-5 h-5 text-green-600" /> },
    { name: 'Tailwind', icon: <TailwindIcon className="w-5 h-5 text-cyan-300" /> },
];

const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
    const { setCursorVariant, setCursorText } = useCursor();
    const workContainerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const blogCarouselRef = useRef<HTMLDivElement>(null);
    const reviewsContainerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'reviews' | 'faqs'>('reviews');
    const [activeFaqCategory, setActiveFaqCategory] = useState('General');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const { scrollYProgress: reviewsScrollProgress } = useScroll({ target: reviewsContainerRef, offset: ["start start", "end end"] });
    const containerWidth = useTransform(reviewsScrollProgress, [0, 0.3], ["85%", "100%"]);
    const containerRadius = useTransform(reviewsScrollProgress, [0, 0.3], ["40px", "0px"]);

    const { scrollYProgress } = useScroll({ target: workContainerRef, offset: ["start end", "end start"] });
    const parallaxX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    useEffect(() => {
        const interval = setInterval(() => { setCurrentHeadingIndex((p) => (p + 1) % animatedHeadings.length); }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    const backgroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557012/ABOUT_Agensi_Pekerjaan_Nusamas_Sdn_Bhd_ypmqnb.mp4";
    const foregroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557903/Website_Background_Videos_Download_The_BEST_Free_4k_Stock_Video_io7gxb.mp4";

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-10"><source src={backgroundVideoUrl} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-slate-950/95 z-0"></div>
        <ParticleBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative w-full h-full flex items-center py-24 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
                <div className="w-full lg:w-1/2 text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 mb-3 backdrop-blur-sm"><span className="font-bold tracking-widest uppercase text-[14px]">Web & Mobile App Agency</span></div>
                    <div className="text-[42px] sm:text-[48px] lg:text-[56px] font-bold text-slate-50 tracking-tight mb-2 drop-shadow-2xl leading-[1.1]">
                        <h1>Transform Your Ideas Into</h1>
                        <div className="inline-block relative h-[55px] sm:h-[65px] lg:h-[75px] w-full min-w-[320px] mt-2 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span key={currentHeadingIndex} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 absolute inset-0 block whitespace-nowrap" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5 }}>{animatedHeadings[currentHeadingIndex]}</motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                    <p className="text-[16px] text-slate-300 mb-8 max-w-lg leading-relaxed font-light border-l-4 border-cyan-500/30 pl-6">We turn your vision into reality with cutting-edge web and mobile applications.</p>
                    <div className="flex items-center">
                        <div className="inline-flex items-center p-1 rounded-full border border-slate-700 bg-slate-900/40 backdrop-blur-sm">
                            <Link to="/contact"><PremiumButton className="!m-0">Start Your Project</PremiumButton></Link>
                            <Link to="/portfolio" className="px-6 py-4 text-slate-300 font-bold hover:text-white transition-colors duration-300">View Our Work</Link>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative">
                     <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                        
                        {/* Orbit Path Lines (The Tracks) */}
                        {/* Inner Circle Track */}
                        <div className="absolute w-[350px] h-[350px] border border-cyan-500/10 rounded-full pointer-events-none z-10 shadow-[0_0_15px_rgba(34,211,238,0.05)]"></div>
                        {/* Outer Circle Track */}
                        <div className="absolute w-[480px] h-[480px] border border-purple-500/10 rounded-full pointer-events-none z-10 shadow-[0_0_15px_rgba(139,92,246,0.05)]"></div>

                        {/* Inner Orbit (Clockwise) - Radius 175px */}
                        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full rounded-full flex items-center justify-center">
                                {orbitSetInner.map((tool, idx) => {
                                    const angle = (idx / orbitSetInner.length) * 360;
                                    return (
                                        <div key={tool.name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotate(${angle}deg) translate(175px) rotate(-${angle}deg)` }}>
                                            <div className="bg-slate-950/80 backdrop-blur-md p-2 rounded-full border border-cyan-500/30 shadow-lg group hover:border-cyan-400 transition-colors">
                                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="w-8 h-8 flex items-center justify-center">{tool.icon}</motion.div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Outer Orbit (Counter-Clockwise) - Radius 240px */}
                        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full rounded-full flex items-center justify-center">
                                {orbitSetOuter.map((tool, idx) => {
                                    const angle = (idx / orbitSetOuter.length) * 360;
                                    return (
                                        <div key={tool.name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotate(${angle}deg) translate(240px) rotate(-${angle}deg)` }}>
                                            <div className="bg-slate-950/80 backdrop-blur-md p-2 rounded-full border border-purple-500/30 shadow-lg group hover:border-purple-400 transition-colors">
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="w-8 h-8 flex items-center justify-center">{tool.icon}</motion.div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Central Visual */}
                        <div className="w-[45%] h-[45%] z-20 flex justify-center items-center overflow-hidden rounded-full shadow-[0_0_50px_rgba(34,211,238,0.2)] border border-white/5 bg-slate-950">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover transform scale-110"><source src={foregroundVideoUrl} type="video/mp4" /></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 text-white border-b border-slate-900">
        <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-20">It all starts with our <br /><span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">DIGITAL PROCESS.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['DISCOVER', 'EXPLORE', 'EXPERIENCE'].map((step, i) => (
                    <div key={step} className="flex flex-col items-center text-center group">
                        <div className="mb-6 w-32 h-32 rounded-full overflow-hidden bg-black relative border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"><source src={`https://res.cloudinary.com/dow2sbjsp/video/upload/v17637082${06+i*67}/discover-animation_tnruml.mp4`} type="video/mp4" /></video>
                        </div>
                        <h3 className="text-xl font-bold mb-4 tracking-widest text-cyan-200">{step}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">We guide you from the initial idea to a high-performance experience that grows your business.</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 relative z-10 overflow-hidden">
        <div className="mb-16 opacity-30 pointer-events-none"><ParallaxText baseVelocity={5}>HIRE US</ParallaxText></div>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20 border-b border-slate-800 pb-12">
                <div><span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Our Expertise</span><h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">How we take your business to the next level</h2></div>
                <div className="flex flex-col items-start"><p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">We are a results-driven digital agency focused on building fast, modern experiences.</p><Link to="/services"><PremiumButton>See all services</PremiumButton></Link></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreServicesData.map((service, index) => (
                    <Link to={service.link} key={index} className={`group relative overflow-hidden rounded-2xl h-[400px] border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 ${service.colSpan || ''}`} onMouseEnter={() => { setCursorVariant('view-more'); setCursorText('Explore'); }} onMouseLeave={() => { setCursorVariant('default'); setCursorText(''); }}>
                        <div className="h-full w-full relative">
                            <div className="absolute inset-0 z-0"><video autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"><source src={service.video} type="video/mp4" /></video></div>
                            <div className="absolute inset-0 bg-slate-950/90 group-hover:bg-slate-950/40 transition-colors duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end"><h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3><p className="text-slate-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{service.desc}</p></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      <section ref={reviewsContainerRef} id="reviews" className="relative h-[130vh] bg-slate-950">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
            <motion.div style={{ width: containerWidth, borderRadius: containerRadius }} className="bg-slate-900 border-y border-slate-800/50 shadow-2xl overflow-hidden relative z-10 w-[85%] rounded-[40px] max-w-[1920px]">
                 <div className="container mx-auto px-6 py-12 md:p-16 relative z-10">
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                         <div className="lg:col-span-4 flex flex-col justify-center">
                             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Say</span></h2>
                             <div className="inline-flex bg-black p-1.5 rounded-full border border-slate-800 relative w-full sm:w-auto">
                                 <button onClick={() => setActiveTab('reviews')} className={`relative z-10 px-8 py-4 rounded-full text-sm font-bold transition-colors flex-1 text-center ${activeTab === 'reviews' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}>Reviews</button>
                                 <button onClick={() => setActiveTab('faqs')} className={`relative z-10 px-8 py-4 rounded-full text-sm font-bold transition-colors flex-1 text-center ${activeTab === 'faqs' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}>FAQs</button>
                             </div>
                         </div>
                         <div className="lg:col-span-8 min-h-[500px] flex items-center">
                             <AnimatePresence mode="wait">
                                 {activeTab === 'reviews' ? (
                                     <motion.div key="reviews" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                         {reviewsData.slice(0, 2).map((review) => (
                                             <div key={review.name} className="bg-slate-800 p-8 rounded-2xl border border-slate-700/50">
                                                 <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700"><img src={review.image} alt={review.name} className="w-full h-full object-cover" /></div><div><h4 className="font-bold text-white">{review.name}</h4><p className="text-cyan-400 text-xs uppercase">{review.role}</p></div></div>
                                                 <p className="text-slate-300 text-sm leading-relaxed mb-6">"{review.quote}"</p>
                                                 <div className="flex gap-1 text-yellow-400">{[...Array(review.stars || 5)].map((_, idx) => <StarIcon key={idx} className="w-4 h-4 fill-current" />)}</div>
                                             </div>
                                         ))}
                                     </motion.div>
                                 ) : (
                                     <motion.div key="faqs" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full space-y-2">
                                        {faqData[activeFaqCategory].map((faq, i) => (
                                            <div key={i} className={`bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden`}>
                                                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full text-left py-4 px-6 flex justify-between items-center text-white font-bold">{faq.q}<ArrowRightIcon className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-90' : ''}`} /></button>
                                                {activeFaq === i && <div className="pt-0 pb-6 px-6 text-slate-400 text-sm">{faq.a}</div>}
                                            </div>
                                        ))}
                                     </motion.div>
                                 )}
                             </AnimatePresence>
                         </div>
                     </div>
                 </div>
            </motion.div>
        </div>
      </section>

      <section className="py-32 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
          <div className="container mx-auto px-4">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-10">The latest <br />from our <span className="text-slate-400">design studio</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestBlogs.map((blog) => (
                      <Link to={blog.link} key={blog.id} className="group">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-6 bg-slate-900 border border-white/5"><img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
                          <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-2">{blog.excerpt}</p>
                      </Link>
                  ))}
              </div>
          </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
