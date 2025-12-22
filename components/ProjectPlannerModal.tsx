
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RocketIcon, ArrowRightIcon, CheckIcon } from './Icons';
import { supabase } from '../services/supabaseClient';
// Added PremiumButton import to fix "Cannot find name 'PremiumButton'" errors on lines 204, 206, and 208.
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
        services: [] as string[],
        budget: '',
        timeline: '',
        briefing: ''
    });

    const servicesList = [
        "Website Development",
        "Mobile App Development",
        "SEO Optimization",
        "E-commerce / Shopify",
        "WordPress Customization",
        "UI/UX Design"
    ];

    const budgetRanges = ["$3k - $5k", "$5k - $10k", "$10k - $20k", "$20k+"];
    const timelineOptions = ["ASAP", "1 - 2 Months", "3 - 6 Months", "Flexible"];

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const finalMessage = `
[PROJECT BLUEPRINT]
Services: ${formData.services.join(', ')}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
Vision: ${formData.briefing}
            `.trim();

            const { error } = await supabase.from('contact_inquiries').insert([
                { 
                    name: formData.name, 
                    email: formData.email, 
                    message: finalMessage,
                    source: 'Strategic Project Planner'
                }
            ]);
            if (error) throw error;
            alert("Mission Initialized! Your blueprint has been sent to our lab. We'll be in touch within 24 hours.");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Transmission failed. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-5xl bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-2xl min-h-[650px]"
                    >
                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-6 right-8 z-50 text-slate-500 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Left Info Panel */}
                        <div className="w-full md:w-[35%] bg-gradient-to-b from-indigo-900/20 to-transparent p-10 flex flex-col border-r border-white/5">
                            <div className="mb-12">
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tighter uppercase">
                                    Project <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Blueprint</span>
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed">Step {step} of 4: Define your digital mission.</p>
                            </div>

                            <div className="mt-auto space-y-8 relative">
                                <div className="absolute left-5 top-4 bottom-4 w-px bg-slate-800"></div>
                                {[
                                    { n: 1, t: "Identity", s: "Basic Info" },
                                    { n: 2, t: "Capability", s: "Services Required" },
                                    { n: 3, t: "Logistics", s: "Budget & Time" },
                                    { n: 4, t: "The Vision", s: "Briefing" }
                                ].map((item) => (
                                    <div key={item.n} className={`flex items-center gap-5 relative z-10 transition-opacity duration-300 ${step >= item.n ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border transition-all ${step >= item.n ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)] text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                                            {step > item.n ? <CheckIcon className="w-5 h-5" /> : item.n}
                                        </div>
                                        <div>
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">{item.t}</p>
                                            <p className="text-slate-500 text-[10px] uppercase font-bold">{item.s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content Panel */}
                        <div className="flex-1 p-10 md:p-16 flex flex-col relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Who are we working with?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                                <input type="text" placeholder="Sameer..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                                <input type="email" placeholder="hello@..." value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">What can we help you with?</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {servicesList.map(service => (
                                                <button
                                                    key={service}
                                                    onClick={() => handleServiceToggle(service)}
                                                    className={`p-4 rounded-xl border text-left text-sm font-bold transition-all flex items-center justify-between group ${formData.services.includes(service) ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                                                >
                                                    {service}
                                                    {formData.services.includes(service) && <CheckIcon className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Project Investment</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {budgetRanges.map(range => (
                                                    <button key={range} onClick={() => setFormData({...formData, budget: range})} className={`px-6 py-3 rounded-full border text-xs font-black uppercase transition-all ${formData.budget === range ? 'bg-white text-black border-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-white'}`}>{range}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Target Timeline</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {timelineOptions.map(time => (
                                                    <button key={time} onClick={() => setFormData({...formData, timeline: time})} className={`px-6 py-3 rounded-full border text-xs font-black uppercase transition-all ${formData.timeline === time ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-white'}`}>{time}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The Vision Briefing</h3>
                                        <textarea 
                                            rows={8}
                                            placeholder="Tell us everything about the project, its goals, and your inspiration..."
                                            value={formData.briefing}
                                            onChange={e => setFormData({...formData, briefing: e.target.value})}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white focus:border-cyan-500 outline-none transition-all resize-none text-sm leading-relaxed"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Controls */}
                            <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/5">
                                <button onClick={prevStep} disabled={step === 1} className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-white'}`}>
                                    <ArrowRightIcon className="w-4 h-4 rotate-180" /> Back
                                </button>
                                
                                {step < 4 ? (
                                    <PremiumButton onClick={nextStep} icon={true} className="!px-8 !py-3 text-sm">Continue</PremiumButton>
                                ) : (
                                    <PremiumButton onClick={handleSubmit} disabled={isSubmitting} icon={false} className="!px-10 !py-4 shadow-indigo-500/30">
                                        {isSubmitting ? "Initializing..." : "Launch Project Blueprint"}
                                    </PremiumButton>
                                )}
                            </div>
                        </div>

                        {/* Background Ornament */}
                        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-80 bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectPlannerModal;
