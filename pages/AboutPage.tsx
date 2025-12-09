
import React, { useRef, useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';
import PremiumButton from '../components/PremiumButton';
import { Link } from 'react-router-dom';
import { StarIcon, ArrowRightIcon, RocketIcon, CodeIcon, StrategyIcon } from '../components/Icons';

// --- DATA ---

const stats = [
    { label: "Site of the Day", value: "5.0", sub: "Google Reviews", icon: <StarIcon className="w-5 h-5 text-yellow-400" /> },
    { label: "Awwwards", value: "38", sub: "Honorable Mentions", icon: <RocketIcon className="w-5 h-5 text-cyan-400" /> },
    { label: "Projects", value: "250+", sub: "Successfully Delivered", icon: <CodeIcon className="w-5 h-5 text-purple-400" /> },
    { label: "Years", value: "10+", sub: "Of Digital Excellence", icon: <StrategyIcon className="w-5 h-5 text-blue-400" /> },
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

// Process & Expertise Data
type CategoryType = 'Design' | 'Development' | 'Marketing';

interface Tag {
    label: string;
    category: CategoryType;
}

const allTags: Tag[] = [
    { label: "User Interface Design", category: "Design" },
    { label: "Website Development", category: "Development" },
    { label: "Marketing", category: "Marketing" },
    { label: "Logo", category: "Design" },
    { label: "SEO", category: "Marketing" },
    { label: "Content Creation", category: "Marketing" },
    { label: "Digital Ad Campaigns", category: "Marketing" },
    { label: "Branding", category: "Design" },
    { label: "CMS Integration", category: "Development" },
    { label: "Web Apps", category: "Development" },
    { label: "Analytics", category: "Marketing" },
    { label: "Wireframes & Prototyping", category: "Design" },
    { label: "Software Development", category: "Development" },
    { label: "User Experience Optimization", category: "Design" },
    { label: "Performance Reporting", category: "Marketing" },
    { label: "iOS/Android", category: "Development" },
];

const categories: CategoryType[] = ['Design', 'Development', 'Marketing'];

const ProcessExpertiseSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<CategoryType>('Design');
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest < 0.3) {
                setActiveCategory('Design');
            } else if (latest < 0.6) {
                setActiveCategory('Development');
            } else {
                setActiveCategory('Marketing');
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-slate-950">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                 {/* Decorative Background Blurs matching site theme */}
                 <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000" style={{ opacity: activeCategory === 'Development' ? 1 : 0.5 }} />
                 <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000" style={{ opacity: activeCategory === 'Design' ? 1 : 0.5 }} />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-10">
                    
                    <div className="mb-12 md:mb-20">
                        <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm block mb-4">
                             OUR PROCESS AND EXPERTISE
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                        {/* Left Side: Categories */}
                        <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12">
                            {categories.map((cat) => (
                                <motion.div
                                    key={cat}
                                    className="cursor-pointer transition-all duration-500"
                                    animate={{ 
                                        opacity: activeCategory === cat ? 1 : 0.2,
                                        x: activeCategory === cat ? 20 : 0
                                    }}
                                >
                                    <h2 
                                        className={`text-5xl md:text-7xl lg:text-8xl font-serif-italic transition-colors duration-500 ${
                                            activeCategory === cat ? 'text-white' : 'text-slate-700'
                                        }`}
                                    >
                                        {cat}
                                    </h2>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Side: Tags Cloud */}
                        <div className="lg:col-span-7 flex flex-wrap justify-start lg:justify-end gap-3 md:gap-4 content-center">
                            {allTags.map((tag, idx) => {
                                const isActive = tag.category === activeCategory;
                                return (
                                    <motion.div
                                        key={idx}
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: isActive ? 'rgba(34, 211, 238, 0.1)' : 'rgba(15, 23, 42, 0.3)', // cyan-400/10 vs slate-900/30
                                            borderColor: isActive ? 'rgba(34, 211, 238, 0.4)' : 'rgba(30, 41, 59, 0.5)', // cyan vs slate-800
                                            color: isActive ? '#22d3ee' : '#475569', // cyan-400 vs slate-600
                                            scale: isActive ? 1.05 : 1,
                                            opacity: isActive ? 1 : 0.4,
                                        }}
                                        transition={{ duration: 0.4 }}
                                        className={`px-4 py-2 md:px-6 md:py-3 rounded-full border text-sm md:text-base font-medium cursor-default backdrop-blur-md`}
                                    >
                                        {tag.label}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                 </div>
            </div>
        </section>
    );
};

const VideoRevealSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["3rem", "0rem"]);
    
    return (
        <section ref={containerRef} className="bg-slate-950 py-24 min-h-[100vh] flex items-center justify-center">
            <div className="w-full h-[80vh] md:h-[90vh] px-4 md:px-12">
                 <motion.div 
                    style={{ scale, borderRadius }}
                    className="w-full h-full overflow-hidden shadow-2xl shadow-cyan-500/10 relative"
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
                    {/* Optional overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none"></div>
                 </motion.div>
            </div>
        </section>
    )
}

const AboutPage: React.FC = () => {
    const { title, description } = useSeoContent('About');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

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

      {/* 2. DESCRIPTION & STATS SECTION (Layout matching image) */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
                  {/* Left Column: Big Headline */}
                  <div>
                      <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-6 block">Who We Are</span>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                          Expert web designers and web developers trained in the digital industry who offer a <span className="text-slate-500">bespoke, professional and trustworthy service.</span>
                      </h2>
                  </div>

                  {/* Right Column: Text with Pill Tags */}
                  <div className="flex flex-col justify-center">
                      <div className="text-slate-400 text-lg md:text-xl leading-relaxed space-y-6">
                          <p>
                              We are an Award-Winning 
                              <span className="inline-block px-3 py-1 mx-1.5 border border-slate-700 rounded-full text-white text-sm font-bold align-middle hover:border-cyan-500 transition-colors cursor-default">Branding</span> 
                              and Web Design Agency based in Cyberspace, specialising in 
                              <span className="inline-block px-3 py-1 mx-1.5 border border-slate-700 rounded-full text-white text-sm font-bold align-middle hover:border-cyan-500 transition-colors cursor-default">Web Design</span>, 
                              Web Development, 
                              <span className="inline-block px-3 py-1 mx-1.5 border border-slate-700 rounded-full text-white text-sm font-bold align-middle hover:border-cyan-500 transition-colors cursor-default">eCommerce</span> 
                              and 
                              <span className="inline-block px-3 py-1 mx-1.5 border border-slate-700 rounded-full text-white text-sm font-bold align-middle hover:border-cyan-500 transition-colors cursor-default">Organic SEO</span>.
                          </p>
                          <p>
                              With over a decade of experience, Sameer Digital Lab is an energetic, fresh and vibrant team offering creative talent, industry knowledge and extremely high standards.
                          </p>
                          <p>
                              We work with ambitious start-up businesses through to large global organisations such as Blackberry, NHS and L'Occitane so we can tailor our services to suit your needs.
                          </p>
                          <p>
                             Our preferred content management system of choice is 
                             <span className="inline-block px-3 py-1 mx-1.5 border border-slate-700 rounded-full text-white text-sm font-bold align-middle hover:border-cyan-500 transition-colors cursor-default">Craft CMS</span>.
                          </p>
                      </div>
                  </div>
              </div>

              {/* Stats Grid - Aligned Cleanly */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-900">
                  {stats.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-start pl-4 border-l border-slate-800"
                      >
                          <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                          <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. VIDEO REVEAL SECTION (Scroll Animation) */}
      <VideoRevealSection />

      {/* 4. PROCESS & EXPERTISE SECTION (Sticky) */}
      <ProcessExpertiseSection />

      {/* 5. TEAM SECTION */}
      <section className="py-32 bg-slate-950">
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
