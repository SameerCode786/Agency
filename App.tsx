
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import { CursorProvider } from './components/CustomCursor'; // Updated import
import StickyBottomNav from './components/StickyBottomNav';
import StylizedCta from './components/StylizedCta';
import Preloader from './components/Preloader';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage'; // New Import
import ContactPage from './pages/ContactPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage'; // Import new page
import SeoOptimizationPage from './pages/SeoOptimizationPage'; // Import new SEO page
import AppDevelopmentPage from './pages/AppDevelopmentPage';
import ShopifyDevelopmentPage from './pages/ShopifyDevelopmentPage';
import WordPressPage from './pages/WordPressPage';
import AdminDashboard from './pages/admin/AdminDashboard'; // Import Admin Dashboard

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} /> {/* New Dynamic Route */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/web-development" element={<WebDevelopmentPage />} />
                <Route path="/seo-optimization" element={<SeoOptimizationPage />} />
                <Route path="/app-development" element={<AppDevelopmentPage />} />
                <Route path="/shopify-development" element={<ShopifyDevelopmentPage />} />
                <Route path="/wordpress-customization" element={<WordPressPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </AnimatePresence>
    );
};


const App: React.FC = () => {
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto'; // Re-enable scroll
    }, 8000);

    // Disable scroll when preloader is visible
    document.body.style.overflow = 'hidden';

    return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto'; // Ensure scroll is re-enabled on component unmount
    };
  }, []);


  useEffect(() => {
    if (isLoading) return; // Don't run scroll listener while loading

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBottomNav(true);
      } else {
        setShowBottomNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <HashRouter>
      <CursorProvider>
        <AnimatePresence mode="wait">
            {isLoading ? (
            <Preloader key="preloader" />
            ) : (
             <MainContent showBottomNav={showBottomNav} />
            )}
        </AnimatePresence>
      </CursorProvider>
    </HashRouter>
  );
};

// Extracted to use useLocation hook
const MainContent: React.FC<{showBottomNav: boolean}> = ({ showBottomNav }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute) {
        return (
            <motion.div 
                key="admin-content" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8 }}
            >
                <AnimatedRoutes />
            </motion.div>
        );
    }

    return (
        <motion.div 
            key="main-content" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
        >
            <div className="relative z-10">
            <Header isVisible={!showBottomNav} />
            <main className="min-h-screen">
                <AnimatedRoutes />
            </main>
            <StylizedCta />
            <Footer />
            </div>
            <StickyBottomNav isVisible={showBottomNav} />
        </motion.div>
    );
}

export default App;
