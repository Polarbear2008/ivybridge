
import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ivy-navy text-white pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <GraduationCap size={28} className="text-ivy-gold" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white">Ivy Bridge</span>
                <span className="text-xs text-ivy-gray/70 -mt-1">College Admissions Agency</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6">
              Premium college admissions consulting for ambitious students seeking entry into the nation's most prestigious universities.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-ivy-gold mr-3 mt-0.5" />
                <span className="text-white/70">123 Ivy Lane, Cambridge, MA 02138</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-ivy-gold mr-3" />
                <a href="mailto:contact@ivybridge.com" className="text-white/70 hover:text-ivy-gold transition-colors">contact@ivybridge.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-ivy-gold mr-3" />
                <a href="tel:+18001234567" className="text-white/70 hover:text-ivy-gold transition-colors">(800) 123-4567</a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Our Programs</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/programs/season-1" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Season 1: Foundation
                </Link>
              </li>
              <li>
                <Link to="/programs/season-2" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Season 2: Advanced Preparation
                </Link>
              </li>
              <li>
                <Link to="/programs/season-3" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Season 3: Elite Application
                </Link>
              </li>
              <li>
                <Link to="/programs/season-4" className="text-white/70 hover:text-ivy-gold transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-ivy-gold rounded-full mr-2"></span>
                  Season 4: Coming Soon
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter to receive updates and exclusive tips on college admissions.
            </p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 focus:border-ivy-gold outline-none rounded-l text-white"
              />
              <button className="bg-ivy-gold p-2 rounded-r hover:bg-opacity-90 transition-colors">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-white/50 text-sm">
              By subscribing, you agree to our <Link to="/privacy" className="text-ivy-gold hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 py-8 text-center">
          <p className="text-white/50">
            © {new Date().getFullYear()} Ivy Bridge College Admissions Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
