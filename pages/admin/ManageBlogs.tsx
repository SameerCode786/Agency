
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { generateBlogPost, generateTrendingTopic } from '../../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { LightbulbIcon, StarIcon, LoaderIcon, CheckIcon, EyeIcon, SearchIcon } from '../../components/Icons';

const CATEGORIES = ['Technology', 'Design', 'Business'];
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
    stock_keywords?: string; // Track keywords for editing
}

const ManageBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [filterStatus, setFilterStatus] = useState<BlogStatus | 'All'>('All');
    
    // AI State
    const [isGenerating, setIsGenerating] = useState(false);
    const [batchProgress, setBatchProgress] = useState('');
    const [aiTopic, setAiTopic] = useState('');
    
    // Form State
    const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({
        title: '',
        slug: '',
        category: 'Technology',
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

    const handleSave = async () => {
        const generateSlug = (text: string) => {
            if (!text) return `post-${Date.now()}`;
            return text.toString().toLowerCase().trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-');
        };

        let finalSlug = currentBlog.slug;
        if (!finalSlug || finalSlug.trim() === '') {
            finalSlug = generateSlug(currentBlog.title || `blog-${Date.now()}`);
        }

        const blogData = {
            title: currentBlog.title || 'Untitled Post',
            slug: finalSlug,
            category: currentBlog.category || 'Technology',
            image: currentBlog.image || '',
            date: currentBlog.date || new Date().toISOString().split('T')[0],
            excerpt: currentBlog.excerpt || '',
            content: currentBlog.content || '',
            status: currentBlog.status || 'Draft',
            stock_keywords: currentBlog.stock_keywords || ''
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
            resetForm();
        } catch (error: any) {
            alert(`Error saving blog: ${error.message}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this post?')) return;
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) alert(`Error deleting blog: ${error.message}`);
        else fetchBlogs();
    };

    const generateSinglePost = async (category: string, specificTopic?: string) => {
        let topic = specificTopic;
        if (!topic) {
            setBatchProgress(`Brainstorming ${category}...`);
            topic = await generateTrendingTopic(category);
        }
        
        setBatchProgress(`Writing: ${topic.substring(0, 15)}...`);
        const aiData = await generateBlogPost(topic, category);
        
        // Use Unsplash source for REAL photography based on keywords
        const keywords = aiData.imageKeywords.split(',').join(',');
        const realPhotographyUrl = `https://source.unsplash.com/featured/1200x800/?${encodeURIComponent(keywords)}`;

        const slug = aiData.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');

        return {
            title: aiData.title,
            slug: slug || `post-${Date.now()}`,
            excerpt: aiData.excerpt,
            content: aiData.content,
            category: category,
            image: realPhotographyUrl,
            stock_keywords: aiData.imageKeywords,
            date: new Date().toISOString().split('T')[0],
            status: 'Draft' as BlogStatus
        };
    };

    const handleAIGenerate = async () => {
        setIsGenerating(true);
        try {
            const category = currentBlog.category || 'Technology';
            const generatedData = await generateSinglePost(category, aiTopic);
            setCurrentBlog({ ...currentBlog, ...generatedData });
        } catch (error: any) {
            alert(`Generation failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
            setBatchProgress('');
        }
    };

    const handleDailyBatch = async () => {
        setIsGenerating(true);
        setBatchProgress('Starting batch...');
        try {
            for (const cat of CATEGORIES) {
                const newPost = await generateSinglePost(cat);
                await supabase.from('blogs').insert([newPost]);
            }
            setBatchProgress('Done!');
            setTimeout(() => setBatchProgress(''), 2000);
            fetchBlogs();
        } catch (error: any) {
            alert(`Batch failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetForm = () => {
        setCurrentBlog({ 
            category: 'Technology',
            status: 'Draft',
            slug: '',
            date: new Date().toISOString().split('T')[0],
            stock_keywords: ''
        });
        setAiTopic('');
    };

    const openEdit = (blog: Blog) => {
        setCurrentBlog({ ...blog });
        setIsEditing(true);
    };

    const openNew = () => {
        resetForm();
        setIsEditing(true);
    };

    const filteredBlogs = blogs.filter(b => filterStatus === 'All' || b.status === filterStatus);

    if (isEditing) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-xl font-bold text-white">{currentBlog.id ? 'Edit Post' : 'New Post'}</h3>
                    
                    <div className="flex items-center gap-2 bg-slate-950 border border-cyan-500/30 p-2 rounded-xl">
                        <input 
                            type="text" 
                            placeholder="Topic (Optional)" 
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            className="bg-transparent text-white text-sm px-2 focus:outline-none w-40"
                        />
                        <button 
                            onClick={handleAIGenerate}
                            disabled={isGenerating}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <><LoaderIcon className="w-4 h-4 animate-spin" /> {batchProgress || 'Generating...'}</>
                            ) : (
                                <><LightbulbIcon className="w-4 h-4" /> AI Content Engine</>
                            )}
                        </button>
                    </div>

                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white text-sm">Cancel</button>
                </div>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase">Blog Title</label>
                            <input 
                                placeholder="Enter title..." 
                                value={currentBlog.title || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none font-bold text-lg" 
                            />
                            <label className="text-xs font-bold text-slate-500 uppercase block mt-2">Slug (URL)</label>
                            <input 
                                value={currentBlog.slug || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} 
                                className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-cyan-400 text-sm focus:border-cyan-500 outline-none font-mono" 
                            />
                        </div>
                        
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase">Publish Settings</label>
                            <div className="grid grid-cols-2 gap-2">
                                <select 
                                    value={currentBlog.status || 'Draft'}
                                    onChange={e => setCurrentBlog({...currentBlog, status: e.target.value as BlogStatus})}
                                    className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Review">Review</option>
                                    <option value="Published">Published</option>
                                </select>
                                <input 
                                    type="date"
                                    value={currentBlog.date || ''}
                                    onChange={e => setCurrentBlog({...currentBlog, date: e.target.value})}
                                    className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                            <select 
                                value={currentBlog.category || 'Technology'} 
                                onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Stock Image Search Keywords</label>
                            <input 
                                placeholder="e.g. modern business office, coding laptop" 
                                value={currentBlog.stock_keywords || ''} 
                                onChange={e => {
                                    const kw = e.target.value;
                                    setCurrentBlog({
                                        ...currentBlog, 
                                        stock_keywords: kw,
                                        image: kw ? `https://source.unsplash.com/featured/1200x800/?${encodeURIComponent(kw)}` : currentBlog.image
                                    });
                                }} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Short Excerpt</label>
                            <textarea 
                                placeholder="Summary..." 
                                rows={4} 
                                value={currentBlog.excerpt || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
                                Image Preview (Real Photography)
                                <span className="text-cyan-400 font-normal">Pulled from Unsplash</span>
                            </label>
                            <div className="relative h-32 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                                {currentBlog.image ? (
                                    <img src={currentBlog.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-slate-600 text-xs">Enter keywords to see photo</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Full Content (HTML)</label>
                        <textarea 
                            rows={15} 
                            value={currentBlog.content || ''} 
                            onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} 
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm focus:border-cyan-500 outline-none" 
                        />
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-4 border-t border-slate-800 pt-6">
                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 text-slate-400 hover:text-white">Discard</button>
                    <PremiumButton onClick={handleSave} icon={false} className="!px-8 !py-3">
                        {currentBlog.status === 'Published' ? 'Publish Post' : 'Save Draft'}
                    </PremiumButton>
                </div>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-white">Manage Blog Content</h2>
                    <p className="text-slate-500 text-sm">Real stock photography only. No AI images permitted.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={handleDailyBatch}
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
                        {batchProgress || 'Auto-Generate Daily'}
                    </button>
                    <PremiumButton onClick={openNew} icon={true} className="!px-6 !py-2 text-sm">New Post</PremiumButton>
                </div>
            </div>

            <div className="flex border-b border-slate-800 mb-6 space-x-6 overflow-x-auto">
                {(['All', 'Published', 'Draft', 'Review'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`pb-3 text-sm font-bold relative transition-colors ${filterStatus === status ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}
                    >
                        {status}
                        {filterStatus === status && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
                    <LoaderIcon className="w-8 h-8 animate-spin text-cyan-500" />
                    <p>Loading your articles...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredBlogs.map(blog => (
                        <div key={blog.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-6 group">
                            <div className="w-full sm:w-24 h-24 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-800">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700"><SearchIcon className="w-6 h-6"/></div>
                                )}
                            </div>
                            <div className="flex-1 text-center sm:text-left w-full">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                    <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                                        {blog.category}
                                    </span>
                                    <span className="text-xs text-slate-500">{new Date(blog.date).toLocaleDateString()}</span>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">{blog.title}</h4>
                                <p className="text-slate-400 text-sm line-clamp-2">{blog.excerpt}</p>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto justify-center">
                                <button onClick={() => openEdit(blog)} className="px-4 py-2 bg-slate-950 text-white border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-800">Edit</button>
                                <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500/20">Delete</button>
                            </div>
                        </div>
                    ))}
                    {filteredBlogs.length === 0 && <p className="text-center py-20 text-slate-500">No blog posts found.</p>}
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
