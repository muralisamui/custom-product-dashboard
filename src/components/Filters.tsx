import React from 'react';
import { ProductFilters } from '../types/product';
import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4 sticky top-0 z-[1000]">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.dateRange?.start || ''}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    dateRange: {
                      start: e.target.value,
                      end: filters.dateRange?.end || '',
                    },
                  })
                }
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.dateRange?.end || ''}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    dateRange: {
                      start: filters.dateRange?.start || '',
                      end: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Rating
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.rating || ''}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    rating: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};