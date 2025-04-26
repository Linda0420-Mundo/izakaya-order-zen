
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getMenuItemById } from '@/data/menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import PriceFormatter from '@/components/ui/price-formatter';
import { useCart } from '@/hooks/use-cart';
import { useFavorites } from '@/hooks/use-favorites';
import { Heart, ChevronLeft, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const item = id ? getMenuItemById(id) : undefined;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | string[]>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) {
    return (
      <Layout>
        <div className="container px-4 py-16 text-center">
          <p className="text-xl">Item not found</p>
          <Button onClick={() => navigate('/menu')} className="mt-4">
            Return to Menu
          </Button>
        </div>
      </Layout>
    );
  }

  const handleOptionChange = (optionName: string, value: string | string[]) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: value,
    });
  };

  const handleMultipleOptionChange = (optionName: string, value: string, checked: boolean) => {
    const currentValues = (selectedOptions[optionName] || []) as string[];
    
    if (checked && !currentValues.includes(value)) {
      handleOptionChange(optionName, [...currentValues, value]);
    } else if (!checked && currentValues.includes(value)) {
      handleOptionChange(
        optionName,
        currentValues.filter(v => v !== value)
      );
    }
  };

  const handleAddToCart = () => {
    // Check if all required options are selected
    const missingRequiredOptions = item.options?.filter(
      option => option.required && !selectedOptions[option.name]
    );

    if (missingRequiredOptions && missingRequiredOptions.length > 0) {
      alert(`Please select options for: ${missingRequiredOptions.map(o => o.name).join(', ')}`);
      return;
    }

    addToCart({
      itemId: item.id,
      quantity,
      selectedOptions,
      specialInstructions: specialInstructions.trim() || undefined,
    });

    navigate('/cart');
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item.id);
    }
  };

  const calculateItemPrice = () => {
    let basePrice = item.price;
    
    // Add additional costs for selected options
    if (selectedOptions && item.options) {
      item.options.forEach(option => {
        const selectedValue = selectedOptions[option.name];
        
        if (selectedValue) {
          if (Array.isArray(selectedValue)) {
            // Handle multiple selections
            selectedValue.forEach(value => {
              const choice = option.choices.find(c => c.label === value);
              if (choice && choice.price) {
                basePrice += choice.price;
              }
            });
          } else {
            // Handle single selection
            const choice = option.choices.find(c => c.label === selectedValue);
            if (choice && choice.price) {
              basePrice += choice.price;
            }
          }
        }
      });
    }
    
    return basePrice;
  };

  return (
    <Layout>
      <div className="container px-4 py-6 md:py-12">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full aspect-square md:aspect-[4/3] object-cover" 
            />
            
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            >
              <Heart
                className={cn(
                  "h-6 w-6 transition-colors",
                  isFavorite(item.id) ? "fill-izakaya-vermilion text-izakaya-vermilion" : "text-izakaya-darkgray"
                )}
              />
            </button>
          </div>
          
          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-medium">{item.name}</h1>
              <p className="text-lg text-izakaya-darkgray font-serif">{item.nameJa}</p>
              
              <div className="mt-4">
                <PriceFormatter 
                  price={calculateItemPrice()} 
                  className="text-2xl font-medium" 
                />
              </div>
              
              <p className="mt-4 text-izakaya-darkgray">{item.description}</p>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-izakaya-paper text-izakaya-darkgray rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Options */}
            {item.options && item.options.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Customize Your Order</h3>
                
                {item.options.map((option) => (
                  <div key={option.name} className="mb-6">
                    <Label className="text-base mb-2 block">
                      {option.name} {option.required && <span className="text-izakaya-vermilion">*</span>}
                    </Label>
                    
                    {option.multiple ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {option.choices.map((choice) => (
                          <div key={choice.label} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${option.name}-${choice.label}`}
                              checked={(selectedOptions[option.name] as string[] || []).includes(choice.label)}
                              onCheckedChange={(checked) => handleMultipleOptionChange(option.name, choice.label, !!checked)}
                            />
                            <Label htmlFor={`${option.name}-${choice.label}`} className="cursor-pointer">
                              {choice.label}
                              {choice.price ? ` (+${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(choice.price)})` : ''}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <RadioGroup
                        value={(selectedOptions[option.name] as string) || ''}
                        onValueChange={(value) => handleOptionChange(option.name, value)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        {option.choices.map((choice) => (
                          <div key={choice.label} className="flex items-center space-x-2">
                            <RadioGroupItem value={choice.label} id={`${option.name}-${choice.label}`} />
                            <Label htmlFor={`${option.name}-${choice.label}`} className="cursor-pointer">
                              {choice.label}
                              {choice.price ? ` (+${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(choice.price)})` : ''}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Special Instructions */}
            <div className="mb-6">
              <Label htmlFor="special-instructions" className="text-base mb-2 block">
                Special Instructions (optional)
              </Label>
              <Textarea
                id="special-instructions"
                placeholder="Any special requests or preferences?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="resize-none h-24"
              />
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 text-lg w-6 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <PriceFormatter 
                  price={calculateItemPrice() * quantity} 
                  className="text-lg font-medium" 
                />
              </div>
              
              <Button
                className="w-full py-6 bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
