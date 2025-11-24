
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import { CodeIcon, MobileIcon, DesignIcon, SpeedIcon, MaintenanceIcon, StrategyIcon } from '../components/Icons';
import { Link } from 'react-router-dom';
import { useSeoContent } from '../hooks/useSeoContent';
import PremiumButton from '../components/PremiumButton';

const services = [
  {
    icon: <CodeIcon className="h-10 w-10 text-purple-400" />,
    title: 'Web Development',
    description: 'We create high-performance, secure, and scalable web applications using modern technologies like React, Node.js, and more. From landing pages to complex enterprise platforms.',
    tools: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    icon: <MobileIcon className="h-10 w-10 text-purple-400" />,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps that deliver a seamless user experience on both iOS and Android. We use React Native & Expo to build beautiful and functional apps efficiently.',
    tools: ['React Native', 'Expo', 'iOS', 'Android']
  },
  {
    icon: <DesignIcon className="h-10 w-10 text-purple-400" />,
    title: 'UI/UX Design',
    description: 'User-centric design is at the heart of what we do. We craft intuitive, engaging, and aesthetically pleasing interfaces that drive user satisfaction and conversion.',
    tools: ['Figma', 'Adobe XD', 'Sketch']
  },
  {
    icon: <SpeedIcon className="h-10 w-10 text-purple-400" />,
    title: 'Website Speed Optimization',
    description: 'A slow website costs you customers. We analyze and optimize every aspect of your site to ensure lightning-fast load times and a top-tier user experience.',
    tools: ['Lighthouse', 'GTmetrix', 'CDNs']
  },
  {
    icon: <MaintenanceIcon className="h-10 w-10 text-purple-400" />,
    title: 'Website Maintenance',
    description: 'Keep your digital assets secure, updated, and running smoothly with our comprehensive maintenance plans. We handle the technical stuff so you can focus on your business.',
    tools: ['Backups', 'Security Scans', 'Updates']
  },
  {
    icon: <StrategyIcon className="h-10 w-10 text-purple-400" />,
    title: 'Branding & Digital Strategy',
    description: 'We help you build a strong, cohesive brand identity and a digital strategy that aligns with your business goals, ensuring you stand out in a crowded market.',
    tools: ['Market Research', 'SEO', 'Content Strategy']
  },
];

const ServicesPage: React.FC = () => {
    const { title, description } = useSeoContent('Services');
  return (
    <PageWrapper>
       <title>{title}</title>
       <meta name="description" content={description} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
        <div className="text-center mb-16">
          <AnimatedHeading text="Our Digital Solutions" className="text-4xl md:text-6xl font-bold mb-4" />
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            We offer a comprehensive suite of services to power your digital presence from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 flex-grow">{service.description}</p>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-300 mb-2">Tools & Tech:</h4>
                <div className="flex flex-wrap gap-2">
                    {service.tools.map(tool => (
                        <span key={tool} className="text-xs bg-gray-800 text-purple-300 px-2 py-1 rounded">{tool}</span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <section className="mt-24 py-16 text-center bg-gray-900/50 rounded-lg border border-purple-500/20">
            <div className="container mx-auto px-4">
                <AnimatedHeading text="Ready to Elevate Your Brand?" className="text-3xl md:text-4xl font-bold mb-4"/>
                <p className="max-w-2xl mx-auto text-gray-400 mb-8">Let's discuss how our services can help you achieve your goals.</p>
                <Link to="/contact">
                    <PremiumButton>Schedule a Call</PremiumButton>
                </Link>
            </div>
      </section>

      </div>
    </PageWrapper>
  );
};

export default ServicesPage;
