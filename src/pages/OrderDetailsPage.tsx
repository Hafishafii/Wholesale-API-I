import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetails from "../features/orders/components/OrderDetails";
import HeaderLayout from "../components/layouts/HeaderLayout";
import api from "../lib/api";
import { type OrderDetailsType } from "../features/orders/types/Ordertypes";
import Spinner from "../components/common/Spinner"

type AddressType = {
  id?: number;
  name?: string;
  phone?: string;
  pincode?: string;
  locality?: string;
  address?: string;
  city?: string;
  state?: string;
  landmark?: string;
  alternate_phone?: string;
  is_default?: boolean;
  created_at?: string;
  user?: number;
};

type OrderData = {
  id: number;
  address_data: AddressType;
  user: {
    phone_number: string;
  };
  total_price: string;
  status: "pending" | "confirmed" | "shipped" | "out_for_delivery" | "delivered";
  ordered_at: string;
  delivered_at?: string;
  items: {
    id: number;
    variant: number;
    variant_detail: {
      id: number;
      color: string;
      images: string[];
    };
    product: number;
    product_name: string;
    quantity: number;
    price_at_purchase: string;
  }[];
};

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetailsType & { address?: AddressType } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing in URL.");
      setLoading(false);
      return;
    }
    const fetchSingleOrder = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get<OrderData>(`/orders/my-orders/${orderId}/`);
        const data = response.data;
        const item = data.items[0];
        setOrder({
          id: data.id,
          productId: item?.product,
          title: item?.product_name || "Unknown Product",
          color: item?.variant_detail.color || "",
          quantity: item?.quantity || 0,
          price: Number(item?.price_at_purchase) || 0,
          discount: 0,
          total: Number(data.total_price) || 0,
          status: data.status,
          confirmedDate: data.ordered_at,
          deliveredDate: data.delivered_at || undefined,
          shop: data.address_data?.name || "N/A",
          contact: data.user?.phone_number || "N/A",
          image:
            item?.variant_detail.images && item.variant_detail.images.length > 0
              ? item.variant_detail.images[0]
              : "/placeholder.jpg",
          address: data.address_data,
        });
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleOrder();
  }, [orderId]);

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-6">
        {loading ? (
          <div>
            <Spinner />
            <p className="text-gray-500 text-sm font-medium select-none mt-4"></p>
          </div>
        ) : error ? (
          <p className="text-red-600 font-semibold text-center text-lg">{error}</p>
        ) : order ? (
          <OrderDetails order={order} />
        ) : (
          <div className="max-w-sm w-full text-center">
            {/* Minimalistic Box */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-6 w-16 h-16 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-gray-900 text-2xl font-semibold mb-2 select-none">
              Order Not Found
            </h3>
            <p className="text-gray-500 text-sm select-none">
              We couldn’t find any order matching your request. Please check your order ID and try again.
            </p>
          </div>
        )}
      </div>

    </HeaderLayout>
  );
};

export default OrderDetailsPage;
