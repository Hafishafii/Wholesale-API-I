// components/ProductInfo.tsx
import React from "react";
import type { Product } from "../types/Products";

interface Props {
  product: Product;
  reviewsCount: number;
}

const ProductInfo: React.FC<Props> = ({ product, reviewsCount }) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold text-blue-800">{product.name}</h1>
      <p className="text-sm text-gray-600">{product.description}</p>

      {product.rating !== undefined && product.totalRatings !== undefined && (
        <p className="text-green-600 text-sm">
          ★ {product.rating.toFixed(1)} –{" "}
          {product.rating >= 4.5
            ? "Excellent"
            : product.rating >= 4
            ? "Very good"
            : product.rating >= 3
            ? "Good"
            : "Average"}{" "}
          – {product.totalRatings.toLocaleString()} ratings and{" "}
          {reviewsCount.toLocaleString()} reviews
        </p>
      )}
    </div>
  );
};

export default ProductInfo;
