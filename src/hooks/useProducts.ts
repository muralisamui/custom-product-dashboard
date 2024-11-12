// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Product, ProductsResponse } from '../types/product';
// import { useProductStore } from '../store/productStore';
// import { useDebounce } from './useDebounce';

// const BASE_URL = 'https://dummyjson.com/products';

// export const useProducts = () => {
//   const queryClient = useQueryClient();
//   const { filters, page } = useProductStore();
//   const debouncedSearch = useDebounce(filters.search, 300);
//   const limit = 10;

//   const fetchProducts = async () => {
//     const skip = (page - 1) * limit;
//     const searchParam = debouncedSearch ? `/search?q=${debouncedSearch}&` : '?';
//     const response = await fetch(
//       `${BASE_URL}${searchParam}limit=${limit}&skip=${skip}`
//     );
//     if (!response.ok) throw new Error('Failed to fetch products');
//     const data: ProductsResponse = await response.json();
    
//     let filteredProducts = data.products;

//     // Apply rating filter
//     if (filters.rating) {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.rating >= filters.rating!
//       );
//     }

//     // Apply date range filter
//     if (filters.dateRange?.start && filters.dateRange?.end) {
//       const startDate = new Date(filters.dateRange.start).getTime();
//       const endDate = new Date(filters.dateRange.end).getTime();
      
//       filteredProducts = filteredProducts.filter((product) => {
//         const productDate = product.updatedAt 
//           ? new Date(product.updatedAt).getTime()
//           : null;
        
//         if (!productDate) return false;
//         return productDate >= startDate && productDate <= endDate;
//       });
//     }

//     return {
//       ...data,
//       products: filteredProducts,
//       total: filteredProducts.length,
//     };
//   };

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['products', page, debouncedSearch, filters.rating, filters.dateRange],
//     queryFn: fetchProducts,
//   });

//   const updatePriceMutation = useMutation({
//     mutationFn: async ({ id, price }: { id: number; price: number }) => {
//       const response = await fetch(`${BASE_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ price }),
//       });
//       if (!response.ok) throw new Error('Failed to update price');
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   const addProductMutation = useMutation({
//     mutationFn: async (product: Omit<Product, 'id'>) => {
//       const response = await fetch(`${BASE_URL}/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(product),
//       });
//       if (!response.ok) throw new Error('Failed to add product');
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   return {
//     products: data?.products ?? [],
//     total: data?.total ?? 0,
//     loading: isLoading,
//     error: error ? (error as Error).message : null,
//     updateProductPrice: (id: number, price: number) =>
//       updatePriceMutation.mutate({ id, price }),
//     addProduct: (product: Omit<Product, 'id'>) =>
//       addProductMutation.mutate(product),
//   };
// };

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, ProductsResponse } from '../types/product';
import { useProductStore } from '../store/productStore';
import { useDebounce } from './useDebounce';

const BASE_URL = 'https://dummyjson.com/products';

export const useProducts = () => {
  const queryClient = useQueryClient();
  const { filters, page } = useProductStore();
  const debouncedSearch = useDebounce(filters.search, 300);
  const limit = 12;

  const fetchProducts = async () => {
    const searchParam = debouncedSearch ? `/search?q=${debouncedSearch}&` : '?';
    const response = await fetch(
      `${BASE_URL}${searchParam}limit=100` // Fetch all products to handle client-side filtering
    );
    if (!response.ok) throw new Error('Failed to fetch products');
    const data: ProductsResponse = await response.json();
    
    let filteredProducts = data.products;

    // Apply rating filter
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= filters.rating!
      );
    }

    // Apply date range filter
    if (filters.dateRange?.start && filters.dateRange?.end) {
      const startDate = new Date(filters.dateRange.start).getTime();
      const endDate = new Date(filters.dateRange.end).getTime();
      
      filteredProducts = filteredProducts.filter((product) => {
        const productDate = product.updatedAt 
          ? new Date(product.updatedAt).getTime()
          : null;
        
        if (!productDate) return false;
        return productDate >= startDate && productDate <= endDate;
      });
    }

    // Calculate pagination
    const total = filteredProducts.length;
    const skip = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    return {
      products: paginatedProducts,
      total,
      skip,
      limit,
    };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, debouncedSearch, filters.rating, filters.dateRange],
    queryFn: fetchProducts,
  });

  const updatePriceMutation = useMutation({
    mutationFn: async ({ id, price }: { id: number; price: number }) => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price }),
      });
      if (!response.ok) throw new Error('Failed to update price');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to add product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    updateProductPrice: (id: number, price: number) =>
      updatePriceMutation.mutate({ id, price }),
    addProduct: (product: Omit<Product, 'id'>) =>
      addProductMutation.mutate(product),
  };
};