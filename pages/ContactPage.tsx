
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { TwitterIcon, LinkedinIcon, GithubIcon, ArrowRightIcon } from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';
import { Link } from 'react-router-dom';

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

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
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
                                        className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-lime-400 flex items-center justify-center cursor-pointer"
                                    >
                                        <ArrowRightIcon className="w-8 h-8 md:w-10 md:h-10 text-slate-950 transform rotate-45" />
                                    </motion.div>
                                </span>
                            </h1>
                        </div>
                        
                        <div className="w-full lg:w-auto flex justify-end">
                            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" 
                                    alt="Founder" 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="bg-white/10 backdrop-blur p-2 rounded-full inline-block">
                                        <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
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
                                    <button className="bg-lime-400 text-slate-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-lime-300 transition-colors flex items-center gap-2">
                                        Go to Project Planner
                                        <ArrowRightIcon className="w-4 h-4 transform -rotate-45" />
                                    </button>
                                </Link>
                            </div>
                            
                            <div>
                                <p className="text-slate-500 text-sm mb-2">Hate contact forms?</p>
                                <a href="mailto:hello@sameerdigitallab.com" className="text-white hover:text-lime-400 transition-colors text-lg font-bold border-b border-slate-800 pb-1">
                                    hello@sameerdigitallab.com
                                </a>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="lg:col-span-8">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Name</label>
                                        <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                        <input type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone <span className="text-slate-600 normal-case">(Optional)</span></label>
                                        <input type="tel" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">How did you hear about us?</label>
                                        <div className="relative">
                                            <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors appearance-none cursor-pointer">
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
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tell us about your project</label>
                                    <textarea rows={6} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors resize-none"></textarea>
                                </div>

                                <div className="flex items-start gap-3 py-2">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" id="newsletter" className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-700 bg-slate-900 checked:bg-lime-400 checked:border-lime-400 transition-all" />
                                        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-slate-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <label htmlFor="newsletter" className="text-sm text-slate-400 cursor-pointer select-none">Subscribe to our newsletter for all the latest digital goss!</label>
                                </div>

                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <p className="text-xs text-slate-600">By submitting this form I accept the Privacy Policy of this site.</p>
                                    <button type="button" className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700">
                                        Send Message
                                        <ArrowRightIcon className="w-4 h-4 transform -rotate-45" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* STUDIO SECTION */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        {/* Text Side */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Digital Studio</h2>
                            <p className="text-slate-400 mb-12 leading-relaxed">
                                Just a short drive from the city centre, our Studio is in a very convenient location, near two train stations, a motorway, and connects us globally.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Studio Address</h4>
                                    <p className="text-white text-sm leading-relaxed">
                                        Sameer Digital Lab<br />
                                        1 Gibfield Park Avenue<br />
                                        Atherton Manchester<br />
                                        M46 0SU
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Follow us</h4>
                                    <div className="flex gap-3">
                                        <a href="#" className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-slate-950 hover:bg-white transition-colors"><LinkedinIcon className="w-4 h-4"/></a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-slate-950 hover:bg-white transition-colors"><TwitterIcon className="w-4 h-4"/></a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-slate-950 hover:bg-white transition-colors"><GithubIcon className="w-4 h-4"/></a>
                                    </div>
                                </div>
                            </div>

                            <button className="bg-lime-400 text-slate-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-lime-300 transition-colors flex items-center gap-2">
                                Get directions
                                <ArrowRightIcon className="w-4 h-4 transform -rotate-45" />
                            </button>
                        </div>

                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative">
                            <img 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                                alt="Studio Interior" 
                                className="w-full h-full object-cover"
                            />
                            {/* Neon Sign Effect */}
                            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <h3 className="font-script text-5xl md:text-7xl text-white opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] rotate-[-5deg]">
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
                            <span className="text-white text-sm font-bold block mb-4">• Anything else?</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                The answers to <br /> your questions.
                            </h2>
                            <Link to="/contact">
                                <button className="bg-lime-400 text-slate-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-lime-300 transition-colors flex items-center gap-2">
                                    View all FAQs
                                    <ArrowRightIcon className="w-4 h-4 transform -rotate-45" />
                                </button>
                            </Link>
                        </div>

                        {/* Right Accordion */}
                        <div className="lg:col-span-8 space-y-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-slate-900/50 rounded-xl overflow-hidden">
                                    <button 
                                        onClick={() => toggleFaq(index)}
                                        className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900 transition-colors group"
                                    >
                                        <span className="text-white font-bold pr-8">{faq.q}</span>
                                        <span className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-slate-700 ${activeFaq === index ? 'text-lime-400' : 'text-slate-400'}`}>
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
                                                <div className="px-6 pb-6 pt-0 text-slate-400 text-sm leading-relaxed">
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
