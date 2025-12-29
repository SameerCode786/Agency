
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    RocketIcon, 
    ArrowRightIcon, 
    CheckIcon, 
    WireframeGlobeIcon, 
    BrainIcon, 
    CodeIcon, 
    TargetIcon,
    SearchIcon,
    MobileIcon,
    WordPressIcon
} from './Icons';
import { supabase } from '../services/supabaseClient';
import PremiumButton from './PremiumButton';

interface ProjectPlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProjectPlannerModal: React.FC<ProjectPlannerModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        module: '', // Single target module as per image
        budget: '',
        briefing: ''
    });

    const modules = [
        { id: 'web', name: 'Web Dev', icon: <WireframeGlobeIcon className="w-6 h-6" /> },
        { id: 'seo', name: 'SEO Opt', icon: <SearchIcon className="w-6 h-6" /> },
        { id: 'app', name: 'App Dev', icon: <MobileIcon className="w-6 h-6" /> },
        { id: 'wp', name: 'WordPress', icon: <WordPressIcon className="w-6 h-6" /> }
    ];

    const budgetRanges = ["< $1k", "$1k - $5k", "$5k - $10k", "$10k+"];

    const handleModuleSelect = (id: string) => {
        setFormData(prev => ({ ...prev, module: id }));
    };

    const handleBudgetSelect = (range: string) => {
        setFormData(prev => ({ ...prev, budget: range }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.briefing) {
            alert("Please fill in your details and briefing.");
            return;
        }

        setIsSubmitting(true);
        try {
            const finalMessage = `
[MISSION INITIALIZED: PROJECT BLUEPRINT]
Target Module: ${formData.module}
Resource Allocation: ${formData.budget}
Mission Briefing: ${formData.briefing}
            `.trim();

            const { error } = await supabase.from('contact_inquiries').insert([
                { 
                    name: formData.name, 
                    email: formData.email, 
                    message: finalMessage,
                    source: 'Epic Blueprint Builder'
                }
            ]);
            if (error) throw error;
            alert("Transmission Successful! Mission initialized.");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Uplink failed. Check connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)] min-h-[600px]"
                    >
                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-6 right-8 z-[110] text-slate-600 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* LEFT SIDE: BRANDING & PROGRESS */}
                        <div className="w-full md:w-[40%] bg-gradient-to-br from-slate-900/40 to-black p-10 lg:p-14 flex flex-col border-r border-white/5">
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest mb-10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    System Ready
                                </div>
                                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-[0.9] tracking-tighter">
                                    Let's Build <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Something Epic</span>
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                                    Fill out the briefing to initialize our collaboration. I typically respond within 24 hours.
                                </p>
                            </div>

                            <div className="mt-auto space-y-12 relative">
                                {/* Vertical Progress Line */}
                                <div className="absolute left-5 top-4 bottom-4 w-px bg-slate-800"></div>
                                
                                <div className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${step === 1 ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border transition-all ${step === 1 ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.5)] text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                        1
                                    </div>
                                    <span className="text-white text-sm font-bold tracking-tight">Project Scope</span>
                                </div>

                                <div className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${step === 2 ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border transition-all ${step === 2 ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.5)] text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                        2
                                    </div>
                                    <span className="text-white text-sm font-bold tracking-tight">Your Details</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: INTERACTIVE FORM */}
                        <div className="flex-1 p-10 lg:p-14 flex flex-col bg-[#050505]">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div 
                                        key="step1" 
                                        initial={{ opacity: 0, x: 20 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        exit={{ opacity: 0, x: -20 }} 
                                        className="space-y-10"
                                    >
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">01 // SELECT TARGET MODULE</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {modules.map(mod => (
                                                    <button
                                                        key={mod.id}
                                                        onClick={() => handleModuleSelect(mod.id)}
                                                        className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-4 group ${formData.module === mod.id ? 'bg-white/5 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                                                    >
                                                        <div className={`transition-colors duration-300 ${formData.module === mod.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                                            {mod.icon}
                                                        </div>
                                                        <span className={`text-sm font-bold ${formData.module === mod.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                            {mod.name}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">02 // RESOURCE ALLOCATION</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {budgetRanges.map(range => (
                                                    <button 
                                                        key={range} 
                                                        onClick={() => handleBudgetSelect(range)}
                                                        className={`py-4 px-2 rounded-xl border text-[11px] font-black uppercase transition-all duration-300 ${formData.budget === range ? 'bg-white/10 border-white/40 text-white shadow-xl' : 'bg-white/[0.02] border-white/5 text-slate-600 hover:text-slate-400'}`}
                                                    >
                                                        {range}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-10 flex justify-end">
                                            <button 
                                                onClick={() => formData.module && formData.budget && setStep(2)}
                                                disabled={!formData.module || !formData.budget}
                                                className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all ${formData.module && formData.budget ? 'bg-white text-black hover:bg-cyan-400 shadow-xl' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}
                                            >
                                                Next Step <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="step2" 
                                        initial={{ opacity: 0, x: 20 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        exit={{ opacity: 0, x: -20 }} 
                                        className="space-y-8 flex flex-col h-full"
                                    >
                                        <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 mb-2">
                                            <ArrowRightIcon className="w-3 h-3 rotate-180" /> Back to Scope
                                        </button>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Name</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="John Doe" 
                                                    value={formData.name} 
                                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                                    className="w-full bg-[#111] border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Channel (Email)</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="john@example.com" 
                                                    value={formData.email} 
                                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                                    className="w-full bg-[#111] border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800" 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 flex-grow">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Mission Briefing</label>
                                            <textarea 
                                                rows={5}
                                                placeholder="Briefly describe your project goals..."
                                                value={formData.briefing}
                                                onChange={e => setFormData({...formData, briefing: e.target.value})}
                                                className="w-full bg-[#111] border border-white/5 rounded-[1.5rem] p-6 text-white focus:border-cyan-500 outline-none transition-all resize-none text-sm leading-relaxed placeholder:text-slate-800"
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <motion.button 
                                                onClick={handleSubmit} 
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 rounded-2xl text-white font-black text-lg uppercase tracking-widest shadow-[0_15px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_50px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? "Uplinking..." : (
                                                    <>Launch Project <RocketIcon className="w-6 h-6" /></>
                                                )}
                                            </motion.button>
                                            <p className="text-center text-[10px] text-slate-700 mt-6 font-bold uppercase tracking-widest">By submitting, you agree to the encrypted transmission of your data.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectPlannerModal;
