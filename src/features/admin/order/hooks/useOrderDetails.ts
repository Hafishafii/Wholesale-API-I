import { useState, useEffect } from "react";
import type{ OrderDetails } from "../types"
import api from "../../../../lib/api"; // adjust path

export const useOrderDetails = (orderId: string) => {
  const [data, setData] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/orders/my-orders/${orderId}/`);
        const order = response.data;

        const normalizedOrder: OrderDetails = {
          _id: order.id || orderId,
          customerName: order.address_data?.name || "Unknown",
          phone: order.address_data?.phone || "N/A",
          address: order.address_data?.address || "",
          city: order.address_data?.city || "",
          state: order.address_data?.state || "",
          pincode: order.address_data?.pincode || "",
          landmark: order.address_data?.landmark || "",
          locality: order.address_data?.locality || "",
          items: order.items?.map((item: any) => ({
            id: item.id,
            productName: item.product_name,
            quantity: item.quantity,
            priceAtPurchase: item.price_at_purchase,
            variant: {
              id: item.variant_detail?.id,
              color: item.variant_detail?.color,
              size: item.variant_detail?.size,
              productCode: item.variant_detail?.product_code,
              sku: item.variant_detail?.stock_keeping_unit,
              images: (item.variant_detail?.variant_images || []).map((img: any) => ({
                id: img.id,
                image: img.image,
                viewType: img.view_type
              }))
            }
          })) || [],
          totalPrice: order.total_price,
          isPaid: order.is_paid,
          status: order.status,
          orderedAt: order.ordered_at
        };

        setData(normalizedOrder);
      } catch (error) {
        console.error("Failed to load order details:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { data, loading };
};
