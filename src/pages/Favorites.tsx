
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useFavorites } from '@/hooks/use-favorites';
import { getMenuItemById } from '@/data/menu';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  
  const favoriteItems = favorites
    .map(id => getMenuItemById(id))
    .filter(Boolean);
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-medium">Your Favorites</h1>
          <p className="text-izakaya-darkgray mt-2">お気に入り</p>
        </div>
        
        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              item && <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-izakaya-paper p-6 rounded-full mb-6">
              <Heart className="h-16 w-16 text-izakaya-darkgray" />
            </div>
            <h2 className="text-2xl font-medium mb-2">No favorites yet</h2>
            <p className="text-izakaya-darkgray mb-6 max-w-md">
              Add your favorite dishes to easily find and order them again
            </p>
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-izakaya-charcoal hover:bg-izakaya-darkgray text-white"
            >
              Browse Menu
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
