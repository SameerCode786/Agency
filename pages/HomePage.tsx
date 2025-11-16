import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import ScrollRevealSection from '../components/ScrollRevealSection';
import { CodeIcon, MobileIcon, WordPressIcon, ArrowRightIcon, CheckIcon, RocketIcon, BriefcaseIcon, SpeedIcon, WalletIcon, MaintenanceIcon, PhoneIcon, StarIcon } from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';

const TrustBadge: React.FC<{ icon: React.ReactNode; text: string; delay: number }> = ({ icon, text, delay }) => (
    <motion.div 
        className="flex items-center gap-2 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 + delay }}
    >
        {icon}
        <span className="font-semibold">{text}</span>
    </motion.div>
);

const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };


  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-4">
        <div className="absolute inset-0 z-[-1]">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Web & Mobile App Development Agency
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Sameer Digital Lab
            </span>
          </motion.h1>
          <motion.p 
            className="max-w-3xl mx-auto text-gray-300 md:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We Build High-Performing Websites & Mobile Apps That Drive Business Growth. 100% Client Satisfaction.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg shadow-[0_0_20px_#22d3ee] transition-all duration-300">
                    Get Free Consultation
                </motion.button>
            </Link>
            <Link to="/portfolio">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 border-2 border-gray-500 text-gray-300 font-bold rounded-full text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                    View Our Work
                </motion.button>
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <TrustBadge icon={<CheckIcon className="h-6 w-6 text-green-400"/>} text="24/7 Support" delay={0.1} />
            <TrustBadge icon={<RocketIcon className="h-6 w-6 text-purple-400"/>} text="Fast Delivery" delay={0.2} />
            <TrustBadge icon={<BriefcaseIcon className="h-6 w-6 text-cyan-400"/>} text="50+ Projects Completed" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ScrollRevealSection>
        <div className="text-center">
            <AnimatedHeading text="Our Expert Services" className="text-4xl md:text-5xl font-bold mb-4" />
            <p className="max-w-2xl mx-auto text-gray-400 mb-12">We provide end-to-end digital solutions tailored to your business needs.</p>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {[
                    { icon: <CodeIcon className="h-10 w-10 text-cyan-400"/>, title: 'Website Development', details: ['Business Websites', 'E-commerce Stores', 'Landing Pages'], price: '8,999', desc: 'Custom websites built with HTML5, CSS3, JavaScript - Fast, responsive, and SEO-optimized.'},
                    { icon: <MobileIcon className="h-10 w-10 text-purple-400"/>, title: 'Mobile App Development', details: ['Business Apps', 'E-commerce Apps', 'Custom Solutions'], price: '15,999', desc: 'Cross-platform mobile apps using React Native & Expo - One code for iOS & Android.'},
                    { icon: <WordPressIcon className="h-10 w-10 text-blue-400"/>, title: 'WordPress Solutions', details: ['WordPress Development', 'WooCommerce Stores', 'Website Maintenance'], price: '6,999', desc: 'Professional WordPress websites with custom themes & plugins.'}
                ].map((service, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col text-left"
                        variants={itemVariants}
                    >
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-400 mb-4 flex-grow">{service.desc}</p>
                        <ul className="space-y-2 mb-4 text-gray-300">
                            {service.details.map(detail => <li key={detail} className="flex items-center"><CheckIcon className="h-4 w-4 mr-2 text-cyan-400" />{detail}</li>)}
                        </ul>
                        <div className="mt-auto text-2xl font-bold text-cyan-400">
                            Starting at <span className="text-white">₹{service.price}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </ScrollRevealSection>

      {/* Special Offers Banner */}
      <ScrollRevealSection>
        <div className="text-center">
            <AnimatedHeading text="🚀 Limited Time Offers" className="text-4xl md:text-5xl font-bold mb-12"/>
            <motion.div
                 className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                 variants={containerVariants}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 p-8 rounded-xl border-2 border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.3)] relative overflow-hidden">
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">HOT</span>
                    <h3 className="text-3xl font-bold mb-2">Website + Mobile App Package</h3>
                    <p className="text-xl text-purple-300 mb-4">Get both at a <span className="font-bold text-white">30% discount</span></p>
                    <p className="text-lg text-gray-400 line-through">Original Price: ₹35,000</p>
                    <p className="text-4xl font-extrabold text-white">Discount Price: <span className="text-cyan-400">₹24,500</span> Only</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-gray-900/50 p-8 rounded-xl border border-gray-700/80 relative overflow-hidden">
                    <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">NEW</span>
                    <h3 className="text-3xl font-bold mb-2">Free SEO for 3 Months</h3>
                    <p className="text-xl text-gray-300 mb-4">Get any website project and receive FREE SEO services for 3 months</p>
                    <p className="text-4xl font-extrabold text-white">Value: <span className="text-cyan-400">₹9,000</span> FREE</p>
                </motion.div>
            </motion.div>
        </div>
      </ScrollRevealSection>
      
      {/* Why Choose Us */}
      <ScrollRevealSection className="bg-black/30">
          <div className="text-center">
              <AnimatedHeading text="Why Choose Sameer Digital Lab?" className="text-4xl md:text-5xl font-bold mb-12"/>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                  {[
                      { icon: <SpeedIcon className="h-10 w-10 text-cyan-400"/>, title: '⚡ Fast Delivery', desc: 'Websites in 5-7 days, apps in 2-3 weeks' },
                      { icon: <WalletIcon className="h-10 w-10 text-green-400"/>, title: '💰 Budget-Friendly', desc: 'Quality work at competitive Indian market prices' },
                      { icon: <MaintenanceIcon className="h-10 w-10 text-purple-400"/>, title: '🔧 Post-Launch Support', desc: '15 days free support on every project' },
                      { icon: <PhoneIcon className="h-10 w-10 text-blue-400"/>, title: '📞 Direct Communication', desc: 'Work directly with the developer - No middlemen' },
                  ].map((feature, index) => (
                      <motion.div key={index} variants={itemVariants} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2">
                          <div className="flex justify-center mb-4">{feature.icon}</div>
                          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-gray-400">{feature.desc}</p>
                      </motion.div>
                  ))}
              </motion.div>
          </div>
      </ScrollRevealSection>

      {/* Testimonials */}
      <ScrollRevealSection>
          <div className="text-center">
              <AnimatedHeading text="What Our Clients Say" className="text-4xl md:text-5xl font-bold mb-12" />
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {[
                    { quote: "Sameer delivered our website in just 6 days! The quality exceeded our expectations. Highly recommended!", name: "Raj Sharma, Mumbai", role: "Business Owner" },
                    { quote: "The mobile app developed by Sameer Digital Lab helped us increase our sales by 40%. Great work!", name: "Priya Patel, Delhi", role: "Startup Founder" }
                ].map((testimonial, index) => (
                    <motion.div key={index} variants={itemVariants} className="bg-gray-900/50 p-8 rounded-lg border border-gray-800">
                        <div className="flex justify-center mb-4 text-yellow-400">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5"/>)}
                        </div>
                        <p className="italic text-gray-300 mb-6">"{testimonial.quote}"</p>
                        <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                        <p className="text-cyan-400">{testimonial.role}</p>
                    </motion.div>
                ))}
              </motion.div>
          </div>
      </ScrollRevealSection>

      {/* Final CTA Section */}
      <ScrollRevealSection>
        <div className="text-center">
            <AnimatedHeading text="Ready to Transform Your Business?" className="text-4xl md:text-5xl font-bold mb-4"/>
            <p className="max-w-2xl mx-auto text-gray-400 mb-8">Get a FREE website/app consultation and project estimate</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8 text-lg">
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-400"/> No Advance Payment</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-400"/> 100% Satisfaction</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-400"/> Money-Back Guarantee</span>
            </div>
            <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full text-xl shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300">
                    Start Your Project Today
                </motion.button>
            </Link>
             <p className="mt-6 text-gray-400">Or email us at: <a href="mailto:support@sameercodes.online" className="text-cyan-400 font-semibold hover:underline">support@sameercodes.online</a></p>
        </div>
      </ScrollRevealSection>
    </PageWrapper>
  );
};

export default HomePage;