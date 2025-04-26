
export interface MenuItem {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  featured?: boolean;
  options?: MenuItemOption[];
  tags?: string[];
}

export interface MenuItemOption {
  name: string;
  choices: {
    label: string;
    price?: number;
  }[];
  required?: boolean;
  multiple?: boolean;
}

export interface CartItem {
  itemId: string;
  quantity: number;
  selectedOptions?: Record<string, string | string[]>;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total: number;
  orderType: 'dine-in' | 'takeout' | 'delivery';
  tableNumber?: string;
  address?: Address;
  paymentMethod: string;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  instructions?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  favoriteItems: string[];
  orders: Order[];
}
