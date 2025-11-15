
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import { CodeIcon, MobileIcon, DesignIcon, ArrowRightIcon } from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';

// Mock Data
const services = [
  { icon: <CodeIcon className="h-8 w-8 text-cyan-400" />, title: 'Web Development', desc: 'Building fast, responsive, and scalable web applications.' },
  { icon: <MobileIcon className="h-8 w-8 text-cyan-400" />, title: 'Mobile App Development', desc: 'Crafting intuitive and high-performance mobile apps.' },
  { icon: <DesignIcon className="h-8 w-8 text-cyan-400" />, title: 'UI/UX Design', desc: 'Designing user-centric interfaces that captivate and convert.' },
];
const portfolio = [
    {id: 1, title: 'Project Alpha', category: 'Web App', image: 'https://picsum.photos/seed/alpha/600/400'},
    {id: 2, title: 'Project Beta', category: 'Mobile App', image: 'https://picsum.photos/seed/beta/600/400'},
    {id: 3, title: 'Project Gamma', category: 'UI/UX Design', image: 'https://picsum.photos/seed/gamma/600/400'},
];
const testimonials = [
    { quote: "Sameer Digital Lab transformed our online presence. Their expertise is unmatched!", name: "John Doe", company: "CEO, TechCorp" },
    { quote: "The best digital agency we've ever worked with. Highly recommended!", name: "Jane Smith", company: "Founder, Innovate LLC" },
    { quote: "Incredible attention to detail and a fantastic final product.", name: "Sam Wilson", company: "Marketing Head, Solutions Inc." }
]


const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="absolute inset-0 z-[-1]">
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Sameer Digital Lab
            </span>
          </motion.h1>
          <AnimatedHeading text="We Build The Future of Web" className="text-3xl md:text-5xl font-semibold text-gray-300 mb-8" />
          <motion.p 
            className="max-w-2xl mx-auto text-gray-400 md:text-xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A creative agency focused on crafting premium, high-performance digital experiences that elevate brands and engage users.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/portfolio">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg shadow-[0_0_20px_#22d3ee] transition-all duration-300">
                    View Our Work
                </motion.button>
            </Link>
            <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 border-2 border-gray-500 text-gray-300 font-bold rounded-full text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                    Get a Quote
                </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <AnimatedHeading text="Our Core Services" className="text-4xl md:text-5xl font-bold mb-4" />
          <p className="max-w-2xl mx-auto text-gray-400 mb-12">We provide end-to-end solutions to bring your digital vision to life.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center text-cyan-400 mt-4 font-semibold group">
                    Learn More <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <AnimatedHeading text="Featured Projects" className="text-4xl md:text-5xl font-bold mb-4" />
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">A glimpse into our world of creation and innovation.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolio.map((item, index) => (
                    <motion.div 
                        key={item.id}
                        className="group relative overflow-hidden rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                            <p className="text-cyan-400">{item.category}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <Link to="/portfolio" className="mt-12 inline-block">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg shadow-[0_0_20px_#22d3ee] transition-all duration-300">
                    Explore All Projects
                </motion.button>
            </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4 text-center">
              <AnimatedHeading text="What Our Clients Say" className="text-4xl md:text-5xl font-bold mb-12" />
              {/* This would be a slider in a real app, here we show the first one */}
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-xl md:text-2xl italic text-gray-300 mb-6">"{testimonials[0].quote}"</p>
                <h4 className="text-lg font-bold text-white">{testimonials[0].name}</h4>
                <p className="text-cyan-400">{testimonials[0].company}</p>
              </motion.div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
            <AnimatedHeading text="Have a project in mind?" className="text-4xl md:text-5xl font-bold mb-4"/>
            <p className="max-w-2xl mx-auto text-gray-400 mb-8">Let's build something amazing together. Reach out to us for a free consultation.</p>
            <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full text-xl shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300">
                    Start Your Project
                </motion.button>
            </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;