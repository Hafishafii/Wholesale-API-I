import React from "react";
import { Heart } from "lucide-react";
import type { Variant } from "../types/Products";

interface Props {
  productName: string;
  productVariants: Variant[];
  availableSizes: string[];
  selectedColor: string | null;
  setSelectedColor: (c: string | null) => void;
  selectedSize: string | null;
  setSelectedSize: (s: string | null) => void;
  quantity: number;
  setQuantity: (n: number) => void;
  selectedVariant?: Variant;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onWishlistToggle: () => void;
  inWishlist: boolean;
  onShowSizeChart: () => void;
}

const ProductPurchasing: React.FC<Props> = ({
  productVariants,
  availableSizes,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  selectedVariant,
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
  inWishlist,
  onShowSizeChart,
}) => {
  const colors = Array.from(new Set(productVariants.map((v) => v.color)));

  // Check stock for selected variant, default 0 if undefined
  const stock = selectedVariant?.current_stock ?? 0;
  const isOutOfStock = stock === 0;

  return (
    <div className="mt-6 space-y-4">
      <div className="text-2xl font-bold text-black">
        ₹{Number(selectedVariant?.wholesale_price || 0) * quantity}
      </div>
      <div className="text-gray-500 line-through">
        ₹{Number(selectedVariant?.cost_price || 0) * quantity}
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
        <div className="flex border rounded-md">
          <button
            className="px-3 py-1 text-lg"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={isOutOfStock}
          >
            –
          </button>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="w-12 text-center border-l border-r"
            min={1}
            disabled={isOutOfStock}
          />
          <button
            className="px-3 py-1 text-lg"
            onClick={() => setQuantity(quantity + 1)}
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-sm mb-1">Available Colors</h3>
        <div className="flex flex-wrap items-center gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => { setSelectedColor(color); setSelectedSize(null); }}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedColor === color ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
              }`}
              disabled={isOutOfStock}
            >
              {color}
            </button>
          ))}
          <button
            onClick={onShowSizeChart}
            className="ml-2 text-xs text-blue-600 hover:underline"
            disabled={isOutOfStock}
          >
            Size Chart
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-sm mb-1">Select Size</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isAvailable = productVariants.some((v) => v.color === selectedColor && v.size === size);
            return (
              <button
                key={size}
                onClick={() => isAvailable && setSelectedSize(size)}
                disabled={!isAvailable || isOutOfStock}
                className={`px-4 py-1 border rounded-md text-sm ${
                  selectedSize === size ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                } ${(!isAvailable || isOutOfStock) ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 mt-4 items-center">
        <button
          onClick={onBuyNow}
          className={`px-5 py-2 rounded-md text-sm ${
            isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock" : "Buy Now"}
        </button>
        <button
          onClick={onAddToCart}
          className="border px-5 py-2 rounded-md text-sm"
          disabled={isOutOfStock}
        >
          Add to Cart
        </button>

        <div className="ml-auto">
          <button
            onClick={onWishlistToggle}
            type="button"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 rounded-full border hover:scale-105 transition bg-white shadow"
            disabled={isOutOfStock}
          >
            <Heart
              size={20}
              fill={inWishlist ? "currentColor" : "none"}
              className={inWishlist ? "text-red-500" : "text-gray-600"}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPurchasing;
