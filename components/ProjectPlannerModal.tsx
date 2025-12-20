
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RocketIcon, ArrowRightIcon } from './Icons';
import { supabase } from '../services/supabaseClient';

interface ProjectPlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProjectPlannerModal: React.FC<ProjectPlannerModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(2); // Starting at step 2 as per user's screenshot
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        briefing: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.briefing) {
            alert("Please fill in all identity fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('contact_inquiries').insert([
                { 
                    name: formData.name, 
                    email: formData.email, 
                    message: `[PROJECT PLANNER] ${formData.briefing}`,
                    source: 'Project Planner Modal'
                }
            ]);
            if (error) throw error;
            alert("Mission Initialized! We'll contact you within 24 hours.");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Transmission failed. Please check your signal.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#0a0a0c] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-[600px]"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-8 z-50 text-slate-500 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Left Sidebar - Progress */}
                        <div className="w-full md:w-[35%] bg-gradient-to-b from-slate-900/50 to-transparent p-10 flex flex-col border-r border-white/5">
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest mb-8">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    System Ready
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tighter">
                                    Let's Build <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Something Epic</span>
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
                                    Fill out the briefing to initialize our collaboration. I typically respond within 24 hours.
                                </p>
                            </div>

                            <div className="mt-auto space-y-12 relative">
                                {/* Vertical Connecting Line */}
                                <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-800"></div>

                                <div className="flex items-center gap-6 relative group opacity-50">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-black text-sm border border-slate-700">1</div>
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Project Scope</span>
                                </div>

                                <div className="flex items-center gap-6 relative group">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm border border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.4)]">2</div>
                                    <span className="text-white font-bold uppercase tracking-widest text-xs">Your Details</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Form */}
                        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                            <div className="mb-10">
                                <button className="text-slate-500 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-8 transition-colors">
                                    <ArrowRightIcon className="w-4 h-4 rotate-180" /> Back to Scope
                                </button>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Identity Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700" 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Comms Channel (Email)</label>
                                        <input 
                                            type="email" 
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Mission Briefing</label>
                                    <textarea 
                                        rows={6}
                                        placeholder="Briefly describe your project goals..."
                                        value={formData.briefing}
                                        onChange={(e) => setFormData({...formData, briefing: e.target.value})}
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700 resize-none leading-relaxed"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Initializing...' : 'Launch Project'}
                                    <RocketIcon className="w-5 h-5" />
                                </button>
                                <p className="text-center text-[10px] text-slate-600 mt-6 uppercase tracking-wider">
                                    By submitting, you agree to the encrypted transmission of your data.
                                </p>
                            </div>
                        </div>

                        {/* Visual Glow Ornament */}
                        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-80 bg-purple-500/20 blur-[100px] pointer-events-none"></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectPlannerModal;
