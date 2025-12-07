
import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSeoContent } from '../hooks/useSeoContent';
import ParticleBackground from '../components/ParticleBackground';
import { ArrowRightIcon, SearchIcon } from '../components/Icons';
import PremiumButton from '../components/PremiumButton';

const blogPosts = [
  { id: 1, title: 'The Future of Web Development in 2024', category: 'Technology', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop', date: 'Oct 12, 2024', excerpt: 'Exploring the latest trends, from AI integration to serverless architecture and what it means for business.' },
  { id: 2, title: '5 UI/UX Principles for Higher Conversion', category: 'Design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop', date: 'Sep 28, 2024', excerpt: 'Learn how to apply key design principles to create interfaces that users love and that drive sales.' },
  { id: 3, title: 'Why Your Business Needs a Mobile App', category: 'Business', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', date: 'Sep 15, 2024', excerpt: 'In a mobile-first world, having a dedicated app can be a game-changer for retention and engagement.' },
  { id: 4, title: 'Mastering React Hooks: A Deep Dive', category: 'Technology', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop', date: 'Aug 30, 2024', excerpt: 'Go beyond useState and useEffect to unlock the full power of React Hooks for cleaner, faster code.' },
  { id: 5, title: 'The Art of Minimalist Web Design', category: 'Design', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop', date: 'Aug 10, 2024', excerpt: 'Less is more. Discover how minimalism can improve aesthetics, load times, and usability.' },
  { id: 6, title: 'Digital Strategy for Startups', category: 'Business', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', date: 'Jul 22, 2024', excerpt: 'A roadmap for building a strong online presence from the ground up on a limited budget.' },
];

const categories = ['All', 'Technology', 'Design', 'Business'];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const { title, description } = useSeoContent('Blog');

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => category === 'All' || post.category === category)
      .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, category]);

  // Featured post is the first one
  const featuredPost = blogPosts[0];

  return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
       
       <section className="relative pt-32 pb-12 bg-slate-950">
            <ParticleBackground />
            <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Journal</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Insights & Thoughts</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Deep dives into technology, design, and digital strategy. Stay ahead of the curve.
                    </p>
                </div>

                {/* FEATURED POST */}
                {category === 'All' && !searchTerm && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-20 relative group cursor-pointer rounded-3xl overflow-hidden border border-slate-800"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                            <div className="relative h-64 lg:h-[500px] overflow-hidden">
                                <img 
                                    src={featuredPost.image} 
                                    alt={featuredPost.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md p-8 lg:p-16 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
                                        Featured
                                    </span>
                                    <span className="text-slate-500 text-sm font-semibold">{featuredPost.date}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-cyan-400 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center text-white font-bold group-hover:text-cyan-400 transition-colors gap-2">
                                    Read Article <ArrowRightIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SEARCH & FILTER */}
                <div className="sticky top-24 z-30 mb-12">
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-full p-2 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
                        <div className="flex space-x-1 overflow-x-auto w-full md:w-auto p-1 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                    category === cat 
                                        ? 'bg-white text-black shadow-lg' 
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64 pr-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-800 text-white text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder-slate-500"
                            />
                            <SearchIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        </div>
                    </div>
                </div>

                {/* POSTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                    {filteredPosts.filter(p => category === 'All' && !searchTerm ? p.id !== 1 : true).map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur text-xs font-bold text-white uppercase tracking-wider border border-slate-700">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="text-slate-500 text-xs font-bold mb-3 uppercase tracking-wide">{post.date}</div>
                                <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-cyan-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="text-cyan-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                                    Read More <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* NEWSLETTER CTA */}
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-12 text-center border border-white/10 relative overflow-hidden mb-24">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">Join our digital newsletter</h2>
                        <p className="text-slate-300 mb-8">Get the latest insights on web development and design delivered straight to your inbox. No spam, just value.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input type="email" placeholder="Enter your email address" className="flex-grow px-6 py-4 rounded-full bg-slate-950/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" />
                            <PremiumButton icon={false} className="whitespace-nowrap">Subscribe Now</PremiumButton>
                        </div>
                    </div>
                </div>

            </div>
       </section>
    </PageWrapper>
  );
};

export default BlogPage;
