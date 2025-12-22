
import React, { useRef, useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';
import PremiumButton from '../components/PremiumButton';
import { Link } from 'react-router-dom';
import ProjectPlannerModal from '../components/ProjectPlannerModal';
// Fixed: Added TwitterIcon and LinkedinIcon to the import list to resolve "Cannot find name" errors on lines 155 and 158.
import { StarIcon, ArrowRightIcon, RocketIcon, CodeIcon, StrategyIcon, LaurelWreathIcon, TwitterIcon, LinkedinIcon } from '../components/Icons';

// --- DATA ---

const cultureImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
];

const statsData = [
    { value: "20+", label: "Projects", sub: "Successfully Delivered" },
    { value: "3+", label: "Years", sub: "Of Digital Excellence" },
];

const teamMembers = [
    { 
        name: "Sameer", 
        role: "Chief Architect", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        bio: "Leading the lab's technical vision, Sameer specializes in building high-performance architectures that bridge the gap between design and scale."
    },
    { 
        name: "Natasia", 
        role: "Content Strategist", 
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        bio: "Mastering the art of digital storytelling, Natasia crafts compelling narratives that drive engagement and rank at the top of search engines."
    },
    { 
        name: "Sarah", 
        role: "UI/UX Director", 
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        bio: "With a keen eye for aesthetics and user behavior, Sarah designs interfaces that are not just beautiful, but psychologically optimized for conversion."
    },
    { 
        name: "Joe", 
        role: "Full-Stack Engineer", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        bio: "A logic-driven developer who thrives on clean code and complex integrations, Joe ensures every digital product is as stable as it is fast."
    },
    { 
        name: "Chris", 
        role: "Growth Operations", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        bio: "Chris manages the engine behind our operations, ensuring every project is delivered with financial precision and strategic efficiency."
    },
    { 
        name: "Ruby", 
        role: "Visual Designer", 
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
        bio: "The creative spark in the design process, Ruby blends modern trends with timeless principles to create iconic visual identities."
    },
];

const processCategories = [
    { id: 0, title: "Design", color: "text-purple-400" },
    { id: 1, title: "Development", color: "text-cyan-400" },
    { id: 2, title: "Marketing", color: "text-blue-500" }
];

const expertiseTags = [
    { label: "UI/UX Design", cat: 0 },
    { label: "Web Design", cat: 0 },
    { label: "Brand Identity", cat: 0 },
    { label: "Product Prototyping", cat: 0 },
    { label: "Design Systems", cat: 0 },
    { label: "App Interface Design", cat: 0 },
    { label: "Wireframing", cat: 0 },
    { label: "WordPress Customization", cat: 1 },
    { label: "React & Next.js", cat: 1 },
    { label: "Shopify E-commerce", cat: 1 },
    { label: "React Native Apps", cat: 1 },
    { label: "Elementor & Gutenberg", cat: 1 },
    { label: "Full Stack Development", cat: 1 },
    { label: "Supabase Integration", cat: 1 },
    { label: "Liquid Theme Dev", cat: 1 },
    { label: "API Engineering", cat: 1 },
    { label: "SEO Optimization", cat: 2 },
    { label: "Technical SEO Audits", cat: 2 },
    { label: "Keyword Strategy", cat: 2 },
    { label: "Digital Strategy", cat: 2 },
    { label: "Google Ranking", cat: 2 },
    { label: "CRO & Growth", cat: 2 },
    { label: "Analytics Reporting", cat: 2 },
    { label: "Content Strategy", cat: 2 },
];

// --- 3D TEAM CARD COMPONENT ---
interface TeamMemberCardProps {
    member: typeof teamMembers[0];
    index: number;
}

// FIX: Explicitly typed the TeamMemberCard component with React.FC and a props interface.
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative cursor-pointer perspective-1000"
        >
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 border border-white/5 aspect-[4/5] shadow-2xl transition-all duration-500 group-hover:border-cyan-500/30">
                {/* 3D Depth Elements */}
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                </div>
                
                {/* Gradients Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Bio Reveal Overlay */}
                <div className="absolute inset-0 bg-cyan-950/90 backdrop-blur-md p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                    <p className="text-cyan-100 text-base md:text-lg leading-relaxed font-medium mb-6">
                        {member.bio}
                    </p>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <TwitterIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <LinkedinIcon className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Name & Role Text (Always visible but shifts on hover) */}
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-3xl font-black text-white mb-1 tracking-tighter uppercase">{member.name}</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">{member.role}</p>
                    </div>
                </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity -z-10"></div>
        </motion.div>
    );
};

