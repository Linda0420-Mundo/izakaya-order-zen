
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedItems from '@/components/home/FeaturedItems';
import CategoryPreview from '@/components/home/CategoryPreview';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/menu';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <Hero />
      <FeaturedItems />
      <CategoryPreview />
      
      <section className="py-12 bg-izakaya-paper">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif font-medium">Explore Our Menu</h2>
            <p className="text-sm text-izakaya-darkgray mt-2">お品書き</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="py-6 px-4 border border-izakaya-sand hover:bg-izakaya-sand/50 flex flex-col items-center justify-center gap-2 h-auto"
                onClick={() => navigate(`/menu?category=${category.id}`)}
              >
                <span className="text-lg font-medium">{category.name}</span>
                <span className="text-xs text-izakaya-darkgray">{category.nameJa}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
