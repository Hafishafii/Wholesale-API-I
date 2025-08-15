import React from 'react';
import type { Product } from '../../../types/product';

interface Props {
  product: Product;
  onClick?: () => void;
}

export const BestSaleCard: React.FC<Props> = ({ product, onClick }) => (
  <div
    className="bg-white shadow rounded overflow-hidden cursor-pointer"
    onClick={onClick}
  >
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
    <div className="p-2 text-center bg-black bg-opacity-50 text-white text-sm font-semibold">
      {product.name}
    </div>
  </div>
);
