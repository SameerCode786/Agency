
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import ParticleBackground from '../components/ParticleBackground';
import { 
    CheckIcon, 
    CodeIcon, 
    MobileIcon, 
    WordPressIcon,
    SpeedIcon,
    WalletIcon,
    MaintenanceIcon,
    PhoneIcon,
    StarIcon,
    ReactIcon,
    JsIcon,
    ExpoIcon
} from '../components/Icons';
import { useSeoContent } from '../hooks/useSeoContent';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; features: string[], price: string; index: number }> = ({ icon, title, desc, features, price, index }) => {
    return (
        <motion.div
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="mb-4 text-cyan-400">{icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-slate-100">{title}</h3>
            <p className="text-slate-400 mb-4 flex-grow">{desc}</p>
            <ul className="text-slate-300 space-y-2 mb-6 text-sm">
                {features.map(feature => <li key={feature}>• {feature}</li>)}
            </ul>
            <div className="mt-auto pt-4 border-t border-slate-800">
                <p className="text-slate-300 text-lg font-semibold">Starting at <span className="text-cyan-400">{price}</span></p>
            </div>
        </motion.div>
    );
};

const WhyChooseCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; }> = ({ icon, title, desc }) => (
    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center">
        <div className="text-cyan-400 w-12 h-12 mx-auto mb-4 flex items-center justify-center">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; }> = ({ quote, name, role }) => (
    <motion.div 
        className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
    >
        <div className="flex mb-4 text-yellow-400">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
        </div>
        <p className="text-slate-300 italic mb-6">"{quote}"</p>
        <div>
            <h4 className="font-bold text-white">{name}</h4>
            <p className="text-cyan-400 text-sm">{role}</p>
        </div>
    </motion.div>
);

const animatedHeadings = ["Websites", "Mobile Apps", "Digital Experiences", "Brand Identities"];

