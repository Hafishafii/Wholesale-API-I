import { type OrderDetailsType } from "../features/orders/types/Ordertypes";

export const sampleOrders: OrderDetailsType[] = [
  {
    id: "1",
    title: "Weddings Silk Saree",
    color: "Red",
    quantity: 1,
    price: 3000,
    discount: 10,
    total: 2700,
    confirmedDate: "2025-07-20",
    deliveredDate: "2025-07-23",
    shop: "GROOM",
    contact: "9876543210",
    image: "https://media.urbanwomania.com/wp-content/uploads/2023/12/Sage-Green-Embroidered-Silk-Saree.webp",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Net Printed Saree",
    color: "Silver",
    quantity: 1,
    price: 5000,
    discount: 5,
    total: 4750,
    confirmedDate: "2025-07-18",
    deliveredDate: "2025-07-22",
    shop: "TrendWorld",
    contact: "9123456780",
    image: "https://www.vastranand.in/cdn/shop/files/5_c825a763-7dc4-4999-b113-889313093638.jpg?v=1743078767",
    rating: 4.5,
  },
];
