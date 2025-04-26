
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { categories, getMenuItemsByCategory } from '@/data/menu';
import CategorySection from '@/components/menu/CategorySection';
import { Button } from '@/components/ui/button';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Extract category from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category && categories.some(c => c.id === category)) {
      setActiveCategory(category);
      
      // Scroll to the category section if it exists
      const sectionElement = document.getElementById(`category-${category}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveCategory(categories[0]?.id || null);
    }
  }, [location.search]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    navigate(`/menu?category=${categoryId}`);
  };

  return (
    <Layout>
      <div className="bg-izakaya-paper min-h-screen">
        <div className="container px-4 pt-8 pb-16">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-serif font-medium">Our Menu</h1>
            <p className="text-izakaya-darkgray mt-2">お品書き</p>
          </div>

          {/* Category navigation */}
          <div className="sticky top-16 z-20 -mx-4 px-4 py-3 bg-white border-y border-izakaya-sand mb-6 overflow-x-auto">
            <div className="flex flex-nowrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={
                    activeCategory === category.id
                      ? "bg-izakaya-charcoal hover:bg-izakaya-darkgray text-white whitespace-nowrap"
                      : "text-izakaya-charcoal bg-transparent border-izakaya-sand hover:bg-izakaya-sand/50 whitespace-nowrap"
                  }
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu sections */}
          {categories.map((category) => {
            const items = getMenuItemsByCategory(category.id);
            
            return items.length > 0 ? (
              <div 
                key={category.id} 
                id={`category-${category.id}`}
                className="scroll-mt-32"
              >
                <CategorySection 
                  title={category.name} 
                  titleJa={category.nameJa} 
                  items={items} 
                />
                <div className="border-b border-izakaya-sand my-8" />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
