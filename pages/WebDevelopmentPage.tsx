
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
        <div className="w-full overflow-hidden bg-slate-900 py-12 border-y border-slate-800">
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

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <PageWrapper>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            {/* HERO SECTION */}
            <section className="relative pt-48 pb-24 bg-slate-950 px-4 sm:px-6 lg:px-16 overflow-hidden">
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

            {/* WHO WE WORK WITH & CAPABILITIES */}
            <section className="py-24 bg-slate-900/30 border-t border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-6">Who We Work With</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                We work with startups, small businesses, agencies, and international clients. No matter your size or industry, we help you move forward with confidence.
                            </p>
                            <Link to="/contact">
                                <PremiumButton>Get in touch</PremiumButton>
                            </Link>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                             <h3 className="text-3xl font-bold text-white mb-8">Our Website Capabilities</h3>
                             <div className="space-y-4">
                                {capabilities.map((cap, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 group cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
                                            <CheckIcon className="w-4 h-4" />
                                        </div>
                                        <span className="text-xl text-slate-300 font-light group-hover:text-white transition-colors">{cap}</span>
                                    </motion.div>
                                ))}
                             </div>
                        </motion.div>
                    </div>
                </div>
            </section>

             {/* SCROLLING TEXT */}
             <section className="py-12 bg-slate-950 overflow-hidden">
                <ParallaxText baseVelocity={3}>Let's work together.</ParallaxText>
             </section>

            {/* PRECISION & PASSION */}
            <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center max-w-5xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                            We Build With Precision, Passion, and Modern Technology
                        </h2>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            We carefully manage every project with full focus and complete responsibility. Our team works in-house, delivering quality work that is fast, stable, and built to last. With a clear process and honest communication, we design and develop websites that perform beautifully on every device.
                        </p>
                    </motion.div>
                </div>
                
                <TechMarquee />
            </section>

            {/* FAQs */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The answers to your questions</h2>
                            <p className="text-slate-400 mb-8">Can't find what you're looking for? Get in touch directly.</p>
                            <Link to="/contact"><PremiumButton>Get in touch</PremiumButton></Link>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-slate-800">
                                        <button 
                                            onClick={() => toggleFaq(index)}
                                            className="w-full text-left py-6 flex justify-between items-center focus:outline-none group"
                                        >
                                            <span className="text-lg md:text-xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">{faq.q}</span>
                                            <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''} text-cyan-400`}>
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
                                                    <p className="pb-6 text-slate-400 leading-relaxed whitespace-pre-line">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
