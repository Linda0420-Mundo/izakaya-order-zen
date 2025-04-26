
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@/types';
import PriceFormatter from '@/components/ui/price-formatter';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  featured?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, featured = false }) => {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const handleClick = () => {
    navigate(`/menu/${item.id}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item.id);
    }
  };

  return (
    <div
      className={cn(
        "group relative bg-white border border-izakaya-sand rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer",
        featured && "md:col-span-2"
      )}
      onClick={handleClick}
    >
      <div className={cn(
        "relative overflow-hidden h-48",
        featured && "md:h-64"
      )}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-colors z-10"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite(item.id) ? "fill-izakaya-vermilion text-izakaya-vermilion" : "text-izakaya-darkgray"
            )}
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-sm font-serif text-izakaya-darkgray">{item.nameJa}</p>
          </div>
          <PriceFormatter price={item.price} className="font-medium" />
        </div>
        
        <p className="mt-2 text-sm text-izakaya-darkgray line-clamp-2">{item.description}</p>
        
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-izakaya-paper text-izakaya-darkgray rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {item.popular && (
        <div className="absolute top-3 left-3 bg-izakaya-vermilion text-white text-xs px-2 py-1 rounded">
          Popular
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
