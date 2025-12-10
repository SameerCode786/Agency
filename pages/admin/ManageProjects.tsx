
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion } from 'framer-motion';
import PremiumButton from '../../components/PremiumButton';
import { CodeIcon } from '../../components/Icons';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image1: string;
    image2: string;
    tools: string[];
    role: string;
    timeline: string;
}

const ManageProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form State
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        title: '',
        category: '',
        description: '',
        image1: '',
        image2: '',
        tools: [],
        role: '',
        timeline: ''
    });
    const [toolsInput, setToolsInput] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching projects:', error);
        else setProjects(data || []);
        setLoading(false);
    };

    const handleSave = async () => {
        const projectData = {
            ...currentProject,
            tools: toolsInput.split(',').map(t => t.trim()).filter(t => t !== '')
        };

        if (currentProject.id) {
            // Update
            const { error } = await supabase.from('projects').update(projectData).eq('id', currentProject.id);
            if (error) alert('Error updating project');
        } else {
            // Insert
            const { error } = await supabase.from('projects').insert([projectData]);
            if (error) alert('Error creating project');
        }

        setIsEditing(false);
        fetchProjects();
        resetForm();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) alert('Error deleting project');
        else fetchProjects();
    };

    const resetForm = () => {
        setCurrentProject({});
        setToolsInput('');
    };

    const openEdit = (project: Project) => {
        setCurrentProject(project);
        setToolsInput(project.tools ? project.tools.join(', ') : '');
        setIsEditing(true);
    };

    const openNew = () => {
        resetForm();
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">{currentProject.id ? 'Edit Project' : 'New Project'}</h3>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">Cancel</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input placeholder="Project Title" value={currentProject.title || ''} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <input placeholder="Category (e.g. SaaS, Web)" value={currentProject.category || ''} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <textarea placeholder="Description" rows={4} value={currentProject.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <input placeholder="Role (e.g. Lead Developer)" value={currentProject.role || ''} onChange={e => setCurrentProject({...currentProject, role: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <input placeholder="Timeline (e.g. 4 Weeks)" value={currentProject.timeline || ''} onChange={e => setCurrentProject({...currentProject, timeline: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                    </div>
                    <div className="space-y-4">
                        <input placeholder="Image 1 URL (Main)" value={currentProject.image1 || ''} onChange={e => setCurrentProject({...currentProject, image1: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <input placeholder="Image 2 URL (Hover)" value={currentProject.image2 || ''} onChange={e => setCurrentProject({...currentProject, image2: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg text-white" />
                        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                            <label className="block text-xs uppercase text-slate-500 mb-2">Tools (Comma separated)</label>
                            <input placeholder="React, Node.js, Supabase" value={toolsInput} onChange={e => setToolsInput(e.target.value)} className="w-full bg-transparent text-white focus:outline-none" />
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <PremiumButton onClick={handleSave} icon={false} className="!px-8 !py-3">Save Project</PremiumButton>
                </div>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex justify-end mb-6">
                <PremiumButton onClick={openNew} icon={true} className="!px-6 !py-2 text-sm">Add New Project</PremiumButton>
            </div>

            {loading ? (
                <div className="text-center text-slate-500 py-10">Loading projects...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map(project => (
                        <div key={project.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                            <div className="w-16 h-16 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
                                {project.image1 && <img src={project.image1} alt={project.title} className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">{project.title}</h4>
                                <p className="text-slate-500 text-sm">{project.category}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(project)} className="px-3 py-1.5 bg-slate-900 text-cyan-400 rounded-lg text-xs font-bold hover:bg-cyan-500/20">Edit</button>
                                <button onClick={() => handleDelete(project.id)} className="px-3 py-1.5 bg-slate-900 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20">Delete</button>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && <p className="text-slate-500 text-center">No projects found.</p>}
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
