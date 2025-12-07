
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import { useSeoContent } from '../hooks/useSeoContent';
import ParticleBackground from '../components/ParticleBackground';
import PremiumButton from '../components/PremiumButton';
import { Link } from 'react-router-dom';
import { CodeIcon, DesignIcon, StrategyIcon, RocketIcon, CheckIcon } from '../components/Icons';

const experienceData = [
    { year: '2018', role: 'The Beginning', desc: 'Started as a solo freelancer, building custom websites for small businesses and mastering the core web technologies.' },
    { year: '2020', role: 'Scaling Up', desc: 'Expanded into full-stack development, working with startups to build scalable React applications and robust backends.' },
    { year: '2022', role: 'Team Leadership', desc: 'Took on lead engineering roles, mentoring developers and architecting complex systems for enterprise clients.' },
    { year: '2024', role: 'Sameer Digital Lab', desc: 'Founded the agency to bridge the gap between creative design and technical excellence, delivering premium digital solutions.' },
];

const values = [
    {
        title: "Innovation First",
        desc: "We don't just follow trends; we set them. Utilizing the latest tech like AI and Web3 to keep you ahead.",
        icon: <RocketIcon className="w-8 h-8 text-cyan-400" />
    },
    {
        title: "Pixel Perfection",
        desc: "Every detail matters. From the micro-interactions to the overall layout, we obsess over quality.",
        icon: <DesignIcon className="w-8 h-8 text-purple-400" />
    },
    {
        title: "Transparent Process",
        desc: "No hidden costs, no jargon. Just clear communication and a roadmap you can follow.",
        icon: <StrategyIcon className="w-8 h-8 text-blue-400" />
    },
    {
        title: "Clean Code",
        desc: "Scalable, maintainable, and fast. We write code that future developers will thank us for.",
        icon: <CodeIcon className="w-8 h-8 text-green-400" />
    }
];

const AboutPage: React.FC = () => {
    const { title, description } = useSeoContent('About');

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 bg-slate-950 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Who We Are</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        The Minds Behind <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">The Magic</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Sameer Digital Lab is more than just a dev shop. We are a collective of creative technologists, designers, and strategists passionate about building the future of the web. 
                    </p>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Founded by Sameer, a veteran developer with a vision to merge aesthetic beauty with engineering rigor, we help ambitious brands transform their digital presence.
                    </p>
                    <Link to="/contact">
                        <PremiumButton>Work With Us</PremiumButton>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                            alt="Team Collaboration" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/30"></div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* DIGITAL DNA (VALUES) */}
      <section className="py-24 bg-slate-900 border-y border-slate-800 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-4">Our Digital DNA</h2>
                  <p className="text-slate-400">The core principles that drive every pixel and line of code.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-2 group"
                      >
                          <div className="mb-6 p-4 rounded-full bg-slate-900 border border-slate-800 w-fit group-hover:scale-110 transition-transform">
                              {val.icon}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-20">
                  <span className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-4 block">Evolution</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Our Journey</h2>
              </div>

              <div className="relative max-w-4xl mx-auto">
                  {/* Central Line */}
                  <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-slate-800 md:-translate-x-1/2"></div>

                  <div className="space-y-12">
                      {experienceData.map((item, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                          >
                              <div className="hidden md:block w-1/2"></div>
                              
                              {/* Timeline Node */}
                              <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-slate-950 border-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                              
                              {/* Content Card */}
                              <div className="w-full md:w-1/2 pl-8 md:pl-0 md:pr-0">
                                  <div className={`bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-colors relative ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                      {/* Arrow for Desktop */}
                                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 border-l border-t border-slate-800 transform rotate-45 ${index % 2 === 0 ? '-right-2.5 border-r border-b border-l-0 border-t-0 bg-slate-900' : '-left-2.5'}`}></div>
                                      
                                      <span className="text-cyan-400 font-bold text-xl mb-2 block">{item.year}</span>
                                      <h3 className="text-white text-lg font-bold mb-2">{item.role}</h3>
                                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                  </div>
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

    </PageWrapper>
  );
};

export default AboutPage;
