export interface ProductImage {
  id: number;
  image: string;
  view_type: string; // front, back, left, right
}

export interface ProductVariant {
  id: number;
  color: string;
  cost_price: string;
  wholesale_price: string;
  current_stock: number;
  min_order_quantity: number;
  product_code: string;
  size: Size;
  stock_keeping_unit: string;
  allow_customization: boolean;
  variant_images: ProductImage[]; // <-- updated to match backend
}

export interface ProductFormData {
  id: number;
  name: string;
  product_type: ProductType;
  description: string;
  category?: {
    id: number;
    name: string;
    image: string;  
  };
  variants: ProductVariant[];
}

// Actual product types you use
export type ProductType = "Sarees" | "Shirts" | "Dhotis";

// Extend Size type with all sizes you use
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

// Color can stay as string
export type Color = string;
