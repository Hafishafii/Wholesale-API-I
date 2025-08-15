export type OrderStatus =
  | "Pending"
  | "In Review"
  | "Approved"
  | "Rejected"
  | "In production"
  | "Shipped"
  | "Delivered"
  | string;

export interface OrderRequest {
  id: string;
  date: string;
  customerName: string;
  contact: string;
  product: string;
  fabric: string;
  color: string;
  quantity: number;
  status: OrderStatus;
  totalPrice?: string;
  productId?: string;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  priceAtPurchase: string;
  variant: {
    id: number;
    color?: string;
    size?: string;
    fabricType?: string; // added for backend match
    productCode?: string;
    sku?: string;
    images?: { id: number; image: string; viewType?: string }[];
  };
}

export interface CustomizationOptions {
  fabric?: string;        // normalized key
  fabricType?: string;    // backend key if needed
  color?: string;
  colorReferenceImg?: string;
}

export interface OrderDetails {
  _id: number | string;
  customerName: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  locality?: string;

  productType?: "Sarees" | "Kurtas" | "Others" | string;
  customization?: CustomizationOptions;
  patternStyle?: string;
  sampleImage?: string;
  branding?: boolean;
  quantity?: number;
  bulkOrder?: boolean;
  notes?: string;

  items?: OrderItem[];
  totalPrice?: string;
  isPaid?: boolean;
  status?: string;
  orderedAt?: string;
}
