import React, { useState } from 'react';
import { Product } from '../types/product';
import { Edit2, X } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onPriceUpdate: (id: number, price: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onPriceUpdate }) => {
  if (!product) return null;

  const [editingPrice, setEditingPrice] = useState<{
    id: number;
    price: string;
  } | null>(null);

  const handlePriceEdit = (product: Product) => {
    setEditingPrice({ id: product.id, price: product.price.toString() });
  };

  const handlePriceSubmit = (id: number) => {
    if (editingPrice) {
      const newPrice = parseFloat(editingPrice.price);
      if (!isNaN(newPrice)) {
        onPriceUpdate(id, newPrice);
      }
      setEditingPrice(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg border-2 border-slate-300"
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-20 object-cover border-2 border-slate-600 rounded"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Details</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Brand</span>
                <p className="text-gray-900">{product.brand}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Category</span>
                <p className="text-gray-900">{product.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Price</span>
                {editingPrice?.id === product.id ? (
                  <input
                    type="number"
                    className="w-24 px-2 py-1 text-sm border rounded"
                    value={editingPrice.price}
                    onChange={(e) =>
                      setEditingPrice({ id: product.id, price: e.target.value })
                    }
                    onBlur={() => handlePriceSubmit(product.id)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handlePriceSubmit(product.id);
                    }}
                    autoFocus
                  />
                ) : (
                  <div
                    className="text-sm text-gray-900 flex items-center gap-2 cursor-pointer"
                    onClick={() => handlePriceEdit(product)}
                  >
                    ${product.price.toFixed(2)}
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Discount</span>
                <p className="text-gray-900">{product.discountPercentage}%</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Rating</span>
                <p className="text-gray-900">{product.rating} ★</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Stock</span>
                <p className="text-gray-900">{product.stock}</p>
              </div>
            </div>

            {product.dimensions && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Dimensions
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Length
                    </span>
                    <p className="text-gray-900">
                      {product.dimensions.length} cm
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Width
                    </span>
                    <p className="text-gray-900">{product.dimensions.width} cm</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Height
                    </span>
                    <p className="text-gray-900">{product.dimensions.height} cm</p>
                  </div>
                </div>
              </div>
            )}

            {product.weight && (
              <div>
                <span className="text-sm font-medium text-gray-500">Weight</span>
                <p className="text-gray-900">{product.weight} kg</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};