import { Box, CheckCircle, ShoppingCart, Truck } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useTrackOrder, type TrackOrderType } from "../hooks/useTrackOrder";
import OrderDetails from "./OrderDetails";
import OrderTrackCardSkeletion from "./OrderTrackCardSkeletion";
import type { JSX } from "react";
import { formatDate } from "date-fns";

const steps: {
  label: string;
  icon: JSX.Element;
  status: TrackOrderType["status"];
}[] = [
  {
    label: "Order Placed",
    icon: <ShoppingCart className="w-5 h-5" />,
    status: "pending",
  },
  {
    label: "Order Packed",
    icon: <Box className="w-5 h-5" />,
    status: "Accepted",
  },
  {
    label: "Order Shipped",
    icon: <Truck className="w-5 h-5" />,
    status: "shipped",
  },
  {
    label: "Delivered",
    icon: <CheckCircle className="w-5 h-5" />,
    status: "delivered",
  },
];

const OrderTrackCard = () => {
  const { data, error, isLoading } = useTrackOrder();

  if (isLoading) return <OrderTrackCardSkeletion />;
  if (error)
    return <p className="text-center py-8 text-red-600">Error: {error}</p>;

  const currentStep = steps?.findIndex((s) => s.status.toLowerCase() === data?.status.toLowerCase()) ?? 0;

  const orderDetails = {
    number: data?.id.toString() ?? "N/A",
    placed: data?.ordered_at ? formatDate(data?.ordered_at,'yyyy-MM-dd HH:mm a') : "N/A",
    received: data?.delivered_at
      ? data.delivered_at.toDateString()
      : "Not received yet",
    status: data?.status ?? "Unknown",
  };

  return (
    <div className="w-full md:max-w-3xl md:min-w-2xl mx-auto p-6 bg-white md:shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Order Tracking
      </h2>
      <div className="relative  ml-5">
        <div className="absolute top-0 left-0 flex h-full w-1 bg-gray-200"></div>
        <div
          style={{
            height: `${((currentStep + 1) * 100) / steps?.length}%`,
          }}
          className="absolute top-0 left-0 flex  w-1 bg-blue-600"
        ></div>

        {steps?.map((step, index) => (
          <div key={index} className="mb-8 ml-4 flex items-center space-x-4">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                index <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {step.icon}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                index < currentStep ? "text-blue-700" : "text-gray-500"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <OrderDetails orderDetails={orderDetails} />
    </div>
  );
};

export default OrderTrackCard;
