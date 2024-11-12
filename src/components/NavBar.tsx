import React, { useState } from 'react';
import { Search, Plus, RotateCcw } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { AddProductModal } from './AddProductModal';
import { useProducts } from '@/hooks/useProducts';
import { useProductStore } from '@/store/productStore';
import { DropdownMenu, DropdownMenuContent } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';

const NavBar: React.FC = () => {
    const { addProduct } = useProducts();
    const { filters, setFilters } = useProductStore();
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRange, setSelectedRange] = useState<{ start: Date | undefined; end: Date | undefined }>({
        start: undefined,
        end: undefined,
    });

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return; // Exit if no date is selected

        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            // new range selection
            setSelectedRange({ start: date, end: undefined });
        } else if (selectedRange.start && !selectedRange.end) {
            //  range selection
            setSelectedRange({ start: selectedRange.start, end: date });
            setFilters({
                ...filters,
                dateRange: {
                    start: selectedRange.start.toISOString().split('T')[0],
                    end: date.toISOString().split('T')[0],
                },
            });
        }
    };

    const handleReset = () => {
        setFilters({
            search: '',
            dateRange: null,
            rating: null,
        });
    };

    const hasActiveFilters =
        filters.search ||
        filters.dateRange?.start ||
        filters.dateRange?.end ||
        filters.rating;

    return (
        <div className="bg-white p-8 rounded-lg mb-4 sticky top-0 z-[1000] shadow-lg">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                    />
                </div>
                <div className='flex gap-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="flex items-center gap-2 px-4 py-2  text-white rounded-lg"
                            >
                                Select Date Ranges
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                selected={selectedRange.start || undefined}
                                onSelect={handleDateSelect}
                                mode="single"
                                className="shadow-lg rounded-lg"
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {hasActiveFilters && (
                        <Button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg "
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </Button>
                    )}

                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Product
                    </Button>
                </div>
            </div>

            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={addProduct}
                />
            )}
        </div>
    );
};

export default NavBar;
