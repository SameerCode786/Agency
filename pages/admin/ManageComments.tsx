
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { MessageIcon, CheckIcon } from '../../components/Icons';

interface Comment {
    id: number;
    blog_id: number;
    name: string;
    email: string;
    website?: string;
    content: string;
    admin_reply?: string;
    created_at: string;
    blog_title?: string; // Joined manually or via query
}

const ManageComments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        setLoading(true);
        // Assuming we want to show all comments. 
        // Note: Supabase join syntax depends on foreign key setup. 
        // For simplicity, we'll fetch comments and then manually match or just show ID if join fails.
        const { data: commentsData, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(commentsData || []);
        }
        setLoading(false);
    };

    const handleReplySubmit = async (commentId: number) => {
        if (!replyText.trim()) return;

        const { error } = await supabase
            .from('comments')
            .update({ admin_reply: replyText })
            .eq('id', commentId);

        if (error) {
            alert('Error sending reply');
        } else {
            // Update local state
            setComments(prev => prev.map(c => c.id === commentId ? { ...c, admin_reply: replyText } : c));
            setReplyingTo(null);
            setReplyText('');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this comment?')) return;
        const { error } = await supabase.from('comments').delete().eq('id', id);
        if (error) alert('Error deleting comment');
        else setComments(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageIcon className="w-6 h-6 text-cyan-400" />
                    Reader Comments
                </h2>
                <button onClick={fetchComments} className="text-sm text-cyan-400 hover:underline">Refresh</button>
            </div>

            {loading ? (
                <div className="text-center text-slate-500 py-10">Loading comments...</div>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <motion.div 
                            key={comment.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-white font-bold">{comment.name}</h4>
                                        <span className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2">On Blog ID: <span className="text-cyan-400">{comment.blog_id}</span></p>
                                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                                        "{comment.content}"
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(comment.id)}
                                    className="text-red-400 hover:text-red-300 text-xs px-3 py-1 rounded bg-red-900/10 border border-red-900/20"
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Admin Reply Section */}
                            <div className="mt-4 pt-4 border-t border-slate-800">
                                {comment.admin_reply ? (
                                    <div className="flex gap-3">
                                        <div className="w-1 bg-green-500 rounded-full"></div>
                                        <div>
                                            <span className="text-xs font-bold text-green-400 uppercase flex items-center gap-1">
                                                <CheckIcon className="w-3 h-3"/> Replied
                                            </span>
                                            <p className="text-slate-400 text-sm mt-1">{comment.admin_reply}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {replyingTo === comment.id ? (
                                            <div className="space-y-3">
                                                <textarea 
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Write your reply..."
                                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                                                    rows={3}
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => setReplyingTo(null)}
                                                        className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <PremiumButton 
                                                        onClick={() => handleReplySubmit(comment.id)} 
                                                        icon={false} 
                                                        className="!px-4 !py-2 !text-xs"
                                                    >
                                                        Send Reply
                                                    </PremiumButton>
                                                </div>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => {
                                                    setReplyingTo(comment.id);
                                                    setReplyText('');
                                                }}
                                                className="text-cyan-400 text-sm font-bold hover:underline flex items-center gap-1"
                                            >
                                                <MessageIcon className="w-4 h-4" /> Reply
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    
                    {comments.length === 0 && (
                        <div className="text-center py-10 text-slate-500">
                            No comments found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageComments;
