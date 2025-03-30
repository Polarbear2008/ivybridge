import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    university: "Harvard University",
    quote: "Ivy Bridge transformed my application from good to exceptional. Their personalized guidance and strategic approach made all the difference in my Harvard acceptance.",
    image: "https://source.unsplash.com/photo-1544005313-94ddf0286df2",
    placeholderImage: "/images/testimonials/testimonial1-placeholder.svg",
    rating: 5,
  },
  {
    id: 2,
    name: "Ethan Rodriguez",
    university: "Princeton University",
    quote: "The Season 2 program helped me identify unique extracurricular opportunities that set my application apart. I couldn't have made it to Princeton without their expertise.",
    image: "https://source.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    placeholderImage: "/images/testimonials/testimonial2-placeholder.svg",
    rating: 5,
  },
  {
    id: 3,
    name: "Olivia Washington",
    university: "Yale University",
    quote: "Working with Ivy Bridge gave me the confidence to pursue my dream school. Their essay guidance helped me find my authentic voice and tell my story in a compelling way.",
    image: "https://source.unsplash.com/photo-1494790108377-be9c29b29330",
    placeholderImage: "/images/testimonials/testimonial3-placeholder.svg",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  // Preload images when component mounts
  useEffect(() => {
    testimonials.forEach((testimonial) => {
      const img = new Image();
      img.src = testimonial.image;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [testimonial.id]: true
        }));
      };
    });
  }, []);
  
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const intervalId = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  // Variants for animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    })
  };
  
  const quoteIconVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: 0.3
      }
    }
  };

  return (
    <section className="py-24 bg-ivy-cream relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-ivy-gold/5"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-ivy-navy/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-ivy-gold font-semibold tracking-wide"
          >
            TESTIMONIALS
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-ivy-navy mt-2"
          >
            Success Stories
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-ivy-gold mx-auto mt-6 origin-left"
          ></motion.div>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Display with animation */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                {/* Quote icon */}
                <motion.div 
                  className="absolute -top-10 -left-10 opacity-20 hidden md:block"
                  variants={quoteIconVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Quote className="w-20 h-20 text-ivy-gold" />
                </motion.div>
                
                {/* Image with animated border */}
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0 relative z-10">
                    {/* Placeholder image shown while actual image loads */}
                    {!loadedImages[testimonials[currentIndex].id] && (
                      <img 
                        src={testimonials[currentIndex].placeholderImage} 
                        alt={`${testimonials[currentIndex].name} placeholder`} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <motion.img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className={`w-full h-full object-cover ${!loadedImages[testimonials[currentIndex].id] ? 'opacity-0' : 'opacity-100'}`}
                      style={{ transition: 'opacity 0.5s ease-in-out' }}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7 }}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Animated ring around image */}
                  <motion.div 
                    className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-ivy-gold/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.1, 0.8],
                      opacity: [0, 0.8, 0],
                      rotate: [0, 90]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star className="w-5 h-5 fill-ivy-gold text-ivy-gold" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.blockquote 
                    className="text-xl md:text-2xl font-serif italic text-ivy-navy mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    "{testimonials[currentIndex].quote}"
                  </motion.blockquote>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h4 className="text-lg font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-ivy-gray">{testimonials[currentIndex].university}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons with hover effects */}
          <div className="flex justify-center mt-12">
            <motion.button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-ivy-gold text-ivy-gold hover:bg-ivy-gold hover:text-white transition-colors duration-300 mr-4"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(191, 157, 94, 1)", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-ivy-gold text-ivy-gold hover:bg-ivy-gold hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(191, 157, 94, 1)", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`mx-1 focus:outline-none`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? 'bg-ivy-gold w-6' : 'bg-ivy-gray/30'
                  }`}
                  animate={{ width: currentIndex === index ? 24 : 8 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
