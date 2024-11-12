export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  updatedAt?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  search: string;
  dateRange: {
    start: string;
    end: string;
  } | null;
  rating: number | null;
}