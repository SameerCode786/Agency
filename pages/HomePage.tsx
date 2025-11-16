import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHeading from '../components/AnimatedHeading';
import { 
    CheckIcon, 
    RocketIcon, 
    BriefcaseIcon, 
    CodeIcon, 
    MobileIcon, 
    WordPressIcon,
    ArrowRightIcon,
    SpeedIcon,
    WalletIcon,
    MaintenanceIcon,
    PhoneIcon,
    StarIcon
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


const HomePage: React.FC = () => {
    const { title, description } = useSeoContent('Home');

    const heroStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='p' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50Q25 25 50 50t50 0' stroke='%23334155' fill='none' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='transparent' /%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
    };

  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        <div className="container mx-auto px-4 z-10">
            <div className="max-w-3xl text-left">
                <motion.p 
                    className="text-purple-400 font-semibold tracking-widest uppercase mb-4 text-sm"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Creative Agency
                </motion.p>
                <motion.h1 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 tracking-tighter mb-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    Web & Mobile App 
                    <br />
                    <span className="text-purple-400">
                        Development
                    </span>
                </motion.h1>
                <motion.p 
                    className="max-w-md text-slate-300 md:text-xl mb-10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    We Build High-Performing Digital Experiences That Drive Business Growth. 100% Client Satisfaction.
                </motion.p>
                <motion.div 
                    className="flex flex-col sm:flex-row items-start justify-start gap-4 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    <Link to="/contact">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white font-bold rounded-md text-lg hover:bg-purple-700 shadow-[0_0_20px_#a855f7] transition-all duration-300">
                            Get Free Consultation
                        </motion.button>
                    </Link>
                    <Link to="/portfolio">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-8 py-3 border-2 border-slate-600 text-slate-300 font-bold rounded-md text-lg hover:bg-slate-800 transition-all duration-300">
                            View Our Work
                        </motion.button>
                    </Link>
                </motion.div>
                <motion.div 
                    className="flex flex-row items-center justify-start gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div>
                        <p className="text-4xl font-bold text-white">50+</p>
                        <p className="text-sm text-slate-400 tracking-wider">Projects Completed</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white">98%</p>
                        <p className="text-sm text-slate-400 tracking-wider">Satisfaction</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white">24/7</p>
                        <p className="text-sm text-slate-400 tracking-wider">Support</p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32 bg-slate-950">
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
      <section className="py-24 sm:py-32 bg-gray-900/40">
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
       <section className="py-24 sm:py-32 bg-slate-950">
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
      <section className="py-24 sm:py-32 bg-gray-900/40">
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
      <section className="py-24 sm:py-32 bg-white">
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