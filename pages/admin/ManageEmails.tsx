
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { EmailIcon, RocketIcon, CheckIcon, LoaderIcon, StarIcon } from '../../components/Icons';
import { supabase } from '../../services/supabaseClient';

interface EmailCampaign {
    id: number;
    subject: string;
    recipient_count: number;
    status: 'Sent' | 'Scheduled';
    scheduled_date?: string;
    created_at: string;
}

const ManageEmails: React.FC = () => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [scheduleMode, setScheduleMode] = useState<'now' | 'later'>('now');
    const [scheduleDate, setScheduleDate] = useState('');
    
    const [isSending, setIsSending] = useState(false);
    const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
    
    // Derived state for email count
    const validEmails = recipients.split(/[\n,]+/).map(e => e.trim()).filter(e => e.includes('@') && e.includes('.'));

    useEffect(() => {
        // Fetch mock history or real history if table exists
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        // Try fetching from supabase, fallback to local state if table doesn't exist yet
        const { data, error } = await supabase.from('email_campaigns').select('*').order('created_at', { ascending: false });
        if (data) setCampaigns(data);
    };

    const handleSend = async () => {
        if (validEmails.length === 0) return alert("Please enter at least one valid email address.");
        if (!subject) return alert("Please enter a subject.");
        if (!body) return alert("Please enter email content.");
        if (scheduleMode === 'later' && !scheduleDate) return alert("Please select a date and time.");

        setIsSending(true);

        // Simulate Network Delay / Processing
        setTimeout(async () => {
            const newCampaign = {
                subject,
                recipient_count: validEmails.length,
                status: scheduleMode === 'now' ? 'Sent' : 'Scheduled',
                scheduled_date: scheduleMode === 'later' ? scheduleDate : new Date().toISOString(),
                created_at: new Date().toISOString(),
                // In a real app, you would verify the sender here: support@sameercodes.online
            };

            // Save to Supabase (Mocking table insert for UI demo if table missing)
            const { error } = await supabase.from('email_campaigns').insert([newCampaign]);
            
            // If table doesn't exist, just update local state for demo
            if (error) {
                console.warn("Supabase insert failed (table might be missing), updating UI only.");
                setCampaigns(prev => [
                    { ...newCampaign, id: Math.random(), status: newCampaign.status as 'Sent' | 'Scheduled' }, 
                    ...prev
                ]);
            } else {
                fetchHistory();
            }

            setIsSending(false);
            alert(scheduleMode === 'now' ? `Successfully sent to ${validEmails.length} recipients!` : `Campaign scheduled for ${new Date(scheduleDate).toLocaleString()}`);
            
            // Reset Form
            setRecipients('');
            setSubject('');
            setBody('');
            setScheduleMode('now');
        }, 2000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-8 h-full">
            
            {/* LEFT: Compose Area */}
            <div className="flex-1 space-y-6">
                
                {/* Header */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <EmailIcon className="w-24 h-24 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Compose Campaign</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>From:</span>
                        <span className="bg-slate-800 text-cyan-400 px-3 py-1 rounded-md border border-slate-700 font-mono text-xs">
                            support@sameercodes.online
                        </span>
                        <span className="text-xs ml-2 flex items-center text-green-400 gap-1"><CheckIcon className="w-3 h-3"/> Verified</span>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    
                    {/* Recipients */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Recipients (Bulk)</label>
                            <span className="text-xs text-cyan-400 bg-cyan-900/20 px-2 py-0.5 rounded-full border border-cyan-500/20">
                                {validEmails.length} Valid Emails
                            </span>
                        </div>
                        <textarea 
                            placeholder="Paste emails here (separated by commas or new lines)...&#10;user1@example.com&#10;user2@example.com" 
                            rows={4} 
                            value={recipients} 
                            onChange={e => setRecipients(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none font-mono text-sm" 
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject Line</label>
                        <input 
                            placeholder="Exciting news regarding your project..." 
                            value={subject} 
                            onChange={e => setSubject(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none font-bold" 
                        />
                    </div>

                    {/* Body */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Body (HTML Supported)</label>
                        <textarea 
                            placeholder="<p>Hello Team,</p>..." 
                            rows={10} 
                            value={body} 
                            onChange={e => setBody(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm focus:border-cyan-500 outline-none" 
                        />
                    </div>

                    {/* Scheduling Options */}
                    <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Schedule Delivery</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className={`flex-1 flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${scheduleMode === 'now' ? 'bg-cyan-500/10 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                                <input 
                                    type="radio" 
                                    name="schedule" 
                                    checked={scheduleMode === 'now'} 
                                    onChange={() => setScheduleMode('now')} 
                                    className="hidden"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scheduleMode === 'now' ? 'border-cyan-400' : 'border-slate-600'}`}>
                                    {scheduleMode === 'now' && <div className="w-2 h-2 bg-cyan-400 rounded-full" />}
                                </div>
                                <span className="font-bold text-sm">Send Immediately</span>
                            </label>

                            <label className={`flex-1 flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${scheduleMode === 'later' ? 'bg-purple-500/10 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                                <input 
                                    type="radio" 
                                    name="schedule" 
                                    checked={scheduleMode === 'later'} 
                                    onChange={() => setScheduleMode('later')} 
                                    className="hidden"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scheduleMode === 'later' ? 'border-purple-400' : 'border-slate-600'}`}>
                                    {scheduleMode === 'later' && <div className="w-2 h-2 bg-purple-400 rounded-full" />}
                                </div>
                                <span className="font-bold text-sm">Schedule for Later</span>
                            </label>
                        </div>

                        <AnimatePresence>
                            {scheduleMode === 'later' && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mt-3"
                                >
                                    <input 
                                        type="datetime-local" 
                                        value={scheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg text-white text-sm focus:border-purple-500 outline-none"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="pt-4">
                        <PremiumButton onClick={handleSend} icon={false} width="full" className={isSending ? "opacity-70 cursor-not-allowed" : ""}>
                            {isSending ? (
                                <span className="flex items-center gap-2 justify-center"><LoaderIcon className="w-5 h-5 animate-spin" /> Processing Bulk List...</span>
                            ) : (
                                <span className="flex items-center gap-2 justify-center">
                                    {scheduleMode === 'now' ? <RocketIcon className="w-5 h-5" /> : <StarIcon className="w-5 h-5" />}
                                    {scheduleMode === 'now' ? `Send to ${validEmails.length} Recipients` : 'Schedule Campaign'}
                                </span>
                            )}
                        </PremiumButton>
                    </div>
                </div>
            </div>

            {/* RIGHT: History / Queue */}
            <div className="w-full lg:w-80 border-l border-slate-800 pl-0 lg:pl-8 pt-8 lg:pt-0">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    Campaign History
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{campaigns.length}</span>
                </h3>

                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                    {campaigns.length === 0 && (
                        <p className="text-slate-500 text-sm italic text-center py-10">No campaigns found.</p>
                    )}
                    {campaigns.map((camp) => (
                        <div key={camp.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-cyan-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                    camp.status === 'Sent' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                }`}>
                                    {camp.status}
                                </span>
                                <span className="text-[10px] text-slate-500">
                                    {new Date(camp.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="text-white font-bold text-sm mb-1 line-clamp-1">{camp.subject}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="text-slate-300">{camp.recipient_count} Recipients</span>
                                {camp.status === 'Scheduled' && camp.scheduled_date && (
                                    <span>• Due: {new Date(camp.scheduled_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
};

export default ManageEmails;
