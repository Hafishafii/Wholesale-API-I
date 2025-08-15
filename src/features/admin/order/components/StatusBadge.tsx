
import type { OrderStatus } from "../types";

const statusStyles: Record<OrderStatus, string> = {
  Pending: "text-yellow-600",
  "In Review": "text-orange-500",
  Approved: "text-green-600",
  Rejected: "text-red-600",
  "In production": "text-blue-600",
  Shipped: "text-indigo-600",
  Delivered: "text-lime-600",
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  return <span className={`font-semibold ${statusStyles[status]}`}>{status}</span>;
};
