
import React from 'react';
import MenuItemCard from './MenuItemCard';
import { MenuItem } from '@/types';

interface CategorySectionProps {
  title: string;
  titleJa?: string;
  items: MenuItem[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, titleJa, items }) => {
  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-serif font-medium">{title}</h2>
          {titleJa && <p className="text-sm text-izakaya-darkgray">{titleJa}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} featured={item.featured} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
