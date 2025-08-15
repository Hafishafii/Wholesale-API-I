import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { type OrderDetailsType } from "../types/Ordertypes";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  rating: number;
  order: OrderDetailsType & {
    items?: {
      product_name?: string | null;
      product?: number | string | { name?: string; images?: string[] };
      variant_detail?: {
        images?: string[];
      };
    }[];
  };
}
const OrderCard = ({ rating, order }: OrderCardProps) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const navigate = useNavigate();

  //Product name fallback logic
  const title =
    order.items?.[0]?.product_name?.trim() ||
    (typeof order.items?.[0]?.product === "object" &&
      (order.items[0].product as any)?.name) ||
    "Unknown Product";

  // Product image fallback logic
  const productImage =
    order.items?.[0]?.variant_detail?.images?.[0] ||
    (typeof order.items?.[0]?.product === "object" &&
      (order.items[0].product as any)?.images?.[0]) ||
    "/placeholder-image.png";

  // Delivered date formatting
  const deliveredDate = order.deliveredDate
    ? new Date(order.deliveredDate).toLocaleDateString()
    : "Not delivered yet";

  return (
    <div
      onClick={() =>
        navigate(`/orders/${order.id}/${order.items?.[0]?.product || ""}`)
      }
      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={productImage}
        alt={title}
        className="w-24 h-24 object-cover rounded-lg"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/placeholder-image.png";
        }}
      />
      <div className="flex-1">
        <p className="text-sm text-gray-600">Delivered On {deliveredDate}</p>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-1 mt-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, idx) => {
            const index = idx + 1;
            return (
              <FaStar
                key={idx}
                className={`cursor-pointer transition ${
                  (hoverRating || currentRating) >= index
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(index)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentRating(index);
                }}
              />
            );
          })}
        </div>
        <p className="text-sm mt-1 text-blue-600 cursor-pointer hover:underline">
          Rate this product now
        </p>
      </div>
      <IoIosArrowForward className="text-2xl text-gray-400 mt-1" />
    </div>
  );
};

export default OrderCard;
