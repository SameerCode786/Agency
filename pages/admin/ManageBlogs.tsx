
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';

interface Blog {
    id: number;
    title: string;
    category: string;
    image: string;
    date: string;
    excerpt: string;
    content: string;
}

const ManageBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form State
    const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({
        title: '',
        category: '',
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
        if (currentBlog.id) {
            const { error } = await supabase.from('blogs').update(currentBlog).eq('id', currentBlog.id);
            if (error) alert('Error updating blog');
        } else {
            const { error } = await supabase.from('blogs').insert([currentBlog]);
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

    const resetForm = () => {
        setCurrentBlog({});
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
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">{currentBlog.id ? 'Edit Post' : 'New Post'}</h3>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">Cancel</button>
                </div>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Title" value={currentBlog.title || ''} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <input placeholder="Category" value={currentBlog.category || ''} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Date (e.g. Oct 12, 2024)" value={currentBlog.date || ''} onChange={e => setCurrentBlog({...currentBlog, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <input placeholder="Image URL" value={currentBlog.image || ''} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                    </div>
                    <textarea placeholder="Short Excerpt" rows={3} value={currentBlog.excerpt || ''} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                    <textarea placeholder="Full Content (Markdown or HTML)" rows={10} value={currentBlog.content || ''} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm" />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <PremiumButton onClick={handleSave} icon={false} className="!px-8 !py-3">Save Post</PremiumButton>
                </div>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex justify-end mb-6">
                <PremiumButton onClick={openNew} icon={true} className="!px-6 !py-2 text-sm">Add New Post</PremiumButton>
            </div>

            {loading ? (
                <div className="text-center text-slate-500 py-10">Loading posts...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500/30 transition-colors">
                            <div className="w-16 h-16 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
                                {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">{blog.title}</h4>
                                <p className="text-slate-500 text-sm">{blog.category} • {blog.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(blog)} className="px-3 py-1.5 bg-slate-900 text-cyan-400 rounded-lg text-xs font-bold hover:bg-cyan-500/20">Edit</button>
                                <button onClick={() => handleDelete(blog.id)} className="px-3 py-1.5 bg-slate-900 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20">Delete</button>
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && <p className="text-slate-500 text-center">No blog posts found.</p>}
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
