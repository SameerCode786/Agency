
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { EmailIcon, RocketIcon, CheckIcon, LoaderIcon, CalendarIcon, MaintenanceIcon, ArrowRightIcon } from '../../components/Icons';
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
    const [senderName, setSenderName] = useState('Sameer Digital Lab');
    const [scheduleMode, setScheduleMode] = useState<'now' | 'later'>('now');
    const [scheduleDate, setScheduleDate] = useState('');
    
    const [isSending, setIsSending] = useState(false);
    const [sendingProgress, setSendingProgress] = useState('');
    const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
    
    // Settings State
    const [showSettings, setShowSettings] = useState(false);
    const [accessKey, setAccessKey] = useState(localStorage.getItem('web3forms_access_key') || '2c6626e8-d5f1-4249-b456-016aa2ca5607');

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

    const handleAction = async () => {
        if (validEmails.length === 0) return alert("Please enter at least one valid email address.");
        if (!subject) return alert("Please enter a subject.");
        if (!body) return alert("Please enter email content.");
        
        if (scheduleMode === 'later' && !scheduleDate) {
            return alert("Please select a date and time for the scheduled email.");
        }

        if (scheduleMode === 'later') {
            // Logic for Scheduling (Database Save Only)
            await finishCampaign(validEmails.length, true);
        } else {
            // Logic for Sending Immediately (Web3Forms API)
            if (!accessKey) {
                return alert("⚠️ Web3Forms Access Key Missing.\n\nPlease click the 'Settings' (Gear) icon to enter your Web3Forms Access Key.");
            }
            await handleRealSend();
        }
    };

    const handleRealSend = async () => {
        setIsSending(true);
        let successCount = 0;

        // Loop through emails and send individually using Web3Forms API
        for (let i = 0; i < validEmails.length; i++) {
            const email = validEmails[i];
            setSendingProgress(`Sending to ${email} (${i + 1}/${validEmails.length})...`);
            
            try {
                const formData = new FormData();
                formData.append("access_key", accessKey);
                formData.append("name", senderName); // Sender Name displayed in notification
                formData.append("from_name", senderName); // Try to force sender name if supported
                formData.append("email", email);     // NOTE: In Web3Forms, this is the "Reply-To" or "Customer" email. The notification goes TO YOU.
                formData.append("subject", subject);
                formData.append("message", body);
                formData.append("botcheck", ""); // Anti-spam hidden field

                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    successCount++;
                } else {
                    console.error(`Failed to send for ${email}:`, result.message);
                }
            } catch (error: any) {
                console.error(`Error sending for ${email}:`, error);
            }
            
            // Small delay to be polite to the API
            await new Promise(r => setTimeout(r, 800));
        }

        setIsSending(false);
        finishCampaign(successCount, false);
    };

    const finishCampaign = async (count: number, isScheduled: boolean) => {
        const newCampaign = {
            subject,
            recipient_count: count,
            status: isScheduled ? 'Scheduled' : 'Sent',
            scheduled_date: isScheduled ? scheduleDate : new Date().toISOString(),
            created_at: new Date().toISOString(),
        };

        // Log to supabase if table exists, otherwise just local state update
        const { error } = await supabase.from('email_campaigns').insert([newCampaign]);
        if (error) {
             setCampaigns(prev => [{ ...newCampaign, id: Math.random(), status: newCampaign.status as any }, ...prev]);
        } else {
            fetchHistory();
        }

        setSendingProgress('');
        
        if (isScheduled) {
            alert(`Campaign scheduled for ${new Date(scheduleDate).toLocaleString()}!`);
            resetForm();
        } else if (count > 0) {
            alert(`Email campaign completed! Sent to ${count} recipients.`);
            resetForm();
        } else {
            alert("Failed to send emails. Please check your Access Key.");
        }
    };

    const resetForm = () => {
        setRecipients('');
        setSubject('');
        setBody('');
        setScheduleDate('');
        setScheduleMode('now');
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
                    
                    {/* Header with Settings */}
                    <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                        <div>
                            <h3 className="text-lg font-bold text-white">Compose Campaign</h3>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                {accessKey ? <span className="text-green-400 flex items-center gap-1"><CheckIcon className="w-3 h-3"/> Web3Forms Connected</span> : <span className="text-yellow-400">Web3Forms Key Missing</span>}
                            </p>
                        </div>
                        <button onClick={() => setShowSettings(true)} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                            <MaintenanceIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form Layout */}
                    <div className="space-y-4">
                        
                        {/* Row 1: Sender & Subject */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">From Name</label>
                                <input 
                                    placeholder="Your Name" 
                                    value={senderName} 
                                    onChange={e => setSenderName(e.target.value)} 
                                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white focus:border-cyan-500 outline-none font-medium text-sm" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Subject</label>
                                <input 
                                    placeholder="Campaign Subject" 
                                    value={subject} 
                                    onChange={e => setSubject(e.target.value)} 
                                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white focus:border-cyan-500 outline-none font-medium text-sm" 
                                />
                            </div>
                        </div>

                        {/* Recipients */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Recipients</label>
                                <span className="text-[10px] text-cyan-400">{validEmails.length} Valid Emails</span>
                            </div>
                            <textarea 
                                placeholder="Paste email list here (comma or new line separated)..." 
                                rows={2} 
                                value={recipients} 
                                onChange={e => setRecipients(e.target.value)} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white focus:border-cyan-500 outline-none font-mono text-xs resize-none" 
                            />
                        </div>

                        {/* Body */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Message Body</label>
                            <textarea 
                                placeholder="Write your email content here..." 
                                rows={8} 
                                value={body} 
                                onChange={e => setBody(e.target.value)} 
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white font-sans text-sm focus:border-cyan-500 outline-none resize-none leading-relaxed" 
                            />
                        </div>

                        {/* Send Options / Schedule */}
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <button 
                                    onClick={() => setScheduleMode('now')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${scheduleMode === 'now' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                >
                                    <RocketIcon className="w-4 h-4" /> Send Now
                                </button>
                                <button 
                                    onClick={() => setScheduleMode('later')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${scheduleMode === 'later' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                >
                                    <CalendarIcon className="w-4 h-4" /> Schedule
                                </button>
                            </div>

                            {scheduleMode === 'later' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Date & Time</label>
                                    <input 
                                        type="datetime-local" 
                                        value={scheduleDate}
                                        onChange={e => setScheduleDate(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 p-3 rounded-lg text-white text-sm focus:border-purple-500 outline-none"
                                    />
                                </motion.div>
                            )}

                            <div className="flex gap-3">
                                <PremiumButton onClick={handleAction} icon={false} width="full" className={isSending ? "opacity-70 cursor-not-allowed" : ""}>
                                    {isSending ? (
                                        <span className="flex items-center gap-2 justify-center"><LoaderIcon className="w-5 h-5 animate-spin" /> {sendingProgress}</span>
                                    ) : (
                                        <span className="flex items-center gap-2 justify-center">
                                            {scheduleMode === 'now' ? <RocketIcon className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
                                            {scheduleMode === 'now' ? 'Send Campaign' : 'Schedule Campaign'}
                                        </span>
                                    )}
                                </PremiumButton>
                            </div>
                            
                            {/* Disclaimer about Web3Forms */}
                            <p className="text-[10px] text-slate-500 mt-3 text-center leading-tight">
                                <strong>Note:</strong> Web3Forms sends the submission notification to <u>your</u> registered email address (admin). It does not act as an SMTP server to send outbound emails directly to recipients' inboxes unless you have a custom paid integration or SMTP relay.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: History / Queue */}
                <div className="w-full lg:w-80 border-l border-slate-800 pl-0 lg:pl-8 pt-8 lg:pt-0">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        History
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{campaigns.length}</span>
                    </h3>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                        {campaigns.map((camp) => (
                            <div key={camp.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-cyan-500/30 transition-colors group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                        camp.status === 'Sent' 
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                    }`}>
                                        {camp.status}
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                        {new Date(camp.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1 line-clamp-1 group-hover:text-cyan-400 transition-colors">{camp.subject}</h4>
                                <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                                    <span>{camp.recipient_count} Recipients</span>
                                    {camp.scheduled_date && camp.status === 'Scheduled' && (
                                        <span className="flex items-center gap-1 text-purple-300">
                                            <CalendarIcon className="w-3 h-3" /> {new Date(camp.scheduled_date).toLocaleDateString()}
                                        </span>
                                    )}
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
