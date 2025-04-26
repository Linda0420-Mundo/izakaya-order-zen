
import React from 'react';

interface PriceFormatterProps {
  price: number;
  currency?: string;
  className?: string;
}

const PriceFormatter: React.FC<PriceFormatterProps> = ({
  price,
  currency = 'USD',
  className = '',
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);

  return <span className={className}>{formattedPrice}</span>;
};

export default PriceFormatter;
