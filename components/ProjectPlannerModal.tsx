
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
    ShoppingCartIcon,
    LoaderIcon
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
        minBudget: '',
        maxBudget: '',
        summary: '',
        fileName: '',
        fileObject: null as File | null
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
            setFormData(prev => ({ 
                ...prev, 
                fileName: file.name,
                fileObject: file 
            }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.summary) {
            alert("Please complete the identity and briefing steps.");
            return;
        }

        setIsSubmitting(true);
        try {
            let fileUrl = 'None attached';

            // 1. Handle File Upload to Supabase Storage if file exists
            if (formData.fileObject) {
                const fileExt = formData.fileObject.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
                const filePath = `briefs/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('project-briefs')
                    .upload(filePath, formData.fileObject);

                if (uploadError) {
                    console.error("Upload Error:", uploadError);
                    // Continue without file if upload fails, or throw error
                } else {
                    const { data: publicUrlData } = supabase.storage
                        .from('project-briefs')
                        .getPublicUrl(filePath);
                    
                    fileUrl = publicUrlData.publicUrl;
                }
            }

            // 2. Prepare Payload
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: '', 
                newsletter: false,
                source: 'Blueprint Builder',
                message: `
[MISSION INITIALIZED]
Company: ${formData.company || 'Not Provided'}
Timeline: ${formData.startDate || 'TBD'} to ${formData.endDate || 'TBD'}
Services: ${formData.services.join(', ') || 'General Consultation'}
Budget: $${formData.minBudget || '0'} - $${formData.maxBudget || '0'}
Briefing: ${formData.summary}
Attachment: ${fileUrl}
                `.trim()
            };

            const { error } = await supabase.from('contact_inquiries').insert([payload]);
            
            if (error) {
                console.error("Supabase Error:", error);
                if (error.message.includes("public.contact_inquiries") || error.code === "PGRST204") {
                    throw new Error("The database table 'contact_inquiries' does not exist. Please create it in your Supabase SQL Editor.");
                }
                throw new Error(error.message);
            }
            
            alert("Transmission Successful! Mission initialized.");
            onClose();
            setStep(1);
            setFormData({ name: '', email: '', company: '', startDate: '', endDate: '', services: [], minBudget: '', maxBudget: '', summary: '', fileName: '', fileObject: null });
        } catch (err: any) {
            console.error("Submission Failure:", err);
            alert(`Uplink Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/95 backdrop-blur-3xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,1)] h-[85vh] md:h-[650px]"
                    >
                        <button onClick={onClose} className="absolute top-4 right-6 z-[110] text-slate-600 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="w-full md:w-[35%] bg-gradient-to-br from-slate-900/40 to-black p-8 md:p-10 flex flex-col border-r border-white/5 overflow-hidden">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                                    Blueprint active
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight tracking-tighter">
                                    Let's Build <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Something Epic</span>
                                </h2>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                                    Architecting high-performance digital ecosystems for global brands.
                                </p>
                            </div>

                            <div className="mt-auto space-y-6 relative">
                                <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-800"></div>
                                {[1, 2, 3, 4].map(s => (
                                    <div key={s} className={`flex items-center gap-4 relative z-10 transition-all duration-500 ${step === s ? 'opacity-100 scale-105' : 'opacity-30'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step === s ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                            {s}
                                        </div>
                                        <span className="text-white text-[9px] font-black uppercase tracking-widest">
                                            {s === 1 ? 'Identity' : s === 2 ? 'Services' : s === 3 ? 'Budget' : 'Briefing'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 bg-[#050505] overflow-y-auto custom-scrollbar p-8 md:p-10 flex flex-col">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                                        <h3 className="text-xl font-bold text-white border-l-4 border-cyan-500 pl-4 uppercase tracking-tighter">01 // Identity & Launch</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Name *</label>
                                                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3 text-white text-sm focus:border-cyan-500 outline-none" placeholder="e.g. John Doe" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Email *</label>
                                                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3 text-white text-sm focus:border-cyan-500 outline-none" placeholder="hello@domain.com" />
                                              </div>
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Company</label>
                                                  <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Entity" />
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Proposed Start</label>
                                                  <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3 text-white text-sm focus:border-cyan-500 outline-none" />
                                              </div>
                                              <div className="space-y-1.5">
                                                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Proposed End</label>
                                                  <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-3 text-white text-sm focus:border-cyan-500 outline-none" />
                                              </div>
                                            </div>
                                        </div>
                                        <div className="pt-6 mt-auto flex justify-end">
                                            <button onClick={nextStep} className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl">
                                                Next Step <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                                        <div className="flex justify-between items-end">
                                          <h3 className="text-xl font-bold text-white border-l-4 border-cyan-500 pl-4 uppercase tracking-tighter">02 // Target Requirements</h3>
                                          <button onClick={prevStep} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white">Back</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {servicesList.map(s => (
                                              <button key={s.id} onClick={() => toggleService(s.name)} className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${formData.services.includes(s.name) ? 'bg-cyan-500/10 border-cyan-500' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
                                                  <div className={formData.services.includes(s.name) ? 'text-cyan-400' : 'text-slate-600'}>{s.icon}</div>
                                                  <span className={`text-[9px] font-black uppercase tracking-widest ${formData.services.includes(s.name) ? 'text-white' : 'text-slate-500'}`}>{s.name}</span>
                                              </button>
                                            ))}
                                        </div>
                                        <div className="pt-6 mt-auto flex justify-end">
                                            <button onClick={nextStep} className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl">
                                                Next Step <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 flex flex-col h-full">
                                        <div className="flex justify-between items-end">
                                          <h3 className="text-xl font-bold text-white border-l-4 border-cyan-500 pl-4 uppercase tracking-tighter">03 // Resource Allocation</h3>
                                          <button onClick={prevStep} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white">Back</button>
                                        </div>
                                        <div className="flex flex-col gap-6 pt-10">
                                            <span className="text-lg font-medium text-white">My budget is between</span>
                                            <div className="flex items-center gap-3">
                                              <div className="relative flex items-center">
                                                <input value={formData.minBudget} placeholder="0" onChange={e => setFormData({...formData, minBudget: e.target.value})} className="w-24 bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white font-bold text-center focus:border-cyan-500 outline-none text-sm" />
                                                <div className="w-10 h-10 ml-1 flex items-center justify-center bg-white/5 rounded-lg text-slate-400 border border-white/5 text-xs">$</div>
                                              </div>
                                              <span className="text-slate-500 text-xs font-black uppercase">And</span>
                                              <div className="relative flex items-center">
                                                <input value={formData.maxBudget} placeholder="0" onChange={e => setFormData({...formData, maxBudget: e.target.value})} className="w-24 bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white font-bold text-center focus:border-cyan-500 outline-none text-sm" />
                                                <div className="w-10 h-10 ml-1 flex items-center justify-center bg-white/5 rounded-lg text-slate-400 border border-white/5 text-xs">$</div>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="pt-6 mt-auto flex justify-end">
                                            <button onClick={nextStep} className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl">
                                                Next Step <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                                        <div className="flex justify-between items-end">
                                          <h3 className="text-2xl font-bold text-white tracking-tighter">Give us the deets!</h3>
                                          <button onClick={prevStep} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white">Back</button>
                                        </div>
                                        <textarea rows={5} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} placeholder="Please provide a summary of your project..." className="w-full bg-[#111] border border-white/10 rounded-xl p-5 text-white text-sm focus:border-cyan-500 outline-none resize-none min-h-[140px]" />
                                        
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center px-1">
                                              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Optional Brief Upload</h4>
                                              <span className="text-[8px] text-slate-700 font-bold uppercase">PDF, DOCX, MAX. 10MB</span>
                                            </div>
                                            <div onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/30 hover:bg-white/[0.01] transition-all group">
                                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                                {formData.fileName ? (
                                                  <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold">
                                                    <CheckIcon className="w-4 h-4" /> {formData.fileName}
                                                  </div>
                                                ) : (
                                                  <div className="flex items-center gap-3 bg-slate-900 text-slate-400 px-4 py-2 rounded-lg font-bold text-[9px] uppercase border border-white/5 group-hover:text-white transition-all">
                                                    Choose file <span className="text-slate-600 font-normal">No file chosen</span>
                                                  </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4 mt-auto flex flex-col gap-4">
                                            <PremiumButton onClick={handleSubmit} disabled={isSubmitting} width="full" className="!py-4 !text-sm">
                                                {isSubmitting ? <><LoaderIcon className="w-4 h-4 animate-spin" /> Finalizing Transmission...</> : 'Launch Project'}
                                            </PremiumButton>
                                            <p className="text-center text-[8px] text-slate-700 font-black uppercase tracking-[0.3em]">Encrypted Data Tunnel Active</p>
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
