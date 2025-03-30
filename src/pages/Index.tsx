
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProgramsSection from '../components/ProgramsSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Simulated loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-ivy-navy z-50"
          style={{ position: 'relative' }} // Fix for framer-motion warning
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="w-20 h-20 relative"
          >
            <motion.div 
              className="absolute inset-0 border-4 border-t-ivy-gold border-r-ivy-gold border-b-transparent border-l-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
              }}
            />
            <motion.div className="text-ivy-gold absolute inset-0 flex items-center justify-center font-serif text-xl">
              IVY
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-hidden relative" // Add relative position for framer-motion container
        >
          <AnimatedBackground />
          <Navbar />
          <Hero />
          <ProgramsSection />
          <StatsSection />
          <TestimonialsSection />
          <CTASection />
          <Footer />
          
          {/* Scroll to top button */}
          <ScrollToTopButton />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-ivy-gold shadow-lg flex items-center justify-center z-40 hover:bg-ivy-gold/90 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Index;
