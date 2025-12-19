
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { TwitterIcon, LinkedinIcon, GithubIcon, ArrowRightIcon, LoaderIcon } from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';
import { Link } from 'react-router-dom';
import PremiumButton from '../components/PremiumButton';
import { supabase } from '../services/supabaseClient';

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
            
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-24 bg-slate-950 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
                        <div className="max-w-4xl relative">
                            <span className="text-white text-sm font-bold tracking-widest uppercase mb-4 block">• Contact</span>
                            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-white leading-[0.9] tracking-tight">
                                It's nice to <br />
                                <span className="flex items-center gap-4 md:gap-8">
                                    meet ya
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 45 }}
                                        className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center cursor-pointer shadow-lg shadow-cyan-500/20"
                                    >
                                        <ArrowRightIcon className="w-8 h-8 md:w-10 md:h-10 text-white transform rotate-45" />
                                    </motion.div>
                                </span>
                            </h1>
                        </div>
                        
                        <div className="w-full lg:w-auto flex justify-end">
                            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" 
                                    alt="Sameer" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="bg-white/10 backdrop-blur p-2 rounded-full inline-block border border-white/20">
                                        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section className="py-24 bg-slate-950 border-t border-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* Left Info */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="space-y-6">
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    For general enquiries, please fill out the form to get in touch. Alternatively, if you know your project details — head over to our project planner for a more refined step-by-step process.
                                </p>
                                <Link to="/contact">
                                    <PremiumButton icon={true}>
                                        Go to Project Planner
                                    </PremiumButton>
                                </Link>
                            </div>
                            
                            <div>
                                <p className="text-slate-500 text-sm mb-2 font-bold uppercase tracking-wider">Hate contact forms?</p>
                                <a href="mailto:support@sameercodes.online" className="text-white hover:text-cyan-400 transition-colors text-lg font-bold border-b border-slate-800 pb-1">
                                    support@sameercodes.online
                                </a>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="lg:col-span-8">
                            {isSuccess ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-slate-900 border border-cyan-500/30 p-12 rounded-[2.5rem] text-center"
                                >
                                    <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ArrowRightIcon className="w-10 h-10 text-cyan-400 -rotate-45" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                                    <p className="text-slate-400">Thanks for reaching out. We'll be in touch within 24 hours.</p>
                                    <button onClick={() => setIsSuccess(false)} className="mt-8 text-cyan-400 font-bold hover:underline">Send another message</button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Name *</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address *</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone <span className="text-slate-600 normal-case">(Optional)</span></label>
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">How did you hear about us?</label>
                                            <div className="relative">
                                                <select 
                                                    name="source"
                                                    value={formData.source}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                                                >
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
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tell us about your project *</label>
                                        <textarea 
                                            rows={6} 
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-start gap-3 py-2">
                                        <div className="relative flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="newsletter" 
                                                name="newsletter"
                                                checked={formData.newsletter}
                                                onChange={handleInputChange}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-700 bg-slate-900 checked:bg-cyan-500 checked:border-cyan-500 transition-all" 
                                            />
                                            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-slate-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <label htmlFor="newsletter" className="text-sm text-slate-400 cursor-pointer select-none">Subscribe to our newsletter for all the latest digital insights!</label>
                                    </div>

                                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <p className="text-xs text-slate-600">By submitting this form I accept the Privacy Policy of this site.</p>
                                        <PremiumButton 
                                            onClick={() => {}} 
                                            icon={!isSubmitting} 
                                            className={isSubmitting ? "opacity-70" : ""}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2"><LoaderIcon className="w-4 h-4 animate-spin"/> Sending...</span>
                                            ) : "Send Message"}
                                        </PremiumButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* STUDIO SECTION */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center border border-slate-800">
                        {/* Text Side */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Digital Studio</h2>
                            <p className="text-slate-400 mb-12 leading-relaxed">
                                Just a short drive from the city centre, our Studio is in a very convenient location, near two train stations, a motorway, and connects us globally.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Studio Address</h4>
                                    <p className="text-white text-sm leading-relaxed font-medium">
                                        Sameer Digital Lab<br />
                                        1 Gibfield Park Avenue<br />
                                        Atherton Manchester<br />
                                        M46 0SU
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Follow us</h4>
                                    <div className="flex gap-3">
                                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-black transition-colors"><LinkedinIcon className="w-4 h-4"/></a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-black transition-colors"><TwitterIcon className="w-4 h-4"/></a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-black transition-colors"><GithubIcon className="w-4 h-4"/></a>
                                    </div>
                                </div>
                            </div>

                            <button className="bg-slate-900 border border-slate-700 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all flex items-center gap-2 group">
                                Get directions
                                <ArrowRightIcon className="w-4 h-4 transform -rotate-45 group-hover:text-black" />
                            </button>
                        </div>

                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                                alt="Studio Interior" 
                                className="w-full h-full object-cover"
                            />
                            {/* Neon Sign Effect */}
                            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <h3 className="font-script text-5xl md:text-7xl text-white opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] rotate-[-5deg]">
                                    good vibes only
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Header */}
                        <div className="lg:col-span-4">
                            <span className="text-cyan-400 text-sm font-bold block mb-4 uppercase tracking-widest">• Anything else?</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                The answers to <br /> your questions.
                            </h2>
                            <Link to="/contact">
                                <PremiumButton icon={true}>
                                    View all FAQs
                                </PremiumButton>
                            </Link>
                        </div>

                        {/* Right Accordion */}
                        <div className="lg:col-span-8 space-y-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors">
                                    <button 
                                        onClick={() => toggleFaq(index)}
                                        className="w-full p-6 flex items-center justify-between text-left focus:outline-none group"
                                    >
                                        <span className={`font-bold pr-8 transition-colors ${activeFaq === index ? 'text-cyan-400' : 'text-white'}`}>{faq.q}</span>
                                        <span className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-slate-700 ${activeFaq === index ? 'text-cyan-400' : 'text-slate-400'}`}>
                                            <ArrowRightIcon className={`w-4 h-4 transition-transform duration-300 ${activeFaq === index ? '-rotate-45' : 'rotate-45'}`} />
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {activeFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 mt-2 pt-4">
                                                    {faq.a}
                                                </div>
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
