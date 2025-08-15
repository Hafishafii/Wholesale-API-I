import { cn } from "../../../lib/utils";

interface OrderDetailsProps {
  orderDetails: {
    number: string;
    placed: string;
    received: string;
    status: string;
  };
}

const OrderDetails = ({ orderDetails }: OrderDetailsProps) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <strong>Order Number:</strong> {orderDetails.number}
      </div>
      <div>
        <strong>Order Placed:</strong> {orderDetails.placed}
      </div>
      <div>
        <strong>Order Received:</strong> {orderDetails.received}
      </div>
      <div>
        <strong>Order Status: </strong>
        <span
          className={cn(
            "font-semibold capitalize",
            orderDetails.status === "Delivered"
              ? "text-green-600"
              : "text-yellow-600"
          )}
        >
          {orderDetails.status}
        </span>
      </div>
    </div>
  );
};

export default OrderDetails;
