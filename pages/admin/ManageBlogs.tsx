
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { generateBlogPost } from '../../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { LightbulbIcon, StarIcon, LoaderIcon } from '../../components/Icons';

interface Blog {
    id: number;
    title: string;
    category: string;
    image: string;
    date: string;
    excerpt: string;
    content: string;
}

// Random topics to simulate "Daily" automation if user leaves topic empty
const randomTopics = [
    "The Future of AI in Web Design",
    "Why React Native is Best for Mobile Apps",
    "How to Optimize Shopify Stores for Sales",
    "SEO Strategies for 2025",
    "The Importance of UI/UX in SaaS Products",
    "Headless CMS vs Traditional WordPress",
    "Cybersecurity Tips for Modern Websites"
];

const ManageBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // AI State
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiTopic, setAiTopic] = useState('');
    
    // Form State
    const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({
        title: '',
        category: 'Technology',
        image: '',
        date: '',
        excerpt: '',
        content: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching blogs:', error);
        else setBlogs(data || []);
        setLoading(false);
    };

    const handleSave = async () => {
        // Auto-fill date if missing
        const blogData = {
            ...currentBlog,
            date: currentBlog.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        if (currentBlog.id) {
            const { error } = await supabase.from('blogs').update(blogData).eq('id', currentBlog.id);
            if (error) alert('Error updating blog');
        } else {
            const { error } = await supabase.from('blogs').insert([blogData]);
            if (error) alert('Error creating blog');
        }

        setIsEditing(false);
        fetchBlogs();
        resetForm();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this post?')) return;
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) alert('Error deleting blog');
        else fetchBlogs();
    };

    const handleAIGenerate = async () => {
        setIsGenerating(true);
        try {
            // 1. Pick topic (User input OR Random)
            const topic = aiTopic || randomTopics[Math.floor(Math.random() * randomTopics.length)];
            
            // 2. Call Gemini for Text
            const aiData = await generateBlogPost(topic, currentBlog.category || 'Technology');
            
            // 3. Generate Image URL using Pollinations.ai (Free, Fast, No Key needed)
            // We use the 'imagePrompt' from Gemini to get a specific visual
            const encodedPrompt = encodeURIComponent(aiData.imagePrompt + " high quality, 4k, trending on artstation, futuristic, sleek");
            const aiImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

            // 4. Update Form
            setCurrentBlog({
                ...currentBlog,
                title: aiData.title,
                excerpt: aiData.excerpt,
                content: aiData.content,
                category: aiData.category,
                image: aiImageUrl,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });

        } catch (error) {
            console.error(error);
            alert("Failed to generate blog. Check API Key configuration.");
        } finally {
            setIsGenerating(false);
        }
    };

    const resetForm = () => {
        setCurrentBlog({ category: 'Technology' });
        setAiTopic('');
    };

    const openEdit = (blog: Blog) => {
        setCurrentBlog(blog);
        setIsEditing(true);
    };

    const openNew = () => {
        resetForm();
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-xl font-bold text-white">{currentBlog.id ? 'Edit Post' : 'New Post'}</h3>
                    
                    {/* AI Generator Controls */}
                    {!currentBlog.id && (
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
                                    <>
                                        <LoaderIcon className="w-4 h-4 animate-spin" /> Generating...
                                    </>
                                ) : (
                                    <>
                                        <StarIcon className="w-4 h-4" /> Auto-Generate
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white text-sm">Cancel</button>
                </div>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase">Blog Title</label>
                            <input 
                                placeholder="Title" 
                                value={currentBlog.title || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                            <input 
                                placeholder="Technology, Design, Business..." 
                                value={currentBlog.category || ''} 
                                onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                            />
                        </div>
                    </div>

                    {/* Image Preview & Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Cover Image URL</label>
                            <div className="flex gap-2">
                                <input 
                                    placeholder="https://..." 
                                    value={currentBlog.image || ''} 
                                    onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} 
                                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                                />
                            </div>
                            <p className="text-[10px] text-slate-500">AI automatically generates a unique image here.</p>
                        </div>
                        <div className="relative h-32 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                            {currentBlog.image ? (
                                <img src={currentBlog.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-slate-600 text-xs">Image Preview</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Short Excerpt</label>
                        <textarea 
                            placeholder="Brief summary for the card..." 
                            rows={3} 
                            value={currentBlog.excerpt || ''} 
                            onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} 
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" 
                        />
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
                
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 text-slate-400 hover:text-white transition-colors">Discard</button>
                    <PremiumButton onClick={handleSave} icon={false} className="!px-8 !py-3">Save & Publish</PremiumButton>
                </div>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-white">Your Blog Posts</h2>
                    <p className="text-slate-500 text-sm">Manage your content or let AI write for you.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => { openNew(); handleAIGenerate(); }}
                        className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                        <StarIcon className="w-4 h-4" /> Quick Auto-Generate
                    </button>
                    <PremiumButton onClick={openNew} icon={true} className="!px-6 !py-2 text-sm">Add Manually</PremiumButton>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
                    <LoaderIcon className="w-8 h-8 animate-spin text-cyan-500" />
                    <p>Loading posts...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-6 hover:border-purple-500/30 transition-colors group">
                            <div className="w-full sm:w-24 h-24 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 relative">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700"><LightbulbIcon className="w-6 h-6"/></div>
                                )}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                    <span className="text-[10px] uppercase font-bold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">{blog.category}</span>
                                    <span className="text-xs text-slate-500">{blog.date}</span>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1 line-clamp-1">{blog.title}</h4>
                                <p className="text-slate-400 text-sm line-clamp-2">{blog.excerpt}</p>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto justify-center">
                                <button onClick={() => openEdit(blog)} className="px-4 py-2 bg-slate-950 text-white border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">Edit</button>
                                <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors">Delete</button>
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                            <p className="text-slate-500 mb-4">No blog posts found.</p>
                            <button onClick={openNew} className="text-cyan-400 hover:underline text-sm">Create your first post</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
