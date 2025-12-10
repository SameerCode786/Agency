
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EmailIcon, LinkedinIcon, TwitterIcon, CheckIcon, StarIcon } from '../components/Icons';
import PremiumButton from '../components/PremiumButton';

// Mock Data for the blog post (in a real app, fetch via ID)
const blogData = {
    title: "The Hidden Cost of 'Free Trials': Why WeVersity Made the 100% Free Commitment",
    date: "November 26, 2025",
    author: "WeVersity",
    role: "Administrator",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    // Simulating rich HTML content
    content: `
        <p class="lead">If you’ve spent any serious time trying to upskill online, you know the cycle: you find a course promising a life-changing skill, see the banner that says “Enroll for Free!” and you click. That initial click, a moment of hopeful excitement, is, for most people, the moment they step into a meticulously crafted <strong>Enrollment Trap</strong>.</p>
        
        <p>The truth is, most “free” learning is simply the bait. It’s the first quarter of a novel, designed to hook you before the inevitable, crippling paywall appears. You’re not signing up for education; you’re signing up for an elaborate sales funnel.</p>
        
        <h2 id="section-1">The Enrollment Trap: The True Cost of a Zero-Dollar Click</h2>
        <p>This practice extracts an immense and invisible toll on learners. A cost that goes far beyond the eventual subscription fee. This is the core reason WeVersity was founded, built on one single, non-negotiable principle: <strong>100% Free. 100% Complete. No Exceptions.</strong></p>
        
        <h2 id="section-2">The Three Invisible Paywalls That Sabotage Success</h2>
        <p>The "freemium" model doesn't just block access; it strategically breaks down your momentum and destroys your confidence. WeVersity directly addresses and eliminates these three destructive barriers:</p>
        
        <h3 id="subsection-2-1">1. The Psychological Momentum Paywall</h3>
        <p>You’re a week in. You’ve successfully navigated the basics of <strong>Web Development</strong> or <strong>Social Media Marketing</strong>. You feel the dopamine rush of accomplishment. Suddenly, you hit a wall—the “Upgrade to Premium to Unlock the Advanced Modules” screen.</p>
        <ul>
            <li><strong>The Cost:</strong> This isn’t just a $49 payment. It’s the sudden, jarring <em>loss of momentum</em>. Your brain, which was busy building new neural pathways, is now forced into a cold, hard calculation of <em>value vs. cost</em>.</li>
        </ul>

        <h3 id="subsection-2-2">2. The Critical Information Gap Paywall</h3>
        <p>This is perhaps the most insidious trap. You finish a "complete" course, you have your certificate, and you know the <em>skill</em>. But when you try to land your first client, you are paralyzed by questions the course never answered:</p>
        <ul>
            <li><em>How do I write a legally sound freelance contract?</em></li>
            <li><em>What are the industry standard rates for this specific service?</em></li>
            <li><em>How do I handle international payments and tax forms?</em></li>
        </ul>

        <h2 id="section-3">Mission Over Margin: Why the WeVersity Model Works</h2>
        <p>Our commitment to truly <strong>100% free online courses</strong> is not a marketing gimmick—it is a foundational principle driven by a clear mission: <strong>to eliminate the financial barrier to competence and financial independence.</strong></p>
        <p>We are able to maintain this world-class quality while remaining free because our model shifts the focus.</p>
        
        <h2 id="section-4">Join the Discussion</h2>
        <p>The current online learning industry is designed to keep you searching and spending. WeVersity is designed to launch you into independence.</p>
        <p>Are you ready to stop paying to learn, and start learning to earn?</p>
    `
};

interface TableOfContentItem {
    id: string;
    text: string;
    level: number;
}

