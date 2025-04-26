
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

// In a real app, this would come from a database or API
const orders = [];

const OrderHistory = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-medium">Order History</h1>
          <p className="text-izakaya-darkgray mt-2">注文履歴</p>
        </div>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {/* This would map through actual order data in a real app */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-izakaya-paper p-6 rounded-full mb-6">
              <Package className="h-16 w-16 text-izakaya-darkgray" />
            </div>
            <h2 className="text-2xl font-medium mb-2">No orders yet</h2>
            <p className="text-izakaya-darkgray mb-6 max-w-md">
              Your order history will appear here after you place your first order
            </p>
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white"
            >
              Order Now
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
