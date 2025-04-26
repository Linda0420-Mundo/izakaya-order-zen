
import React from 'react';
import { categories, getMenuItemsByCategory } from '@/data/menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CategoryPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12">
      <div className="container px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif font-medium">Our Menu</h2>
          <p className="text-sm text-izakaya-darkgray mt-2">お品書き</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const items = getMenuItemsByCategory(category.id);
            
            return (
              <div
                key={category.id}
                className={cn(
                  "group relative overflow-hidden h-60 rounded-lg cursor-pointer border border-izakaya-sand shadow-sm hover:shadow-md transition-all duration-300",
                  index === 0 && "xl:col-span-2 xl:h-80"
                )}
                onClick={() => navigate(`/menu?category=${category.id}`)}
              >
                <div className="absolute inset-0">
                  {items[0] && (
                    <img 
                      src={items[0].image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif">{category.name}</h3>
                  <p className="text-sm opacity-90 mt-1">{category.nameJa}</p>
                  <p className="text-sm mt-2">
                    {items.length} {items.length === 1 ? 'item' : 'items'} available
                  </p>
                  
                  <div className="mt-3 inline-block border-b border-white/30 pb-1 text-sm font-medium transition-colors group-hover:border-white">
                    View Category
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryPreview;
