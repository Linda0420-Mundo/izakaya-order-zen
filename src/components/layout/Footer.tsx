
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="mt-auto border-t border-izakaya-sand bg-white py-6">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-xl font-serif font-medium">和心</span>
              <span className="text-sm text-izakaya-darkgray ml-3">WACOCO IZAKAYA</span>
            </div>
            <p className="text-xs text-izakaya-darkgray mt-2 text-center md:text-left">Authentic Japanese cuisine</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <button 
              className="text-sm hover:text-izakaya-vermilion transition-colors"
              onClick={() => navigate('/about')}
            >
              About Us
            </button>
            <button 
              className="text-sm hover:text-izakaya-vermilion transition-colors"
              onClick={() => navigate('/contact')}
            >
              Contact
            </button>
            <button 
              className="text-sm hover:text-izakaya-vermilion transition-colors"
              onClick={() => navigate('/policy')}
            >
              Privacy Policy
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-izakaya-sand text-center">
          <p className="text-xs text-izakaya-darkgray">
            © 2025 Wacoco Izakaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
