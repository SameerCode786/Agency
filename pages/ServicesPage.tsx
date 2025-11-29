
import React, { useRef } from 'react';
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
    SearchIcon
} from '../components/Icons';
import { Link } from 'react-router-dom';
import { useSeoContent } from '../hooks/useSeoContent';
import PremiumButton from '../components/PremiumButton';
import ParticleBackground from '../components/ParticleBackground';

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

const ServicesPage: React.FC = () => {
    const { title, description } = useSeoContent('Services');

    return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
       
       {/* HERO SECTION */}
       <section className="relative pt-40 pb-24 bg-slate-950 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex flex-col justify-center">
            <ParticleBackground />
            <div className="absolute inset-0 bg-slate-950/90 pointer-events-none z-0"></div>
            
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto relative z-10">
                <div className="text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 text-slate-300 mb-8 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-sm font-medium tracking-widest uppercase">Our Expertise</span>
                    </motion.div>

                    <AnimatedHeading 
                        text="We Craft Digital Experiences" 
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none" 
                    />
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-12"
                    >
                        From complex enterprise platforms to stunning brand identities, we provide a full spectrum of digital services designed to help your business grow.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <PremiumButton className="px-10 py-4 text-lg">Start a Project</PremiumButton>
                            </Link>
                            <button 
                                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                className="px-10 py-4 rounded-full border border-slate-700 text-white font-bold hover:bg-slate-800 transition-all"
                            >
                                Explore Services
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ArrowRightIcon className="w-6 h-6 rotate-90" />
            </motion.div>
       </section>

       {/* SCROLL VELOCITY TEXT */}
       <section className="bg-slate-950 border-y border-slate-900 py-16 overflow-hidden">
            <ParallaxText baseVelocity={2}>DESIGN • DEVELOPMENT • STRATEGY • GROWTH • </ParallaxText>
       </section>

       {/* MAIN SERVICES GRID */}
       <section className="py-32 bg-slate-950 relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

       {/* THE PROCESS SECTION */}
       <section className="py-32 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <AnimatedHeading text="Our Proven Process" className="text-4xl md:text-5xl font-bold mb-6" />
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
