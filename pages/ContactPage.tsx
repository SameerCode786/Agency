
import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
// Added CheckIcon to the imports from components/Icons to fix "Cannot find name 'CheckIcon'" on line 222.
import { TwitterIcon, LinkedinIcon, GithubIcon, ArrowRightIcon, LoaderIcon, PhoneIcon, EmailIcon, CheckIcon } from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';
import { Link } from 'react-router-dom';
import PremiumButton from '../components/PremiumButton';
import { supabase } from '../services/supabaseClient';
import ProjectPlannerModal from '../components/ProjectPlannerModal';

const faqs = [
    { q: "How long does a website project usually take to complete?", a: "Timescales depend on the size of the project. A brochure website typically takes 4-6 weeks, while more complex eCommerce or web apps can take 10-14 weeks." },
    { q: "How much does a website cost?", a: "Every project is unique. We offer tiered packages starting from $3,000 for simple sites, up to $20,000+ for complex platforms. Contact us for a bespoke quote." },
    { q: "We have a limited budget, will you still work with us?", a: "We try to accommodate various budgets. If we can't do the full scope, we can often propose a phased approach or a simpler MVP to get you started." },
    { q: "Do you outsource any work?", a: "No. All design and development is handled in-house by our dedicated team to ensure quality and communication." },
    { q: "What services do you offer?", a: "We offer Web Design, Web Development, Mobile Apps, SEO, Branding, and Digital Strategy." },
    { q: "We're not based in Manchester, does that matter?", a: "Not at all. We work with clients globally. We use Zoom, Slack, and email to maintain smooth communication regardless of time zones." },
    { q: "What are your payment terms?", a: "Standard terms are 50% deposit to book the slot and 50% upon completion/launch. For larger projects, we can discuss milestone-based payments." },
    { q: "How many meetings can we have?", a: "We have a structured process with key meetings (Kickoff, Design Review, Dev Review, Launch). We are also available for regular updates via email or Slack." },
    { q: "Can we arrange a phone call to discuss?", a: "Absolutely! Fill out the form or email us, and we'll schedule a call to discuss your project in detail." },
];

