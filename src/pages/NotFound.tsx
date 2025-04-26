
import React from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="font-serif text-6xl mb-4">404</h1>
        <p className="text-izakaya-darkgray text-xl mb-2">Page not found</p>
        <p className="text-izakaya-darkgray mb-8">We couldn't find the page: {location.pathname}</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-izakaya-charcoal hover:bg-izakaya-darkgray text-white"
        >
          Return Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
