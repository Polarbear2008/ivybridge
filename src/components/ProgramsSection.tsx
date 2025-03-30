import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CalendarCheck, University, Users, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

const programs = [
  {
    id: 1,
    season: "Season 1",
    title: "Foundation Program",
    description: "Build your academic foundation and develop a strategic roadmap for college success.",
    icon: <University className="w-10 h-10 text-ivy-gold" />,
    features: ["Profile assessment", "Strategic planning", "Academic guidance"],
    image: "https://source.unsplash.com/photo-1519389950473-47ba0277781c",
    placeholderImage: "/images/programs/season1-placeholder.svg",
    accentColor: "#BF9D5E" // Ivy gold
  },
  {
    id: 2,
    season: "Season 2",
    title: "Advanced Preparation",
    description: "Strengthen your application with targeted extracurriculars and essay development.",
    icon: <Users className="w-10 h-10 text-ivy-gold" />,
    features: ["Activity enhancement", "Essay workshops", "Interview preparation"],
    image: "https://source.unsplash.com/photo-1481627834876-b7833e8f5570",
    placeholderImage: "/images/programs/season2-placeholder.svg",
    accentColor: "#2B4B43" // Ivy green
  },
  {
    id: 3,
    season: "Season 3",
    title: "Elite Application",
    description: "Finalize your applications with our signature approach that has placed students in top universities.",
    icon: <CalendarCheck className="w-10 h-10 text-ivy-gold" />,
    features: ["Application review", "Decision strategy", "Final positioning"],
    image: "https://source.unsplash.com/photo-1523240795612-9a054b0db644",
    placeholderImage: "/images/programs/season3-placeholder.svg",
    accentColor: "#0A2342" // Ivy navy
  },
];

const ProgramsSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Preload images when component mounts
  useEffect(() => {
    programs.forEach((program) => {
      const img = new Image();
      img.src = program.image;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [program.id]: true
        }));
      };
    });
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const seasonFourVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-ivy-cream rounded-full opacity-50 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ivy-cream rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-ivy-gold font-semibold tracking-wide">OUR PROGRAMS</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivy-navy mt-2 relative">
              Ivy Bridge Seasons
              <div className="w-20 h-1 bg-ivy-gold mt-4"></div>
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-ivy-gray max-w-md mt-6 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Each Ivy Bridge season is carefully crafted to guide students through the complex journey of college admissions, with specialized support at every stage.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative h-48 overflow-hidden">
                {/* Placeholder image shown while actual image loads */}
                {!loadedImages[program.id] && (
                  <img 
                    src={program.placeholderImage} 
                    alt={`${program.title} placeholder`} 
                    className="w-full h-full object-cover"
                  />
                )}
                <motion.img 
                  src={program.image} 
                  alt={program.title} 
                  className={`w-full h-full object-cover ${!loadedImages[program.id] ? 'opacity-0' : 'opacity-100'}`}
                  style={{ transition: 'opacity 0.5s ease-in-out' }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-4 py-1 bg-ivy-gold text-white text-sm font-semibold rounded-sm">
                    {program.season}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <motion.div 
                  className="mb-4"
                  animate={activeCard === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {program.icon}
                </motion.div>
                
                <h3 className="text-2xl font-serif font-bold mb-3">{program.title}</h3>
                <p className="text-ivy-gray mb-6">{program.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-ivy-navy"
                      initial={{ opacity: 0, x: -10 }}
                      animate={activeCard === index ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <motion.span 
                        className="w-1.5 h-1.5 rounded-full mr-2"
                        style={{ backgroundColor: program.accentColor }}
                      ></motion.span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button 
                  className="flex items-center text-ivy-gold font-semibold transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  Learn more 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <motion.div
            variants={seasonFourVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-ivy-navy/5 to-ivy-gold/5 backdrop-blur-sm px-8 py-6 rounded-lg inline-flex items-center border border-ivy-gold/20 shadow-lg relative overflow-hidden group">
              {/* Animated sparkles */}
              <motion.div 
                className="absolute top-2 right-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-5 h-5 text-ivy-gold/60" />
              </motion.div>
              
              <div className="w-14 h-14 bg-ivy-gold/20 rounded-full flex items-center justify-center mr-6 relative">
                <span className="text-ivy-gold font-bold text-xl">4</span>
                <motion.div 
                  className="absolute inset-0 rounded-full border border-ivy-gold/30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <div className="text-left">
                <h4 className="font-serif text-xl font-bold">Season 4 Coming Soon</h4>
                <p className="text-ivy-gray">Our most exclusive program for exceptional candidates</p>
              </div>
              
              <motion.button 
                className="btn-secondary ml-10 group hover:bg-ivy-navy hover:border-ivy-navy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  Get Notified
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
