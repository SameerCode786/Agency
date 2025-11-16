import React from 'react';
import { motion } from 'framer-motion';
import { LayersIcon, DesignIcon, CodeIcon, LaunchIcon } from '../Icons';

const processSteps = [
    {
        icon: <DesignIcon className="h-8 w-8" />,
        title: "01. Design",
        description: "We create wireframes, mockups, and prototypes to visualize the user experience and interface."
    },
    {
        icon: <CodeIcon className="h-8 w-8" />,
        title: "02. Develop",
        description: "Our developers write clean, efficient code to build a fast, responsive, and scalable product."
    },
    {
        icon: <LayersIcon className="h-8 w-8" />,
        title: "03. Test",
        description: "We conduct rigorous testing to ensure quality, performance, and a bug-free experience."
    },
    {
        icon: <LaunchIcon className="h-8 w-8" />,
        title: "04. Launch",
        description: "We deploy the project to the server and provide support to ensure a smooth and successful launch."
    },
];

interface ProcessStepProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}

// FIX: Explicitly typed the ProcessStep component with React.FC and a props interface.
// This resolves a TypeScript error where the `key` prop was being incorrectly included
// in the component's props, as TypeScript now correctly identifies it as a React-specific prop.
const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title, description, index }) => {
    const isEven = index % 2 === 0;
    return (
        <motion.div
            className={`flex items-start gap-6 w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="flex-shrink-0 h-16 w-16 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center text-cyan-400">
                {icon}
            </div>
            <div className={`flex-grow ${isEven ? 'text-left' : 'text-right'}`}>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-400">{description}</p>
            </div>
        </motion.div>
    );
};


const ProcessSection = () => {
    return (
        <section className="py-24 sm:py-32 bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Development Process</h2>
                    <p className="text-slate-400 text-lg">A streamlined workflow to ensure quality and efficiency from start to finish.</p>
                </div>

                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700 -translate-x-1/2"></div>
                    <div className="space-y-24">
                        {processSteps.map((step, index) => (
                            <ProcessStep key={step.title} {...step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;