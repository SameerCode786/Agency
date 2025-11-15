
import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSeoContent } from '../hooks/useSeoContent';

const blogPosts = [
  { id: 1, title: 'The Future of Web Development in 2024', category: 'Tech', image: 'https://picsum.photos/seed/b1/400/250', excerpt: 'Exploring the latest trends, from AI integration to serverless architecture...' },
  { id: 2, title: '5 UI/UX Principles for Higher Conversion', category: 'Design', image: 'https://picsum.photos/seed/b2/400/250', excerpt: 'Learn how to apply key design principles to create interfaces that users love...' },
  { id: 3, title: 'Why Your Business Needs a Mobile App', category: 'Business', image: 'https://picsum.photos/seed/b3/400/250', excerpt: 'In a mobile-first world, having a dedicated app can be a game-changer...' },
  { id: 4, title: 'Mastering React Hooks: A Deep Dive', category: 'Tech', image: 'https://picsum.photos/seed/b4/400/250', excerpt: 'Go beyond useState and useEffect to unlock the full power of React Hooks...' },
  { id: 5, title: 'The Art of Minimalist Web Design', category: 'Design', image: 'https://picsum.photos/seed/b5/400/250', excerpt: 'Less is more. Discover how minimalism can improve aesthetics and usability...' },
  { id: 6, title: 'Digital Strategy for Startups', category: 'Business', image: 'https://picsum.photos/seed/b6/400/250', excerpt: 'A roadmap for building a strong online presence from the ground up...' },
];

const categories = ['All', 'Tech', 'Design', 'Business'];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const { title, description } = useSeoContent('Blog');

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => category === 'All' || post.category === category)
      .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, category]);

  return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
        <div className="text-center mb-12">
          <AnimatedHeading text="Digital Insights" className="text-4xl md:text-6xl font-bold mb-4" />
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            Stay ahead of the curve with our articles on technology, design, and digital strategy.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex justify-center space-x-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  category === cat ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-sm bg-gray-700 text-cyan-300 px-2 py-1 rounded-full mb-2 inline-block">{post.category}</span>
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                <Link to="#" className="font-semibold text-cyan-400 hover:underline">
                  Read More &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BlogPage;