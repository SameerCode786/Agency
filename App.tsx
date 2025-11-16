
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import StickyBottomNav from './components/StickyBottomNav';
import StylizedCta from './components/StylizedCta';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

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
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </AnimatePresence>
    );
};


const App: React.FC = () => {
  const [showBottomNav, setShowBottomNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav after scrolling down 300px
      if (window.scrollY > 300) {
        setShowBottomNav(true);
      } else {
        setShowBottomNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <HashRouter>
      <CustomCursor />
      <div className="relative z-10">
        <Header isVisible={!showBottomNav} />
        <main className="min-h-screen">
            <AnimatedRoutes />
        </main>
        <StylizedCta />
        <Footer />
      </div>
      <StickyBottomNav isVisible={showBottomNav} />
    </HashRouter>
  );
};

export default App;