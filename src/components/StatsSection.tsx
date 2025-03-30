
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';

const stats = [
  { value: 94, label: "Acceptance Rate", suffix: "%", color: "#BF9D5E" }, // Ivy gold
  { value: 800, label: "Students Placed", suffix: "+", color: "#2B4B43" }, // Ivy green
  { value: 15, label: "Ivy League Partnerships", suffix: "", color: "#0A2342" }, // Ivy navy
  { value: 12, label: "Years of Excellence", suffix: "", color: "#BF9D5E" }, // Ivy gold
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [hasAnimated, setHasAnimated] = useState(Array(stats.length).fill(false));
  
  // Parallax effect for the background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  
  // Counter animation for each stat
  const counters = stats.map((stat, index) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (isInView && !hasAnimated[index]) {
        let newHasAnimated = [...hasAnimated];
        newHasAnimated[index] = true;
        setHasAnimated(newHasAnimated);
        
        let start = 0;
        const end = stat.value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // Assuming 60fps
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        
        return () => clearInterval(timer);
      }
    }, [isInView, hasAnimated, index]);
    
    return count;
  });

  return (
    <section 
      ref={ref}
      className="py-24 bg-ivy-navy relative overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ 
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-bg.svg')] bg-repeat"></div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full border border-ivy-gold/20 opacity-30"
        style={{ 
          rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full border border-ivy-gold/20 opacity-30"
        style={{ 
          rotate: useTransform(scrollYProgress, [0, 1], [0, -30]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-ivy-gold font-semibold tracking-wide">OUR IMPACT</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-2">
            Success By The Numbers
          </h2>
          <div className="w-20 h-1 bg-ivy-gold mx-auto mt-6"></div>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center relative group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ 
                  type: "spring",
                  duration: 0.8, 
                  delay: index * 0.2,
                  stiffness: 100
                }}
                className="relative"
              >
                {/* Background circle with pulse animation */}
                <motion.div 
                  className="absolute inset-0 rounded-full mx-auto my-auto w-32 h-32 -z-10"
                  style={{ backgroundColor: `${stat.color}10` }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />
                
                <div className="inline-flex items-baseline">
                  <motion.span 
                    className="text-5xl md:text-6xl font-serif font-bold text-white"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {counters[index]}
                  </motion.span>
                  <span 
                    className="text-2xl md:text-3xl font-bold ml-1"
                    style={{ color: stat.color }}
                  >
                    {stat.suffix}
                  </span>
                </div>
                
                <motion.p 
                  className="text-white/70 text-lg mt-2"
                  whileHover={{ color: stat.color }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
