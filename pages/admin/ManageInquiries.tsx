
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion } from 'framer-motion';
import { LoaderIcon, SearchIcon, EmailIcon, PhoneIcon } from '../../components/Icons';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    source: string;
    message: string;
    newsletter: boolean;
    created_at: string;
}

const ManageInquiries: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching inquiries:', error);
        } else {
            setInquiries(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this inquiry?')) return;
        const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
        if (error) alert('Error deleting inquiry');
        else setInquiries(prev => prev.filter(i => i.id !== id));
    };

    const filteredInquiries = inquiries.filter(i => 
        i.name.toLowerCase().includes(filter.toLowerCase()) || 
        i.email.toLowerCase().includes(filter.toLowerCase()) ||
        i.message.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <EmailIcon className="w-6 h-6 text-cyan-400" />
                    Client Inquiries
                </h2>
                <div className="relative w-full md:w-64">
                    <input 
                        type="text" 
                        placeholder="Filter messages..." 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <LoaderIcon className="w-10 h-10 animate-spin text-cyan-400" />
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredInquiries.map(inquiry => (
                        <motion.div 
                            key={inquiry.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-3 mb-2">
                                        <h4 className="text-xl font-bold text-white">{inquiry.name}</h4>
                                        <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                            {new Date(inquiry.created_at).toLocaleString()}
                                        </span>
                                        {inquiry.newsletter && (
                                            <span className="text-[10px] font-bold uppercase bg-cyan-900/40 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/30">
                                                Newsletter Opt-in
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                        <a href={`mailto:${inquiry.email}`} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                                            <EmailIcon className="w-4 h-4" /> {inquiry.email}
                                        </a>
                                        {inquiry.phone && (
                                            <a href={`tel:${inquiry.phone}`} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                                                <PhoneIcon className="w-4 h-4" /> {inquiry.phone}
                                            </a>
                                        )}
                                        <span className="flex items-center gap-1.5">
                                            <SearchIcon className="w-4 h-4" /> Source: {inquiry.source}
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(inquiry.id)}
                                    className="text-red-400 hover:text-red-300 text-xs px-4 py-2 rounded-xl bg-red-900/10 border border-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Delete Inquiry
                                </button>
                            </div>
                            
                            <div className="bg-slate-950/50 border border-slate-800/50 p-6 rounded-xl relative">
                                <div className="absolute top-0 right-6 -translate-y-1/2 text-slate-800 text-4xl font-serif">“</div>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                    {inquiry.message}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    
                    {filteredInquiries.length === 0 && (
                        <div className="text-center py-20 text-slate-500 bg-slate-950/30 rounded-3xl border border-dashed border-slate-800">
                            <EmailIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No inquiries found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageInquiries;
