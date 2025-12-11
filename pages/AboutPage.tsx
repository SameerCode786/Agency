
import React, { useRef, useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';
import PremiumButton from '../components/PremiumButton';
import { Link } from 'react-router-dom';
import { StarIcon, ArrowRightIcon, RocketIcon, CodeIcon, StrategyIcon } from '../components/Icons';

// --- DATA ---

const stats = [
    { label: "Site of the Day", value: "5.0", sub: "Google Reviews", icon: <StarIcon className="w-6 h-6 text-yellow-400" /> },
    { label: "Awwwards", value: "38", sub: "Honorable Mentions", icon: <RocketIcon className="w-6 h-6 text-cyan-400" /> },
    { label: "Projects", value: "250+", sub: "Successfully Delivered", icon: <CodeIcon className="w-6 h-6 text-purple-400" /> },
    { label: "Years", value: "10+", sub: "Of Digital Excellence", icon: <StrategyIcon className="w-6 h-6 text-blue-400" /> },
];

const teamMembers = [
    { name: "Sameer", role: "Founder & Lead Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
    { name: "Natasia", role: "Content Writer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
    { name: "Chris", role: "Accounts & Finance", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Ruby", role: "Design Intern", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop" },
    { name: "Joe", role: "Web Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
    { name: "Sarah", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
];

const cultureImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
];

// --- NEW PROCESS SECTION DATA ---
const processCategories = [
    { id: 0, title: "Design", color: "text-purple-400" },
    { id: 1, title: "Development", color: "text-cyan-400" },
    { id: 2, title: "Marketing", color: "text-blue-500" }
];

const expertiseTags = [
    // Design (0)
    { label: "User Interface Design", cat: 0 },
    { label: "User Experience Optimization", cat: 0 },
    { label: "Wireframes & Prototyping", cat: 0 },
    { label: "Branding", cat: 0 },
    { label: "Logo Design", cat: 0 },
    { label: "Mobile Design", cat: 0 },
    
    // Development (1)
    { label: "CMS Integration", cat: 1 },
    { label: "Website Development", cat: 1 },
    { label: "Web Apps", cat: 1 },
    { label: "iOS/Android", cat: 1 },
    { label: "Software Development", cat: 1 },
    { label: "React Native", cat: 1 },
    { label: "Shopify Liquid", cat: 1 },
    { label: "Supabase", cat: 1 },

    // Marketing (2)
    { label: "SEO", cat: 2 },
    { label: "Performance Reporting", cat: 2 },
    { label: "Digital Ad Campaigns", cat: 2 },
    { label: "Content Creation", cat: 2 },
    { label: "Analytics", cat: 2 },
    { label: "Conversion Rate Opt", cat: 2 },
];

const AboutPage: React.FC = () => {
    const { title, description } = useSeoContent('About');
    
    // Header Scroll Logic
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Process Section Scroll Logic
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

    // Video Scroll Logic (Expansion Effect)
    const videoSectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: videoScrollProgress } = useScroll({
        target: videoSectionRef,
        offset: ["start end", "center center"]
    });

    // Animate from scale 0.8 (small) to 1 (full width)
    const videoScale = useTransform(videoScrollProgress, [0, 1], [0.8, 1]);
    const videoRadius = useTransform(videoScrollProgress, [0, 1], ["40px", "0px"]);
    const videoOpacity = useTransform(videoScrollProgress, [0, 0.2], [0.5, 1]);

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
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

            {/* Parallax Image Grid */}
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
                    <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop" alt="Discussion" className="rounded-2xl w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
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

      {/* 2. STATS SECTION */}
      <section className="py-32 bg-slate-950 border-t border-slate-900 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-8 shadow-lg shadow-cyan-500/10">
                            Our Identity
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                            We are expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">web creators</span> dedicated to bespoke, professional service.
                        </h2>
                        <p className="text-xl text-slate-400 leading-relaxed font-light">
                            With over a decade of experience, Sameer Digital Lab is an energetic, fresh, and vibrant team offering creative talent, industry knowledge, and extremely high standards. We transform ambitious start-ups and global brands like Blackberry and NHS into digital leaders.
                        </p>
                    </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                  {stats.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:bg-slate-900 transition-colors duration-500 overflow-hidden"
                      >
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-2xl rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>

                          <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-cyan-500/20">
                                    {stat.icon}
                                </div>
                          </div>
                          <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                              {stat.value}
                          </div>
                          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                          <div className="text-xs text-slate-600 font-medium">{stat.sub}</div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. NEW PROCESS & EXPERTISE SECTION (Sticky Interactive) */}
      <section ref={processRef} className="relative h-[250vh] bg-slate-950 border-t border-slate-900">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Section Title */}
                  <div className="absolute top-24 left-4 lg:left-8 z-10">
                      <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">OUR PROCESS AND EXPERTISE</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">
                      
                      {/* Left: Animated Headings */}
                      <div className="flex flex-col gap-8 lg:gap-16">
                          {processCategories.map((cat, index) => (
                              <motion.h2 
                                key={cat.id}
                                className={`text-5xl md:text-7xl lg:text-8xl font-serif italic font-medium transition-all duration-500 ease-out cursor-pointer ${
                                    activeProcessIndex === index 
                                    ? `text-white scale-105 opacity-100 translate-x-4` 
                                    : 'text-slate-700 opacity-40 scale-100 hover:opacity-60'
                                }`}
                                onClick={() => {
                                    // Optional: Click to scroll functionality could be added here
                                }}
                              >
                                  {cat.title}
                              </motion.h2>
                          ))}
                      </div>

                      {/* Right: Interactive Tags */}
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
              
              {/* Background Glow based on active index */}
              <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 -z-10 opacity-20
                  ${activeProcessIndex === 0 ? 'bg-purple-600' : activeProcessIndex === 1 ? 'bg-cyan-600' : 'bg-blue-600'}
              `}></div>
          </div>
      </section>

      {/* 4. EXPANDING VIDEO SECTION */}
      <section ref={videoSectionRef} className="pb-32 bg-slate-950 relative overflow-hidden">
          <motion.div 
            style={{ 
                scale: videoScale, 
                borderRadius: videoRadius,
                opacity: videoOpacity
            }}
            className="w-full h-[60vh] md:h-[90vh] relative mx-auto overflow-hidden shadow-2xl shadow-cyan-500/10"
          >
              <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
              >
                  <source src="https://res.cloudinary.com/dow2sbjsp/video/upload/v1765300961/shape-showreel-2024_looping-v3_czfqgh.mp4" type="video/mp4" />
              </video>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 opacity-60"></div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-10 left-0 right-0 text-center z-10 p-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-block"
                  >
                      <div className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-bold uppercase tracking-widest hover:bg-black/60 transition-colors cursor-pointer">
                          Watch Showreel 2024
                      </div>
                  </motion.div>
              </div>
          </motion.div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="py-32 bg-slate-950 border-t border-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 block">Our Team</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white">
                      Multiple personalities, <br />
                      <span className="text-slate-600">No egos.</span>
                  </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, i) => (
                      <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="group relative"
                      >
                          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 aspect-[4/5]">
                              <img 
                                  src={member.image} 
                                  alt={member.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                              
                              <div className="absolute top-4 right-4">
                                  <div className="bg-white/10 backdrop-blur p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                  </div>
                              </div>

                              <div className="absolute bottom-0 left-0 p-8 w-full">
                                  <h3 className="text-2xl font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.name}</h3>
                                  <p className="text-cyan-400 text-sm font-bold uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.role}</p>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>

              <div className="flex justify-center mt-16">
                  <Link to="/contact">
                      <PremiumButton icon={false}>Meet the whole Team</PremiumButton>
                  </Link>
              </div>
          </div>
      </section>

      {/* 6. CULTURE SECTION */}
      <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Image Block */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 order-2 lg:order-1">
                      <img 
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                          alt="Our Culture" 
                          className="w-full h-full object-cover min-h-[500px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 to-transparent"></div>
                  </div>

                  {/* Text Block */}
                  <div className="order-1 lg:order-2">
                      <div className="mb-6">
                          <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-2 block">Our Culture</span>
                          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                              We've created an environment where everyone feels comfortable and open.
                          </h2>
                      </div>
                      
                      <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-8">
                          <p>
                              We produce good work for good people, and with the idea that staff and the client will be happy throughout the full process. This in return will bring more work our way, whether that's via recommendation or further work from that client.
                          </p>
                      </div>

                      {/* Founder Quote Box */}
                      <div className="bg-lime-300/10 border border-lime-300/30 p-6 rounded-2xl relative">
                          <div className="flex gap-4">
                              <div className="text-lime-300 text-4xl leading-none">“</div>
                              <div>
                                  <p className="text-lime-200 font-medium italic mb-4">
                                      My vision has always been to look after the clients we work with, but to also look after the staff just as much. That will get the best results for everyone.
                                  </p>
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" alt="Sameer" className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                          <p className="text-white font-bold text-sm">Sameer</p>
                                          <p className="text-lime-300 text-xs uppercase tracking-wider">Founder</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                          <Link to="/about">
                              <button className="flex items-center gap-2 text-white border border-slate-700 rounded-full px-6 py-2 hover:bg-slate-800 transition-colors text-sm">
                                  Learn about our culture <ArrowRightIcon className="w-4 h-4 -rotate-45"/>
                              </button>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </PageWrapper>
  );
};

export default AboutPage;
