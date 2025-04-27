import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/hooks/use-cart';
import { getMenuItemById } from '@/data/menu';
import PriceFormatter from '@/components/ui/price-formatter';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getSubtotal, getTax, getTotal, clearCart } = useCart();

  const getItemDetails = (itemId: string, selectedOptions: Record<string, string | string[]> = {}) => {
    const menuItem = getMenuItemById(itemId);
    if (!menuItem) return null;

    let optionsText: string[] = [];
    
    if (menuItem.options && Object.keys(selectedOptions).length > 0) {
      Object.entries(selectedOptions).forEach(([optionName, value]) => {
        const option = menuItem.options?.find(o => o.name === optionName);
        if (option) {
          if (Array.isArray(value)) {
            optionsText.push(`${optionName}: ${value.join(', ')}`);
          } else {
            optionsText.push(`${optionName}: ${value}`);
          }
        }
      });
    }

    return {
      ...menuItem,
      optionsText,
    };
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-16 flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-izakaya-sand mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-izakaya-darkgray mb-6">Add some delicious dishes to your cart and come back!</p>
          <Button 
            onClick={() => navigate('/menu')}
            className="bg-izakaya-charcoal hover:bg-izakaya-darkgray text-white"
          >
            Browse Menu
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-serif font-medium text-center mb-8">Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-izakaya-sand overflow-hidden">
              <div className="p-4 border-b border-izakaya-sand flex justify-between items-center">
                <h2 className="font-medium">Order Details</h2>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-izakaya-vermilion hover:text-izakaya-vermilion/90 hover:bg-izakaya-vermilion/10"
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="divide-y divide-izakaya-sand">
                {items.map((item) => {
                  const details = getItemDetails(item.itemId, item.selectedOptions);
                  if (!details) return null;
                  
                  return (
                    <div key={`${item.itemId}-${JSON.stringify(item.selectedOptions)}`} className="p-4 flex">
                      <div className="mr-4 w-20 h-20 rounded-md overflow-hidden shrink-0">
                        <img 
                          src={details.image} 
                          alt={details.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{details.name}</h3>
                            <p className="text-xs text-izakaya-darkgray">{details.nameJa}</p>
                          </div>
                          <PriceFormatter price={details.price} />
                        </div>
                        
                        {details.optionsText.length > 0 && (
                          <div className="mt-1">
                            <p className="text-sm text-izakaya-darkgray">
                              {details.optionsText.join(' • ')}
                            </p>
                          </div>
                        )}
                        
                        {item.specialInstructions && (
                          <div className="mt-1">
                            <p className="text-sm italic text-izakaya-darkgray">
                              "{item.specialInstructions}"
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                              className="h-7 w-7 rounded"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2 text-sm w-5 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                              className="h-7 w-7 rounded"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.itemId)}
                            className="h-7 w-7 rounded text-izakaya-darkgray hover:text-izakaya-vermilion"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-izakaya-sand overflow-hidden sticky top-24">
              <div className="p-4 border-b border-izakaya-sand">
                <h2 className="font-medium">Order Summary</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-izakaya-darkgray">Subtotal</span>
                  <PriceFormatter price={getSubtotal()} />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-izakaya-darkgray">Tax (10%)</span>
                  <PriceFormatter price={getTax()} />
                </div>
                
                <div className="pt-4 border-t border-izakaya-sand flex justify-between items-center font-medium">
                  <span>Total</span>
                  <PriceFormatter price={getTotal()} className="text-xl" />
                </div>
                
                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-6 bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white mt-6"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
