import type { OrderRequest } from "../hooks/useOrderRequests";

export const gradientMap: Record<OrderRequest["status"], string> = {
  pending: "from-yellow-400 to-orange-500",
  cancelled: "from-red-500 to-orange-800",
  Accepted: "from-green-400 to-green-700",
};

export const statusStyles: Record<OrderRequest["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};


export const statusMessages: Record<OrderRequest["status"], string> = {
  pending: "Your request is under review. We'll get back to you shortly.",
  Accepted: "Request approved! The product will be prepared and released shortly.",
  cancelled: "Unfortunately, your request was declined. Feel free to request more.",
};