
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EmailIcon, LinkedinIcon, TwitterIcon, CheckIcon, StarIcon, ArrowRightIcon } from '../components/Icons';
import PremiumButton from '../components/PremiumButton';
import { supabase } from '../services/supabaseClient';

// Mock Data for the specific blog post requested
const blogData = {
    title: "The Hidden Cost of 'Free Trials': Why Sameer Digital Lab Made the 100% Free Commitment",
    date: "November 26, 2025",
    author: "Sameer Digital Lab",
    role: "Administrator",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    content: `
        <p class="lead">If you’ve spent any serious time trying to upskill online, you know the cycle: you find a course promising a life-changing skill, see the banner that says “Enroll for Free!” and you click. That initial click, a moment of hopeful excitement, is, for most people, the moment they step into a meticulously crafted <strong>Enrollment Trap</strong>.</p>
        
        <p>The truth is, most “free” learning is simply the bait. It’s the first quarter of a novel, designed to hook you before the inevitable, crippling paywall appears. You’re not signing up for education; you’re signing up for an elaborate sales funnel.</p>
        
        <h2 id="section-1">The Enrollment Trap: The True Cost of a Zero-Dollar Click</h2>
        <p>This practice extracts an immense and invisible toll on learners. A cost that goes far beyond the eventual subscription fee. This is the core reason Sameer Digital Lab was founded, built on one single, non-negotiable principle: <strong>100% Free. 100% Complete. No Exceptions.</strong></p>
        
        <h2 id="section-2">The Three Invisible Paywalls That Sabotage Success</h2>
        <p>The "freemium" model doesn't just block access; it strategically breaks down your momentum and destroys your confidence. Sameer Digital Lab directly addresses and eliminates these three destructive barriers:</p>
        
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

        <h2 id="section-3">Mission Over Margin: Why the Sameer Digital Lab Model Works</h2>
        <p>Our commitment to truly <strong>100% free online courses</strong> is not a marketing gimmick—it is a foundational principle driven by a clear mission: <strong>to eliminate the financial barrier to competence and financial independence.</strong></p>
        <p>We are able to maintain this world-class quality while remaining free because our model shifts the focus.</p>
        
        <h2 id="section-4">Join the Discussion</h2>
        <p>The current online learning industry is designed to keep you searching and spending. Sameer Digital Lab is designed to launch you into independence.</p>
        <p>Are you ready to stop paying to learn, and start learning to earn?</p>
    `
};

const relatedBlogs = [
    { id: 1, title: 'The Future of Web Development in 2024', category: 'Technology', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, title: '5 UI/UX Principles for Higher Conversion', category: 'Design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'Why Your Business Needs a Mobile App', category: 'Business', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop' },
];

