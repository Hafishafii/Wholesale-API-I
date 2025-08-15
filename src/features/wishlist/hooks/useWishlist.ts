// src/hooks/useWishlist.ts
import { useState, useEffect } from "react";
import { getWishlist, removeWishlistItem } from "../api/wishlistServices";

type Category = {
  id: number;
  name: string;
  image: string;
};

type ProductDetails = {
  id: number;
  category: Category;
  name: string;
  product_type: string;
  fabric: string;
  color: string;
  size: string;
  product_code: string;
  stock_keeping_unit: string;
  cost_price: string;
  wholesale_price: string;
  min_order_quantity: number;
  current_stock: number;
  allow_customization: boolean;
  description: string;
  is_draft: boolean;
  images: string[];
};

export type WishlistItem = {
  id: number;
  product: number;
  product_name: string;
  product_details: ProductDetails;
  added_at: string;
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      const sorted = [...data.results].sort(
        (a: WishlistItem, b: WishlistItem) =>
          a.product_details.category.name.localeCompare(
            b.product_details.category.name
          )
      );
      setWishlist(sorted);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await removeWishlistItem(id);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return { wishlist, loading, removeItem };
};
