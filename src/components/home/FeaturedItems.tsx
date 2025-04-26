
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedItems } from '@/data/menu';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { Button } from '@/components/ui/button';

const FeaturedItems = () => {
  const navigate = useNavigate();
  const featuredItems = getFeaturedItems();
  
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif font-medium">Featured Dishes</h2>
          <p className="text-sm text-izakaya-darkgray mt-2">特選料理</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.slice(0, 3).map((item) => (
            <MenuItemCard key={item.id} item={item} featured={true} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/menu')}
            className="bg-izakaya-charcoal hover:bg-izakaya-darkgray text-white"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