const BlogPostPage: React.FC = () => {
    const { id } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Comment State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [existingComments, setExistingComments] = useState<any[]>([]);

    useEffect(() => {
        fetchComments();
    }, [id]);

    const fetchComments = async () => {
        // Use the ID from URL, default to 6 for this demo page if ID isn't present in URL logic
        const blogId = id || 6; 
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('blog_id', blogId)
            .order('created_at', { ascending: false });
        
        if (data) setExistingComments(data);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !comment) return alert("Please fill required fields.");
        
        setSubmitting(true);
        const blogId = id || 6; // Default ID for this demo page

        const { error } = await supabase.from('comments').insert([{
            blog_id: blogId,
            name,
            email,
            website,
            content: comment,
            created_at: new Date().toISOString()
        }]);

        if (error) {
            alert('Error posting comment. Please try again.');
            console.error(error);
        } else {
            alert('Comment submitted successfully!');
            setName('');
            setEmail('');
            setWebsite('');
            setComment('');
            fetchComments();
        }
        setSubmitting(false);
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
                    <img src={blogData.image} alt="Hero" className="w-full h-full object-cover opacity-20 blur-sm scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/50"></div>
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
                        
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400">📅</span>
                                <span>{blogData.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400">✍️</span>
                                <span>By {blogData.author}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTENT GRID --- */}
            <section className="bg-slate-950 pb-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* CENTER: Blog Article Content (Expanded Width) */}
                        <article className="col-span-1 lg:col-span-8 lg:col-start-3">
                            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl text-slate-300 leading-relaxed font-sans">
                                {/* Custom CSS for content styling within the dark theme */}
                                <style>{`
                                    .blog-content h2 { font-family: 'Oswald', sans-serif; font-size: 2rem; font-weight: 700; color: #f8fafc; margin-top: 3rem; margin-bottom: 1.5rem; line-height: 1.2; }
                                    .blog-content h3 { font-family: 'Oswald', sans-serif; font-size: 1.5rem; font-weight: 600; color: #e2e8f0; margin-top: 2.5rem; margin-bottom: 1rem; }
                                    .blog-content p { font-size: 1.125rem; margin-bottom: 1.5rem; color: #94a3b8; line-height: 1.8; }
                                    .blog-content p.lead { font-size: 1.35rem; font-weight: 400; color: #cbd5e1; border-left: 4px solid #22d3ee; padding-left: 1rem; }
                                    .blog-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 2rem; }
                                    .blog-content li { margin-bottom: 0.75rem; color: #94a3b8; font-size: 1.1rem; }
                                    .blog-content strong { color: #22d3ee; font-weight: 700; }
                                    .blog-content em { font-style: italic; color: #cbd5e1; }
                                `}</style>
                                
                                <div 
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: blogData.content }}
                                />

                                {/* CTA Inside Blog */}
                                <div className="mt-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 group-hover:opacity-100 transition-opacity"></div>
                                    <h3 className="text-2xl font-bold mb-4 relative z-10">Start Learning for Free Now</h3>
                                    <PremiumButton onClick={() => window.location.href='/contact'} className="relative z-10">Join Sameer Digital Lab</PremiumButton>
                                </div>
                            </div>

                            {/* Author Box */}
                            <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-3xl text-slate-500 font-bold overflow-hidden border-2 border-slate-700">
                                    <img src="https://ui-avatars.com/api/?name=Sameer+Digital&background=0f172a&color=22d3ee" alt="Author" className="w-full h-full object-cover"/>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-2xl font-bold text-white mb-1">{blogData.author}</h4>
                                    <p className="text-sm text-cyan-400 font-bold uppercase tracking-wider mb-4">Role: {blogData.role}</p>
                                    <div className="flex justify-center sm:justify-start gap-4">
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><TwitterIcon className="w-5 h-5"/></a>
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><LinkedinIcon className="w-5 h-5"/></a>
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><EmailIcon className="w-5 h-5"/></a>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Section */}
                            <div className="mt-16" id="comments">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Join the Discussion</h3>
                                </div>
                                
                                {/* Existing Comments List */}
                                <div className="space-y-6 mb-12">
                                    {existingComments.map((comment) => (
                                        <div key={comment.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h5 className="text-white font-bold">{comment.name}</h5>
                                                    <span className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">"{comment.content}"</p>
                                            
                                            {/* Admin Reply Display */}
                                            {comment.admin_reply && (
                                                <div className="ml-4 pl-4 border-l-2 border-cyan-500 mt-4">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-cyan-400 font-bold text-xs uppercase">Sameer Digital Lab</span>
                                                        <span className="text-[10px] bg-cyan-900/50 text-cyan-200 px-1.5 rounded">Admin</span>
                                                    </div>
                                                    <p className="text-slate-300 text-sm">{comment.admin_reply}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Comment Form */}
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                                    <h4 className="text-xl font-bold text-white mb-2">Leave a Reply</h4>
                                    <p className="text-sm text-slate-500 mb-6">Your email address will not be published. Required fields are marked *</p>
                                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Comment *</label>
                                            <textarea 
                                                rows={4} 
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            ></textarea>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Name *</label>
                                                <input 
                                                    type="text" 
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email *</label>
                                                <input 
                                                    type="email" 
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
                                            <input 
                                                type="text" 
                                                value={website}
                                                onChange={e => setWebsite(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                            />
                                        </div>
                                        <div className="flex justify-end pt-4">
                                            <PremiumButton className="" icon={false}>
                                                {submitting ? 'Posting...' : 'Post Comment'}
                                            </PremiumButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>
            </section>

            {/* --- RELATED BLOGS SECTION (Bottom) --- */}
            <section className="bg-slate-900 py-20 border-t border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">Read Next</h3>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedBlogs.map((blog) => (
                            <Link to="/blog" key={blog.id} className="group cursor-pointer">
                                <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 rounded bg-slate-950/80 text-[10px] font-bold text-white uppercase tracking-wider">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-400 transition-colors">
                                            {blog.title}
                                        </h4>
                                        <div className="flex items-center text-slate-500 text-xs font-bold group-hover:text-white transition-colors gap-2 mt-4">
                                            Read Article <ArrowRightIcon className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NEWSLETTER SECTION (Moved to Bottom) --- */}
            <section className="bg-slate-950 pb-20 pt-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 text-center border border-slate-700/50 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay ahead of the curve</h2>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Subscribe to the Sameer Digital Lab newsletter for the latest insights on technology, design, and digital growth.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input type="email" placeholder="Your email address" className="flex-grow px-6 py-4 rounded-full bg-slate-950 border border-slate-600 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm" />
                                <PremiumButton icon={false} className="whitespace-nowrap">Subscribe</PremiumButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </PageWrapper>
    );
};

export default BlogPostPage;
