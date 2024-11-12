import React from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onViewDetails: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onViewDetails,
}) => {

  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="overflow-x-auto">
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {
          products.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={() => onViewDetails(product)} />
          ))
        }
      </div>
    </div>
  );
};