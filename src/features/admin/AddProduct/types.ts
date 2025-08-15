export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface ProductFormData {
  category_id: number;
  name: string;
  product_type: string;
  fabric: string; // made required
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
  images: File[];
  variants?: ProductVariant[];
}





export interface ProductVariant {
  color: string;
  size: string;
  product_code: string;
  stock_keeping_unit: string;
  cost_price: number;
  wholesale_price: number;
  min_order_quantity: number;
  current_stock: number;
  allow_customization: boolean;
  images: File[];
}