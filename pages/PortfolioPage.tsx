
import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';

const portfolioItems = [
  { id: 1, title: 'QuantumLeap CRM', category: 'Web', image: 'https://picsum.photos/seed/p1/500/350', industry: 'SaaS', tools: ['React', 'Node.js', 'Figma'], problem: 'Inefficient customer management.', solution: 'A streamlined CRM platform.' },
  { id: 2, title: 'ConnectSphere App', category: 'App', image: 'https://picsum.photos/seed/p2/500/350', industry: 'Social Media', tools: ['React Native', 'Firebase'], problem: 'Lack of genuine connections online.', solution: 'An app fostering meaningful interactions.' },
  { id: 3, title: 'Aether Aesthetics', category: 'UI/UX', image: 'https://picsum.photos/seed/p3/500/350', industry: 'E-commerce', tools: ['Figma', 'Adobe XD'], problem: 'Poor user experience and low conversion.', solution: 'A complete UI/UX overhaul for a fashion brand.' },
  { id: 4, title: 'DataVortex Dashboard', category: 'Web', image: 'https://picsum.photos/seed/p4/500/350', industry: 'FinTech', tools: ['Vue.js', 'D3.js'], problem: 'Complex data visualization.', solution: 'An intuitive analytics dashboard.' },
  { id: 5, title: 'NomadGo Travel App', category: 'App', image: 'https://picsum.photos/seed/p5/500/350', industry: 'Travel', tools: ['Expo', 'GraphQL'], problem: 'Difficulty in planning spontaneous trips.', solution: 'An AI-powered travel planning assistant.' },
  { id: 6, title: 'Zenith Branding', category: 'UI/UX', image: 'https://picsum.photos/seed/p6/500/350', industry: 'Wellness', tools: ['Illustrator', 'Figma'], problem: 'Outdated brand identity.', solution: 'A modern and serene rebranding.' },
];

const categories = ['All', 'Web', 'App', 'UI/UX'];

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { title, description } = useSeoContent('Portfolio');

  const filteredItems = useMemo(() => {
    if (filter === 'All') return portfolioItems;
    return portfolioItems.filter(item => item.category === filter);
  }, [filter]);

  return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
        <div className="text-center mb-12">
          <AnimatedHeading text="Our Creations" className="text-4xl md:text-6xl font-bold mb-4" />
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            We take pride in our work. Explore a selection of projects that showcase our skills and creativity.
          </p>
        </div>

        <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 md:px-6 rounded-full font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_#22d3ee]'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-lg border border-gray-800"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-sm bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full self-start mb-2">{item.industry}</span>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{item.solution}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {item.tools.map(tool => (
                            <span key={tool} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded">{tool}</span>
                        ))}
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default PortfolioPage;