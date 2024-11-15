import { create } from 'zustand';
import { ProductFilters } from '../types/product';

interface ProductStore {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  page: number;
  setPage: (page: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  filters: {
    search: '',
    dateRange: null,
    rating: null,
  },
  setFilters: (filters) => set({ filters, page: 1 }),
  page: 1,
  setPage: (page) => set({ page }),
}));