import React from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, DesignIcon, CodeIcon, RocketIcon } from '../Icons';

const features = [
  {
    title: "Discovery & Strategy",
    description: "We start by understanding your vision, goals, and target audience. This phase involves deep-dive workshops, market research, and strategic planning to create a solid foundation for your project.",
    icon: <LightbulbIcon className="h-8 w-8 text-purple-400" />,
  },
  {
    title: "UI/UX Design",
    description: "Our design team crafts intuitive and visually stunning interfaces. We focus on creating a seamless user journey, from wireframes and prototypes to pixel-perfect designs that reflect your brand identity.",
    icon: <DesignIcon className="h-8 w-8 text-blue-400" />,
  },
  {
    title: "Development & Engineering",
    description: "Using the latest technologies, our developers bring the designs to life. We write clean, efficient, and scalable code to build a robust and high-performing website or application.",
    icon: <CodeIcon className="h-8 w-8 text-cyan-400" />,
  },
    {
    title: "Testing & Launch",
    description: "Rigorous testing ensures a bug-free and smooth experience across all devices. After your approval, we handle the deployment and launch, ensuring a successful rollout.",
    icon: <RocketIcon className="h-8 w-8 text-green-400" />,
  },
];

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}

// FIX: Explicitly typed the FeatureCard component with React.FC and a props interface.
// This resolves a TypeScript error where the `key` prop was being incorrectly included
// in the component's props, as TypeScript now correctly identifies it as a React-specific prop.
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 bg-slate-800/50 border border-slate-700/80 rounded-2xl"
        >
            <div className="flex items-center gap-4 mb-4">
                {icon}
                <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
            </div>
            <p className="text-slate-400">{description}</p>
        </motion.div>
    );
};


const ApproachSection = () => {
    return (
        <section className="relative py-24 sm:py-32 bg-gray-900/40">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Strategic Approach</h2>
                    <p className="text-slate-400 text-lg">A proven process for delivering exceptional digital products with precision and creativity.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        className="p-8 aspect-square rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                       <img src="https://res.cloudinary.com/dow2sbjsp/image/upload/v1719500052/approach-visual_b5gqf3.png" alt="Approach Visual" className="w-full h-full object-contain"/>
                    </motion.div>
                    <div className="space-y-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={feature.title} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApproachSection;