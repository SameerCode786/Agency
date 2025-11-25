
import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import PremiumButton from '../components/PremiumButton';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from "@motionone/utils";
import { useSeoContent } from '../hooks/useSeoContent';
import { Link } from 'react-router-dom';
import { 
    CheckIcon, 
    ReactIcon, 
    JsIcon, 
    SupabaseIcon, 
    HtmlIcon, 
    CssIcon, 
    FigmaIcon, 
    NpmIcon, 
    TailwindIcon,
    ArrowRightIcon
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

// --- Tech Stack Marquee ---
const techStack = [
    { name: 'React Native', icon: <ReactIcon className="w-12 h-12 text-cyan-400" /> },
    { name: 'React.js', icon: <ReactIcon className="w-12 h-12 text-blue-400" /> },
    { name: 'Supabase', icon: <SupabaseIcon className="w-12 h-12 text-green-400" /> },
    { name: 'JavaScript', icon: <JsIcon className="w-12 h-12 text-yellow-400" /> },
    { name: 'HTML', icon: <HtmlIcon className="w-12 h-12 text-orange-500" /> },
    { name: 'CSS', icon: <CssIcon className="w-12 h-12 text-blue-500" /> },
    { name: 'Figma', icon: <FigmaIcon className="w-12 h-12 text-purple-400" /> },
    { name: 'NPM', icon: <NpmIcon className="w-12 h-12 text-red-500" /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon className="w-12 h-12 text-cyan-300" /> },
];

const TechMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-slate-900 py-12 border-y border-slate-800 mt-12">
             <div className="container mx-auto px-4 mb-8 text-center">
                 <h2 className="text-2xl font-bold text-white mb-2">We use the latest technologies</h2>
                 <p className="text-slate-500">To create timeless designs and robust applications</p>
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
    "Website Development",
    "Web Design",
    "eCommerce Development",
    "UX Design",
    "Responsive Design",
    "Wireframing",
    "Website Strategy"
];

const faqs = [
    { q: "How long does it take to build a website?", a: "Timings depend on the project requirements, but here’s a general idea:\n\n• Standard business websites: around 2–3 weeks\n• eCommerce websites: around 4–5 weeks\n• Advanced custom websites: 5+ weeks depending on complexity" },
    { q: "What size companies do you work with?", a: "We work with startups, growing businesses, and global brands. No matter the size, we tailor our services to match your goals and deliver the right digital solution." },
    { q: "Do you redesign existing websites?", a: "Yes, absolutely. We analyze your current website, identify what needs to be improved, and recommend whether a full redesign or a fresh new build would be more effective." },
    { q: "Do you work internationally?", a: "Yes, we work with clients worldwide. Communication is smooth through Zoom, Slack, and Monday.com, making it easy to collaborate no matter where you are." },
    { q: "Do you offer ongoing help after the website is launched?", a: "Yes, we provide optional ongoing support and maintenance. You’ll also be able to edit, update, and manage your website easily using the tools we provide." },
    { q: "Will my website work on phones and tablets?", a: "Of course. Every website we build is fully responsive and optimized for all screen sizes, including mobile and tablet." },
    { q: "How much does a website cost?", a: "Every project is unique, so pricing depends on your specific requirements. Once we understand your goals, features, and scope, we provide a clear timeline and cost estimate." },
    { q: "I have a limited budget, can you still work with me?", a: "Yes, as long as our vision aligns. If you’re serious about growing your brand online, we’re happy to guide you. Just share your budget and we’ll recommend the most effective way to use it." },
];

