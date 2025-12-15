
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import ManageProjects from './ManageProjects';
import ManageBlogs from './ManageBlogs';
import ManageEmails from './ManageEmails';
import ManageComments from './ManageComments';
import ManageAIArchitect from './ManageAIArchitect';
import { LayersIcon, CodeIcon, ArrowRightIcon, EyeIcon, EyeOffIcon, EmailIcon, MessageIcon, BrainIcon } from '../../components/Icons';

const AdminDashboard: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'emails' | 'comments' | 'architect'>('projects');
    const [error, setError] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(34,211,238,0.1),transparent)] pointer-events-none"></div>
                <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
                        <p className="text-slate-400 text-sm">Sameer Digital Lab</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-6" autoComplete="on">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email</label>
                            <input 
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                             <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Password</label>
                             <div className="relative">
                                 <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white focus:outline-none"
                                >
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                             </div>
                        </div>
                        
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Enter Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const getTitle = () => {
        switch(activeTab) {
            case 'projects': return 'Manage Portfolio';
            case 'blogs': return 'Manage Blog Posts';
            case 'emails': return 'Email Marketing';
            case 'comments': return 'Manage Comments';
            case 'architect': return 'AI Website Architect';
            default: return 'Dashboard';
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-20">
                <div className="h-24 flex items-center justify-center border-b border-slate-800">
                     <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hidden lg:block">Admin.</span>
                     <span className="text-2xl font-bold text-cyan-400 lg:hidden">A.</span>
                </div>
                
                <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
                    <button 
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <LayersIcon className="w-5 h-5" />
                        <span className="hidden lg:block font-medium">Projects</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('blogs')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blogs' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <CodeIcon className="w-5 h-5" />
                         <span className="hidden lg:block font-medium">Blogs</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('comments')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'comments' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <MessageIcon className="w-5 h-5" />
                         <span className="hidden lg:block font-medium">Comments</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('emails')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'emails' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <EmailIcon className="w-5 h-5" />
                         <span className="hidden lg:block font-medium">Emails</span>
                    </button>
                    <div className="my-2 border-t border-slate-800"></div>
                    <button 
                        onClick={() => setActiveTab('architect')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'architect' ? 'bg-purple-500/10 text-purple-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <BrainIcon className="w-5 h-5" />
                         <span className="hidden lg:block font-medium">AI Architect</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors w-full justify-center lg:justify-start"
                    >
                        <ArrowRightIcon className="w-4 h-4 rotate-180" />
                        <span className="hidden lg:block">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-20 lg:ml-64 p-8 relative">
                 <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {getTitle()}
                            </h1>
                            <p className="text-slate-400">
                                {activeTab === 'emails' ? 'Send bulk updates to your subscribers.' : 
                                 activeTab === 'architect' ? 'Generate website structures and visuals with AI.' :
                                 'Manage content and interactions.'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 min-h-[600px]">
                        {activeTab === 'projects' && <ManageProjects />}
                        {activeTab === 'blogs' && <ManageBlogs />}
                        {activeTab === 'emails' && <ManageEmails />}
                        {activeTab === 'comments' && <ManageComments />}
                        {activeTab === 'architect' && <ManageAIArchitect />}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
