import type { OrderData } from "./type";

export const mockOrderData: OrderData = {
    orderNumber: "123456789",
    statusTimeline: [
        { status: "Order Placed", date: new Date("2025-07-24T08:00:00") },
        { status: "Order Packed", date: new Date("2025-07-24T11:00:00") },
        { status: "Order Shipped", date: new Date("2025-07-24T14:00:00") },
        { status: "In Transit", date: undefined },
        { status: "Out for Delivery", date: undefined },
        { status: "Delivered", date: undefined },
    ],
    orderPlacedDate: new Date("2025-07-24T08:00:00"),
    orderReceivedDate: undefined,
    currentStatus: "Shipped",
};