const WebDevelopmentPage: React.FC = () => {
    const { title, description } = useSeoContent('Web Development');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const techSectionRef = useRef<HTMLDivElement>(null);
    const whoWeWorkWithRef = useRef<HTMLDivElement>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const scrollToTech = () => {
        techSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToWhoWeWorkWith = () => {
        whoWeWorkWithRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <PageWrapper>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            {/* HERO SECTION */}
            <section className="relative pt-48 pb-24 bg-slate-950 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
                            Website Development
                        </h1>
                        <h2 className="text-2xl md:text-4xl text-cyan-400 font-light mb-8">
                            Professional Website Development for Modern Businesses
                        </h2>
                        <div className="max-w-4xl">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 border-l-4 border-cyan-500 pl-8">
                                At SameerCodes Studio, we build powerful, fast, and user-friendly websites designed to help your business grow. From startups to established brands, we provide clear guidance, expert development, and long-term value with every project.
                            </p>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed pl-8">
                                Our team understands UI/UX, responsive layouts, speed optimization, SEO structure, and every key part of a successful digital presence. Whether you're launching a new website or upgrading an old one, we create digital experiences that connect with your audience and deliver real results.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

             {/* DISCOVER MORE VISUAL SECTION */}
             <section className="py-12 bg-slate-950">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                         className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden group shadow-2xl shadow-black/50"
                     >
                         <img 
                             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                             alt="Modern Office" 
                             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                         
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

            {/* WHO WE WORK WITH & CAPABILITIES */}
            <section ref={whoWeWorkWithRef} className="py-32 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                 
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Left Column: Who We Work With */}
                        <div className="flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6 border border-cyan-500/20">
                                    Partnerships
                                </span>
                                <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                    Who We Work With
                                </h3>
                                <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                                    We work with startups, small businesses, agencies, and international clients. No matter your size or industry, we help you move forward with confidence.
                                </p>
                                
                                <div className="flex flex-wrap gap-6 items-center">
                                    <Link to="/contact">
                                        <PremiumButton className="px-8 py-4">Get in touch</PremiumButton>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Capabilities */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-slate-950 p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
                                
                                <h3 className="text-3xl font-bold text-white mb-10 relative z-10 border-b border-slate-800 pb-6">
                                    Our Website Capabilities
                                </h3>
                                
                                <div className="space-y-4 relative z-10">
                                    {capabilities.map((cap, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-900 transition-colors duration-300 cursor-default border border-transparent hover:border-slate-800 group/item"
                                        >
                                            <span className="text-xl text-slate-300 font-light group-hover/item:text-cyan-400 transition-colors">{cap}</span>
                                            <ArrowRightIcon className="w-5 h-5 text-slate-600 group-hover/item:text-cyan-400 transition-colors opacity-0 group-hover/item:opacity-100 transform -translate-x-4 group-hover/item:translate-x-0 duration-300" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                 </div>
            </section>

             {/* SCROLLING TEXT */}
             <section className="py-12 bg-slate-950 overflow-hidden border-t border-slate-900">
                <ParallaxText baseVelocity={3}>Let's work together.</ParallaxText>
             </section>

            {/* PRECISION & PASSION - Text Left, Image Right */}
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
                                <div className="h-px w-12 bg-cyan-500"></div>
                                <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Technology & Process</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
                                We Build With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Precision, Passion,</span> and Modern Technology
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed mb-8">
                                We carefully manage every project with full focus and complete responsibility. Our team works in-house, delivering quality work that is fast, stable, and built to last.
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed mb-10">
                                With a clear process and honest communication, we design and develop websites that perform beautifully on every device. We treat your business like our own.
                            </p>
                            
                            <div className="flex gap-4">
                                <Link to="/portfolio">
                                    <PremiumButton icon={true}>View Our Work</PremiumButton>
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-95 blur-lg opacity-60"></div>
                            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Modern Coding Environment" 
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-950/20"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                <TechMarquee />
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
                                            <span className="text-xl md:text-2xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors pr-8">
                                                {faq.q}
                                            </span>
                                            <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''} text-cyan-400 flex-shrink-0 bg-slate-900 p-2 rounded-full`}>
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
                     <h2 className="text-4xl font-bold text-white mb-6">Ready to start your project?</h2>
                     <Link to="/contact">
                        <PremiumButton className="text-lg px-12 py-4">Let's Talk</PremiumButton>
                     </Link>
                 </div>
             </section>

        </PageWrapper>
    );
};

export default WebDevelopmentPage;
