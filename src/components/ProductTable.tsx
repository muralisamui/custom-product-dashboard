import React from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';

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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
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