const AboutPage: React.FC = () => {
    const { title, description } = useSeoContent('About');
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const processRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: processProgress } = useScroll({
        target: processRef,
        offset: ["start start", "end end"]
    });
    const [activeProcessIndex, setActiveProcessIndex] = useState(0);

    useMotionValueEvent(processProgress, "change", (latest) => {
        if (latest < 0.3) setActiveProcessIndex(0);
        else if (latest < 0.7) setActiveProcessIndex(1);
        else setActiveProcessIndex(2);
    });

    const videoSectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: videoScrollProgress } = useScroll({
        target: videoSectionRef,
        offset: ["start end", "center center"]
    });

    const videoScale = useTransform(videoScrollProgress, [0, 1], [0.8, 1]);
    const videoRadius = useTransform(videoScrollProgress, [0, 1], ["40px", "0px"]);
    const videoRadiusNumber = useTransform(videoScrollProgress, [0, 1], [40, 0]); // Alternative if Radius CSS doesn't behave
    const videoOpacity = useTransform(videoScrollProgress, [0, 0.2], [0.5, 1]);

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <ProjectPlannerModal isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />

      {/* 1. HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9]"
                >
                    Good design <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">makes life better.</span>
                </motion.h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-[50vh] md:h-[60vh] overflow-hidden">
                <motion.div style={{ y: y2 }} className="flex flex-col gap-4 mt-12">
                    <img src={cultureImages[0]} alt="Office" className="rounded-2xl w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                    <img src={cultureImages[1]} alt="Team" className="rounded-2xl w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                <motion.div style={{ y: y1 }} className="flex flex-col gap-4">
                    <img src={cultureImages[2]} alt="Meeting" className="rounded-2xl w-full h-80 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                    <img src={cultureImages[3]} alt="Work" className="rounded-2xl w-full h-56 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                <motion.div style={{ y: y2 }} className="hidden md:flex flex-col gap-4 mt-8">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Strategy" className="rounded-2xl w-full h-56 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                    <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Coding" className="rounded-2xl w-full h-72 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                <motion.div style={{ y: y1 }} className="hidden md:flex flex-col gap-4">
                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Discussion" className="rounded-2xl w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Laughing" className="rounded-2xl w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            </div>
            
            <div className="flex justify-center mt-12">
                <Link to="/about">
                    <PremiumButton icon={false} className="!px-8 !py-3 text-sm">About us</PremiumButton>
                </Link>
            </div>
        </div>
      </section>

      {/* 2. IDENTITY & STATS SECTION */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-slate-900 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
                  <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                  >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                            <span className="text-white text-sm font-bold uppercase tracking-widest">Our Identity</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            We are expert web creators dedicated to bespoke, professional service.
                        </h2>
                  </motion.div>

                  <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center"
                  >
                        <div className="text-slate-400 text-lg md:text-xl leading-relaxed space-y-6 font-light">
                            <p>
                                With 3 years of specialized experience, Sameer Digital Lab is a fast-growing, innovative team focused on delivering high-performance digital solutions.
                            </p>
                            <p>
                                We transform ambitious start-ups and businesses into digital leaders through custom web development and strategic growth.
                            </p>
                        </div>
                  </motion.div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {statsData.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center text-center"
                      >
                          <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4">
                                <LaurelWreathIcon className="absolute w-full h-full text-white opacity-20" />
                                <span className="text-3xl md:text-4xl font-bold text-white relative z-10">{stat.value}</span>
                          </div>
                          <div className="space-y-1">
                              <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">{stat.label}</h4>
                              <p className="text-xs md:text-sm text-slate-500">{stat.sub}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. EXPANDING VIDEO SECTION */}
      <section ref={videoSectionRef} className="pb-32 bg-slate-950 relative overflow-hidden">
          <motion.div 
            style={{ 
                scale: videoScale, 
                borderRadius: videoRadius,
                opacity: videoOpacity
            }}
            className="w-full h-[60vh] md:h-[90vh] relative mx-auto overflow-hidden shadow-2xl shadow-cyan-500/10"
          >
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1765300961/shape-showreel-2024_looping-v3_czfqgh.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 opacity-60"></div>
              <div className="absolute bottom-10 left-0 right-0 text-center z-10 p-4">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="inline-block">
                      <div className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-bold uppercase tracking-widest hover:bg-black/60 transition-colors cursor-pointer">
                          Watch Showreel 2024
                      </div>
                  </motion.div>
              </div>
          </motion.div>
      </section>

      {/* 4. PROCESS & EXPERTISE SECTION (STICKY INTERACTIVE) */}
      <section ref={processRef} className="relative h-[250vh] bg-slate-950 border-t border-slate-900">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="absolute top-24 left-4 lg:left-8 z-10">
                      <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">OUR PROCESS AND EXPERTISE</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">
                      {/* Left: Categories */}
                      <div className="flex flex-col gap-8 lg:gap-16">
                          {processCategories.map((cat, index) => (
                              <motion.h2 
                                key={cat.id}
                                className={`text-5xl md:text-7xl lg:text-8xl font-serif italic font-medium transition-all duration-500 ease-out cursor-pointer ${
                                    activeProcessIndex === index 
                                    ? `text-white scale-105 opacity-100 translate-x-4` 
                                    : 'text-slate-700 opacity-40 scale-100 hover:opacity-60'
                                }`}
                              >
                                  {cat.title}
                              </motion.h2>
                          ))}
                      </div>

                      {/* Right: Expertise Tags (Updated Content) */}
                      <div className="flex flex-wrap content-center gap-3 lg:gap-4 lg:justify-end max-w-xl ml-auto">
                          {expertiseTags.map((tag, i) => {
                              const isActive = tag.cat === activeProcessIndex;
                              const activeColorClass = processCategories[tag.cat].color;
                              
                              return (
                                  <motion.div
                                    key={i}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ 
                                        opacity: isActive ? 1 : 0.2,
                                        scale: isActive ? 1 : 0.95,
                                        borderColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className={`px-5 py-3 rounded-full border transition-all duration-300 backdrop-blur-sm cursor-default
                                        ${isActive 
                                            ? `bg-slate-900 border-slate-600 shadow-lg shadow-${activeColorClass.split('-')[1]}-500/20` 
                                            : 'bg-transparent border-transparent'
                                        }
                                    `}
                                  >
                                      <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-600'}`}>
                                          {tag.label}
                                      </span>
                                  </motion.div>
                              );
                          })}
                      </div>
                  </div>
              </div>
              
              <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 -z-10 opacity-20
                  ${activeProcessIndex === 0 ? 'bg-purple-600' : activeProcessIndex === 1 ? 'bg-cyan-600' : 'bg-blue-600'}
              `}></div>
          </div>
      </section>

      {/* 5. REDESIGNED TEAM SECTION */}
      <section className="py-32 bg-slate-950 border-t border-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-6">
                           <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Specialists</span>
                           <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{teamMembers.length} Architects</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tighter">
                          Mastering the craft. <br />
                          <span className="text-slate-700 italic font-serif">Fueling innovation.</span>
                      </h2>
                      <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                          Sameer Digital Lab is a collective of visionary digital crafters. We don't just build sites; we architect experiences that define brands and push boundaries.
                      </p>
                  </div>
                  
                  <Link to="/contact" className="hidden lg:block">
                       <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center group hover:bg-cyan-500 transition-all duration-500">
                           <ArrowRightIcon className="w-8 h-8 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                       </div>
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {teamMembers.map((member, i) => (
                      <TeamMemberCard key={i} member={member} index={i} />
                  ))}
              </div>

              {/* UPDATED: SPLIT-GRID JOIN CTA SECTION */}
              <div className="mt-32 pt-20 border-t border-slate-900">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                      <div>
                         <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                             It's Time to Turn Your <br />
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Vision into Reality.</span>
                         </h3>
                      </div>
                      <div className="flex flex-col items-start pt-2">
                          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 font-medium max-w-xl">
                              Partner with our elite team to redefine your digital presence. Let's collaborate to transform your boldest ideas into high-performance experiences that dominate the global market. We are ready to make your goals a global success.
                          </p>
                          <PremiumButton 
                            onClick={() => setIsPlannerOpen(true)}
                            icon={true}
                            className="!px-12 !py-5 shadow-2xl shadow-indigo-500/20"
                          >
                            Start Your Mission Now
                          </PremiumButton>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. CULTURE SECTION (UPDATED PER USER REQUEST) */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 order-2 lg:order-1">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Our Culture" className="w-full h-full object-cover min-h-[500px]" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 to-transparent"></div>
                  </div>
                  <div className="order-1 lg:order-2">
                      <div className="mb-6">
                          <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-2 block">Our Culture</span>
                          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                              We've created an environment where everyone feels comfortable and open.
                          </h2>
                      </div>
                      <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-8">
                          <p>We produce good work for good people, and with the idea that staff and the client will be happy throughout the full process.</p>
                      </div>
                      {/* Updated: Quote Box Background styled for the site and updated profile info */}
                      <div className="bg-slate-900/60 border border-cyan-500/20 p-6 rounded-2xl relative backdrop-blur-sm shadow-xl">
                          <div className="flex gap-4">
                              <div className="text-cyan-500 text-4xl leading-none font-serif">“</div>
                              <div>
                                  <p className="text-slate-300 font-medium italic mb-6 leading-relaxed">My vision has always been to look after the clients we work with, but to also look after the staff just as much.</p>
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden border-2 border-cyan-500/30">
                                          <img src="https://res.cloudinary.com/dow2sbjsp/image/upload/v1766382478/Sameer_if98jm.jpg" alt="Sameer Profile" className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                          <p className="text-white font-bold text-base leading-none mb-1">Sameer</p>
                                          <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">Founder & Digital Architect</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      {/* Removed: "Learn about our culture" button */}
                  </div>
              </div>
          </div>
      </section>
    </PageWrapper>
  );
};

export default AboutPage;
