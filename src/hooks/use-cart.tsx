
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CartItem } from '@/types';
import { getMenuItemById } from '@/data/menu';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = items.findIndex((i) => 
      i.itemId === item.itemId && 
      JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setItems(updatedItems);
      toast.success('Item quantity updated in cart');
    } else {
      setItems([...items, item]);
      toast.success('Item added to cart');
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(items.filter((item) => item.itemId !== itemId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(
      items.map((item) => (item.itemId === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const menuItem = getMenuItemById(item.itemId);
      if (!menuItem) return total;

      let itemPrice = menuItem.price;

      // Add additional costs for selected options
      if (item.selectedOptions && menuItem.options) {
        menuItem.options.forEach(option => {
          const selectedValue = item.selectedOptions?.[option.name];
          
          if (selectedValue) {
            if (Array.isArray(selectedValue)) {
              // Handle multiple selections
              selectedValue.forEach(value => {
                const choice = option.choices.find(c => c.label === value);
                if (choice && choice.price) {
                  itemPrice += choice.price;
                }
              });
            } else {
              // Handle single selection
              const choice = option.choices.find(c => c.label === selectedValue);
              if (choice && choice.price) {
                itemPrice += choice.price;
              }
            }
          }
        });
      }

      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getSubtotal,
      getTax,
      getTotal,
      getTotalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
