
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EmailIcon, LinkedinIcon, TwitterIcon, ArrowRightIcon, FacebookIcon, LinkIcon } from '../components/Icons';
import PremiumButton from '../components/PremiumButton';
import { supabase } from '../services/supabaseClient';
import { FALLBACK_BLOGS } from '../data/fallbackBlogs';

const relatedBlogs = [
    { id: 1, title: 'The Future of Web Development in 2024', category: 'Technology', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, title: '5 UI/UX Principles for Higher Conversion', category: 'Design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'Why Your Business Needs a Mobile App', category: 'Business', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop' },
];

interface TocItem {
    id: string;
    text: string;
    level: string; // 'h2' or 'h3'
}

const BlogPostPage: React.FC = () => {
    const { id } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [blogData, setBlogData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // TOC State
    const [processedContent, setProcessedContent] = useState('');
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    
    // Observer Refs
    const observer = useRef<IntersectionObserver | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // 1. Fetch Blog Data (DB + Fallback)
    useEffect(() => {
        const fetchBlogData = async () => {
            setLoading(true);
            const blogId = id ? parseInt(id, 10) : null;

            // 1. Try finding in FALLBACK_BLOGS first (since we just added it)
            const fallbackPost = FALLBACK_BLOGS.find(b => b.id === blogId);
            
            if (fallbackPost) {
                // If found in fallback, use it immediately
                setBlogData({
                    ...fallbackPost,
                    date: new Date(fallbackPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                });
                setLoading(false);
                return;
            }

            // 2. If not in fallback, try Supabase
            if (blogId) {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', blogId)
                    .single();

                if (data) {
                    setBlogData({
                        ...data,
                        author: "Sameer Digital Lab", // DB might not have author, default it
                        role: "Administrator",
                        date: new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    });
                } else {
                    console.error("Blog not found in DB or Fallback", error);
                    // Handle 404 state if needed
                }
            }
            setLoading(false);
        };

        fetchBlogData();
    }, [id]);

    // 2. Process Content (Generate IDs and TOC)
    useEffect(() => {
        if (!blogData || !blogData.content) return;

        const processHtml = () => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(blogData.content, 'text/html');
            const headings = doc.querySelectorAll('h2, h3');
            const newToc: TocItem[] = [];

            headings.forEach((heading, index) => {
                const text = heading.textContent || '';
                // Create a slug ID: "My Title" -> "my-title"
                const slug = text.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
                
                const uniqueId = `${slug}-${index}`; // Ensure uniqueness with index
                heading.id = uniqueId;

                newToc.push({
                    id: uniqueId,
                    text: text,
                    level: heading.tagName.toLowerCase()
                });
            });

            setProcessedContent(doc.body.innerHTML);
            setTocItems(newToc);
        };

        processHtml();
    }, [blogData]);

    // 3. Set up Intersection Observer for Active State
    useEffect(() => {
        if (!processedContent) return;

        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        observer.current = new IntersectionObserver(handleObserver, {
            rootMargin: "-20% 0px -50% 0px", // Trigger when element is near top/center
            threshold: 0.1
        });

        // Small timeout to wait for React to render the dangerouslySetInnerHTML
        setTimeout(() => {
            const headings = contentRef.current?.querySelectorAll('h2, h3');
            headings?.forEach((heading) => observer.current?.observe(heading));
        }, 100);

        return () => observer.current?.disconnect();
    }, [processedContent]);

    // Comment State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [existingComments, setExistingComments] = useState<any[]>([]);

    useEffect(() => {
        if (id) fetchComments();
    }, [id]);

    const fetchComments = async () => {
        if (!id) return;
        const blogId = parseInt(id, 10);

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
        if (!id) return;

        setSubmitting(true);
        const blogId = parseInt(id, 10);

        const { error } = await supabase.from('comments').insert([{
            blog_id: blogId,
            name,
            email,
            website,
            content: comment,
            created_at: new Date().toISOString()
        }]);

        if (error) {
            console.error("Supabase Comment Error:", error);
            // More friendly error message
            if (error.message?.includes('relation "public.comments" does not exist')) {
                alert("Database Setup Required: Please run the 'supabase_setup.sql' script in your Supabase SQL Editor to create the tables.");
            } else {
                alert(`Error posting comment: ${error.message || 'Unknown error'}`);
            }
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

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = `Check out this article by Sameer Digital Lab: ${blogData?.title}`;
        
        switch(platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
                break;
        }
    };

    // Smooth Scroll Helper
    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed header (approx 100px)
            const y = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id); // Instant feedback
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blogData) {
        return (
            <PageWrapper>
                <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-3xl text-white font-bold mb-4">Blog Post Not Found</h1>
                    <p className="text-slate-400 mb-8">The article you are looking for does not exist or has been moved.</p>
                    <Link to="/blog">
                        <PremiumButton>Back to Blog</PremiumButton>
                    </Link>
                </div>
            </PageWrapper>
        )
    }

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
                                <span>By {blogData.author || "Sameer Digital Lab"}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTENT GRID --- */}
            <section className="bg-slate-950 pb-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT: Blog Article (Content First) */}
                        <article className="col-span-1 lg:col-span-9">
                            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl text-slate-300 leading-relaxed font-sans">
                                {/* Custom CSS for content styling within the dark theme */}
                                <style>{`
                                    .blog-content h2 { font-family: 'Oswald', sans-serif; font-size: 2rem; font-weight: 700; color: #f8fafc; margin-top: 3rem; margin-bottom: 1.5rem; line-height: 1.2; scroll-margin-top: 100px; }
                                    .blog-content h3 { font-family: 'Oswald', sans-serif; font-size: 1.5rem; font-weight: 600; color: #e2e8f0; margin-top: 2.5rem; margin-bottom: 1rem; scroll-margin-top: 100px; }
                                    .blog-content p { font-size: 1.125rem; margin-bottom: 1.5rem; color: #94a3b8; line-height: 1.8; }
                                    .blog-content p.lead { font-size: 1.35rem; font-weight: 400; color: #cbd5e1; border-left: 4px solid #22d3ee; padding-left: 1.5rem; margin-bottom: 2.5rem; }
                                    .blog-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 2rem; }
                                    .blog-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 2rem; }
                                    .blog-content li { margin-bottom: 0.75rem; color: #94a3b8; font-size: 1.1rem; }
                                    .blog-content strong { color: #22d3ee; font-weight: 700; }
                                    .blog-content em { font-style: italic; color: #cbd5e1; }
                                    .blog-content figure { margin: 2.5rem 0; }
                                    .blog-content img { border-radius: 1rem; border: 1px solid rgba(148, 163, 184, 0.1); width: 100%; }
                                    .blog-content figcaption { text-align: center; color: #64748b; font-size: 0.875rem; margin-top: 0.75rem; }
                                    .blog-content code { background: #1e293b; color: #f472b6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; }
                                    .blog-content a { color: #22d3ee; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
                                    .blog-content a:hover { border-bottom-color: #22d3ee; }
                                `}</style>
                                
                                <div 
                                    ref={contentRef}
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: processedContent }}
                                />

                                {/* CTA Inside Blog */}
                                <div className="mt-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 group-hover:opacity-100 transition-opacity"></div>
                                    <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to Transform Your Digital Presence?</h3>
                                    <Link to="/contact">
                                        <PremiumButton className="relative z-10">Start Your Project</PremiumButton>
                                    </Link>
                                </div>
                            </div>

                            {/* Author Box */}
                            <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-3xl text-slate-500 font-bold overflow-hidden border-2 border-slate-700">
                                    <img src="https://ui-avatars.com/api/?name=Sameer+Digital&background=0f172a&color=22d3ee" alt="Author" className="w-full h-full object-cover"/>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-2xl font-bold text-white mb-1">{blogData.author || "Sameer Digital Lab"}</h4>
                                    <p className="text-sm text-cyan-400 font-bold uppercase tracking-wider mb-4">Role: {blogData.role || "Administrator"}</p>
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
                                    {existingComments.length === 0 && (
                                        <p className="text-slate-500 text-sm italic">No comments yet. Be the first to start the conversation!</p>
                                    )}
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

                        {/* RIGHT SIDEBAR: Dynamic Table of Contents (Sticky) */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                                        <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
                                        Table of Contents
                                    </h4>
                                    
                                    {/* Dynamic Navigation */}
                                    <nav className="space-y-3 relative">
                                        {/* Vertical line track */}
                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800 ml-1.5"></div>
                                        
                                        {tocItems.map((item) => (
                                            <div key={item.id} className={`relative ${item.level === 'h3' ? 'pl-10 space-y-2' : 'pl-6'}`}>
                                                {item.level === 'h2' && activeId === item.id && (
                                                    <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-900 border-2 border-cyan-500 rounded-full z-10 transition-all"></div>
                                                )}
                                                
                                                <a 
                                                    href={`#${item.id}`}
                                                    onClick={(e) => scrollToSection(e, item.id)}
                                                    className={`
                                                        block transition-colors duration-200
                                                        ${item.level === 'h2' ? 'text-sm font-medium' : 'text-xs border-l pl-3'}
                                                        ${activeId === item.id 
                                                            ? (item.level === 'h2' ? 'text-cyan-400' : 'text-cyan-400 border-cyan-500') 
                                                            : (item.level === 'h2' ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-500 hover:text-cyan-400 border-slate-800 hover:border-cyan-500/50')
                                                        }
                                                    `}
                                                >
                                                    {item.text}
                                                </a>
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                                
                                {/* Social Share */}
                                <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-4 text-center">Share this article</p>
                                    <div className="flex justify-center gap-4">
                                        <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all" title="Share on Twitter">
                                            <TwitterIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all" title="Share on LinkedIn">
                                            <LinkedinIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all" title="Share on Facebook">
                                            <FacebookIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-500 hover:text-white transition-all" title="Copy Link">
                                            <LinkIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

            {/* --- RELATED BLOGS SECTION (Bottom) --- */}
            <section className="bg-slate-900 py-20 border-t border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">Related Blogs</h3>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedBlogs
                            .filter(b => b.category === blogData.category || b.category === 'Technology') 
                            .slice(0, 3)
                            .map((blog) => (
                            <Link to="/blog" key={blog.id} className="group cursor-pointer">
                                <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 rounded bg-slate-950/80 text-[10px] font-bold text-white uppercase tracking-wider">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h4 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-400 transition-colors">
                                            {blog.title}
                                        </h4>
                                        <div className="flex items-center text-slate-500 text-xs font-bold group-hover:text-white transition-colors gap-2 mt-auto pt-4">
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