const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % animatedHeadings.length);
        }, 3000); // Change heading every 3 seconds
        return () => clearInterval(interval);
    }, []);
    
    // Background Video URL
    const backgroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557012/ABOUT_Agensi_Pekerjaan_Nusamas_Sdn_Bhd_ypmqnb.mp4";
    
    // Foreground Feature Video URL
    const foregroundVideoUrl = "https://res.cloudinary.com/dow2sbjsp/video/upload/v1763557903/Website_Background_Videos_Download_The_BEST_Free_4k_Stock_Video_io7gxb.mp4";

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* 1. Video Background */}
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        
        {/* 2. Dark Overlay for readability - Maximum Darkness (95%) */}
        <div className="absolute inset-0 bg-black/95 z-0"></div>

        {/* 3. Particle/Constellation Animation */}
        <ParticleBackground />

        {/* 4. Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 z-20 relative w-full h-full flex items-center py-24 lg:py-0">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
                
                {/* Left Side: Text Content - Exactly 50% on large screens */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                        },
                    }}
                    className="w-full lg:w-1/2 text-left"
                >
                    {/* Subheading with Shake Animation */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <motion.div
                            animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                            className="bg-cyan-500/20 p-2 rounded-full border border-cyan-500/50"
                        >
                            <StarIcon className="w-5 h-5 text-cyan-300" />
                        </motion.div>
                        <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm sm:text-base border-l-2 border-cyan-500 pl-3">
                            Premium Digital Solutions
                        </span>
                    </motion.div>

                    <motion.h1 
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-slate-50 tracking-tight mb-6 drop-shadow-2xl leading-[1.1]"
                    >
                        We Create Amazing <br />
                        {/* Adjusted height and min-width to prevent layout shift */}
                        <div className="inline-block relative h-[80px] sm:h-[90px] md:h-[100px] lg:h-[110px] w-full min-w-[320px] mt-2 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentHeadingIndex}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 absolute inset-0 block whitespace-nowrap"
                                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    {animatedHeadings[currentHeadingIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.h1>

                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-light border-l-4 border-cyan-500/30 pl-6"
                    >
                        Transform your business with our cutting-edge digital solutions. 
                        We combine creativity with technology to deliver exceptional results 
                        that drive growth and engage your audience effectively.
                    </motion.p>

                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                        className="flex flex-wrap items-center gap-4 sm:gap-6"
                    >
                        <Link to="/contact">
                            <motion.button 
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)" }} 
                                whileTap={{ scale: 0.95 }} 
                                className="px-8 sm:px-10 py-3 sm:py-4 bg-cyan-500 text-black font-bold rounded-full text-base sm:text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2"
                            >
                                Schedule Meeting
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </motion.button>
                        </Link>
                        <Link to="/portfolio">
                            <motion.button 
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }} 
                                whileTap={{ scale: 0.95 }} 
                                className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-slate-500 text-white font-bold rounded-full text-base sm:text-lg hover:border-white transition-all duration-300"
                            >
                                Our Work
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Side: Foreground Video with Orbiting Icons - Exactly 50% on large screens */}
                <motion.div 
                    className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                     {/* Orbiting Icons Container - Sized relative to the video container below */}
                     <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                        
                        {/* Orbiting Rings - Closer to the center */}
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                            {/* Inner Ring (Clockwise) - Reduced size to 65% to be closer */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[65%] h-[65%] border border-cyan-500/10 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <ReactIcon className="w-6 h-6 text-cyan-400" />
                                    </motion.div>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                                        <WordPressIcon className="w-6 h-6 text-white" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Outer Ring (Counter-Clockwise) - Reduced size to 90% to be closer */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[90%] h-[90%] border border-purple-500/10 rounded-full border-dashed"
                            >
                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                        <JsIcon className="w-6 h-6 text-yellow-400" />
                                    </motion.div>
                                </div>
                                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm p-1.5 rounded-full border border-purple-500/50 shadow-lg shadow-purple-500/20">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                        <ExpoIcon className="w-6 h-6 text-white" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Video Element - Explicit smaller size */}
                        <div className="w-[80%] h-[80%] z-20 flex justify-center items-center overflow-hidden rounded-full">
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover mix-blend-screen transform scale-105"
                            >
                                <source src={foregroundVideoUrl} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-cyan-400/70 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest opacity-70">Scroll</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <AnimatedHeading text="Our Expert Services" className="text-4xl md:text-5xl font-bold mb-4" />
                <p className="text-slate-400 text-lg mb-16">We provide end-to-end digital solutions tailored to your business needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard 
                    index={0}
                    icon={<CodeIcon className="h-10 w-10"/>} 
                    title="Website Development"
                    desc="Custom websites built with HTML5, CSS3, JavaScript - Fast, responsive, and SEO-optimized."
                    features={['Business Websites', 'E-commerce Stores', 'Landing Pages']}
                    price="₹8,999"
                />
                <ServiceCard
                    index={1} 
                    icon={<MobileIcon className="h-10 w-10"/>} 
                    title="Mobile App Development"
                    desc="Cross-platform mobile apps using React Native & Expo - One code for iOS & Android."
                    features={['Business Apps', 'E-commerce Apps', 'Custom Solutions']}
                    price="₹15,999"
                />
                <ServiceCard 
                    index={2}
                    icon={<WordPressIcon className="h-10 w-10"/>} 
                    title="WordPress Solutions"
                    desc="Professional WordPress websites with custom themes & plugins."
                    features={['WordPress Development', 'WooCommerce Stores', 'Website Maintenance']}
                    price="₹6,999"
                />
            </div>
        </div>
      </section>
      
      {/* Special Offers Section */}
      <section className="py-24 sm:py-32 bg-gray-900/40 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
              <AnimatedHeading text="🚀 Limited Time Offers" className="text-4xl md:text-5xl font-bold mb-16" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div initial={{opacity:0, x:-50}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{duration:0.7}} className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 p-8 rounded-2xl border border-purple-400/30 flex flex-col text-center">
                  <span className="font-bold bg-yellow-400 text-black px-3 py-1 rounded-full self-center mb-4">[HOT]</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Website + Mobile App Package</h3>
                  <p className="text-slate-300 mb-4">Get both website and mobile app at <span className="text-yellow-300 font-bold">30% discount</span></p>
                  <p className="text-slate-400 line-through text-lg">Original Price: ₹35,000</p>
                  <p className="text-cyan-300 text-3xl font-bold">Discount Price: ₹24,500 Only</p>
              </motion.div>
              <motion.div initial={{opacity:0, x:50}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{duration:0.7, delay: 0.2}} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 flex flex-col text-center">
                  <span className="font-bold bg-green-400 text-black px-3 py-1 rounded-full self-center mb-4">[NEW]</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Free SEO for 3 Months</h3>
                  <p className="text-slate-300 mb-4">Get any website project and receive FREE SEO services for 3 months</p>
                  <p className="text-green-400 text-3xl font-bold">Value: ₹9,000 FREE</p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
       <section className="py-24 sm:py-32 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <AnimatedHeading text="Why Choose SameerCodes Studios?" className="text-4xl md:text-5xl font-bold mb-16" />
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.2 }}
            >
                <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<SpeedIcon className="w-10 h-10"/>} title="⚡ Fast Delivery" desc="Websites in 5-7 days, apps in 2-3 weeks" />
                </motion.div>
                 <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<WalletIcon className="w-10 h-10"/>} title="💰 Budget-Friendly" desc="Quality work at competitive Indian market prices" />
                </motion.div>
                 <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<MaintenanceIcon className="w-10 h-10"/>} title="🔧 Post-Launch Support" desc="15 days free support on every project" />
                </motion.div>
                 <motion.div variants={{hidden: {opacity: 0, y:50}, visible: {opacity:1, y:0}}}>
                    <WhyChooseCard icon={<PhoneIcon className="w-10 h-10"/>} title="📞 Direct Communication" desc="Work directly with the developer - No middlemen" />
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32 bg-gray-900/40 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
              <AnimatedHeading text="What Our Clients Say" className="text-4xl md:text-5xl font-bold mb-16" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <TestimonialCard 
              quote="Sameer delivered our website in just 6 days! The quality exceeded our expectations. Highly recommended!"
              name="Raj Sharma, Mumbai"
              role="Business Owner"
            />
            <TestimonialCard 
              quote="The mobile app developed by SameerCodes Studios helped us increase our sales by 40%. Great work!"
              name="Priya Patel, Delhi"
              role="Startup Founder"
            />
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-24 sm:py-32 bg-white relative z-10">
        <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Ready to Transform Your Business?</h2>
              <p className="max-w-2xl mx-auto text-slate-600 text-lg mb-8">Get a FREE website/app consultation and project estimate.</p>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-slate-700 font-semibold">
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-600"/> No Advance Payment</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-600"/> 100% Satisfaction</span>
                <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-600"/> Money-Back Guarantee</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/contact">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-slate-900 text-white font-bold rounded-full text-xl shadow-lg shadow-slate-900/30 transition-all duration-300">
                          Start Your Project Today
                      </motion.button>
                  </Link>
                  <a href="tel:+910000000000">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-green-500 text-white font-bold rounded-full text-xl shadow-lg shadow-green-500/30 transition-all duration-300">
                          Call Now: +91 XXXXX XXXXX
                      </motion.button>
                  </a>
              </div>
              <p className="mt-6 text-slate-500">Or email us at: <a href="mailto:support@sameercodes.online" className="text-slate-800 font-semibold hover:underline">support@sameercodes.online</a></p>
            </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
