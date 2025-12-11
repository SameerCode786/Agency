
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { generateBlogPost } from '../../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { LightbulbIcon, StarIcon, LoaderIcon, CheckIcon, EyeIcon, EyeOffIcon } from '../../components/Icons';

// Defined Categories to match the main website
const CATEGORIES = ['Technology', 'Design', 'Business'];
type BlogStatus = 'Published' | 'Draft' | 'Review';

interface Blog {
    id: number;
    title: string;
    category: string;
    image: string;
    date: string;
    excerpt: string;
    content: string;
    status: BlogStatus; // New field
}

// Random topics per category for the "Daily Batch" feature
const topicIdeas: Record<string, string[]> = {
    'Technology': [
        "The Rise of Quantum Computing", "Web Assembly vs JavaScript", "AI in Cybersecurity", "The Future of 5G"
    ],
    'Design': [
        "Minimalism in 2025", "Micro-interactions that convert", "Color Theory for Dark Mode", "Typography Trends"
    ],
    'Business': [
        "Scaling SaaS Products", "Remote Work Culture", "Digital Marketing ROI", "Startup Funding Guide"
    ]
};

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
        category: 'Technology',
        image: '',
        date: new Date().toISOString().split('T')[0], // Default to today YYYY-MM-DD
        excerpt: '',
        content: '',
        status: 'Draft'
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        // Ensure your Supabase table has a 'status' column. If not, this might default to null/undefined.
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching blogs:', error);
            if (error.message.includes('relation "public.blogs" does not exist')) {
                alert("Table 'blogs' not found. Please run the setup SQL script in Supabase.");
            }
        }
        else {
            // Normalize data to include status if missing
            const normalizedData = (data || []).map((b: any) => ({
                ...b,
                status: b.status || 'Published' 
            }));
            setBlogs(normalizedData);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        // Use the date from the form directly (YYYY-MM-DD). 
        // Supabase DATE type accepts this format perfectly.
        const blogData = {
            ...currentBlog,
            date: currentBlog.date 
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
            console.error("Save Error:", error);
            alert(`Error saving blog: ${error.message || 'Unknown error'}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this post?')) return;
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) alert(`Error deleting blog: ${error.message}`);
        else fetchBlogs();
    };

    // --- AI LOGIC ---

    const checkApiKey = async () => {
        if ((window as any).aistudio) {
            const hasKey = await (window as any).aistudio.hasSelectedApiKey();
            if (!hasKey) {
                await (window as any).aistudio.openSelectKey();
            }
        }
    };

    const generateSinglePost = async (category: string, specificTopic?: string) => {
        const topic = specificTopic || topicIdeas[category][Math.floor(Math.random() * topicIdeas[category].length)];
        
        // 1. Text Generation
        const aiData = await generateBlogPost(topic, category);
        
        // 2. Image Generation
        const encodedPrompt = encodeURIComponent(aiData.imagePrompt + " high quality, 4k, trending on artstation, futuristic, sleek, tech, minimal");
        const aiImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

        return {
            title: aiData.title,
            excerpt: aiData.excerpt,
            content: aiData.content,
            category: category,
            image: aiImageUrl,
            date: new Date().toISOString().split('T')[0],
            status: 'Draft' as BlogStatus // Auto-generated posts start as Drafts for safety
        };
    };

    const handleAIGenerate = async () => {
        setIsGenerating(true);
        try {
            await checkApiKey();
            const category = currentBlog.category || 'Technology';
            const generatedData = await generateSinglePost(category, aiTopic);

            setCurrentBlog({
                ...currentBlog,
                ...generatedData
            });

        } catch (error: any) {
            console.error("AI Generation Error:", error);
            alert(`Generation failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    // Generates 1 post for EACH category automatically
    const handleDailyBatch = async () => {
        setIsGenerating(true);
        setBatchProgress('Starting daily batch...');
        try {
            await checkApiKey();

            for (const cat of CATEGORIES) {
                setBatchProgress(`Generating ${cat} post...`);
                const newPost = await generateSinglePost(cat);
                
                // Save directly to Supabase
                const { error } = await supabase.from('blogs').insert([newPost]);
                if (error) console.error(`Failed to save ${cat} post`, error);
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

    // --- UI HELPERS ---

    const resetForm = () => {
        setCurrentBlog({ 
            category: 'Technology',
            status: 'Draft',
            date: new Date().toISOString().split('T')[0]
        });
        setAiTopic('');
    };

    const openEdit = (blog: Blog) => {
        // Ensure date is in YYYY-MM-DD for input
        let formattedDate = blog.date;
        // If date comes back as something else, try to parse it
        if (blog.date && !blog.date.includes('-')) {
             const dateObj = new Date(blog.date);
             if (!isNaN(dateObj.getTime())) {
                 formattedDate = dateObj.toISOString().split('T')[0];
             }
        }

        setCurrentBlog({
            ...blog,
            date: formattedDate
        });
        setIsEditing(true);
    };

    const openNew = () => {
        resetForm();
        setIsEditing(true);
    };

    const filteredBlogs = blogs.filter(b => filterStatus === 'All' || b.status === filterStatus);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Published': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            default: return 'bg-slate-700/50 text-slate-400 border-slate-600'; // Draft
        }
    };

    if (isEditing) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-xl font-bold text-white">{currentBlog.id ? 'Edit Post' : 'New Post'}</h3>
                    
                    {/* AI Generator Controls (Only for new or manual trigger) */}
                    <div className="flex items-center gap-2 bg-slate-950 border border-purple-500/30 p-2 rounded-xl">
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
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <><LoaderIcon className="w-4 h-4 animate-spin" /> Generating...</>
                            ) : (
                                <><StarIcon className="w-4 h-4" /> AI Fill</>
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
                        </div>
                        
                        {/* Status & Date */}
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
                            <label className="text-xs font-bold text-slate-500 uppercase">Cover Image URL</label>
                            <input 
                                placeholder="https://..." 
                                value={currentBlog.image || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Short Excerpt</label>
                            <textarea 
                                placeholder="Brief summary for the card..." 
                                rows={4} 
                                value={currentBlog.excerpt || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Image Preview</label>
                            <div className="relative h-32 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                                {currentBlog.image ? (
                                    <img src={currentBlog.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-slate-600 text-xs">No Image</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Full Content (HTML Supported)</label>
                        <textarea 
                            placeholder="<p>Write your blog content here...</p>" 
                            rows={15} 
                            value={currentBlog.content || ''} 
                            onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} 
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm focus:border-cyan-500 outline-none" 
                        />
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-4 border-t border-slate-800 pt-6">
                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 text-slate-400 hover:text-white transition-colors">Discard</button>
                    <PremiumButton onClick={handleSave} icon={false} className="!px-8 !py-3">
                        {currentBlog.status === 'Published' ? 'Publish Now' : 'Save as Draft'}
                    </PremiumButton>
                </div>
            </motion.div>
        );
    }

    return (
        <div>
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-white">Manage Blog Content</h2>
                    <p className="text-slate-500 text-sm">Create, edit, or auto-generate posts.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {/* Daily Batch Button */}
                    <button 
                        onClick={handleDailyBatch}
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-orange-500/20"
                    >
                        {isGenerating && batchProgress ? (
                            <><LoaderIcon className="w-4 h-4 animate-spin" /> {batchProgress}</>
                        ) : (
                            <><LightbulbIcon className="w-4 h-4" /> Generate Daily Bundle</>
                        )}
                    </button>

                    <PremiumButton onClick={openNew} icon={true} className="!px-6 !py-2 text-sm">New Post</PremiumButton>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-slate-800 mb-6 space-x-6 overflow-x-auto">
                {(['All', 'Published', 'Draft', 'Review'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`pb-3 text-sm font-bold relative transition-colors ${filterStatus === status ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}
                    >
                        {status}
                        {filterStatus === status && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                        )}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
                    <LoaderIcon className="w-8 h-8 animate-spin text-cyan-500" />
                    <p>Loading posts...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredBlogs.map(blog => (
                        <div key={blog.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-6 hover:border-purple-500/30 transition-colors group">
                            
                            {/* Image Thumbnail */}
                            <div className="w-full sm:w-24 h-24 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-800">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700"><LightbulbIcon className="w-6 h-6"/></div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center sm:text-left w-full">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getStatusColor(blog.status)}`}>
                                        {blog.status || 'Draft'}
                                    </span>
                                    <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                                        {blog.category}
                                    </span>
                                    <span className="text-xs text-slate-500">{new Date(blog.date).toLocaleDateString()}</span>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1 line-clamp-1 group-hover:text-cyan-400 transition-colors">{blog.title}</h4>
                                <p className="text-slate-400 text-sm line-clamp-2">{blog.excerpt}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 w-full sm:w-auto justify-center">
                                <button onClick={() => openEdit(blog)} className="px-4 py-2 bg-slate-950 text-white border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">Edit</button>
                                <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors">Delete</button>
                            </div>
                        </div>
                    ))}
                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
                            <p className="text-slate-500 mb-4">No {filterStatus !== 'All' ? filterStatus.toLowerCase() : ''} blog posts found.</p>
                            <button onClick={openNew} className="text-cyan-400 hover:underline text-sm font-bold">Create your first post</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
