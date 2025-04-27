import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/hooks/use-cart';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-izakaya-sand bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white">
                <DropdownMenuItem onClick={() => navigate('/')}>Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/menu')}>Menu</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/order-history')}>Order History</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/favorites')}>Favorites</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-serif font-medium ml-1">和心</span>
            <span className="hidden sm:inline-block text-sm text-izakaya-darkgray ml-3">WACOCO IZAKAYA</span>
          </div>
        </div>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
            <Button variant="ghost" onClick={() => navigate('/menu')}>Menu</Button>
            <Button variant="ghost" onClick={() => navigate('/orders')}>Orders</Button>
            <Button variant="ghost" onClick={() => navigate('/order-history')}>Order History</Button>
            <Button variant="ghost" onClick={() => navigate('/favorites')}>Favorites</Button>
          </nav>
        )}

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/cart')}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-izakaya-vermilion text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => navigate('/login')}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
