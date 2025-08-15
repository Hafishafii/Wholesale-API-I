import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOrders } from "../slice/orderSlice";
import { type OrderDetailsType } from "../types/Ordertypes";
import api from "../../../lib/api";

export const useOrders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 👈 loading state
  const [error, setError] = useState<string | null>(null); // 👈 error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/orders/my-orders/");
        console.log("Orders API response:", response.data);

        const backendOrders = response.data.results;

        if (!Array.isArray(backendOrders)) {
          throw new Error("Expected an array of orders");
        }

        const formattedOrders: OrderDetailsType[] = backendOrders.map((order: any) => {
          const firstItem = order.items?.[0] ?? {};

          return {
            id: order.id,
            productId: firstItem.product_id || "",
            title: firstItem.product_name || "Product",
            color: firstItem.color || "N/A",
            quantity: firstItem.quantity || 1,
            price: Number(firstItem.price_at_purchase || 0),
            discount: 0,
            total: Number(order.total_price || 0),
            confirmedDate: order.ordered_at || "",
            deliveredDate: order.delivered_at || order.ordered_at || "",
            shop: order.shipping_address || "Shop",
            contact: order.contact_number || "9999999999",
            image: firstItem.image || "https://via.placeholder.com/150",
            rating: order.rating || 0,
            status: order.status || "pending",
          };
        });

        dispatch(setOrders(formattedOrders));
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return { loading, error }; // 👈 return states
};
