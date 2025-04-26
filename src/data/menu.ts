
import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: "app-1",
    name: "Edamame",
    nameJa: "枝豆",
    description: "Steamed young soybeans sprinkled with sea salt",
    price: 6,
    image: "https://source.unsplash.com/featured/?edamame",
    category: "appetizers",
    popular: true,
    tags: ["vegetarian", "vegan"]
  },
  {
    id: "app-2",
    name: "Gyoza",
    nameJa: "餃子",
    description: "Pan-fried dumplings filled with pork and vegetables",
    price: 8,
    image: "https://source.unsplash.com/featured/?dumplings",
    category: "appetizers",
    popular: true,
    options: [
      {
        name: "Type",
        choices: [
          { label: "Pork" },
          { label: "Vegetable", price: 0 }
        ],
        required: true
      }
    ]
  },
  {
    id: "app-3",
    name: "Agedashi Tofu",
    nameJa: "揚げ出し豆腐",
    description: "Fried tofu in a savory dashi broth",
    price: 7,
    image: "https://source.unsplash.com/featured/?tofu",
    category: "appetizers",
    tags: ["vegetarian"]
  },
  {
    id: "app-4",
    name: "Takoyaki",
    nameJa: "たこ焼き",
    description: "Octopus-filled batter balls with takoyaki sauce and bonito flakes",
    price: 9,
    image: "https://source.unsplash.com/featured/?takoyaki",
    category: "appetizers",
    featured: true
  },
  
  // Main Dishes
  {
    id: "main-1",
    name: "Chicken Teriyaki",
    nameJa: "鶏の照り焼き",
    description: "Grilled chicken thighs glazed with sweet teriyaki sauce, served with rice",
    price: 16,
    image: "https://source.unsplash.com/featured/?teriyaki",
    category: "main",
    popular: true,
    options: [
      {
        name: "Size",
        choices: [
          { label: "Regular" },
          { label: "Large", price: 4 }
        ],
        required: true
      },
      {
        name: "Side",
        choices: [
          { label: "Steamed Rice" },
          { label: "Mixed Vegetables", price: 2 },
          { label: "Both", price: 3 }
        ],
        required: true
      }
    ]
  },
  {
    id: "main-2",
    name: "Tonkatsu",
    nameJa: "とんかつ",
    description: "Breaded and deep-fried pork cutlet with tonkatsu sauce",
    price: 18,
    image: "https://source.unsplash.com/featured/?katsu",
    category: "main",
    featured: true,
    options: [
      {
        name: "Size",
        choices: [
          { label: "Regular" },
          { label: "Large", price: 4 }
        ],
        required: true
      }
    ]
  },
  {
    id: "main-3",
    name: "Vegetable Tempura",
    nameJa: "野菜天ぷら",
    description: "Assorted vegetables deep-fried in a light and crispy batter",
    price: 14,
    image: "https://source.unsplash.com/featured/?tempura",
    category: "main",
    tags: ["vegetarian"]
  },
  {
    id: "main-4",
    name: "Salmon Teriyaki",
    nameJa: "サーモン照り焼き",
    description: "Grilled salmon fillet glazed with teriyaki sauce",
    price: 20,
    image: "https://source.unsplash.com/featured/?salmon",
    category: "main",
    popular: true
  },
  
  // Sushi Rolls
  {
    id: "sushi-1",
    name: "California Roll",
    nameJa: "カリフォルニアロール",
    description: "Crab stick, avocado and cucumber wrapped in nori and sushi rice",
    price: 12,
    image: "https://source.unsplash.com/featured/?sushi",
    category: "sushi",
    popular: true,
    options: [
      {
        name: "Pieces",
        choices: [
          { label: "6 pieces" },
          { label: "8 pieces", price: 4 }
        ],
        required: true
      }
    ]
  },
  {
    id: "sushi-2",
    name: "Spicy Tuna Roll",
    nameJa: "スパイシーツナロール",
    description: "Spicy tuna and cucumber wrapped in nori and sushi rice",
    price: 14,
    image: "https://source.unsplash.com/featured/?sushiroll",
    category: "sushi",
    featured: true
  },
  
  // Drinks
  {
    id: "drink-1",
    name: "Japanese Beer",
    nameJa: "日本ビール",
    description: "Asahi, Kirin, or Sapporo",
    price: 7,
    image: "https://source.unsplash.com/featured/?beer",
    category: "drinks",
    options: [
      {
        name: "Brand",
        choices: [
          { label: "Asahi" },
          { label: "Kirin" },
          { label: "Sapporo" }
        ],
        required: true
      }
    ]
  },
  {
    id: "drink-2",
    name: "Green Tea",
    nameJa: "緑茶",
    description: "Traditional Japanese green tea",
    price: 3,
    image: "https://source.unsplash.com/featured/?greentea",
    category: "drinks",
    tags: ["hot", "caffeine"]
  },
  {
    id: "drink-3",
    name: "Ramune Soda",
    nameJa: "ラムネ",
    description: "Japanese marble soda with a unique bottle design",
    price: 4,
    image: "https://source.unsplash.com/featured/?soda",
    category: "drinks",
    popular: true,
    options: [
      {
        name: "Flavor",
        choices: [
          { label: "Original" },
          { label: "Strawberry" },
          { label: "Melon" }
        ],
        required: true
      }
    ]
  },
  
  // Desserts
  {
    id: "dessert-1",
    name: "Mochi Ice Cream",
    nameJa: "もちアイスクリーム",
    description: "Sweet rice dough filled with ice cream",
    price: 6,
    image: "https://source.unsplash.com/featured/?mochi",
    category: "desserts",
    featured: true,
    options: [
      {
        name: "Flavor",
        choices: [
          { label: "Green Tea" },
          { label: "Mango" },
          { label: "Strawberry" },
          { label: "Chocolate" }
        ],
        required: true,
        multiple: true
      }
    ]
  },
  {
    id: "dessert-2",
    name: "Dorayaki",
    nameJa: "どら焼き",
    description: "Sweet red bean paste sandwiched between two pancakes",
    price: 5,
    image: "https://source.unsplash.com/featured/?dorayaki",
    category: "desserts",
    tags: ["vegetarian"]
  }
];

export const categories = [
  { id: "appetizers", name: "Appetizers", nameJa: "前菜" },
  { id: "main", name: "Main Dishes", nameJa: "主菜" },
  { id: "sushi", name: "Sushi Rolls", nameJa: "巻き寿司" },
  { id: "drinks", name: "Drinks", nameJa: "飲み物" },
  { id: "desserts", name: "Desserts", nameJa: "デザート" }
];

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

export const getFeaturedItems = (): MenuItem[] => {
  return menuItems.filter(item => item.featured);
};

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter(item => item.popular);
};
