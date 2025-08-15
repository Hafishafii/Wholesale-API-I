export interface Product {
  id: number;
  name: string;
  price: number;
  product_type: string;
  description: string;
  is_draft: boolean;
  fabric_type?: string; // ✅ added

  category: {
    id: number;
    name: string;
    image: string;
  };
  variants: Variant[];
  thumbnail?: string;

  // Added for ratings display
  rating?: number;        // average rating (e.g., 4.5)
  totalRatings?: number;  // total number of ratings (e.g., 1643)
}

export interface Variant {
  id: number;
  color: string;
  size: string;
  product_code: string;
  stock_keeping_unit: string;
  cost_price: number;
  wholesale_price: number;
  min_order_quantity: number;
  current_stock: number;
  allow_customization: boolean;
  images: { id: number; image: string }[]; // ✅ fixed type
  thumbnail?: string;
  fabric?: string;
}
