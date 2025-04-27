
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = `JP-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 py-12 text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-izakaya-paper p-6 rounded-full mb-4">
            <CheckCircle className="h-16 w-16 text-izakaya-vermilion" />
          </div>
          <h1 className="text-3xl font-serif font-medium">Order Confirmed</h1>
          <p className="text-sm text-izakaya-darkgray mt-2">ご注文ありがとうございます</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-6">
            <p className="text-sm text-izakaya-darkgray">Order Number</p>
            <p className="text-xl font-medium">{orderNumber}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-izakaya-darkgray">Estimated Preparation Time</p>
            <p className="text-xl font-medium">25-30 minutes</p>
          </div>
          
          <div>
            <img 
              src="https://source.unsplash.com/featured/?japanese,cooking" 
              alt="Chef preparing food" 
              className="w-full h-48 object-cover rounded-lg mb-4" 
            />
            <p className="text-sm text-izakaya-darkgray italic">
              Our chefs are preparing your meal with care
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/menu')}
            className="w-full bg-izakaya-paper hover:bg-izakaya-sand text-izakaya-charcoal"
          >
            Order More Food
          </Button>
          
          <Button
            onClick={() => navigate('/order-history')}
            className="w-full bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white"
          >
            View Order History
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
