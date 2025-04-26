
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedItems from '@/components/home/FeaturedItems';
import CategoryPreview from '@/components/home/CategoryPreview';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedItems />
      <CategoryPreview />
    </Layout>
  );
};

export default Index;
