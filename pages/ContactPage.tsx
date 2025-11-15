
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import { WhatsappIcon, EmailIcon, PhoneIcon } from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';

const ContactPage: React.FC = () => {
    const { title, description } = useSeoContent('Contact');
  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
        <div className="text-center mb-16">
          <AnimatedHeading text="Get In Touch" className="text-4xl md:text-6xl font-bold mb-4" />
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <h3 className="text-3xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <EmailIcon className="h-8 w-8 text-cyan-400" />
                        <div>
                            <h4 className="font-semibold text-lg">Email</h4>
                            <a href="mailto:hello@sameercodes.online" className="text-gray-400 hover:text-cyan-400">hello@sameercodes.online</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <PhoneIcon className="h-8 w-8 text-cyan-400" />
                        <div>
                            <h4 className="font-semibold text-lg">Phone</h4>
                            <p className="text-gray-400">+1 234 567 890</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <WhatsappIcon className="h-8 w-8 text-cyan-400" />
                        <div>
                            <h4 className="font-semibold text-lg">WhatsApp</h4>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">Chat with us</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden h-64 bg-gray-800 border border-gray-700">
                    {/* Placeholder for map */}
                    <img src="https://picsum.photos/seed/map/800/400" alt="Map" className="w-full h-full object-cover opacity-30"/>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800">
                    <h3 className="text-3xl font-bold text-white mb-6">Send Us a Message</h3>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <input type="text" id="name" className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input type="email" id="email" className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea id="message" rows={5} className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg shadow-[0_0_20px_#22d3ee] transition-all duration-300">
                            Submit Form
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;