
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { generateBlogPost, generateTrendingTopic, generateAutomatedBlog } from '../../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { LightbulbIcon, StarIcon, LoaderIcon, CheckIcon, EyeIcon, SearchIcon, RocketIcon, CodeIcon, StrategyIcon, BrainIcon } from '../../components/Icons';

const CATEGORIES = ['Web Development', 'WordPress', 'SEO & Google Ranking', 'Shopify / eCommerce', 'App Development', 'Digital Growth for Businesses'];
type BlogStatus = 'Published' | 'Draft' | 'Review';

interface Blog {
    id: number;
    title: string;
    slug?: string;
    category: string;
    image: string;
    date: string;
    excerpt: string;
    content: string;
    status: BlogStatus; 
}

const ManageBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [filterStatus, setFilterStatus] = useState<BlogStatus | 'All'>('All');
    
    // Automation States
    const [isGenerating, setIsGenerating] = useState(false);
    const [workflowStep, setWorkflowStep] = useState(0); // 0 to 5
    const [batchProgress, setBatchProgress] = useState('');
    
    // Form State
    const [currentBlog, setCurrentBlog] = useState<Partial<Blog & { stock_keywords: string }>>({
        title: '',
        slug: '',
        category: 'Web Development',
        image: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        content: '',
        status: 'Draft',
        stock_keywords: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching blogs:', error);
        } else {
            const normalizedData = (data || []).map((b: any) => ({
                ...b,
                status: b.status || 'Published' 
            }));
            setBlogs(normalizedData);
        }
        setLoading(false);
    };

    const parseAutomatedOutput = (text: string) => {
        const sections = ['Category', 'SEO Title', 'Meta Description', 'URL Slug', 'Primary Keyword', 'Secondary Keywords', 'Blog Content'];
        const result: any = {};
        sections.forEach(section => {
            const regex = new RegExp(`\\[${section}\\]([\\s\\S]*?)(?=\\[|$)`, 'i');
            const match = text.match(regex);
            if (match) {
                result[section.toLowerCase().replace(/ /g, '_')] = match[1].trim();
            }
        });
        return result;
    }

    const handleRunAutomation = async () => {
        setIsGenerating(true);
        setWorkflowStep(1); // Content Strategy
        
        try {
            const lastBlog = blogs[0];
            const resultText = await generateAutomatedBlog(lastBlog?.category);
            
            // Progress simulation for better UX
            const steps = [
                { s: 2, t: 1500, label: 'SEO Planning...' },
                { s: 3, t: 3000, label: 'Image Research...' },
                { s: 4, t: 5000, label: 'Agent Writing Content...' },
                { s: 5, t: 8000, label: 'Quality Control Check...' }
            ];

            for (const step of steps) {
                setWorkflowStep(step.s);
                setBatchProgress(step.label);
                await new Promise(r => setTimeout(r, step.t));
            }

            const parsed = parseAutomatedOutput(resultText);
            
            // Generate a default image based on category keywords
            const kw = parsed.primary_keyword || parsed.category;
            const imgUrl = `https://loremflickr.com/1280/800/${encodeURIComponent(kw.replace(/\s/g, ','))}`;

            setCurrentBlog({
                title: parsed.seo_title || 'New Automated Post',
                category: parsed.category || 'Web Development',
                slug: parsed.url_slug || `post-${Date.now()}`,
                excerpt: parsed.meta_description || '',
                content: parsed.blog_content || '',
                image: imgUrl,
                status: 'Draft',
                date: new Date().toISOString().split('T')[0]
            });

            setIsEditing(true);
        } catch (error: any) {
            alert(`Workflow Error: ${error.message}`);
        } finally {
            setIsGenerating(false);
            setWorkflowStep(0);
            setBatchProgress('');
        }
    };

    const handleSave = async () => {
        const blogData = {
            title: currentBlog.title || 'Untitled Post',
            slug: currentBlog.slug || `blog-${Date.now()}`,
            category: currentBlog.category || 'Web Development',
            image: currentBlog.image || '',
            date: currentBlog.date || new Date().toISOString().split('T')[0],
            excerpt: currentBlog.excerpt || '',
            content: currentBlog.content || '',
            status: currentBlog.status || 'Draft'
        };

        try {
            if (currentBlog.id) {
                const { error } = await supabase.from('blogs').update(blogData).eq('id', currentBlog.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('blogs').insert([blogData]);
                if (error) throw error;
            }
            setIsEditing(false);
            fetchBlogs();
        } catch (error: any) {
            alert(`Save Error: ${error.message}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this post?')) return;
        await supabase.from('blogs').delete().eq('id', id);
        fetchBlogs();
    };

    const filteredBlogs = blogs.filter(b => filterStatus === 'All' || b.status === filterStatus);

    return (
        <div className="space-y-8">
            {/* Automation Workflow Visual Bar */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${isGenerating ? 'bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-slate-900'} transition-all duration-500`}>
                            <RocketIcon className={`w-8 h-8 ${isGenerating ? 'text-white animate-bounce' : 'text-slate-500'}`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Multi-Agent Workflow</h3>
                            <p className="text-slate-500 text-sm">{isGenerating ? batchProgress : 'System Ready for Automation'}</p>
                        </div>
                    </div>

                    <div className="flex-1 max-w-2xl hidden lg:flex items-center gap-2">
                        {[
                            { name: 'Strategist', icon: <StrategyIcon /> },
                            { name: 'SEO', icon: <SearchIcon /> },
                            { name: 'Researcher', icon: <SearchIcon /> },
                            { name: 'Writer', icon: <CodeIcon /> },
                            { name: 'QC', icon: <CheckIcon /> }
                        ].map((node, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-col items-center gap-2 group">
                                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${workflowStep > i ? 'bg-green-500 border-green-400' : workflowStep === i + 1 ? 'bg-cyan-500 border-cyan-400 animate-pulse scale-110' : 'bg-slate-900 border-slate-700 opacity-30'}`}>
                                        {React.cloneElement(node.icon as React.ReactElement, { className: 'w-5 h-5 text-white' })}
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${workflowStep === i + 1 ? 'text-cyan-400' : 'text-slate-600'}`}>{node.name}</span>
                                </div>
                                {i < 4 && <div className={`h-px flex-1 transition-colors duration-1000 ${workflowStep > i + 1 ? 'bg-green-500' : 'bg-slate-800'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>

                    <PremiumButton 
                        onClick={handleRunAutomation} 
                        disabled={isGenerating}
                        className="!px-8 !py-4 shadow-cyan-500/20"
                    >
                        {isGenerating ? 'Workflow Active...' : 'Trigger Daily Blog'}
                    </PremiumButton>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Editorial Dashboard</h2>
                    <p className="text-slate-500 text-sm">Managing {blogs.length} high-authority articles</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-slate-900 p-1 rounded-full border border-slate-800">
                        {(['All', 'Published', 'Draft'] as const).map(s => (
                            <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterStatus === s ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>{s}</button>
                        ))}
                    </div>
                    <PremiumButton onClick={() => { setCurrentBlog({ category: 'Web Development', status: 'Draft' }); setIsEditing(true); }} icon={true} className="!px-6 !py-2 text-xs">Manual Post</PremiumButton>
                </div>
            </div>

            {/* Editing UI */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="fixed inset-0 z-[100] bg-slate-950 p-8 overflow-y-auto custom-scrollbar">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Edit Submission</h2>
                                <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-full border border-slate-800 text-slate-400 hover:text-white transition-colors">Discard Draft</button>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-8 space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Main Title</label>
                                        <input value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white text-2xl font-bold focus:border-cyan-500 outline-none" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Content Structure (HTML)</label>
                                        <textarea rows={20} value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} className="w-full bg-slate-900 border border-slate-800 p-6 rounded-2xl text-slate-300 font-mono text-sm leading-relaxed focus:border-cyan-500 outline-none resize-none" />
                                    </div>
                                </div>

                                <div className="lg:col-span-4 space-y-8">
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                                            <select value={currentBlog.category} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white">
                                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Slug / URL</label>
                                            <input value={currentBlog.slug} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-cyan-400 font-mono text-xs" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hero Image (Real Stock)</label>
                                            <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden mb-2 border border-slate-800">
                                                <img src={currentBlog.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <input placeholder="Image URL..." value={currentBlog.image} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-400" />
                                        </div>
                                        <PremiumButton onClick={handleSave} width="full">Publish Post</PremiumButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List View */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="flex justify-center py-20"><LoaderIcon className="w-8 h-8 animate-spin text-cyan-500" /></div>
                ) : filteredBlogs.map(blog => (
                    <div key={blog.id} className="bg-slate-900/50 border border-slate-800 p-5 rounded-3xl flex items-center gap-6 group hover:border-cyan-500/30 transition-all">
                        <div className="w-20 h-20 bg-slate-950 rounded-2xl overflow-hidden flex-shrink-0">
                            <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[9px] font-black uppercase text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{blog.category}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{new Date(blog.date).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{blog.title}</h4>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setCurrentBlog(blog); setIsEditing(true); }} className="p-3 bg-slate-800 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition-all"><EyeIcon className="w-5 h-5"/></button>
                            <button onClick={() => handleDelete(blog.id)} className="p-3 bg-red-900/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><StrategyIcon className="w-5 h-5 rotate-45"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBlogs;
