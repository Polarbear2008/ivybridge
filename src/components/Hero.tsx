import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Application deadlines for Ivy League universities
const applicationDeadlines = [
  {
    university: "Harvard",
    date: "Nov 1, 2025",
    type: "Early Action"
  },
  {
    university: "Yale",
    date: "Nov 1, 2025",
    type: "Early Action"
  },
  {
    university: "Princeton",
    date: "Nov 1, 2025",
    type: "Early Action"
  }
];

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [currentDeadlineIndex, setCurrentDeadlineIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const bgImageUrl = '/images/graduation-bg.jpg'; // Updated to use the graduation image
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to hero section with dampening
      const x = ((e.clientX - left) / width - 0.5) * 0.2; // Reduced multiplier for subtler effect
      const y = ((e.clientY - top) / height - 0.5) * 0.2;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Handle scroll effect separately
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Preload background image
  useEffect(() => {
    // Create and load the background image
    const bgImage = new Image();
    bgImage.src = bgImageUrl;
    bgImage.onload = () => {
      setImageLoaded(true);
      // Set a small delay before showing content for smoother transition
      setTimeout(() => {
        setContentReady(true);
      }, 300);
    };
    
    // Fallback in case image takes too long
    const timeout = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true);
        setContentReady(true);
      }
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [bgImageUrl, imageLoaded]);
  
  // Rotate through application deadlines
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDeadlineIndex((prevIndex) => 
        prevIndex === applicationDeadlines.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // Calculate time remaining until deadline
  useEffect(() => {
    // Set a mock deadline for November 1, 2025
    const deadline = new Date('2025-11-01T23:59:59');
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();
      
      // Calculate days and hours
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeRemaining({ days, hours });
    };
    
    // Calculate initially
    calculateTimeRemaining();
    
    // Update every hour
    const intervalId = setInterval(calculateTimeRemaining, 1000 * 60 * 60);
    
    return () => clearInterval(intervalId);
  }, []);

  // Text animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };
  
  const textItem = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      },
    },
  };

  // Loading animation
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };
  
  // Deadline card animation variants
  const deadlineCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.8
      }
    }
  };
  
  const deadlineItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Loading Screen */}
      <AnimatePresence>
        {!contentReady && (
          <motion.div
            className="absolute inset-0 z-50 bg-ivy-navy flex items-center justify-center"
            variants={loadingVariants}
            initial="initial"
            exit="exit"
          >
            <motion.div 
              className="flex flex-col items-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 border-4 border-t-ivy-gold border-r-ivy-gold/50 border-b-ivy-gold/30 border-l-ivy-gold/10 rounded-full animate-spin mb-4"></div>
              <div className="text-ivy-gold text-lg font-serif">Loading Experience</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parallax Background with mouse movement effect */}
      <motion.div 
        ref={parallaxRef}
        className="absolute inset-0 bg-ivy-navy bg-center bg-cover"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0,
        }}
        transition={{ 
          opacity: { duration: 0.8 },
        }}
        style={{ 
          height: '120%', 
          top: '-10%', 
          backgroundImage: `url(${imageLoaded ? bgImageUrl : ''})`,
          transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
        }}
      />
      
      {/* Gradient Overlay with depth effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-ivy-navy/95 via-ivy-navy/80 to-ivy-navy/70"></div>
      
      {/* Animated decorative elements - only show when content is ready */}
      {contentReady && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full border border-ivy-gold/30"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full border border-ivy-gold/30"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.1 }}
            className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full border border-ivy-gold/30"
          />
        </div>
      )}
      
      {/* Content - only show when ready */}
      <AnimatePresence>
        {contentReady && (
          <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            {/* Left side - Main content */}
            <motion.div 
              className="w-full md:w-3/5 flex flex-col justify-center items-start max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                variants={textContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={textItem} className="inline-block text-ivy-gold font-semibold tracking-wide mb-2">ELITE COLLEGE ADMISSIONS</motion.span>
                <motion.h1 variants={textItem} className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
                  Your <span className="text-ivy-gold relative">
                    Ivy League
                    <motion.div 
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-ivy-gold/50"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span> Journey Starts Here
                </motion.h1>
                <motion.div variants={textItem} className="w-24 h-1 bg-ivy-gold my-6"></motion.div>
                <motion.p variants={textItem} className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-xl">
                  Premium admission consulting for ambitious students seeking entry into the nation's most prestigious universities.
                </motion.p>
                
                <motion.div 
                  variants={textItem}
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <motion.button 
                    className="btn-primary relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Explore Programs</span>
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </motion.button>
                  <motion.button 
                    className="btn-secondary group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300">Book a Consultation</span>
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  variants={textItem}
                  className="mt-16 flex items-center space-x-4"
                >
                  <motion.span 
                    className="text-ivy-gold font-semibold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    Season 4 Coming Soon
                  </motion.span>
                  <div className="w-px h-6 bg-ivy-gold/30"></div>
                  <div className="text-white/80 text-sm">Applications opening Fall 2023</div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right side - Application Deadline Card */}
            <motion.div
              className="hidden md:block w-2/5 max-w-md"
              variants={deadlineCardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-ivy-gold/20">
                {/* Card Header */}
                <div className="bg-ivy-gold/20 p-4 border-b border-ivy-gold/30">
                  <h3 className="text-ivy-gold text-xl font-serif font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Application Deadlines
                  </h3>
                </div>
                
                {/* Upcoming Deadlines */}
                <div className="p-5">
                  <div className="text-white/70 text-sm mb-3">Upcoming Deadlines:</div>
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDeadlineIndex}
                        variants={deadlineItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex justify-between items-center bg-white/5 p-3 rounded-lg border-l-2 border-ivy-gold"
                      >
                        <div>
                          <div className="text-ivy-gold font-medium">{applicationDeadlines[currentDeadlineIndex].university}</div>
                          <div className="text-white/60 text-xs">{applicationDeadlines[currentDeadlineIndex].type}</div>
                        </div>
                        <div className="text-white font-bold">{applicationDeadlines[currentDeadlineIndex].date}</div>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                      <div>
                        <div className="text-white/80 font-medium">Regular Decision</div>
                        <div className="text-white/60 text-xs">All Ivy League Schools</div>
                      </div>
                      <div className="text-white font-bold">Jan 1, 2026</div>
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <motion.button
                    className="w-full mt-5 py-3 bg-ivy-gold text-ivy-navy font-bold rounded-lg flex justify-center items-center space-x-2 hover:bg-ivy-gold/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get Application Help</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Scroll Indicator with animation */}
      {contentReady && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="text-white/70 text-sm mb-2"
          >
            Scroll to explore
          </motion.span>
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-center justify-center"
          >
            <motion.div 
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }}
              className="w-1 h-3 bg-white/70 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
