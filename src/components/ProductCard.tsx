import { Card } from './ui/card';
import { Button } from './ui/button';
import truncateText from '@/lib/truncateText';
import { getOriginalPrice } from '@/lib/getOriginalPrice';
import StarRating from './StarRating';
import { Eye } from 'lucide-react';

interface ProductProps {
    product: {
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
    },
    onViewDetails: () => void
}


const ProductCard: React.FC<ProductProps> = ({ product, onViewDetails }) => {
    return (
        <Card className="w-full max-w-xs rounded-xl border width shadow-lg">
            <div className="grid gap-4 p-4">
                <div className="w-full overflow-hidden rounded-xl">
                    <img
                        src={product.thumbnail}
                        alt="Product image"
                        width="400"
                        height="500"
                        className="object-cover border w-full"
                    />
                </div>
                <div className="grid gap-1.5">
                    <h3 className="font-semibold text-sm md:text-base">{truncateText(product.title)}</h3>
                    <p className="text-sm text-gray-600 font-medium">{truncateText(product.description)}</p>
                    <p className="font-semibold text-sm md:text-base flex gap-2">
                        ${product.price.toFixed(2)}
                        <span className='font-normal line-through text-gray-600'>{getOriginalPrice(product.price, product.discountPercentage)}</span>
                        <span className='text-red-400 font-normal'>{product.discountPercentage}% off</span>
                    </p>
                    <StarRating rating={product.rating} />
                </div>
                <Button
                    size="default"
                    onClick={onViewDetails}
                    className='flex items-center justify-center font-semibold text-sm md:text-base'>
                    View<Eye />
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;