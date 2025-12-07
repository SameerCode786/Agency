
import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';
import ParticleBackground from '../components/ParticleBackground';
import PremiumButton from '../components/PremiumButton';
import { ArrowRightIcon, CodeIcon, MobileIcon, DesignIcon, LayersIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

// Mock Data - Enhanced with secondary images for hover effect
const portfolioItems = [
  { 
      id: 1, 
      title: 'QuantumLeap CRM', 
      category: 'Web', 
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', 
      image2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      industry: 'SaaS', 
      tools: ['React', 'Node.js', 'Figma'], 
      description: 'A streamlined CRM platform designed to boost sales team productivity by 40% through intuitive UI.' 
  },
  { 
      id: 2, 
      title: 'ConnectSphere App', 
      category: 'App', 
      image1: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', 
      image2: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop',
      industry: 'Social', 
      tools: ['React Native', 'Firebase'], 
      description: 'A social networking app focused on meaningful professional connections with real-time chat.' 
  },
  { 
      id: 3, 
      title: 'Aether Aesthetics', 
      category: 'UI/UX', 
      image1: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2725&auto=format&fit=crop', 
      image2: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      industry: 'Fashion', 
      tools: ['Figma', 'Adobe XD'], 
      description: 'Complete brand identity and e-commerce redesign for a luxury streetwear brand.' 
  },
  { 
      id: 4, 
      title: 'DataVortex Dashboard', 
      category: 'Web', 
      image1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      image2: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
      industry: 'FinTech', 
      tools: ['Vue.js', 'D3.js'], 
      description: 'Real-time financial analytics dashboard handling millions of data points with sub-second latency.' 
  },
  { 
      id: 5, 
      title: 'NomadGo Travel', 
      category: 'App', 
      image1: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop', 
      image2: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
      industry: 'Travel', 
      tools: ['Expo', 'GraphQL'], 
      description: 'AI-powered travel itinerary planner that suggests hidden gems based on user preferences.' 
  },
  { 
      id: 6, 
      title: 'Zenith Wellness', 
      category: 'UI/UX', 
      image1: 'https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=2070&auto=format&fit=crop', 
      image2: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
      industry: 'Health', 
      tools: ['Illustrator', 'Figma'], 
      description: 'Calming, accessible mobile app interface design for a meditation and mindfulness startup.' 
  },
];

const categories = [
    { name: 'All', icon: <LayersIcon className="w-4 h-4" /> },
    { name: 'Web', icon: <CodeIcon className="w-4 h-4" /> },
    { name: 'App', icon: <MobileIcon className="w-4 h-4" /> },
    { name: 'UI/UX', icon: <DesignIcon className="w-4 h-4" /> }
];

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { title, description } = useSeoContent('Portfolio');

  const filteredItems = useMemo(() => {
    if (filter === 'All') return portfolioItems;
    return portfolioItems.filter(item => item.category === filter);
  }, [filter]);

  return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
       
       {/* HERO SECTION */}
       <section className="relative pt-40 pb-20 bg-slate-950 overflow-hidden">
            <ParticleBackground />
            <div className="absolute inset-0 bg-slate-950/90 z-0"></div>
            
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Masterpieces</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Work</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-12">
                        We don't just write code; we craft digital experiences. Explore a selection of our most recent projects that push the boundaries of design and technology.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setFilter(cat.name)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                                filter === cat.name
                                    ? 'bg-slate-900 text-white border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                            }`}
                        >
                            {cat.icon}
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
       </section>

       {/* PORTFOLIO GRID */}
       <section className="pb-32 bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative rounded-2xl p-[1px] overflow-hidden"
                            >
                                {/* Glowing Border */}
                                <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,#0f172a_0%,#0f172a_40%,#22d3ee_50%,#0f172a_60%,#0f172a_90%,#8936ea_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group-hover:border-transparent transition-colors">
                                    {/* Image Area */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        <img 
                                            src={item.image1} 
                                            alt={item.title} 
                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                                        />
                                        <img 
                                            src={item.image2} 
                                            alt={`${item.title} hover`} 
                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105"
                                        />
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700">
                                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{item.category}</span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-1 block">{item.industry}</span>
                                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                            </div>
                                            <div className="bg-slate-800 p-2 rounded-full text-slate-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                                <ArrowRightIcon className="w-4 h-4 -rotate-45" />
                                            </div>
                                        </div>
                                        
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {item.description}
                                        </p>

                                        {/* Tools Tags */}
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                                            {item.tools.map((tool) => (
                                                <span key={tool} className="text-[10px] uppercase font-bold text-slate-500 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
       </section>

       {/* CTA SECTION */}
       <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to build your next masterpiece?</h2>
                <Link to="/contact">
                    <PremiumButton className="px-12 py-4 text-lg">Start a Project</PremiumButton>
                </Link>
            </div>
       </section>

    </PageWrapper>
  );
};

export default PortfolioPage;