const BlogPostPage: React.FC = () => {
    const { id } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [headings, setHeadings] = useState<TableOfContentItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    // 1. Parse Headings for TOC
    useEffect(() => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = blogData.content;
        const elements = tempDiv.querySelectorAll('h2, h3');
        const items: TableOfContentItem[] = [];

        elements.forEach((el, index) => {
            const id = el.id || `heading-${index}`;
            // Inject IDs back into content if they were missing (conceptually)
            // In React, we handle this by ensuring the HTML content string has IDs or adding them via regex/parsing before render.
            // For this demo, the content string already has IDs.
            items.push({
                id: id,
                text: el.textContent || "",
                level: Number(el.tagName.charAt(1))
            });
        });
        setHeadings(items);
    }, []);

    // 2. Active Section Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -40% 0px" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Offset for header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <PageWrapper>
            {/* --- READING PROGRESS BAR (FIXED TOP) --- */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={blogData.image} alt="Hero" className="w-full h-full object-cover opacity-30 blur-sm scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/50"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                            {blogData.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
                            {blogData.title}
                        </h1>
                        
                        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-800 p-1.5 rounded-full text-purple-400"><i className="far fa-calendar"></i></span>
                                <span>{blogData.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-800 p-1.5 rounded-full text-purple-400"><i className="far fa-user"></i></span>
                                <span>By {blogData.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-800 p-1.5 rounded-full text-purple-400"><i className="far fa-clock"></i></span>
                                <span>11:01 am</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTENT GRID --- */}
            <section className="bg-slate-950 pb-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT SIDEBAR: Table of Contents (Sticky) */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32">
                                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                                    <h4 className="text-white font-bold mb-4 flex items-center justify-between">
                                        Table of Contents
                                        <span className="text-slate-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                        </span>
                                    </h4>
                                    <nav className="space-y-1">
                                        {headings.map((heading) => (
                                            <button
                                                key={heading.id}
                                                onClick={() => scrollToHeading(heading.id)}
                                                className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-300 border-l-2 ${
                                                    activeId === heading.id 
                                                    ? 'text-cyan-400 bg-cyan-500/10 border-cyan-400 font-bold' 
                                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-transparent'
                                                }`}
                                                style={{ marginLeft: heading.level === 3 ? '1rem' : '0' }}
                                            >
                                                {heading.text}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* CENTER: Blog Article Content */}
                        <article className="col-span-1 lg:col-span-6">
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-slate-800 leading-relaxed font-serif">
                                {/* Using Tailwind Typography (if available) or Custom CSS for inside content */}
                                <style>{`
                                    .blog-content h2 { font-family: 'Oswald', sans-serif; font-size: 2rem; font-weight: 700; color: #1e293b; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
                                    .blog-content h3 { font-family: 'Oswald', sans-serif; font-size: 1.5rem; font-weight: 600; color: #334155; margin-top: 2rem; margin-bottom: 0.75rem; }
                                    .blog-content p { font-size: 1.125rem; margin-bottom: 1.5rem; color: #475569; line-height: 1.8; }
                                    .blog-content p.lead { font-size: 1.25rem; font-weight: 500; color: #334155; }
                                    .blog-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                                    .blog-content li { margin-bottom: 0.5rem; color: #475569; font-size: 1.1rem; }
                                    .blog-content strong { color: #0f172a; font-weight: 700; }
                                    .blog-content em { font-style: italic; color: #64748b; }
                                `}</style>
                                
                                <div 
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: blogData.content }}
                                />

                                {/* CTA Inside Blog */}
                                <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-center text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 group-hover:opacity-100 transition-opacity"></div>
                                    <h3 className="text-2xl font-bold mb-4 relative z-10">Start Learning for Free Now</h3>
                                    <PremiumButton onClick={() => window.location.href='/contact'} className="relative z-10">Join WeVersity</PremiumButton>
                                </div>
                            </div>

                            {/* Author Box */}
                            <div className="mt-8 bg-slate-100 border border-slate-200 rounded-2xl p-6 flex items-center gap-6">
                                <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center text-3xl text-slate-500 font-bold overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=We+Versity&background=random" alt="Author" className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900">{blogData.author}</h4>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Role: {blogData.role}</p>
                                    <div className="flex gap-3">
                                        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><TwitterIcon className="w-4 h-4"/></a>
                                        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><EmailIcon className="w-4 h-4"/></a>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Section (Simplified Widget) */}
                            <div className="mt-16">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Join the Discussion</h3>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-8 shadow-xl">
                                    <h4 className="text-xl font-bold text-slate-900 mb-6">Leave a Reply</h4>
                                    <p className="text-sm text-slate-500 mb-6">Your email address will not be published. Required fields are marked *</p>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Comment *</label>
                                            <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Name *</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email *</label>
                                                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <input type="checkbox" id="save" className="rounded text-cyan-500 focus:ring-cyan-500" />
                                            <label htmlFor="save" className="text-sm text-slate-500">Save my name, email, and website in this browser for the next time I comment.</label>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30">Post Comment</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </article>

                        {/* RIGHT SIDEBAR: Widgets (Newsletter) */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32 space-y-8">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-cyan-400">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">Subscribe to Our Newsletter</h4>
                                    <p className="text-sm text-slate-500 mb-4">Subscribe to our newsletter and get updates on our new courses.</p>
                                    <input type="email" placeholder="Your email address" className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 mb-3 text-sm focus:outline-none focus:border-cyan-500" />
                                    <button className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm">Subscribe</button>
                                </div>

                                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                                    <h4 className="text-lg font-bold text-white mb-4">Explore</h4>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Help Center</li>
                                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Career</li>
                                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
                                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact Us</li>
                                    </ul>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>
        </PageWrapper>
    );
};

export default BlogPostPage;
