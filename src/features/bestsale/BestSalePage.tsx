//import React from 'react';
import { useSelector } from "react-redux";
import { useBestSaleData } from "./hooks/useBestSaleData";
import { BestSaleCard } from "./components/ProductCard";
import { useSkeletonLoader } from "../../hooks/useSkeletonLoader";
import type { RootState } from "../../store/type";

const BestSalePage = () => {
  useBestSaleData();
  const { products, loading } = useSelector(
    (state: RootState) => state.bestSale
  );

  return (
    <div className="min-h-screen bg-[#001F5B] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-center text-2xl font-semibold mb-4">
          Fast-Moving Wholesale Favorites
        </h1>

        {useSkeletonLoader(
          loading,
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-300 animate-pulse rounded"
              ></div>
            ))}
          </div>,
          <div className="grid grid-cols-2 gap-4">
            {products.map((product: any, index: number) => (
              <BestSaleCard
                key={index}
                product={product}
                onClick={() => console.log("Clicked", product.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSalePage;
