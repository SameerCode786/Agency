
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    RocketIcon, 
    ArrowRightIcon, 
    CheckIcon, 
    WireframeGlobeIcon, 
    SearchIcon,
    MobileIcon,
    WordPressIcon,
    ShoppingCartIcon
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        startDate: '',
        endDate: '',
        services: [] as string[],
        minBudget: '200',
        maxBudget: '400',
        summary: '',
        fileName: ''
    });

    const servicesList = [
      { id: 'web', name: 'Web Dev', icon: <WireframeGlobeIcon className="w-5 h-5" /> },
      { id: 'seo', name: 'SEO Opt', icon: <SearchIcon className="w-5 h-5" /> },
      { id: 'app', name: 'App Dev', icon: <MobileIcon className="w-5 h-5" /> },
      { id: 'wp', name: 'WordPress', icon: <WordPressIcon className="w-5 h-5" /> },
      { id: 'shopify', name: 'Shopify', icon: <ShoppingCartIcon className="w-5 h-5" /> }
    ];

    const toggleService = (id: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(id) 
                ? prev.services.filter(s => s !== id) 
                : [...prev.services, id]
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, fileName: file.name }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.summary) {
            alert("Please complete the required identity and briefing fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                message: `
[MISSION BRIEFING]
Company: ${formData.company}
Timeline: ${formData.startDate} to ${formData.endDate}
Services Required: ${formData.services.join(', ')}
Budget Range: £${formData.minBudget} - £${formData.maxBudget}
Project Summary: ${formData.summary}
Attached File: ${formData.fileName || 'None'}
                `.trim(),
                source: 'Advanced Project Planner'
            };

            const { error } = await supabase.from('contact_inquiries').insert([payload]);
            if (error) throw error;
            
            alert("Transmission Successful! Mission initialized.");
            onClose();
            // Reset state
            setStep(1);
            setFormData({ name: '', email: '', company: '', startDate: '', endDate: '', services: [], minBudget: '200', maxBudget: '400', summary: '', fileName: '' });
        } catch (err) {
            console.error(err);
            alert("Uplink failed. Check connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    // Balanced equal padding (Top, Bottom, Left, Right)
    const contentPadding = "p-8 md:p-12";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/95 backdrop-blur-2xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,1)] max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-6 right-8 z-[110] text-slate-600 hover:text-white transition-colors bg-white/5 p-2.5 rounded-full">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* LEFT SIDE: BRANDING & STEPS */}
                        <div className={`w-full md:w-[38%] bg-gradient-to-br from-slate-900/50 to-black ${contentPadding} flex flex-col border-r border-white/5`}>
                            <div className="flex-grow">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                                    Project Planner
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1] tracking-tighter">
                                    Let's Build <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Something Epic</span>
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] font-medium">
                                    Complete the blueprint to initialize our digital collaboration.
                                </p>
                            </div>

                            <div className="mt-8 space-y-8 relative">
                                <div className="absolute left-5 top-4 bottom-4 w-px bg-slate-800"></div>
                                {[
                                  { s: 1, label: 'Identity' },
                                  { s: 2, label: 'Services' },
                                  { s: 3, label: 'Resources' },
                                  { s: 4, label: 'Briefing' }
                                ].map(item => (
                                  <div key={item.s} className={`flex items-center gap-5 relative z-10 transition-all duration-500 ${step === item.s ? 'opacity-100 scale-105' : 'opacity-30'}`}>
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step === item.s ? 'bg-cyan-600 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                          {item.s}
                                      </div>
                                      <span className="text-white text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                  </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE: 4-STEP FORM */}
                        <div className={`flex-1 ${contentPadding} flex flex-col bg-[#050505] overflow-y-auto custom-scrollbar`}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                                        <h3 className="text-xl md:text-2xl font-bold text-white border-l-4 border-cyan-500 pl-5 uppercase tracking-tighter">01 // Identity & Time</h3>
                                        <div className="grid grid-cols-1 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Identity *</label>
                                                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3.5 text-white text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800" placeholder="e.g. John Doe" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Email *</label>
                                                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3.5 text-white text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800" placeholder="hello@company.com" />
                                              </div>
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Company</label>
                                                  <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3.5 text-white text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800" placeholder="Organization" />
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
                                                  <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3.5 text-white text-sm focus:border-cyan-500 outline-none transition-all" />
                                              </div>
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Deadline</label>
                                                  <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3.5 text-white text-sm focus:border-cyan-500 outline-none transition-all" />
                                              </div>
                                            </div>
                                        </div>
                                        <div className="pt-6 flex justify-end">
                                            <button onClick={nextStep} className="bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-cyan-400 transition-all shadow-xl">
                                                Next Step <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                                        <div className="flex justify-between items-end">
                                          <h3 className="text-xl md:text-2xl font-bold text-white border-l-4 border-cyan-500 pl-5 uppercase tracking-tighter">02 // Services</h3>
                                          <button onClick={prevStep} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Back</button>
                                        </div>
                                        <h4 className="text-base font-medium text-slate-400">What services do you require?</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {servicesList.map(s => (
                                              <button 
                                                key={s.id} 
                                                onClick={() => toggleService(s.name)}
                                                className={`p-5 rounded-xl border text-left flex flex-col gap-3 transition-all duration-300 group ${formData.services.includes(s.name) ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                                              >
                                                  <div className={`transition-colors duration-300 ${formData.services.includes(s.name) ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                                      {s.icon}
                                                  </div>
                                                  <span className={`text-[10px] font-black uppercase tracking-widest ${formData.services.includes(s.name) ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{s.name}</span>
                                              </button>
                                            ))}
                                        </div>
                                        <div className="pt-6 flex justify-end">
                                            <button onClick={nextStep} disabled={formData.services.length === 0} className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all ${formData.services.length > 0 ? 'bg-white text-black hover:bg-cyan-400 shadow-xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>
                                                Next Step <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 flex flex-col h-full">
                                        <div className="flex justify-between items-end">
                                          <h3 className="text-xl md:text-2xl font-bold text-white border-l-4 border-cyan-500 pl-5 uppercase tracking-tighter">03 // Resources</h3>
                                          <button onClick={prevStep} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Back</button>
                                        </div>
                                        
                                        <div className="flex flex-col md:flex-row items-center gap-5 pt-8">
                                            <span className="text-lg font-medium text-white whitespace-nowrap">My budget is between</span>
                                            
                                            <div className="flex items-center gap-2">
                                              <div className="relative flex items-center">
                                                <input 
                                                  value={formData.minBudget} 
                                                  onChange={e => setFormData({...formData, minBudget: e.target.value})}
                                                  className="w-20 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white font-bold text-center focus:border-cyan-500 outline-none transition-all text-sm" 
                                                />
                                                <div className="w-8 h-8 ml-1 flex items-center justify-center bg-white/5 rounded-lg text-slate-400 font-serif italic border border-white/5 text-xs">£</div>
                                              </div>
                                              
                                              <span className="text-slate-500 text-xs font-medium px-1">and</span>
                                              
                                              <div className="relative flex items-center">
                                                <input 
                                                  value={formData.maxBudget} 
                                                  onChange={e => setFormData({...formData, maxBudget: e.target.value})}
                                                  className="w-20 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white font-bold text-center focus:border-cyan-500 outline-none transition-all text-sm" 
                                                />
                                                <div className="w-8 h-8 ml-1 flex items-center justify-center bg-white/5 rounded-lg text-slate-400 font-serif italic border border-white/5 text-xs">£</div>
                                              </div>
                                            </div>
                                        </div>

                                        <div className="pt-12 flex justify-end">
                                            <button onClick={nextStep} className="bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-cyan-400 transition-all shadow-xl">
                                                Next Step <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                                        <div className="flex justify-between items-end">
                                          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter">Give us the deets!</h3>
                                          <button onClick={prevStep} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Back</button>
                                        </div>

                                        <div className="space-y-2">
                                            <textarea 
                                              rows={5}
                                              value={formData.summary}
                                              onChange={e => setFormData({...formData, summary: e.target.value})}
                                              placeholder="Please provide a summary of your project"
                                              className="w-full bg-[#111] border border-white/10 rounded-xl p-5 text-white text-sm focus:border-cyan-500 outline-none transition-all resize-none placeholder:text-slate-600 min-h-[120px]"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                              <h4 className="text-xs font-medium text-slate-400">Or upload a project brief</h4>
                                              <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">PDF, DOCX, MAX. 10MB</span>
                                            </div>
                                            <div 
                                              onClick={() => fileInputRef.current?.click()}
                                              className="w-full border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-white/[0.02] transition-all group"
                                            >
                                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                                {formData.fileName ? (
                                                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                                                    <CheckIcon className="w-4 h-4" /> {formData.fileName}
                                                  </div>
                                                ) : (
                                                  <div className="flex items-center gap-3 bg-white text-black px-5 py-2.5 rounded-lg font-bold text-[10px] uppercase shadow-lg group-hover:scale-105 transition-transform">
                                                    Choose file <span className="text-slate-400 font-normal">No file chosen</span>
                                                  </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-4">
                                            <PremiumButton onClick={handleSubmit} disabled={isSubmitting || !formData.summary} width="full" className="!py-5 !text-sm">
                                                {isSubmitting ? 'Uplinking Mission...' : 'Launch Project'}
                                            </PremiumButton>
                                            <p className="text-center text-[8px] text-slate-700 font-black uppercase tracking-[0.3em]">Secure encrypted transmission Active</p>
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
