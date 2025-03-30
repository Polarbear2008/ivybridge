
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    // Preload background image
    const bgImage = new Image();
    bgImage.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80';
    bgImage.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-ivy-navy bg-center bg-cover"
        style={{
          backgroundImage: imageLoaded ? 
            'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80)' : 
            'none'
        }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      
      {/* Gradient Overlay with animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-ivy-navy/95 to-ivy-navy/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] right-[20%] w-32 h-32 rounded-full border border-ivy-gold/20"
          animate={{ 
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 20, ease: "linear" },
            opacity: { repeat: Infinity, duration: 5, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-[10%] left-[10%] w-48 h-48 rounded-full border border-ivy-gold/10"
          animate={{ 
            rotate: [360, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 25, ease: "linear" },
            opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-ivy-gold font-semibold tracking-wide flex items-center">
                JOIN US
                <motion.span 
                  className="ml-2" 
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    duration: 1 
                  }}
                >
                  <Sparkles className="h-4 w-4 text-ivy-gold" />
                </motion.span>
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Begin Your <span className="text-ivy-gold">Ivy League</span> Journey?
            </motion.h2>
            
            <motion.div 
              className="w-20 h-1 bg-ivy-gold mt-6 mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ originX: 0 }}
            />
            
            <motion.p 
              className="text-xl text-white/80 max-w-2xl mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Season 4 applications opening soon. Book a consultation with our admissions experts to discuss your college aspirations and discover how Ivy Bridge can help you achieve them.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="btn-primary relative overflow-hidden group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Book Consultation</span>
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </motion.button>
              
              <motion.button 
                className="flex items-center text-white group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <span className="mr-2 group-hover:text-ivy-gold transition-colors duration-300">Learn more about Season 4</span>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-ivy-gold/20 flex items-center justify-center group-hover:bg-ivy-gold transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight className="w-4 h-4 text-ivy-gold group-hover:text-white" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
