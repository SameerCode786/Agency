
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { EmailIcon, RocketIcon, CheckIcon, LoaderIcon, StarIcon, MaintenanceIcon } from '../../components/Icons';
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
    const [senderName, setSenderName] = useState('Sameer Digital Lab Admin');
    const [scheduleMode, setScheduleMode] = useState<'now' | 'later'>('now');
    const [scheduleDate, setScheduleDate] = useState('');
    
    const [isSending, setIsSending] = useState(false);
    const [sendingProgress, setSendingProgress] = useState('');
    const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
    
    // Settings State
    const [showSettings, setShowSettings] = useState(false);
    const [accessKey, setAccessKey] = useState(localStorage.getItem('web3forms_access_key') || '');

    // Derived state for email count
    const validEmails = recipients.split(/[\n,]+/).map(e => e.trim()).filter(e => e.includes('@') && e.includes('.'));

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const { data, error } = await supabase.from('email_campaigns').select('*').order('created_at', { ascending: false });
        if (data) setCampaigns(data);
    };

    const saveSettings = () => {
        localStorage.setItem('web3forms_access_key', accessKey);
        setShowSettings(false);
        alert("Settings saved successfully!");
    };

    const handleRealSend = async () => {
        if (validEmails.length === 0) return alert("Please enter at least one valid email address.");
        if (!subject) return alert("Please enter a subject.");
        if (!body) return alert("Please enter email content.");
        if (!accessKey) {
            return alert("⚠️ Web3Forms Access Key Missing.\n\nPlease click the 'Settings' (Gear) icon at the top right to enter your Web3Forms Access Key.");
        }

        setIsSending(true);
        let successCount = 0;

        // Loop through emails and send individually using Web3Forms API
        for (let i = 0; i < validEmails.length; i++) {
            const email = validEmails[i];
            setSendingProgress(`Sending to ${email} (${i + 1}/${validEmails.length})...`);
            
            try {
                const formData = new FormData();
                formData.append("access_key", accessKey);
                formData.append("name", senderName);
                formData.append("email", email); // Recipient email
                formData.append("subject", subject);
                formData.append("message", body);

                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    successCount++;
                } else {
                    console.error(`Failed to send to ${email}:`, result.message);
                }
            } catch (error: any) {
                console.error(`Error sending to ${email}:`, error);
            }
            
            // Delay to prevent rate limiting
            await new Promise(r => setTimeout(r, 1000));
        }

        finishCampaign(successCount);
    };

    const handleMailTo = () => {
        if (validEmails.length === 0) return alert("Please enter recipients.");
        // Create a mailto link (limitations apply to length)
        const bcc = validEmails.join(',');
        const mailtoLink = `mailto:?bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Check length
        if (mailtoLink.length > 2000) {
            alert("⚠️ Too many recipients for 'Quick Send'. Please use the 'Web3Forms' button or copy the list.");
        } else {
            window.location.href = mailtoLink;
            // Log as sent locally
            finishCampaign(validEmails.length);
        }
    };

    const finishCampaign = async (count: number) => {
        const newCampaign = {
            subject,
            recipient_count: count,
            status: scheduleMode === 'now' ? 'Sent' : 'Scheduled',
            scheduled_date: scheduleMode === 'later' ? scheduleDate : new Date().toISOString(),
            created_at: new Date().toISOString(),
        };

        // Log to supabase if table exists, otherwise just local state update
        const { error } = await supabase.from('email_campaigns').insert([newCampaign]);
        if (error) {
             setCampaigns(prev => [{ ...newCampaign, id: Math.random(), status: newCampaign.status as any }, ...prev]);
        } else {
            fetchHistory();
        }

        setIsSending(false);
        setSendingProgress('');
        
        if (count > 0) {
            alert("Email sent successfully!");
            setRecipients('');
            setSubject('');
            setBody('');
        } else {
            alert("Failed to send email!");
        }
    };

    return (
        <div className="relative h-full">
            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Web3Forms Configuration</h3>
                            <p className="text-xs text-slate-400 mb-4">
                                Get your Access Key from <a href="https://web3forms.com/" target="_blank" className="text-cyan-400 underline">Web3Forms</a>.
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Access Key</label>
                                    <input 
                                        value={accessKey} 
                                        onChange={e => setAccessKey(e.target.value)} 
                                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-white text-sm" 
                                        placeholder="Enter your Access Key" 
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                                <button onClick={saveSettings} className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-500">Save Config</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-8 h-full">
                
                {/* LEFT: Compose Area */}
                <div className="flex-1 space-y-6">
                    
                    {/* Header */}
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Compose Campaign</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span>Provider:</span>
                                <span className="bg-slate-800 text-cyan-400 px-3 py-1 rounded-md border border-slate-700 font-mono text-xs">
                                    Web3Forms
                                </span>
                                {accessKey ? (
                                    <span className="text-xs ml-2 flex items-center text-green-400 gap-1"><CheckIcon className="w-3 h-3"/> Configured</span>
                                ) : (
                                    <span className="text-xs ml-2 flex items-center text-yellow-400 gap-1">⚠️ Missing Key</span>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowSettings(true)}
                            className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-cyan-500 transition-all"
                            title="Configure Web3Forms"
                        >
                            <MaintenanceIcon className="w-5 h-5" />
                        </button>
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
                                placeholder="Paste emails here (separated by commas or new lines)...&#10;client1@example.com&#10;client2@example.com" 
                                rows={4} 
                                value={recipients} 
                                onChange={e => setRecipients(e.target.value)} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none font-mono text-sm" 
                            />
                        </div>

                        {/* Sender Name */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sender Name</label>
                            <input 
                                placeholder="e.g. Sameer Digital Lab Admin" 
                                value={senderName} 
                                onChange={e => setSenderName(e.target.value)} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:border-cyan-500 outline-none font-bold" 
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
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Body (Message)</label>
                            <textarea 
                                placeholder="Write your message here..." 
                                rows={8} 
                                value={body} 
                                onChange={e => setBody(e.target.value)} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm focus:border-cyan-500 outline-none" 
                            />
                        </div>

                        <div className="pt-2 flex flex-col md:flex-row gap-3">
                            <PremiumButton onClick={handleRealSend} icon={false} width="full" className={isSending ? "opacity-70 cursor-not-allowed flex-1" : "flex-1"}>
                                {isSending ? (
                                    <span className="flex items-center gap-2 justify-center"><LoaderIcon className="w-5 h-5 animate-spin" /> {sendingProgress}</span>
                                ) : (
                                    <span className="flex items-center gap-2 justify-center">
                                        <RocketIcon className="w-5 h-5" />
                                        Send via Web3Forms
                                    </span>
                                )}
                            </PremiumButton>
                            
                            <button 
                                onClick={handleMailTo}
                                className="flex-1 border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-500 hover:bg-slate-800 rounded-full font-bold py-4 transition-all flex items-center justify-center gap-2"
                            >
                                <EmailIcon className="w-5 h-5" />
                                Quick Send (Mail App)
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-500 text-center">
                            * "Send via Web3Forms" requires an Access Key. "Quick Send" opens your computer's mail app.
                        </p>
                    </div>
                </div>

                {/* RIGHT: History / Queue */}
                <div className="w-full lg:w-80 border-l border-slate-800 pl-0 lg:pl-8 pt-8 lg:pt-0">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        Campaign History
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{campaigns.length}</span>
                    </h3>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default ManageEmails;
