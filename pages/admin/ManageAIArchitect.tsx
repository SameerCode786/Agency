
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { generateWebsitePlan, WebsitePlan } from '../../services/geminiService';
import { LoaderIcon, BrainIcon, ArrowRightIcon, CheckIcon } from '../../components/Icons';

const ManageAIArchitect: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [plan, setPlan] = useState<WebsitePlan | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        
        setIsGenerating(true);
        setPlan(null);
        setGeneratedImageUrl(null);

        try {
            // 1. Get the Structure from Gemini
            const websitePlan = await generateWebsitePlan(prompt);
            setPlan(websitePlan);

            // 2. Generate Image using Pollinations with the refined prompt from Gemini
            const encodedPrompt = encodeURIComponent(websitePlan.visualPrompt);
            // Using nologo=true and high resolution
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
            setGeneratedImageUrl(imageUrl);

        } catch (error) {
            console.error("Architect Error:", error);
            alert("Failed to generate plan. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <BrainIcon className="w-6 h-6 text-purple-400" />
                        AI Website Architect
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Describe a website, and the AI will generate a visual structure, pages, and a UI mockup.
                    </p>
                </div>
            </div>

            {/* Input Section */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 shadow-xl">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                    What should we build?
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A sleek, dark-mode portfolio for a photographer with a gallery, contact form, and minimal typography. Use neon green accents."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all resize-none h-32 md:h-auto"
                    />
                    <div className="flex flex-col justify-end">
                        <PremiumButton 
                            onClick={handleGenerate} 
                            icon={false} 
                            className={`!py-4 md:!h-full ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <LoaderIcon className="w-5 h-5 animate-spin" /> Architecting...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Generate Blueprint <ArrowRightIcon className="w-5 h-5" />
                                </span>
                            )}
                        </PremiumButton>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <AnimatePresence>
                {plan && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12"
                    >
                        {/* Left: Visuals & Style */}
                        <div className="space-y-8">
                            {/* Visual Mockup */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group">
                                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">UI Preview</span>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                </div>
                                <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                                    {generatedImageUrl ? (
                                        <img 
                                            src={generatedImageUrl} 
                                            alt="AI Generated UI" 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-slate-600">
                                            <LoaderIcon className="w-8 h-8 animate-spin" />
                                            <span className="text-xs uppercase font-bold">Rendering Visuals...</span>
                                        </div>
                                    )}
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Color Palette */}
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Color Palette</h4>
                                <div className="flex gap-4">
                                    {plan.colorPalette.map((color, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                                            <div 
                                                className="w-12 h-12 rounded-full shadow-lg border-2 border-slate-800 group-hover:scale-110 transition-transform" 
                                                style={{ backgroundColor: color }}
                                            ></div>
                                            <span className="text-[10px] font-mono text-slate-500 uppercase">{color}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Typography & Tagline */}
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                <div className="mb-4">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Typography</h4>
                                    <p className="text-slate-400 text-sm font-mono bg-slate-950 p-2 rounded border border-slate-800 inline-block">
                                        {plan.typography}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Tagline</h4>
                                    <p className="text-xl font-serif italic text-purple-300">"{plan.tagline}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Structure & Content */}
                        <div className="space-y-6">
                            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                                <h3 className="text-3xl font-bold text-white mb-2">{plan.projectName}</h3>
                                <p className="text-slate-400 leading-relaxed">{plan.summary}</p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Sitemap & Features</h4>
                                {plan.pages.map((page, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-purple-500/30 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h5 className="text-lg font-bold text-white">{page.name}</h5>
                                            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">/{page.name.toLowerCase().replace(/\s/g, '-')}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-4">{page.content}</p>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {page.features.map((feature, fIdx) => (
                                                <span key={fIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">
                                                    <CheckIcon className="w-3 h-3" /> {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageAIArchitect;
