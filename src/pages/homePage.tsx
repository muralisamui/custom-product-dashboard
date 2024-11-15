import { AddProductModal } from '@/components/AddProductModal';
import NavBar from '@/components/NavBar'
import { Pagination } from '@/components/Pagination';
import { ProductModal } from '@/components/ProductModal';
import { ProductTable } from '@/components/ProductTable';
import { useProducts } from '@/hooks/useProducts';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types/product';
import { useState } from 'react'

const HomePage = () => {
  const { products, loading, error, total, updateProductPrice, addProduct } = useProducts();
  const { page, setPage } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const totalPages = Math.ceil(total / 10);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 rounded-lg shadow overflow-hidden flex justify-center">
            <ProductTable
              products={products}
              loading={loading}
              onViewDetails={setSelectedProduct}
            />
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onPriceUpdate={updateProductPrice}
            />
          )}

          {showAddModal && (
            <AddProductModal
              onClose={() => setShowAddModal(false)}
              onSubmit={addProduct}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage