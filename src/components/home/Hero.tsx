
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative h-[70vh] max-h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://source.unsplash.com/featured/?japanese,food"
          alt="Japanese cuisine"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container px-4 text-center max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-4">
            和心 <span className="block mt-3 text-xl md:text-2xl font-sans">WACOCO IZAKAYA</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Experience authentic Japanese cuisine with the perfect blend of tradition and innovation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white px-8 py-6"
              size="lg"
            >
              View Menu
            </Button>
            <Button 
              onClick={() => navigate('/order-type')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-6"
              size="lg"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
