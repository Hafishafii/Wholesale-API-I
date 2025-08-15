export interface OrderDetailsType {
  id: number | string;
  productId?: number;

  title: string;
  color: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;

  status?: "pending" | "confirmed" | "shipped" | "out_for_delivery" | "delivered";
  confirmedDate: string;
  shippedDate?: string;
  outForDeliveryDate?: string;
  deliveredDate?: string;

  shop: string;
  contact: string;
  image: string;
  rating?: number;
}
