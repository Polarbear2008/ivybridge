
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white shadow-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap size={32} className="text-ivy-gold" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-ivy-navy">Ivy Bridge</span>
              <span className="text-xs text-ivy-gray -mt-1">College Admissions Agency</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/programs" className="nav-link">Programs</Link>
            <Link to="/success-stories" className="nav-link">Success Stories</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <button className="btn-primary">Apply Now</button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-ivy-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="nav-link py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="nav-link py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/programs" className="nav-link py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Programs</Link>
            <Link to="/success-stories" className="nav-link py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
            <Link to="/contact" className="nav-link py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <button className="btn-primary w-full">Apply Now</button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