const ContactPage: React.FC = () => {
    const { title, description } = useSeoContent('Contact');
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const formSectionRef = useRef<HTMLElement>(null);
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: 'Google Search',
        message: '',
        newsletter: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const scrollToForm = () => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in the required fields (Name, Email, Message).");
            return;
        }

        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('contact_inquiries').insert([
                { 
                    name: formData.name, 
                    email: formData.email, 
                    phone: formData.phone, 
                    source: formData.source, 
                    message: formData.message, 
                    newsletter: formData.newsletter 
                }
            ]);

            if (error) throw error;
            
            setIsSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                source: 'Google Search',
                message: '',
                newsletter: false
            });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error: any) {
            console.error("Submission error:", error);
            alert("Oops! Something went wrong. If this persists, please email support@sameercodes.online directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageWrapper>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            <ProjectPlannerModal isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
            
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 bg-slate-950 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8 relative">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                    Reach out today
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-black text-white leading-[1.05] tracking-tighter mb-8 max-w-full overflow-visible">
                                    Let's craft your <br />
                                    <span className="flex items-center flex-wrap gap-x-6 gap-y-4">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">digital future</span>
                                        <motion.button 
                                            onClick={scrollToForm}
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9, rotate: 90 }}
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center cursor-pointer shadow-2xl shadow-cyan-500/40 border border-white/20 transition-all duration-300"
                                        >
                                            <ArrowRightIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                        </motion.button>
                                    </span>
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                                    Have a project in mind? We're ready to help you build something extraordinary. Tell us your vision and let's make it a reality.
                                </p>
                            </motion.div>
                        </div>
                        
                        <div className="lg:col-span-4 flex justify-center lg:justify-end">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                                transition={{ duration: 0.8, type: "spring" }}
                                className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                            >
                                <img 
                                    src="https://res.cloudinary.com/dow2sbjsp/image/upload/v1766382478/Sameer_if98jm.jpg" 
                                    alt="Sameer" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-500/50 rounded-br-xl"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REDESIGNED CONTACT SECTION */}
            <section ref={formSectionRef} className="py-24 md:py-32 bg-slate-950 border-t border-slate-900 scroll-mt-24 relative">
                {/* Visual side-glow ornament */}
                <div className="absolute right-0 top-0 w-64 h-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        
                        {/* Left Column: The Next Step Messaging */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12"
                            >
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">The Next Step.</h2>
                                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                                        Ready to move beyond standard solutions? Whether you have a quick question or a detailed blueprint, our lab is open for your next big idea.
                                    </p>
                                </div>
                                
                                <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] shadow-xl relative group">
                                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center">
                                        <span className="text-indigo-400 font-black">OR</span>
                                    </div>
                                    <h4 className="text-white font-bold text-xl mb-4">Strategic Planning</h4>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                        If you've already defined your mission, skip the line and use our detailed project blueprint tool to provide full logistics immediately.
                                    </p>
                                    <PremiumButton 
                                        onClick={() => setIsPlannerOpen(true)}
                                        icon={true}
                                        className="!w-full shadow-2xl shadow-indigo-500/20"
                                    >
                                        Start Project Blueprint
                                    </PremiumButton>
                                </div>
                                
                                <div className="pt-4">
                                    <p className="text-slate-600 text-xs font-black uppercase tracking-widest mb-3 ml-1">Direct Comms</p>
                                    <a href="mailto:support@sameercodes.online" className="inline-block text-white hover:text-cyan-400 transition-all text-xl font-bold border-b-2 border-slate-800 hover:border-cyan-500 pb-1">
                                        support@sameercodes.online
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Sleek Form Interface */}
                        <div className="lg:col-span-7">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
                            >
                                {isSuccess ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckIcon className="w-10 h-10 text-green-400" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4">Transmission Successful</h2>
                                        <p className="text-slate-400 mb-8">We've received your mission details. Our architects will contact you within 24 hours.</p>
                                        <button onClick={() => setIsSuccess(false)} className="text-cyan-400 font-bold hover:underline">Send another briefing</button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="md:col-span-1 space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Identity *</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. John Doe" />
                                        </div>
                                        <div className="md:col-span-1 space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Channel (Email) *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="hello@example.com" />
                                        </div>
                                        <div className="md:col-span-1 space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone <span className="text-slate-700 font-normal italic">(Optional)</span></label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="+1..." />
                                        </div>
                                        <div className="md:col-span-1 space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Acquisition Source</label>
                                            <div className="relative">
                                                <select name="source" value={formData.source} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer">
                                                    <option>Google Search</option>
                                                    <option>Social Media</option>
                                                    <option>Referral</option>
                                                    <option>Awwwards</option>
                                                    <option>Other</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2 mt-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mission Briefing *</label>
                                            <textarea rows={6} name="message" value={formData.message} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-5 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none leading-relaxed" placeholder="Briefly describe your project goals..."></textarea>
                                        </div>

                                        <div className="md:col-span-2 flex items-center gap-3 py-4">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleInputChange} className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-800 bg-slate-950 checked:bg-cyan-500 checked:border-cyan-500 transition-all" />
                                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-slate-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                            <label htmlFor="newsletter" className="text-[11px] font-bold text-slate-500 cursor-pointer select-none uppercase tracking-widest">Subscribe to digital insights</label>
                                        </div>

                                        <div className="md:col-span-2 pt-4 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-white/5 pt-8 mt-4">
                                            <div className="flex gap-4">
                                                <a href="#" className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500 transition-all"><LinkedinIcon className="w-4 h-4"/></a>
                                                <a href="#" className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500 transition-all"><TwitterIcon className="w-4 h-4"/></a>
                                            </div>
                                            <PremiumButton 
                                                onClick={() => {}} 
                                                icon={!isSubmitting} 
                                                className={`!px-12 !py-5 ${isSubmitting ? "opacity-70" : ""}`}
                                            >
                                                {isSubmitting ? <span className="flex items-center gap-2"><LoaderIcon className="w-4 h-4 animate-spin"/> Sending...</span> : "Send Message"}
                                            </PremiumButton>
                                        </div>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-slate-950 border-t border-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <span className="text-cyan-400 text-sm font-bold block mb-4 uppercase tracking-widest">• Anything else?</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The answers to <br /> your questions.</h2>
                            <Link to="/contact">
                                <PremiumButton icon={true}>View all FAQs</PremiumButton>
                            </Link>
                        </div>
                        <div className="lg:col-span-8 space-y-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors">
                                    <button onClick={() => toggleFaq(index)} className="w-full p-6 flex items-center justify-between text-left focus:outline-none group">
                                        <span className={`font-bold pr-8 transition-colors ${activeFaq === index ? 'text-cyan-400' : 'text-white'}`}>{faq.q}</span>
                                        <span className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-slate-700 ${activeFaq === index ? 'text-cyan-400' : 'text-slate-400'}`}>
                                            <ArrowRightIcon className={`w-4 h-4 transition-transform duration-300 ${activeFaq === index ? '-rotate-45' : 'rotate-45'}`} />
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {activeFaq === index && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                                                <div className="px-6 pb-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 mt-2 pt-4">{faq.a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-script { font-family: 'Dancing Script', cursive; }
            `}</style>
        </PageWrapper>
    );
};

export default ContactPage;
