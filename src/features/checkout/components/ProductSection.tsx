import type { Product } from "../../../types/product";
import { useState } from "react";

interface Props {
  product: Product | null;
}

export const ProductSection = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<string>("");

  if (!product) return null;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-medium">{product.name}</h2>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="flex items-center mt-2 space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-24 object-cover rounded"
        />
        <div>
          <p className="line-through text-gray-400 text-sm">₹{product.mrp}</p>
          <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>
          <div className="flex items-center text-xs space-x-2 mt-1">
            <p>{product.review}</p>
            <div className="flex gap-0.5 text-yellow-500">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-sm mb-2">Size</p>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`w-9 h-9 rounded-full border flex items-center justify-center ${
                size === product.selectedSize
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-sm mb-1">Quantity</p>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="w-40 px-3 py-2 rounded border border-gray-300 text-sm"
        />
      </div>

      <button className="mt-4 px-3 py-1 text-sm bg-blue-900 hover:bg-blue-700 transition text-white rounded">
        Edit
      </button>
    </section>
  );
};
