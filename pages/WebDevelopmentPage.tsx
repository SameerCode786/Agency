
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import PremiumButton from '../components/PremiumButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';
import { ArrowRightIcon, StarIcon, CheckIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

const capabilities = [
    "Web Design",
    "eCommerce",
    "UX Design",
    "Responsive Design",
    "Wireframes",
    "Strategy"
];

const faqs = [
    { q: "How long does it take to build a website?", a: "The timeline depends on the project's complexity. A standard business website typically takes 4-6 weeks, while large-scale e-commerce platforms can take 10-14 weeks." },
    { q: "What size companies do you produce web designs for?", a: "We work with everyone from ambitious startups to global enterprises. Size doesn't matter; ambition does." },
    { q: "Do you redesign existing websites?", a: "Yes. We can modernize your existing platform, improving performance, UX, and SEO without losing your brand essence." },
    { q: "Do you work internationally?", a: "Absolutely. We are a digital-first agency working with clients across the globe, from the UK to the US and beyond." },
    { q: "Do you offer ongoing help with our new site once it's launched?", a: "Yes, we offer comprehensive maintenance packages to keep your site secure, updated, and performing optimally." },
    { q: "Will my website work on smart phones and tablets as well?", a: "100%. Mobile-first design is our standard. Your site will look and function perfectly on any device." },
    { q: "How much does a website cost?", a: "Every project is unique. We provide bespoke quotes based on your specific requirements and goals. Contact us for an estimate." },
    { q: "We have a limited budget, will you still work with us?", a: "We try to accommodate various budgets by offering different tiers of service. Let's chat and see what's possible." },
];

const testimonials = [
    {
        quote: "Our website just blows our competitors out the water. It's so much easier to navigate than before and is just a cut above the rest. If I went back in time I would definitely choose Sameer Digital Lab again.",
        name: "Emily Schweitzer",
        company: "Inside Out Contracts",
        initial: "E"
    },
    {
        quote: "Our website smashes our competitors websites out the park. We've had lots of comments about how good it is. Benefits of working with Sameer Digital Lab are that they really engross themselves in your brand.",
        name: "Suzie Steel",
        company: "The Plough",
        initial: "S"
    },
    {
        quote: "Sameer Digital Lab are so hip & so different and their approach is so fresh. Sameer really goes above and beyond with everything you ask him to do.",
        name: "Rachel Bates",
        company: "Rachel Bates Interiors",
        initial: "R"
    },
    {
        quote: "I don't think I understood just how good a website could be until I saw the drafts. They work with massive companies, but they also make time for smaller local businesses as well.",
        name: "Nicola Wellard",
        company: "Silver Sixpence",
        initial: "N"
    }
];

const projects = [
    { title: "Gary Neville", desc: "Refreshing Gary Neville's digital presence", tags: ["Branding", "Website", "SEO"], image: "https://picsum.photos/seed/gary/800/600" },
    { title: "Olgam Life", desc: "Disrupting the plasma donation space", tags: ["Branding", "Website", "SEO"], image: "https://picsum.photos/seed/olgam/800/600" },
    { title: "Natterjack", desc: "Overhauling a people-first marketing agency", tags: ["Branding", "Website"], image: "https://picsum.photos/seed/natter/800/600" },
    { title: "This is Digital", desc: "Complete brand overhaul for a digital performance agency", tags: ["Branding", "Website", "SEO"], image: "https://picsum.photos/seed/digital/800/600" },
];

const WebDevelopmentPage: React.FC = () => {
    const { title, description } = useSeoContent('Web Development');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <PageWrapper>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            {/* HERO SECTION */}
            <section className="relative pt-48 pb-24 bg-slate-950 px-4 sm:px-6 lg:px-16 overflow-hidden">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 tracking-tight">
                            Web Design
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl leading-relaxed border-l-4 border-cyan-500 pl-8">
                            A Web Design Studio in the Cloud. Here at Sameer Digital Lab, we offer honest advice, industry experience, and a great portfolio of work.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* INTRO TEXT */}
            <section className="py-24 bg-slate-900/50 border-t border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
                                UI/UX, wireframes, research and development — we understand all areas of web design. We can take a start-up business with nothing to a fully functioning brand online and offline. We can revamp an existing website or take a successful brand to the next level.
                            </p>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                                Our talented and creative in-house web design team will work alongside you in collaboration to create a site that reflects your brand, talks to your audience with meaning and personality, and has great functionality across the latest devices.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-center">
                            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                                <h3 className="text-white font-bold mb-4">Are you a startup brand, well established company, in the UK or worldwide?</h3>
                                <p className="text-slate-500 mb-6">It doesn't matter. We work with a range of clients.</p>
                                <Link to="/contact"><PremiumButton className="text-sm">Tell me more</PremiumButton></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <span className="text-cyan-400 font-bold tracking-widest uppercase mb-4 block">About Sameer Digital Lab</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Our Website Capabilities</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                            {capabilities.map((cap, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 border-b border-slate-800 pb-4"
                                >
                                    <span className="text-cyan-500 font-mono">0{i+1}.</span>
                                    <span className="text-2xl text-slate-300 font-light">{cap}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PHILOSOPHY / IN-HOUSE */}
            <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">We’re the real deal.</h2>
                             <p className="text-slate-400 text-lg mb-6">We know it’s hard for brands to setup an online experience, and budgets can be tight. We like to help new brands grow and work in a long-term relationship.</p>
                             <p className="text-slate-400 text-lg mb-8">We also have experience designing, building, testing, and launching websites for large global organisations. We can be an extension of your in-house marketing team. Take advantage of our expert team to be your complete digital arm.</p>
                             
                             <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 border border-slate-700">Here since 2010</span>
                                <span className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 border border-slate-700">Premium Partner</span>
                             </div>

                             <div className="mt-12">
                                <Link to="/contact"><PremiumButton>Let's work together</PremiumButton></Link>
                             </div>
                        </div>
                        <div className="relative">
                            <img src="https://picsum.photos/seed/team/800/800" alt="Team" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute -bottom-10 -left-10 bg-slate-950 p-8 rounded-tr-3xl border-t border-r border-slate-800 hidden lg:block">
                                <p className="text-cyan-400 font-bold text-xl">100% In-House Team</p>
                                <p className="text-slate-500">No outsourcing. Pure quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* APPROACH */}
            <section className="py-24 bg-slate-950">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">We approach every project with a clear vision.</h2>
                    <p className="text-xl text-slate-400 leading-relaxed mb-12">
                        We like to remove the 'waffle' and design beautiful, easy to use websites that are functional. We don't just build pretty websites. Here at Sameer Digital Lab, we understand all aspects of a successful site, from design through web development and testing, to SEO and Hosting. We tailor our service to the client and the project requirements.
                    </p>
                    <Link to="/contact"><PremiumButton>Start a project today</PremiumButton></Link>
                 </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-slate-900 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                     <div className="mb-16">
                        <span className="text-cyan-400 font-bold tracking-widest uppercase mb-4 block">Hear it from our friends</span>
                        <h2 className="text-4xl font-bold text-white">What our happy clients say about us</h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-slate-950 p-10 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                        {t.initial}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{t.name}</h4>
                                        <p className="text-slate-500 text-sm">{t.company}</p>
                                    </div>
                                </div>
                                <p className="text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                                <div className="mt-6 flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" />)}
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The answers to your questions.</h2>
                            <p className="text-slate-400 mb-8">Can't find what you're looking for? Get in touch directly.</p>
                            <Link to="/contact"><PremiumButton>Get in touch</PremiumButton></Link>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-slate-800">
                                        <button 
                                            onClick={() => toggleFaq(index)}
                                            className="w-full text-left py-6 flex justify-between items-center focus:outline-none"
                                        >
                                            <span className="text-lg md:text-xl font-medium text-slate-200">{faq.q}</span>
                                            <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''} text-cyan-400`}>
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {activeFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-6 text-slate-400 leading-relaxed">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR WORK GRID */}
            <section className="py-24 bg-slate-900">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-cyan-400 font-bold tracking-widest uppercase mb-4 block">Our Work</span>
                            <h2 className="text-4xl font-bold text-white">Our favourite Web Design Projects</h2>
                        </div>
                        <Link to="/portfolio" className="hidden md:block">
                            <PremiumButton className="!px-8 !py-3">View our work</PremiumButton>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="overflow-hidden rounded-2xl mb-6 relative aspect-[4/3]">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                            <ArrowRightIcon className="w-8 h-8 text-black -rotate-45" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-700 px-2 py-1 rounded">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                <p className="text-slate-400">{project.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                     <div className="mt-12 md:hidden text-center">
                        <Link to="/portfolio">
                            <PremiumButton>View our work</PremiumButton>
                        </Link>
                    </div>
                 </div>
            </section>

        </PageWrapper>
    );
};

export default WebDevelopmentPage;
