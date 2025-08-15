import {
    MdShoppingCart,
    MdPayment,
    MdLogin,
    MdPerson,
    MdOutlineAnalytics,
    MdNotifications,
    MdInventory,
    MdPersonAddAlt1,
} from "react-icons/md";
import { type IconType } from "react-icons";
import type { OrderRequest } from "../../../customize-order/hooks/useOrderRequests";

export const renderIcons = (title: string): IconType => {
  const lower = title.toLowerCase();

  if (lower.includes("order")) return MdShoppingCart;
  if (lower.includes("payment")) return MdPayment;

  if (
    lower.includes("registered") ||
    lower.includes("joined") ||
    lower.includes("create account") ||
    lower.includes("signup") ||
    lower.includes("register")
  )
    return MdPersonAddAlt1;

  if (
    lower.includes("login") ||
    lower.includes("auth")
  )
    return MdLogin;

  if (lower.includes("user") || lower.includes("account"))
    return MdPerson;

  if (lower.includes("notification") || lower.includes("alert"))
    return MdNotifications;

  if (
    lower.includes("product") ||
    lower.includes("item") ||
    lower.includes("inventory")
  )
    return MdInventory;

  if (
    lower.includes("analytics") ||
    lower.includes("report") ||
    lower.includes("stat")
  )
    return MdOutlineAnalytics;

  return MdPerson;
};


export const renderColor = (status: OrderRequest['status']) => {
    if (status === 'Accepted') return 'bg-blue-500 text-white'
    if (status === 'cancelled') return 'bg-red-500 text-white'
    if (status === 'pending') return 'bg-gray-400 text-white'
    return 'bg-green-500 text-white'
}


export const getActivityTitle = (type: string): string => {
  switch (type) {
    case "login":
      return "User logged in";
    case "registered":
      return "User registered an account";
    case "order_placed":
      return "User placed an order";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).replaceAll("_", " ");
  }
};
